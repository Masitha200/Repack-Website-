const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    let urlPath = req.url.split('?')[0]; // strip query patterns

    if (urlPath === '/api/free-games') {
        const epicApiUrl = "https://store-site-backend-static-ipv4.ak.epicgames.com/freeGamesPromotions?locale=en-US&country=US&allowCountries=US";
        const https = require('https');
        https.get(epicApiUrl, (apiRes) => {
            let body = '';
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            apiRes.on('data', (chunk) => { body += chunk; });
            apiRes.on('end', () => { res.end(body); });
        }).on('error', (e) => {
            console.error(`Error fetching free games: ${e.message}`);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: e.message }));
        });
        return;
    }

    if (urlPath === '/api/steam-featured') {
        const steamApiUrl = "https://store.steampowered.com/api/featured/";
        const https = require('https');
        https.get(steamApiUrl, (apiRes) => {
            let body = '';
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            apiRes.on('data', (chunk) => { body += chunk; });
            apiRes.on('end', () => { res.end(body); });
        }).on('error', (e) => {
            console.error(`Error fetching Steam featured: ${e.message}`);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: e.message }));
        });
        return;
    }

    let filePath = path.join(__dirname, urlPath === '/' ? 'index.html' : urlPath);

    const extname = path.extname(filePath);
    let contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);

    // Auto-scheduler for catalog updates (Runs GameDrive and Steam scrapers)
    const { exec } = require('child_process');
    function runCatalogUpdates() {
        console.log(`[${new Date().toISOString()}] Initiating background catalog sync...`);

        exec('node scrape_gamedrive.js', (err, stdout, stderr) => {
            if (err) {
                console.error(`GameDrive Scraper Error: ${err.message}`);
                return;
            }
            console.log("GameDrive catalog successfully refreshed.");
        });

        exec('node scrape_steam.js', (err, stdout, stderr) => {
            if (err) {
                console.error(`Steam Scraper Error: ${err.message}`);
                return;
            }
            console.log("Steam storefront catalog successfully refreshed.");
        });
    }

    // Run scraper sync on start
    runCatalogUpdates();

    // Schedule: Update every hour (3600000ms)
    setInterval(runCatalogUpdates, 3600000);
});
