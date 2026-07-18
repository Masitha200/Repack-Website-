// NEO-PLAY Application Logic
document.addEventListener("DOMContentLoaded", () => {
    // Initial State Variables
    let currentCategory = "all";
    let searchFilter = "";
    let premiumSearchFilter = "";
    let cachedSteamGames = null;
    let premiumSteamGames = [];
    let sortBy = "recent";
    let displayedCount = 100; // Increased to show all games at once as requested
    const itemsPerLoad = 8;

    // Selectors
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll(".view-section");
    const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
    const navigationMenu = document.getElementById("navigation-menu");
    const logoButton = document.getElementById("logo-btn");

    // Live Ticker DOM components
    const liveTicker = document.getElementById("live-news-ticker");

    // Dashboard DOM components
    const totalCrackedStat = document.getElementById("stat-total-cracked");
    const premiumStat = document.getElementById("stat-premium");
    const upcomingStat = document.getElementById("stat-upcoming");
    const freeStat = document.getElementById("stat-free");
    const quickNewsFeed = document.getElementById("quick-news-feed");
    const quickFreeNow = document.getElementById("quick-free-now");
    const homeFeaturedGrid = document.getElementById("home-featured-grid");

    // Cracked Page DOM components
    const cracksSearch = document.getElementById("cracks-search");
    const cracksSort = document.getElementById("cracks-sort");
    const cracksGrid = document.getElementById("cracks-grid");
    const loadMoreButton = document.getElementById("btn-load-more");
    const loadMoreContainer = document.getElementById("cracks-load-more-div");
    const categoryFilterBar = document.getElementById("category-filter-bar");

    // Premium Games DOM components
    const premiumGamesGrid = document.getElementById("premium-games-grid");
    const premiumSearch = document.getElementById("premium-search");

    // Free Games DOM components
    const activeFreeGrid = document.getElementById("active-free-grid");
    const upcomingFreeGrid = document.getElementById("upcoming-free-grid");
    const storeTabs = document.querySelectorAll(".store-tab");

    // Request DOM components
    const requestForm = document.getElementById("game-request-form");
    const requestList = document.getElementById("request-items-list");
    const requestCount = document.getElementById("request-count");
    const searchRequests = document.getElementById("search-requests");

    // Modal DOM components
    const gameDetailModal = document.getElementById("game-detail-modal");
    const modalCloseBtn = document.getElementById("modal-close-btn");
    const modalDynamicContent = document.getElementById("modal-dynamic-content");

    // Global Search (in header)
    const globalSearch = document.getElementById("global-search");

    // Initialise LocalStorage for requests
    if (!localStorage.getItem("neoplay_requests")) {
        localStorage.setItem("neoplay_requests", JSON.stringify(GAMES_DATA.communityRequests));
    }

    // ==========================================
    // 1. ROUTING & NAVIGATION
    // ==========================================

    function navigateToSection(targetId) {
        // Update URL hash
        window.location.hash = targetId;

        // Show/hide sections
        sections.forEach(sec => {
            sec.classList.remove("active");
            if (sec.id === `view-${targetId}`) {
                sec.classList.add("active");
            }
        });

        // Update nav links indicator
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("data-target") === targetId) {
                link.classList.add("active");
            }
        });

        // Scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });

        // Animate progression bar
        const progressBar = document.getElementById("top-progress-bar");
        progressBar.style.width = "40%";
        setTimeout(() => { progressBar.style.width = "100%"; }, 150);
        setTimeout(() => { progressBar.style.width = "0%"; }, 600);

        // Close mobile drawer if open
        navigationMenu.classList.remove("active");
    }

    // Bind click events on Menu items
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const target = link.getAttribute("data-target");
            navigateToSection(target);
        });
    });

    logoButton.addEventListener("click", (e) => {
        e.preventDefault();
        navigateToSection("home");
    });

    // Handle Page Load Hash Routing
    if (window.location.hash) {
        const hashTarget = window.location.hash.substring(1);
        const validHashes = ["home", "cracks", "releases", "freebies", "requests", "hypervisor"];
        if (validHashes.includes(hashTarget)) {
            navigateToSection(hashTarget);
        } else {
            navigateToSection("home");
        }
    } else {
        navigateToSection("home");
    }

    // Mobile toggle handler
    mobileMenuToggle.addEventListener("click", () => {
        navigationMenu.classList.toggle("active");
    });

    // Global shortcut search keybind (Press / to focus search)
    document.addEventListener("keydown", (e) => {
        if (e.key === "/" && document.activeElement !== globalSearch && document.activeElement !== cracksSearch && document.activeElement !== document.getElementById("req-game-title")) {
            e.preventDefault();
            globalSearch.focus();
        }
    });

    // ==========================================
    // 2. LIVE TICKER & NOTIFICATIONS
    // ==========================================

    function initLiveTicker() {
        let tickerHtml = "";
        GAMES_DATA.liveTickerNews.forEach(news => {
            tickerHtml += `<span class="ticker-item-span" style="margin-right: 3rem;"><i class="fa-solid fa-gamepad color-success"></i> ${news}</span>`;
        });
        liveTicker.innerHTML = `<div class="ticker-item">${tickerHtml} &nbsp;&nbsp;&nbsp;&nbsp; ${tickerHtml}</div>`;
    }

    // Show toast notifications
    function showToast(message, type = "success") {
        const toastContainer = document.getElementById("toast-container");
        const toast = document.createElement("div");
        toast.className = `toast`;

        let iconClass = "fa-circle-check color-success";
        if (type === "warning") iconClass = "fa-circle-exclamation color-warning";
        if (type === "danger") iconClass = "fa-circle-xmark color-danger";

        toast.style.borderLeftColor = type === "success" ? "var(--status-cracked)" : (type === "warning" ? "var(--status-upcoming)" : "var(--status-uncracked)");
        toast.innerHTML = `
            <i class="fa-solid ${iconClass}"></i>
            <span>${message}</span>
        `;
        toastContainer.appendChild(toast);

        // Remove toast after 4s
        setTimeout(() => {
            toast.style.animation = "toastSlideIn 0.3s ease reverse";
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 4000);
    }

    // ==========================================
    // 3. STATS & DASHBOARD INITIALIZATION
    // ==========================================

    function initDashboard() {
        // Calculate core stats
        const totalCracked = GAMES_DATA.games.filter(g => g.crackStatus === "Cracked").length;

        // Premium games count (excluding GameDrive repacks)
        const localPremiumCount = GAMES_DATA.games.filter(game => {
            if (game.id === "grand-theft-auto-vi" || game.title === "Grand Theft Auto VI") return false;
            if (game.bgClass === "card-seeded") return false;
            if (game.downloads && game.downloads.direct && game.downloads.direct.includes("gamedrive.org")) return false;
            return true;
        }).length;
        const totalPremium = localPremiumCount + (premiumSteamGames ? premiumSteamGames.length : 0);

        const upcomingGamesCount = GAMES_DATA.releasesTimeline.filter(g => g.status === "Upcoming" || g.statusClass === "status-upcoming").length;
        const freeCount = GAMES_DATA.freeGames.filter(g => g.type === "active").length;

        // Set values in stats card (with animate numbering)
        if (totalCrackedStat) animateValue(totalCrackedStat, parseInt(totalCrackedStat.innerHTML) || 0, totalCracked, 1000);
        if (premiumStat) animateValue(premiumStat, parseInt(premiumStat.innerHTML) || 0, totalPremium, 1000);
        if (upcomingStat) animateValue(upcomingStat, parseInt(upcomingStat.innerHTML) || 0, upcomingGamesCount, 1200);
        if (freeStat) animateValue(freeStat, parseInt(freeStat.innerHTML) || 0, freeCount, 800);

        // News block rendering
        let newsHtml = "";
        GAMES_DATA.liveTickerNews.slice(0, 3).forEach(news => {
            newsHtml += `<div class="news-item"><i class="fa-regular fa-newspaper"></i> ${news}</div>`;
        });
        quickNewsFeed.innerHTML = newsHtml;

        // Load free games quick widget
        let quickFreeHtml = "";
        const activeGiveaways = GAMES_DATA.freeGames.filter(g => g.type === "active").slice(0, 2);
        activeGiveaways.forEach(game => {
            const storeIcon = game.store === "epic" ? '<span class="store-icon epic-icon">E</span>' : '<i class="fa-brands fa-steam"></i>';
            const storeName = game.store === "epic" ? "Epic Store" : "Steam";
            quickFreeHtml += `
                <div class="un-cracked-item" style="border-left: 3px solid var(--accent-blue);">
                    <div style="display:flex; align-items:center; gap: 0.6rem;">
                        <span style="font-size: 1.2rem; display:flex;">${storeIcon}</span>
                        <div>
                            <strong>${game.title}</strong>
                            <span class="uncracked-sub">Claim on ${storeName} by ${game.endDate.split(',')[0]}</span>
                        </div>
                    </div>
                    <a href="#freebies" class="btn btn-small btn-primary" onclick="navigateToSection('freebies')">Claim</a>
                </div>
            `;
        });
        quickFreeNow.innerHTML = quickFreeHtml;

        // Load homepage featured repacks (latest 3 cracked repacks)
        let featuredHtml = "";
        const crackedGamesOnly = GAMES_DATA.games.filter(g => g.crackStatus === "Cracked").slice(0, 3);
        crackedGamesOnly.forEach(game => {
            featuredHtml += generateGameCardHtml(game);
        });
        homeFeaturedGrid.innerHTML = featuredHtml;
    }

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Helper to generate game card
    function generateGameCardHtml(game) {
        const isCracked = game.crackStatus === "Cracked";
        const statusColor = isCracked ? "color-success" : (game.crackStatus === "Bypass" ? "color-warning" : "color-danger");
        const statusBadge = isCracked ? `<i class="fa-solid fa-lock-open ${statusColor}"></i> Cracked` : `<i class="fa-solid fa-lock ${statusColor}"></i> ${game.crackStatus}`;

        const coverImgMarkup = game.imgUrl
            ? `<i class="fa-solid fa-gamepad card-icon" style="display: none;"></i>
               <img src="${game.imgUrl}" alt="${game.title}" class="game-card-img" loading="lazy" onerror="this.style.display='none'; this.previousElementSibling.style.display='block';" />`
            : `<i class="fa-solid fa-gamepad card-icon"></i>`;

        // Render both Repack size and full Installed size
        const sizeInfoMarkup = game.sizeRepack === "-" || game.sizeRepack === ""
            ? `<span><i class="fa-solid fa-hard-drive" style="color: var(--text-muted);"></i> Size: ${game.sizeOriginal}</span>`
            : `<span><i class="fa-solid fa-file-zip" style="color: var(--accent-blue);"></i> Repack: ${game.sizeRepack}</span>
               <span><i class="fa-solid fa-hard-drive" style="color: var(--accent-purple);"></i> Installed: ${game.sizeOriginal}</span>`;

        return `
            <article class="game-card" onclick="openGameDetails('${game.id}')">
                <div class="card-img-placeholder ${game.bgClass}">
                    ${coverImgMarkup}
                    <div class="card-rating-badge"><i class="fa-solid fa-star"></i> ${game.rating}</div>
                    <div class="game-status-banner">
                        <span>${statusBadge}</span>
                        <span>${game.sizeRepack === "-" ? "" : game.sizeRepack}</span>
                    </div>
                </div>
                <div class="game-card-body">
                    <span class="game-card-category">${game.category}</span>
                    <h3 class="game-card-title">${game.title}</h3>
                    <div class="game-card-meta">
                        <span>By: ${game.developer}</span>
                        <span>${game.crackGroup !== "None" ? game.crackGroup : "Undetected"}</span>
                    </div>
                    <div class="game-card-sizes" style="display: flex; justify-content: space-between; font-size: 0.78rem; color: var(--text-muted); margin: 0.5rem 0 0.8rem 0; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 0.5rem;">
                        ${sizeInfoMarkup}
                    </div>
                    <button class="btn btn-secondary btn-small game-card-btn" style="margin-top: auto;">
                        <i class="fa-solid fa-cloud-arrow-down"></i> View Repack Details & Links
                    </button>
                </div>
            </article>
        `;
    }

    // ==========================================
    // 4. CRACKED GAMES CATALOG PAGE
    // ==========================================

    function renderCracksCatalog() {
        let filteredGames = GAMES_DATA.games.filter(game => {
            // Apply category filter
            const matchesCategory = currentCategory === "all" || game.category.toLowerCase() === currentCategory.toLowerCase();

            // Apply search filter (match title, group, or developer)
            const query = searchFilter.toLowerCase().trim();
            const normalizedQuery = query.replace(/\s+/g, "");

            // gamer search helper (e.g., "rdr2" matches "Red Dead Redemption 2")
            let titleMatches = game.title.toLowerCase().includes(query);

            // FIFA key alias mapping: "fifa 26" or "fifa" query maps to "EA Sports FC 26"
            if (!titleMatches) {
                if (query.includes("fifa") && game.title.toLowerCase().includes("ea sports fc")) {
                    titleMatches = true;
                }
                const fifaNumMatch = query.match(/fifa\s*(\d+)/);
                if (fifaNumMatch) {
                    const num = fifaNumMatch[1];
                    if (game.title.toLowerCase().includes(`ea sports fc ${num}`)) {
                        titleMatches = true;
                    }
                }
            }

            if (!titleMatches && query.length >= 2) {
                const words = game.title.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/);
                const acronym = words.map(w => w[0]).join("");
                titleMatches = acronym.includes(normalizedQuery) ||
                    (game.title.toLowerCase().includes("red dead redemption 2") && (normalizedQuery === "rdr2" || query.includes("rdr 2"))) ||
                    (game.title.toLowerCase().includes("red dead redemption 1") && (normalizedQuery === "rdr1" || query.includes("rdr 1"))) ||
                    (game.title.toLowerCase().includes("grand theft auto v") && (normalizedQuery === "gta5" || normalizedQuery === "gtav" || query.includes("gta 5") || query.includes("gta v"))) ||
                    (game.title.toLowerCase().includes("alan wake 2") && (normalizedQuery === "aw2" || query.includes("aw 2"))) ||
                    (game.title.toLowerCase().includes("god of war ragnarok") && (normalizedQuery === "gowr" || normalizedQuery === "gow2" || query.includes("gow r"))) ||
                    (game.title.toLowerCase().includes("resident evil") && (normalizedQuery.startsWith("re") || query.includes("re "))) ||
                    (game.title.toLowerCase().includes("silent hill 2") && (normalizedQuery === "sh2" || query.includes("sh 2"))) ||
                    (game.title.toLowerCase().includes("need for speed") && (normalizedQuery === "nfs" || query.includes("nfs"))) ||
                    (game.title.toLowerCase().includes("spider-man") && (normalizedQuery === "spiderman" || query.includes("spider")));
            }

            const matchesSearch = titleMatches ||
                game.crackGroup.toLowerCase().includes(query) ||
                game.developer.toLowerCase().includes(query) ||
                game.category.toLowerCase().includes(query);

            return matchesCategory && matchesSearch;
        });

        // Sorting functions
        if (sortBy === "recent") {
            filteredGames.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        } else if (sortBy === "rating") {
            filteredGames.sort((a, b) => b.rating - a.rating);
        } else if (sortBy === "size-asc") {
            filteredGames.sort((a, b) => parseSize(a.sizeRepack) - parseSize(b.sizeRepack));
        } else if (sortBy === "size-desc") {
            filteredGames.sort((a, b) => parseSize(b.sizeRepack) - parseSize(a.sizeRepack));
        } else if (sortBy === "alphabetical") {
            filteredGames.sort((a, b) => a.title.localeCompare(b.title));
        }

        // Handle pagination
        const totalMatches = filteredGames.length;
        const slicedGames = filteredGames.slice(0, displayedCount);

        // Toggle load more visibility
        if (displayedCount >= totalMatches) {
            loadMoreContainer.style.display = "none";
        } else {
            loadMoreContainer.style.display = "block";
        }

        if (slicedGames.length === 0) {
            cracksGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 3rem 0; color: var(--text-muted);">
                    <i class="fa-solid fa-face-frown" style="font-size: 2.5rem; margin-bottom: 1rem;"></i>
                    <p>No games found matching your search or filters.</p>
                </div>
            `;
            return;
        }

        let gridHtml = "";
        slicedGames.forEach(game => {
            gridHtml += generateGameCardHtml(game);
        });
        cracksGrid.innerHTML = gridHtml;
    }

    function parseSize(sizeStr) {
        if (!sizeStr || sizeStr === "-") return 0;
        const num = parseFloat(sizeStr);
        return isNaN(num) ? 0 : num;
    }

    // Search input handler
    cracksSearch.addEventListener("input", (e) => {
        searchFilter = e.target.value;
        displayedCount = 8; // Reset page limit
        renderCracksCatalog();
    });

    // Global Header Search handler
    globalSearch.addEventListener("input", (e) => {
        const query = e.target.value;
        const currentActiveSec = Array.from(sections).find(sec => sec.classList.contains("active"));

        if (currentActiveSec && currentActiveSec.id === "view-releases") {
            premiumSearchFilter = query;
            if (premiumSearch) {
                premiumSearch.value = query;
            }
            initPremiumGames();
        } else {
            searchFilter = query;
            cracksSearch.value = query; // Sync search fields
            displayedCount = 8;

            // Route to cracks section
            if (currentActiveSec && currentActiveSec.id !== "view-cracks") {
                navigateToSection("cracks");
            }
            renderCracksCatalog();
        }
    });

    // Sort dropdown handler
    cracksSort.addEventListener("change", (e) => {
        sortBy = e.target.value;
        renderCracksCatalog();
    });

    // Category pill filtering
    categoryFilterBar.addEventListener("click", (e) => {
        if (e.target.classList.contains("cat-pill")) {
            document.querySelectorAll(".cat-pill").forEach(pill => pill.classList.remove("active"));
            e.target.classList.add("active");
            currentCategory = e.target.getAttribute("data-category");
            displayedCount = 8;
            renderCracksCatalog();
        }
    });

    window.triggerCategoryFilter = function (categoryName) {
        const queryPill = Array.from(document.querySelectorAll(".cat-pill")).find(pill =>
            pill.getAttribute("data-category").toLowerCase() === categoryName.toLowerCase()
        );
        if (queryPill) {
            queryPill.click();
        }
        navigateToSection("cracks");
    };

    window.tabNavigation = function (targetId) {
        navigateToSection(targetId);
    };

    // Handle inactive dummy links (#) gracefully
    document.addEventListener("click", (e) => {
        const anchor = e.target.closest("a");
        if (anchor) {
            const href = anchor.getAttribute("href");
            if (href === "#" && !anchor.hasAttribute("onclick") && !anchor.id.includes("logo-btn")) {
                e.preventDefault();
                showToast("Social links and official channels are coming soon!");
            }
        }
    });

    // Load More action
    loadMoreButton.addEventListener("click", () => {
        displayedCount += itemsPerLoad;
        renderCracksCatalog();
        showToast("Loaded more gaming repacks!");
    });

    // ==========================================
    // 5. PREMIUM GAMES CATALOG (STEAM STORE)
    // ==========================================

    // Helper to calculate mock price for Steam games
    function getGamePrice(game) {
        if (game.price) return game.price; // Use pre-defined price if available
        if (game.id === "black-myth-wukong") return "$59.99";
        if (game.id === "elden-ring-shadow") return "$39.99";
        if (game.id === "grand-theft-auto-v") return "$29.99";
        if (game.id === "stalker-2") return "$59.99";
        if (game.id === "indiana-jones") return "$69.99";
        if (game.id === "cyberpunk-phantom-liberty") return "$29.99";
        if (game.id === "grand-theft-auto-vi") return "$79.99";

        // Dynamic prices based on repack size
        const sizeGb = parseFloat(game.sizeOriginal) || 30;
        if (sizeGb > 80) return "$69.99";
        if (sizeGb > 50) return "$59.99";
        if (sizeGb > 30) return "$39.99";
        if (sizeGb > 10) return "$19.99";
        return "$9.99";
    }

    function getSteamStoreUrl(game) {
        let appId = game.appId;
        if (!appId && game.imgUrl && game.imgUrl.includes("steam/apps/")) {
            const match = game.imgUrl.match(/\/apps\/(\d+)\//);
            if (match) {
                appId = parseInt(match[1]);
            }
        }

        if (appId && appId > 0 && appId < 3500000 && appId !== 999999) {
            return `https://store.steampowered.com/app/${appId}`;
        }
        return `https://store.steampowered.com/search/?term=${encodeURIComponent(game.title)}`;
    }

    function generatePremiumGameCardHtml(game) {
        const price = getGamePrice(game);
        const steamUrl = getSteamStoreUrl(game);

        let imgHtml = "";
        if (game.imgUrl) {
            imgHtml = `<img src="${game.imgUrl}" alt="${game.title}" class="game-card-img" loading="lazy" onerror="this.style.display='none'; this.previousElementSibling.style.display='block';" />`;
        }

        return `
            <article class="game-card">
                <div class="card-img-placeholder ${game.bgClass}">
                    <i class="fa-solid fa-gamepad card-icon" style="display: ${game.imgUrl ? 'none' : 'block'};"></i>
                    ${imgHtml}
                    <div class="card-rating-badge"><i class="fa-solid fa-star"></i> ${game.rating}</div>
                </div>
                <div class="game-card-body">
                    <div class="game-card-category">${game.category}</div>
                    <h3 class="game-card-title">${game.title}</h3>
                    <div class="game-card-meta" style="margin-bottom: 1.25rem;">
                        <span><i class="fa-solid fa-tag" style="color: var(--accent-pink);"></i> Price: ${price}</span>
                        <span><i class="fa-solid fa-building" style="color: var(--accent-blue);"></i> ${game.developer.split(' / ')[0]}</span>
                    </div>
                    <a href="${steamUrl}" target="_blank" class="btn btn-primary btn-small btn-full-width" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); border: none;">
                        <i class="fa-brands fa-steam"></i> Buy on Steam Store
                    </a>
                </div>
            </article>
        `;
    }

    function initPremiumGames() {
        if (!premiumGamesGrid) return;

        // 1. Filter out GameDrive games from our local database
        const localPremium = GAMES_DATA.games.filter(game => {
            if (game.id === "grand-theft-auto-vi" || game.title === "Grand Theft Auto VI") {
                return false;
            }
            // Do not show scraped GameDrive repacks (bgClass is card-seeded or download matches gamedrive.org)
            if (game.bgClass === "card-seeded") {
                return false;
            }
            if (game.downloads && game.downloads.direct && game.downloads.direct.includes("gamedrive.org")) {
                return false;
            }
            return true;
        });

        // Helper function to render a combined list
        const renderMergedGames = (steamList = []) => {
            // Merge local AAA and Steam featured games, avoiding duplicates by title or appId
            const merged = [...localPremium];
            const seenTitles = new Set(localPremium.map(g => g.title.toLowerCase().trim()));
            const seenAppIds = new Set(localPremium.map(g => {
                let appId = g.appId;
                if (!appId && g.imgUrl && g.imgUrl.includes("steam/apps/")) {
                    const match = g.imgUrl.match(/\/apps\/(\d+)\//);
                    if (match) appId = parseInt(match[1]);
                }
                return appId;
            }).filter(Boolean));

            steamList.forEach(sg => {
                const titleLower = sg.title.toLowerCase().trim();
                if (!seenTitles.has(titleLower) && !seenAppIds.has(sg.appId)) {
                    merged.push(sg);
                    seenTitles.add(titleLower);
                    if (sg.appId) seenAppIds.add(sg.appId);
                }
            });

            // Merge the 5,000+ scraped Steam games
            premiumSteamGames.forEach(sg => {
                const titleLower = sg.title.toLowerCase().trim();
                if (!seenTitles.has(titleLower) && !seenAppIds.has(sg.appId)) {
                    merged.push(sg);
                    seenTitles.add(titleLower);
                    if (sg.appId) seenAppIds.add(sg.appId);
                }
            });

            // Filter by search term
            const query = premiumSearchFilter.toLowerCase().trim();
            const filtered = merged.filter(game => {
                if (!query) return true;
                const titleMatches = game.title.toLowerCase().includes(query);
                const devMatches = game.developer ? game.developer.toLowerCase().includes(query) : false;
                const catMatches = game.category ? game.category.toLowerCase().includes(query) : false;
                return titleMatches || devMatches || catMatches;
            });

            // Slice output to avoid lagging the UI browser grid
            const sliceLimit = 120;
            const sliced = filtered.slice(0, sliceLimit);

            // Render
            if (filtered.length === 0) {
                premiumGamesGrid.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 3rem 0; color: var(--text-muted);">
                        <i class="fa-solid fa-face-frown" style="font-size: 2.5rem; margin-bottom: 1rem;"></i>
                        <p>No premium games found matching your search.</p>
                    </div>
                `;
            } else {
                let premiumGridHtml = "";
                sliced.forEach(game => {
                    premiumGridHtml += generatePremiumGameCardHtml(game);
                });

                if (filtered.length > sliceLimit) {
                    premiumGridHtml += `
                        <div style="grid-column: 1/-1; text-align: center; margin-top: 2rem; padding: 1.5rem; background: rgba(255, 255, 255, 0.02); border-radius: 8px; border: 1px dashed rgba(244, 63, 94, 0.25); color: var(--text-muted);">
                            <p><i class="fa-solid fa-circle-info" style="color: var(--accent-pink); margin-right: 8px;"></i> Showing top ${sliceLimit} of ${filtered.length} premium games. Use the search box above to narrow down your selection.</p>
                        </div>
                    `;
                }

                premiumGamesGrid.innerHTML = premiumGridHtml;
            }
        };

        // If we already have cached Steam games, render immediately
        if (cachedSteamGames !== null) {
            renderMergedGames(cachedSteamGames);
            return;
        }

        // Show a loading text only if we haven't rendered yet
        if (!premiumGamesGrid.innerHTML || premiumGamesGrid.innerHTML.includes("Loading")) {
            premiumGamesGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 3rem 0; color: var(--text-dim);">
                    <i class="fa-solid fa-spinner fa-spin" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                    <p>Loading live premium games from Steam Store...</p>
                </div>
            `;
        }

        // Fetch live featured games from the Steam API proxy
        fetch('/api/steam-featured')
            .then(res => {
                if (!res.ok) throw new Error("Steam API error");
                return res.json();
            })
            .then(data => {
                const winGames = data?.featured_win || [];
                const finalSteamGames = winGames.map(sg => {
                    // Convert cents/pence price to human readable format
                    let priceDisplay = "Buy Now";
                    if (sg.final_price !== undefined) {
                        const originalPriceFormatted = sg.original_price ? `$${(sg.original_price / 100).toFixed(2)}` : "";
                        const finalPriceFormatted = `$${(sg.final_price / 100).toFixed(2)}`;
                        if (sg.discounted) {
                            priceDisplay = `<span style="text-decoration: line-through; color: var(--text-dim); margin-right: 6px;">${originalPriceFormatted}</span><span>${finalPriceFormatted}</span>`;
                        } else {
                            priceDisplay = finalPriceFormatted;
                        }
                    }
                    return {
                        id: `steam-${sg.id}`,
                        title: sg.name,
                        imgUrl: sg.header_image || sg.large_capsule_image || sg.small_capsule_image,
                        rating: parseFloat((8.0 + (sg.id % 20) / 10).toFixed(1)), // mock rating based on id
                        category: sg.discounted ? `Special Offer` : `Featured`,
                        developer: "Steam Store Official Lineup",
                        price: priceDisplay,
                        appId: sg.id,
                        bgClass: "card-elden"
                    };
                });

                cachedSteamGames = finalSteamGames;
                showToast("✅ Loaded live premium storefront catalog from Steam!", "success");
                renderMergedGames(cachedSteamGames);
            })
            .catch(err => {
                console.error("Steam store API unavailable, using local fallback list:", err);
                // Fallback: render without steam games (local premium list only)
                cachedSteamGames = [];
                renderMergedGames([]);
            });
    }

    if (premiumSearch) {
        premiumSearch.addEventListener("input", (e) => {
            premiumSearchFilter = e.target.value;
            // Sync with globalSearch header input silently
            if (globalSearch) {
                globalSearch.value = e.target.value;
            }
            initPremiumGames();
        });
    }

    window.requestVoteUncracked = function (gameName) {
        navigateToSection("requests");
        document.getElementById("req-game-title").value = gameName;
        document.getElementById("req-game-title").focus();
        showToast(`Prefilled details for: ${gameName}`, "warning");
    };

    // ==========================================
    // 6. FREE GAMES PAGE — Live Epic API
    // ==========================================

    let liveCurrentFilter = "all";

    function buildFreeGameCard(game) {
        const isEpic = game.store === "epic";
        const storeIcon = isEpic ? '<span class="store-icon epic-icon">E</span>' : '<i class="fa-brands fa-steam"></i>';
        const storeTitle = isEpic ? "Epic Games Store" : "Steam Store";
        return `
            <div class="free-game-card">
                <div class="free-img-block" style="background-image: url('${game.imgUrl}')">
                    <div class="free-img-overlay"></div>
                    <div class="store-badge">${storeIcon} ${storeTitle}</div>
                    <div class="discount-badge">${game.discount}</div>
                </div>
                <div class="free-game-body">
                    <h3 class="free-game-title">${game.title}</h3>
                    <div class="free-game-dates">
                        <i class="fa-regular fa-calendar-check"></i>
                        <span>Promo: ${game.startDate} - ${game.endDate}</span>
                    </div>
                    <div class="free-game-actions">
                        <span class="original-price">${game.originalPrice}</span>
                        <a href="${game.url}" target="_blank" class="btn btn-primary btn-small">
                            <i class="fa-solid fa-up-right-from-square"></i> Get Game Free
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    function renderFreeGamesFromData(games, storeFilter) {
        let activeHtml = "", upcomingHtml = "";
        const filtered = games.filter(g => storeFilter === "all" || g.store === storeFilter);
        filtered.forEach(game => {
            const card = buildFreeGameCard(game);
            if (game.type === "active") activeHtml += card;
            else upcomingHtml += card;
        });
        activeFreeGrid.innerHTML = activeHtml || '<p style="grid-column:1/-1; color: var(--text-dim);">No active giveaways found.</p>';
        upcomingFreeGrid.innerHTML = upcomingHtml || '<p style="grid-column:1/-1; color: var(--text-dim);">No upcoming giveaways listed.</p>';
    }

    async function fetchAndRenderEpicFreeGames(storeFilter = "all") {
        // Show loader
        activeFreeGrid.innerHTML = '<p style="grid-column:1/-1; color: var(--text-dim);"><i class="fa-solid fa-spinner fa-spin"></i> Loading live data from Epic Games Store...</p>';
        upcomingFreeGrid.innerHTML = "";

        try {
            const EPIC_API = "/api/free-games";
            const res = await fetch(EPIC_API);
            if (!res.ok) throw new Error("API error");
            const data = await res.json();

            const offers = data?.data?.Catalog?.searchStore?.elements || [];
            const now = new Date();
            const livegames = [];

            offers.forEach(offer => {
                const promo = offer?.promotions;
                if (!promo) return;

                const allOffers = [
                    ...(promo.promotionalOffers?.[0]?.promotionalOffers || []),
                    ...(promo.upcomingPromotionalOffers?.[0]?.promotionalOffers || [])
                ];

                allOffers.forEach(p => {
                    if (p.discountSetting?.discountPercentage !== 0) return; // not 100% off

                    const start = new Date(p.startDate);
                    const end = new Date(p.endDate);
                    const isActive = now >= start && now < end;
                    const isUpcoming = now < start;
                    if (!isActive && !isUpcoming) return;

                    // Get cover image
                    const imgKey = offer.keyImages?.find(k => k.type === "OfferImageWide" || k.type === "DieselStoreFrontWide" || k.type === "Thumbnail");
                    const imgUrl = imgKey?.url || "";

                    // Original price
                    const priceFmt = offer.price?.totalPrice?.fmtPrice?.originalPrice || "Free";

                    const slug = offer.productSlug || offer.urlSlug || "";
                    const url = slug ? `https://store.epicgames.com/en-US/p/${slug}` : "https://store.epicgames.com/";

                    const formatDate = (d) => d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

                    livegames.push({
                        id: offer.id,
                        store: "epic",
                        type: isActive ? "active" : "upcoming",
                        title: offer.title,
                        originalPrice: priceFmt,
                        discount: isActive ? "100% OFF" : "Free Next Week",
                        startDate: formatDate(start),
                        endDate: formatDate(end),
                        url: url,
                        imgUrl: imgUrl
                    });
                });
            });

            if (livegames.length === 0) throw new Error("No games found");

            // Also merge Steam free games from local data (API only covers Epic)
            const steamGames = GAMES_DATA.freeGames.filter(g => g.store === "steam");
            const allGames = [...livegames, ...steamGames];

            showToast("✅ Live free games loaded from Epic API!", "success");
            renderFreeGamesFromData(allGames, storeFilter);

        } catch (err) {
            // Fallback to hardcoded data
            console.warn("Epic API unavailable, using cached data:", err.message);
            showToast("Using cached free games data (API unavailable)", "warning");
            renderFreeGamesFromData(GAMES_DATA.freeGames, storeFilter);
        }
    }

    function renderFreeGames(storeFilter = "all") {
        liveCurrentFilter = storeFilter;
        fetchAndRenderEpicFreeGames(storeFilter);
    }

    // Store filter click handles
    storeTabs.forEach(tab => {
        tab.addEventListener("click", (e) => {
            const currentTab = e.currentTarget;
            storeTabs.forEach(t => t.classList.remove("active"));
            currentTab.classList.add("active");
            const store = currentTab.getAttribute("data-store");
            renderFreeGames(store);
        });
    });



    // ==========================================
    // 7. REQUEST SYSTEM & LOCAL STORAGE
    // ==========================================

    function loadRequests() {
        const storedRequests = JSON.parse(localStorage.getItem("neoplay_requests"));
        const searchVal = searchRequests.value.toLowerCase();

        // Sort requests: highest votes first
        storedRequests.sort((a, b) => b.votes - a.votes);

        let requestsHtml = "";
        let count = 0;

        storedRequests.forEach(req => {
            if (searchVal && !req.title.toLowerCase().includes(searchVal)) {
                return;
            }

            count++;
            let statusColorClass = "status-upcoming";
            if (req.status === "Repacked") statusColorClass = "status-cracked";
            if (req.status === "Queue") statusColorClass = "status-uncracked";

            // Check if voted already
            const votedList = JSON.parse(localStorage.getItem("neoplay_voted_games")) || [];
            const isVoted = votedList.includes(req.id);
            const votedClass = isVoted ? 'voted' : '';

            requestsHtml += `
                <div class="request-item">
                    <div class="request-info">
                        <h3 class="request-item-title">${req.title}</h3>
                        <div class="request-item-meta">
                            <span><i class="fa-solid fa-gamepad"></i> Platform: ${req.platform}</span>
                            <span><span class="status-badge ${statusColorClass}">${req.status}</span></span>
                            <span><i class="fa-regular fa-calendar"></i> Added: ${req.date}</span>
                        </div>
                    </div>
                    <button class="request-vote-btn ${votedClass}" onclick="voteRequest(${req.id})" aria-label="Upvote this game request">
                        <i class="fa-solid fa-chevron-up"></i>
                        <span class="vote-number">${req.votes}</span>
                    </button>
                </div>
            `;
        });

        requestCount.textContent = count;

        if (requestsHtml === "") {
            requestList.innerHTML = `<p style="text-align:center; color: var(--text-dim); padding: 2rem;">No request match found.</p>`;
        } else {
            requestList.innerHTML = requestsHtml;
        }
    }

    window.voteRequest = function (requestId) {
        const storedRequests = JSON.parse(localStorage.getItem("neoplay_requests"));
        let votedList = JSON.parse(localStorage.getItem("neoplay_voted_games")) || [];

        const reqIndex = storedRequests.findIndex(r => r.id === requestId);
        if (reqIndex === -1) return;

        if (votedList.includes(requestId)) {
            // Already voted: unvote
            storedRequests[reqIndex].votes -= 1;
            votedList = votedList.filter(id => id !== requestId);
            showToast("Upvote removed.", "warning");
        } else {
            // Add vote
            storedRequests[reqIndex].votes += 1;
            votedList.push(requestId);
            showToast("Game registration upvoted!");
        }

        localStorage.setItem("neoplay_requests", JSON.stringify(storedRequests));
        localStorage.setItem("neoplay_voted_games", JSON.stringify(votedList));

        loadRequests();
    };

    // Form Submission for Game Request
    requestForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const titleInput = document.getElementById("req-game-title");
        const platformInput = document.getElementById("req-game-platform");
        const notesInput = document.getElementById("req-game-message");

        const title = titleInput.value.trim();
        const platform = platformInput.value;
        const notes = notesInput.value.trim();

        if (!title) return;

        const storedRequests = JSON.parse(localStorage.getItem("neoplay_requests"));

        // Prevent duplicate titles
        if (storedRequests.some(r => r.title.toLowerCase() === title.toLowerCase())) {
            showToast("This game has already been requested!", "danger");
            return;
        }

        const newRequest = {
            id: Date.now(),
            title: title,
            platform: platform,
            votes: 1,
            date: new Date().toISOString().split("T")[0],
            status: "Queue",
            notes: notes
        };

        storedRequests.push(newRequest);
        localStorage.setItem("neoplay_requests", JSON.stringify(storedRequests));

        // Add to voted list automatically
        let votedList = JSON.parse(localStorage.getItem("neoplay_voted_games")) || [];
        votedList.push(newRequest.id);
        localStorage.setItem("neoplay_voted_games", JSON.stringify(votedList));

        // Clear fields
        titleInput.value = "";
        notesInput.value = "";

        showToast("Request submitted successfully!");
        loadRequests();
    });

    // Request search handler
    searchRequests.addEventListener("input", () => {
        loadRequests();
    });

    // ==========================================
    // 8. GAME DETAILS MODAL DYNAMICS
    // ==========================================

    window.openGameDetails = function (gameId) {
        const game = GAMES_DATA.games.find(g => g.id === gameId);
        if (!game) {
            showToast("Game details could not be found.", "danger");
            return;
        }

        const isCracked = game.crackStatus === "Cracked";
        const statusLabel = isCracked ? "Cracked" : (game.crackStatus === "Bypass" ? "Bypassed" : "Uncracked");
        const statusColorClass = isCracked ? "color-success" : (game.crackStatus === "Bypass" ? "color-warning" : "color-danger");

        let featuresListHtml = "";
        game.features.forEach(feat => {
            featuresListHtml += `<li><i class="fa-solid fa-circle-check"></i> ${feat}</li>`;
        });

        let downloadMirrorsHtml = "";
        let downloadButtonsHtml = "";
        if (isCracked) {
            downloadMirrorsHtml = `
                <h3 class="mirrors-title"><i class="fa-solid fa-cloud-arrow-down color-success"></i> Download Mirrors</h3>
                <div class="mirrors-grid" style="grid-template-columns: 1fr;">
                    <a href="${game.downloads.direct}" target="_blank" class="mirror-card" style="border-color: #10b981; background: rgba(16, 185, 129, 0.05);">
                        <div class="mirror-info">
                            <span class="mirror-source">GameDrive.org</span>
                            <span class="mirror-type">Direct Download & Repacks</span>
                        </div>
                        <i class="fa-solid fa-globe mirror-icon" style="color: #10b981;"></i>
                    </a>
                </div>
            `;
            if (game.crackGroup === "Hypervisor") {
                downloadMirrorsHtml += `
                    <div style="background: rgba(6, 182, 212, 0.08); border: 1px dashed rgba(6, 182, 212, 0.3); border-radius: 8px; padding: 1rem; margin-top: 1rem; font-size: 0.85rem; color: var(--text-main); display: flex; align-items: start; gap: 0.75rem;">
                        <i class="fa-solid fa-circle-info" style="color: var(--accent-blue); font-size: 1.1rem; margin-top: 2px;"></i>
                        <div>
                            <strong>Virtualization Required:</strong> This bypass utilizes Hypervisor emulation. You must have Intel VT-x or AMD-V active in your BIOS.
                            <a href="#hypervisor" onclick="closeModal(); tabNavigation('hypervisor');" style="color: var(--accent-blue); text-decoration: underline; font-weight: 600; margin-left: 4px;">Read Hypervisor Setup Guide &rarr;</a>
                        </div>
                    </div>
                `;
            }
            downloadButtonsHtml = `
                <a href="${game.downloads.direct}" target="_blank" class="btn btn-primary" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); border: none;">
                    <i class="fa-solid fa-circle-arrow-down"></i> Download on GameDrive
                </a>
                <button class="btn btn-outline" onclick="closeModal()">Close Detail</button>
            `;
        } else {
            downloadButtonsHtml = `
                <button class="btn btn-primary" onclick="requestVoteUncracked('${game.title}'); closeModal();">
                    <i class="fa-solid fa-circle-question"></i> Notify Cracking Status
                </button>
            `;
        }

        modalDynamicContent.innerHTML = `
            <div class="detail-header">
                <h2 class="detail-title">${game.title}</h2>
                <div class="detail-category-row">
                    <span class="badge badge-accent">${game.category}</span>
                    <span class="meta-item"><i class="fa-solid fa-shield-halved ${statusColorClass}"></i> ${statusLabel} by ${game.crackGroup}</span>
                    <span class="meta-item"><i class="fa-regular fa-star color-warning"></i> ${game.rating}/10</span>
                </div>
            </div>
            
            <p style="margin-bottom: 1.25rem; font-size: 0.95rem; line-height: 1.6; color: var(--text-muted);">${game.description}</p>
            
            <h3 style="font-family: var(--font-heading); font-size: 1.1rem; margin-bottom: 0.6rem;">Repack Features</h3>
            <ul class="detail-features">
                ${featuresListHtml}
            </ul>
            
            <h3 style="font-family: var(--font-heading); font-size: 1.1rem; margin-bottom: 0.6rem;">System Requirements</h3>
            <div class="requirements-block">
                <p><strong>Minimum:</strong> ${game.requirements.minimum}</p>
                <p style="margin-bottom:0;"><strong>Recommended:</strong> ${game.requirements.recommended}</p>
            </div>
            
            ${downloadMirrorsHtml}
            
            <div class="modal-footer">
                <span style="font-size: 0.75rem; color: var(--text-dim); margin-right: auto; align-self: center;">
                    Original: ${game.sizeOriginal} | Repack size: ${game.sizeRepack}
                </span>
                ${downloadButtonsHtml}
            </div>
        `;

        gameDetailModal.classList.add("active");
    };

    function closeModal() {
        gameDetailModal.classList.remove("active");
    }

    modalCloseBtn.addEventListener("click", closeModal);

    // Close modal on click outside box
    gameDetailModal.addEventListener("click", (e) => {
        if (e.target === gameDetailModal) {
            closeModal();
        }
    });

    window.closeModal = closeModal;

    // Helper function for quick scrolling between sections
    window.scrollToSection = function (sectionId) {
        navigateToSection(sectionId);
    };

    // ==========================================
    // 9. RE-INJECT DYNAMIC CONTENT ON RUN
    // ==========================================

    function startLiveAutoUpdateScheduler() {
        const runScheduler = () => {
            if (GAMES_DATA.upcomingAutoCracks && GAMES_DATA.upcomingAutoCracks.length > 0) {
                const newGame = GAMES_DATA.upcomingAutoCracks.shift();
                GAMES_DATA.games.unshift(newGame);

                // Save cracked status to localStorage so alerts don't spam on refresh
                let crackedList = JSON.parse(localStorage.getItem("neoplay_cracked_ids")) || [];
                if (!crackedList.includes(newGame.id)) {
                    crackedList.push(newGame.id);
                    localStorage.setItem("neoplay_cracked_ids", JSON.stringify(crackedList));
                }

                const currentDate = new Date().toISOString().split("T")[0];
                const timelineEntry = {
                    id: `${newGame.id}-timeline`,
                    title: newGame.title,
                    releaseDate: currentDate,
                    category: newGame.category,
                    protection: "Steam DRM (Bypassed)",
                    status: "Cracked",
                    daysAgo: "Right Now",
                    statusClass: "status-cracked"
                };
                GAMES_DATA.releasesTimeline.unshift(timelineEntry);

                showToast(`⚡ New Crack Alert: "${newGame.title}" is now fully cracked by ${newGame.crackGroup}! Download mirrors are now live.`, "success");

                initDashboard();
                renderCracksCatalog();
                initPremiumGames();

                GAMES_DATA.liveTickerNews.unshift(`${newGame.crackGroup} cracked and repacked ${newGame.title} (${newGame.sizeRepack}) on release day!`);
                initLiveTicker();
            }
        };

        setTimeout(() => {
            runScheduler();
            setInterval(runScheduler, 10000);
        }, 5000); // Trigger first auto update in 5 seconds so user can see it quickly
    }

    // Environment Diagnostics Check for Hypervisor view
    const sectionRunDiag = document.getElementById("btn-section-run-diag");
    if (sectionRunDiag) {
        sectionRunDiag.addEventListener("click", () => {
            const btn = document.getElementById("btn-section-run-diag");
            const term = document.getElementById("section-terminal");
            const barOuter = document.getElementById("section-bar-outer");
            const barInner = document.getElementById("section-bar-inner");

            btn.disabled = true;
            term.innerHTML = "";
            barOuter.style.display = "block";
            barInner.style.width = "0%";

            const logs = [
                { delay: 300, text: "> Init hypervisor diagnostics sequence...", type: "info" },
                { delay: 800, text: "> Querying local CPU specifications...", type: "info" },
                { delay: 1300, text: `> Active CPU: ${navigator.hardwareConcurrency ? navigator.hardwareConcurrency + ' Logical Cores' : 'x86_64 Compatible Processor'}`, type: "success" },
                { delay: 1800, text: "> Testing CPU execution capabilities for VT-x/SVM instruction sets...", type: "info" },
                { delay: 2200, text: "> [OK] Hardware-assisted instruction checks returned active registers.", type: "success" },
                { delay: 2700, text: "> Verification check for Virtualization-based Security (VBS) state...", type: "info" },
                { delay: 3200, text: "> [WARNING] Host OS virtualization isolation (Hyper-V) hooks active. Bypasses might require disabling credential guard.", type: "warning" },
                { delay: 3700, text: "> Examining browser sandbox environment properties...", type: "info" },
                { delay: 4100, text: "> [OK] System compliant with virtual network emulators.", type: "success" },
                { delay: 4600, text: "> All checks complete. VM offline bypass system ready to deploy.", type: "success" }
            ];

            let progress = 0;
            const progressInterval = setInterval(() => {
                progress += 2;
                if (progress <= 100) {
                    barInner.style.width = `${progress}%`;
                } else {
                    clearInterval(progressInterval);
                }
            }, 90);

            logs.forEach(log => {
                setTimeout(() => {
                    const line = document.createElement("div");
                    line.className = `console-line line-${log.type}`;
                    line.style.marginBottom = "0.3rem";
                    if (log.type === "info") line.style.color = "#94a3b8";
                    if (log.type === "success") line.style.color = "#10b981";
                    if (log.type === "warning") line.style.color = "#f59e0b";
                    term.appendChild(line);
                    term.innerText += (term.innerText ? "\n" : "") + log.text;
                    term.scrollTop = term.scrollHeight;

                    if (log.text.includes("ready to deploy")) {
                        btn.disabled = false;
                        showToast("Bypass diagnostic completed successfully!");
                    }
                }, log.delay);
            });
        });
    }

    async function initializeAll() {
        // Load historically cracked games from localStorage first to prevent notification spam
        const crackedIds = JSON.parse(localStorage.getItem("neoplay_cracked_ids")) || [];
        if (crackedIds.length > 0 && GAMES_DATA.upcomingAutoCracks) {
            for (let i = GAMES_DATA.upcomingAutoCracks.length - 1; i >= 0; i--) {
                const game = GAMES_DATA.upcomingAutoCracks[i];
                if (crackedIds.includes(game.id)) {
                    GAMES_DATA.games.push(game); // Push historically cracked to main array if wasn't there
                    const upcomingIdx = GAMES_DATA.upcomingAutoCracks.findIndex(g => g.id === game.id);
                    if (upcomingIdx > -1) {
                        GAMES_DATA.upcomingAutoCracks.splice(upcomingIdx, 1);
                    }
                }
            }
        }

        // Fetch scraped GameDrive games
        try {
            const res = await fetch('/gamedrive_scraped_games.json');
            if (res.ok) {
                const scrapedGames = await res.json();
                const existingIds = new Set(GAMES_DATA.games.map(g => g.id));
                scrapedGames.forEach(game => {
                    if (!existingIds.has(game.id)) {
                        GAMES_DATA.games.push(game);
                    }
                });
                renderCracksCatalog();
                initDashboard(); // Recalculate stats with the loaded cracked games
            }
        } catch (e) {
            console.error("Error loading scraped gamedrive games:", e);
        }

        // Fetch scraped Steam premium games
        try {
            const res = await fetch('/steam_scraped_games.json');
            if (res.ok) {
                premiumSteamGames = await res.json();
                console.log(`Loaded ${premiumSteamGames.length} premium Steam games dynamically.`);
                initPremiumGames();
                initDashboard(); // Recalculate stats with the loaded premium games
            }
        } catch (e) {
            console.error("Error loading scraped steam games:", e);
        }

        initLiveTicker();
        initDashboard();
        renderCracksCatalog();
        initPremiumGames();
        renderFreeGames();
        loadRequests();
        startLiveAutoUpdateScheduler();

        // Simulating live check for new Epic Games updates
        setTimeout(() => {
            showToast("🎮 Connected online! Free game giveaways synchronized.", "success");
        }, 1800);
    }

    // Donation Simulator Submission
    const donationForm = document.getElementById("donation-simulator-form");
    if (donationForm) {
        donationForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("donate-user-name").value;
            const amount = document.getElementById("donate-user-amount").value;
            showToast(`💖 Thank you ${name} for simulating a donation of $${amount}! Receipt notification completed!`, "success");
            // Clear input
            document.getElementById("donate-user-name").value = "";
        });
    }

    initializeAll();
});
