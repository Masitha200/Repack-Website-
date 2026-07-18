const fs = require('fs');
const https = require('https');

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`Failed to fetch ${url}: Status ${res.statusCode}`));
                return;
            }
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

function cleanTitle(slug) {
    // Remove unwanted endings or patterns
    let clean = slug
        .replace(/-dodi-repack$/gi, '')
        .replace(/-fitgirl-repack$/gi, '')
        .replace(/-elamigos-repack$/gi, '')
        .replace(/-repack$/gi, '')
        .replace(/-crack$/gi, '')
        .replace(/-download$/gi, '')
        .replace(/-free-download$/gi, '')
        .replace(/-all-dlcs?$/gi, '')
        .replace(/-multi\d+$/gi, '')
        .replace(/-bonus-content$/gi, '');

    // Convert to title case
    clean = clean.split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

    // Clean up double spaces or trailing periods
    return clean.replace(/\s+/g, ' ').trim();
}

function extractGroup(slug) {
    const slugUpper = slug.toUpperCase();
    if (slugUpper.includes('DODI')) return 'DODI';
    if (slugUpper.includes('FITGIRL')) return 'FitGirl';
    if (slugUpper.includes('ELAMIGOS')) return 'ElAmigos';
    if (slugUpper.includes('RUNE')) return 'RUNE';
    if (slugUpper.includes('TENOKE')) return 'TENOKE';
    if (slugUpper.includes('GOLDBERG')) return 'Goldberg';
    if (slugUpper.includes('FLT')) return 'FLT';
    if (slugUpper.includes('CODEX')) return 'CODEX';
    if (slugUpper.includes('RELOADED')) return 'RELOADED';
    return 'GameDrive';
}

function extractSize(slug) {
    // E.g. "from-21-9-gb" or "from-600-mb"
    const match = slug.match(/from-(\d+(?:-\d+)?)-(gb|mb)/i);
    if (match) {
        let size = match[1].replace('-', '.');
        return `${size} ${match[2].toUpperCase()}`;
    }
    return '15.4 GB'; // default
}

function guessCategory(slug) {
    const s = slug.toLowerCase();
    if (s.includes('rpg') || s.includes('witcher') || s.includes('fantasy') || s.includes('cyberpunk') || s.includes('souls')) return 'RPG';
    if (s.includes('simulator') || s.includes('sim') || s.includes('farm') || s.includes('fifa') || s.includes('cricket') || s.includes('rac')) return 'Simulation';
    if (s.includes('shoot') || s.includes('doom') || s.includes('battlefield') || s.includes('cod-') || s.includes('strike')) return 'Shooter';
    if (s.includes('surv') || s.includes('forest') || s.includes('resident-evil') || s.includes('outlast')) return 'Survival';
    if (s.includes('action') || s.includes('combat') || s.includes('fight') || s.includes('mortal-kombat')) return 'Action';
    if (s.includes('adventure') || s.includes('tomb-raider') || s.includes('creed') || s.includes('gta')) return 'Adventure';
    if (s.includes('strateg') || s.includes('civ') || s.includes('skylines') || s.includes('total-war')) return 'Strategy';
    if (s.includes('puzzle') || s.includes('portal') || s.includes('inside')) return 'Puzzle';
    return 'Adventure'; // default
}

async function scrapeAll() {
    console.log("Starting sitemap scrape from gamedrive.org...");
    const games = [];
    const ids = new Set();

    // Loop through the sitemaps (we can do 1 to 5 to get the latest 500+ games, or more. Let's do 1 to 10 for ~1000 games)
    // Sitemaps are sorted chronologically, with smaller indexes generally being newer. Let's cover sitemaps 1 to 10.
    for (let i = 1; i <= 10; i++) {
        const url = `https://gamedrive.org/post-sitemap${i}.xml`;
        console.log(`Fetching sitemap: ${url}`);
        try {
            const xml = await fetchUrl(url);

            // Regex to match <url> elements
            // Useful patterns: <loc>(.*?)</loc> and optional <image:loc>(.*?)</image:loc> and <lastmod>(.*?)</lastmod>
            const urlRegex = /<url>([\s\S]*?)<\/url>/g;
            let match;
            let count = 0;

            while ((match = urlRegex.exec(xml)) !== null) {
                const urlContent = match[1];
                const locMatch = urlContent.match(/<loc>(.*?)<\/loc>/);
                if (!locMatch) continue;

                const loc = locMatch[1];
                // Check if it's a post containing actual game, avoid tag pages or categories
                if (!loc.startsWith('https://gamedrive.org/') || loc === 'https://gamedrive.org/') continue;

                const urlParts = loc.split('/').filter(Boolean);
                const slug = urlParts[urlParts.length - 1];
                if (!slug || slug.includes('sitemap') || slug === 'xml' || slug.includes('category-') || slug.includes('post_tag-')) continue;

                if (ids.has(slug)) continue;
                ids.add(slug);

                const imgMatch = urlContent.match(/<image:loc>(.*?)<\/image:loc>/);
                const imgUrl = imgMatch ? imgMatch[1] : '';

                const dateMatch = urlContent.match(/<lastmod>(.*?)<\/lastmod>/);
                const date = dateMatch ? dateMatch[1].substring(0, 10) : '2025-01-01';

                const title = cleanTitle(slug);
                const group = extractGroup(slug);
                const size = extractSize(slug);
                const category = guessCategory(slug);

                // Add game definition
                games.push({
                    id: slug,
                    title: title,
                    bgClass: 'card-seeded',
                    imgUrl: imgUrl,
                    category: category,
                    releaseDate: date,
                    crackDate: date,
                    crackStatus: 'Cracked',
                    crackGroup: group,
                    sizeRepack: size,
                    sizeOriginal: '30.0 GB',
                    rating: parseFloat((8.0 + Math.random() * 1.9).toFixed(1)),
                    developer: 'Various',
                    repackVersion: `v1.0 + Crack (${group})`,
                    description: `${title} is a premier ${category} game available for download from GameDrive.`,
                    requirements: {
                        minimum: 'OS: Windows 10 | CPU: Intel Core i5 | RAM: 8 GB | GPU: GTX 1060 | Storage: 45 GB HDD',
                        recommended: 'OS: Windows 11 | CPU: Intel Core i7 | RAM: 16 GB | GPU: RTX 3060 | Storage: 45 GB SSD'
                    },
                    features: [
                        `Lossless repack with ${group} crack applied`,
                        'Full high-quality texture compression',
                        'Direct high-speed web browser download links'
                    ],
                    downloads: {
                        magnet: '',
                        torrent: '',
                        direct: loc
                    }
                });
                count++;
            }
            console.log(`Scraped ${count} games from sitemap ${i}.`);
        } catch (err) {
            console.error(`Failed to parse sitemap ${i}: ${err.message}`);
        }
    }

    console.log(`Total scraped games: ${games.length}`);
    fs.writeFileSync('gamedrive_scraped_games.json', JSON.stringify(games, null, 4));
    console.log("Scraped games saved to gamedrive_scraped_games.json");
}

scrapeAll().catch(console.error);
