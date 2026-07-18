const fs = require('fs');
const https = require('https');

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        };
        https.get(url, options, (res) => {
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

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function parseSearchHtml(html) {
    const games = [];
    // Regex for search rows in Steam results
    const rowRegex = /<a[^>]*href="https:\/\/store\.steampowered\.com\/app\/(\d+)\/([^"]*)"[^>]*data-ds-appid="(\d+)"[^>]*>([\s\S]*?)<\/a>/gi;
    let match;

    while ((match = rowRegex.exec(html)) !== null) {
        const appId = match[1];
        const slug = match[2];
        const rowContent = match[4];

        // 1. Extract Title
        const titleMatch = rowContent.match(/<span class="title">([^<]+)<\/span>/i);
        if (!titleMatch) continue;
        const title = titleMatch[1].trim();

        // 2. Extract price
        let price = 'Buy Now';
        // Try finding discount final price first
        const discountFinalMatch = rowContent.match(/<div class="discount_final_price[^"]*">([^<]+)<\/div>/i);
        const discountOrigMatch = rowContent.match(/<div class="discount_original_price[^"]*">([^<]+)<\/div>/i);

        if (discountFinalMatch) {
            const finalPrice = discountFinalMatch[1].trim();
            if (discountOrigMatch) {
                const origPrice = discountOrigMatch[1].trim();
                price = `<span style="text-decoration: line-through; color: var(--text-dim); margin-right: 6px;">${origPrice}</span><span>${finalPrice}</span>`;
            } else {
                price = finalPrice;
            }
        } else {
            // Standard price
            const priceMatch = rowContent.match(/<div class="[^"]*search_price[^"]*">([\s\S]*?)<\/div>/i);
            if (priceMatch) {
                const priceText = priceMatch[1]
                    .replace(/<[^>]*>/g, '') // strip HTML tag if any
                    .replace(/[\r\n\t]+/g, ' ')
                    .trim();
                if (priceText) {
                    price = priceText;
                }
            }
        }

        // Clean up price string spacing
        price = price.replace(/\s+/g, ' ').trim();

        // 3. Guess category
        let category = 'Action';
        const s = slug.toLowerCase() + ' ' + title.toLowerCase();
        if (s.includes('rpg') || s.includes('fantasy') || s.includes('souls') || s.includes('witcher')) category = 'RPG';
        else if (s.includes('simulator') || s.includes('sim') || s.includes('farm') || s.includes('tycoon')) category = 'Simulation';
        else if (s.includes('shoot') || s.includes('doom') || s.includes('battlefield') || s.includes('cod') || s.includes('strike')) category = 'Shooter';
        else if (s.includes('surv') || s.includes('forest') || s.includes('resident') || s.includes('horror')) category = 'Survival';
        else if (s.includes('strateg') || s.includes('total-war') || s.includes('civ') || s.includes('skylines')) category = 'Strategy';
        else if (s.includes('puzzle') || s.includes('portal') || s.includes('inside') || s.includes('limbo')) category = 'Puzzle';
        else if (s.includes('adventure') || s.includes('tomb') || s.includes('creed') || s.includes('gta')) category = 'Adventure';

        // 4. Generate direct steam store image
        const imgUrl = `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/header.jpg`;

        // 5. Rate (realistic mock based on appId)
        const rating = parseFloat((8.0 + (parseInt(appId) % 20) / 10).toFixed(1));

        games.push({
            id: `steam-${appId}`,
            title: title,
            bgClass: 'card-elden',
            imgUrl: imgUrl,
            category: category,
            developer: 'Steam Store Lineup',
            price: price,
            appId: parseInt(appId),
            rating: rating
        });
    }

    return games;
}

async function scrapeSteamStore() {
    console.log("Starting Steam Store featured scraper targeting 5000+ games...");
    const allGames = [];
    const seenIds = new Set();
    const countPerRequest = 100;

    // We want at least 5000 games. Let's loop up to 55 requests (5500 potential games)
    const targetCount = 5200;

    for (let start = 0; allGames.length < targetCount && start < 10000; start += countPerRequest) {
        // Querying for best selling or general list of games
        // We sort by release date or relevance, e.g. sort_by=_ASC to get general list, or sort_by=Reviews_DESC for high rated games
        const url = `https://store.steampowered.com/search/results/?query&start=${start}&count=${countPerRequest}&infinite=1`;
        console.log(`[${allGames.length}/${targetCount}] Fetching Steam search results starting at: ${start}`);

        try {
            const jsonText = await fetchUrl(url);
            const response = JSON.parse(jsonText);

            if (!response || !response.results_html) {
                console.log("No data returned or reached end of results.");
                break;
            }

            // Unescape HTML tags that might have been escaped in JSON
            const unescapedHtml = response.results_html
                .replace(/\\"/g, '"')
                .replace(/\\'/g, "'")
                .replace(/\\n/g, '\n')
                .replace(/\\r/g, '\r')
                .replace(/\\t/g, '\t')
                .replace(/\\\//g, '/');

            const parsedGames = parseSearchHtml(unescapedHtml);
            let addedCount = 0;

            parsedGames.forEach(game => {
                if (!seenIds.has(game.id)) {
                    seenIds.add(game.id);
                    allGames.push(game);
                    addedCount++;
                }
            });

            console.log(`Parsed ${parsedGames.length} games. Added ${addedCount} new games. Current total: ${allGames.length}`);

            if (parsedGames.length === 0) {
                console.log("No more games found in parsing. Ending crawl.");
                break;
            }

            // Sleep 150ms between requests to avoid getting rate-limited
            await delay(150);
        } catch (e) {
            console.error(`Error fetching starting at ${start}:`, e.message);
            // Sleep longer on error
            await delay(2000);
        }
    }

    console.log(`Total games scraped successfully: ${allGames.length}`);
    fs.writeFileSync('steam_scraped_games.json', JSON.stringify(allGames, null, 4));
    console.log("Saved Steam games to steam_scraped_games.json successfully.");
}

scrapeSteamStore().catch(console.error);
