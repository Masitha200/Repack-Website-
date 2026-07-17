// NEO-PLAY Application Logic
document.addEventListener("DOMContentLoaded", () => {
    // Initial State Variables
    let currentCategory = "all";
    let searchFilter = "";
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
    const bypassStat = document.getElementById("stat-bypass");
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

    // New Releases DOM components
    const releasesTimeline = document.getElementById("releases-timeline");
    const uncrackedList = document.getElementById("un-cracked-list");

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
        const validHashes = ["home", "cracks", "releases", "freebies", "requests"];
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
        const totalBypassed = GAMES_DATA.games.filter(g => g.crackStatus === "Bypass").length;
        const upcomingGamesCount = GAMES_DATA.releasesTimeline.filter(g => g.status === "Upcoming" || g.statusClass === "status-upcoming").length;
        const freeCount = GAMES_DATA.freeGames.filter(g => g.type === "active").length;

        // Set values in stats card (with animate numbering)
        animateValue(totalCrackedStat, 0, totalCracked, 1000);
        animateValue(bypassStat, 0, totalBypassed, 1000);
        animateValue(upcomingStat, 0, upcomingGamesCount, 1200);
        animateValue(freeStat, 0, freeCount, 800);

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

        // Dynamic cover image support (real img tag)
        const coverImgMarkup = game.imgUrl ? `<img src="${game.imgUrl}" alt="${game.title}" class="game-card-img" loading="lazy" />` : `<i class="fa-solid fa-gamepad card-icon"></i>`;

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

            // Gamer search helper (e.g., "rdr2" matches "Red Dead Redemption 2")
            let titleMatches = game.title.toLowerCase().includes(query);
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
        searchFilter = e.target.value;
        cracksSearch.value = e.target.value; // Sync search fields
        displayedCount = 8;

        // Route to cracks section
        navigateToSection("cracks");
        renderCracksCatalog();
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

    // Load More action
    loadMoreButton.addEventListener("click", () => {
        displayedCount += itemsPerLoad;
        renderCracksCatalog();
        showToast("Loaded more gaming repacks!");
    });

    // ==========================================
    // 5. NEW RELEASES & PROTECTIONS
    // ==========================================

    function initNewReleases() {
        let timelineHtml = "";

        GAMES_DATA.releasesTimeline.forEach(game => {
            const statusLabel = game.status === "Cracked" ? "Cracked" : (game.status === "Upcoming" ? "Upcoming" : "Uncracked");
            let iconClass = "status-uncracked";
            if (statusLabel === "Cracked") iconClass = "status-cracked";
            if (statusLabel === "Upcoming") iconClass = "status-upcoming";

            timelineHtml += `
                <div class="timeline-element ${iconClass}">
                    <div class="timeline-dot"></div>
                    <span class="timeline-date">${game.releaseDate} (${game.daysAgo})</span>
                    <div class="timeline-content">
                        <div class="timeline-flex-header">
                            <span class="timeline-title">${game.title}</span>
                            <span class="status-badge ${game.statusClass}">${statusLabel}</span>
                        </div>
                        <div class="timeline-info-row">
                            <span><i class="fa-solid fa-shield-halved"></i> DRM: ${game.protection}</span>
                            <span><i class="fa-solid fa-gamepad"></i> Genre: ${game.category}</span>
                        </div>
                    </div>
                </div>
            `;
        });
        releasesTimeline.innerHTML = timelineHtml;

        // Populate Uncracked sidebar
        let uncrackedHtml = "";
        const uncrackedGames = GAMES_DATA.releasesTimeline.filter(g => g.status === "Uncracked" || g.statusClass === "status-uncracked");
        uncrackedGames.forEach(game => {
            uncrackedHtml += `
                <li class="un-cracked-item">
                    <div>
                        <strong>${game.title}</strong>
                        <span class="uncracked-sub">DRM Protection: ${game.protection}</span>
                    </div>
                    <button class="btn btn-secondary btn-small" onclick="requestVoteUncracked('${game.title}')">
                        <i class="fa-solid fa-circle-question"></i> Request Crack
                    </button>
                </li>
            `;
        });

        if (uncrackedHtml === "") {
            uncrackedList.innerHTML = `<li style="color: var(--text-dim);">No uncracked releases currently tracked.</li>`;
        } else {
            uncrackedList.innerHTML = uncrackedHtml;
        }
    }

    window.requestVoteUncracked = function (gameName) {
        navigateToSection("requests");
        document.getElementById("req-game-title").value = gameName;
        document.getElementById("req-game-title").focus();
        showToast(`Prefilled details for: ${gameName}`, "warning");
    };

    // ==========================================
    // 6. FREE GAMES PAGE
    // ==========================================

    function renderFreeGames(storeFilter = "all") {
        let activeHtml = "";
        let upcomingHtml = "";

        // Filter free games database
        const filteredFreeGames = GAMES_DATA.freeGames.filter(g =>
            storeFilter === "all" || g.store === storeFilter
        );

        filteredFreeGames.forEach(game => {
            const isEpic = game.store === "epic";
            const storeIcon = isEpic ? '<span class="store-icon epic-icon">E</span>' : '<i class="fa-brands fa-steam"></i>';
            const storeTitle = isEpic ? "Epic Games Store" : "Steam Store";

            const cardMarkup = `
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

            if (game.type === "active") {
                activeHtml += cardMarkup;
            } else {
                upcomingHtml += cardMarkup;
            }
        });

        // Set grids contents
        activeFreeGrid.innerHTML = activeHtml || '<p style="grid-column:1/-1; color: var(--text-dim);">No active giveaways found.</p>';
        upcomingFreeGrid.innerHTML = upcomingHtml || '<p style="grid-column:1/-1; color: var(--text-dim);">No upcoming giveaways listed.</p>';
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
                <h3 class="mirrors-title"><i class="fa-solid fa-cloud-arrow-down color-success"></i> Download Mirrors & Repackers</h3>
                <div class="mirrors-grid">
                    <a href="https://fitgirl-repacks.site/?s=${encodeURIComponent(game.title)}" target="_blank" class="mirror-card">
                        <div class="mirror-info">
                            <span class="mirror-source">FitGirl Repacks</span>
                            <span class="mirror-type">Lossless Repack</span>
                        </div>
                        <i class="fa-solid fa-globe mirror-icon"></i>
                    </a>
                    <a href="https://dodi-repacks.site/?s=${encodeURIComponent(game.title)}" target="_blank" class="mirror-card">
                        <div class="mirror-info">
                            <span class="mirror-source">DODI Repacks</span>
                            <span class="mirror-type">Highly Compressed</span>
                        </div>
                        <i class="fa-solid fa-globe mirror-icon"></i>
                    </a>
                    <a href="https://steamrip.com/?s=${encodeURIComponent(game.title)}" target="_blank" class="mirror-card">
                        <div class="mirror-info">
                            <span class="mirror-source">SteamRIP</span>
                            <span class="mirror-type">Pre-installed GOG/Steam</span>
                        </div>
                        <i class="fa-solid fa-circle-down mirror-icon"></i>
                    </a>
                    ${game.downloads.direct && game.downloads.direct !== "" ? `
                    <a href="${game.downloads.direct}" target="_blank" class="mirror-card">
                        <div class="mirror-info">
                            <span class="mirror-source">GoFile Server</span>
                            <span class="mirror-type">Direct High-Speed</span>
                        </div>
                        <i class="fa-solid fa-cloud-arrow-down mirror-icon"></i>
                    </a>` : ''}
                    ${game.downloads.magnet && game.downloads.magnet !== "" ? `
                    <a href="${game.downloads.magnet}" class="mirror-card" onclick="showToast('Copying magnet link to clipboard...'); navigator.clipboard.writeText('${game.downloads.magnet}')">
                        <div class="mirror-info">
                            <span class="mirror-source">Magnet Torrent</span>
                            <span class="mirror-type">Torrent Download</span>
                        </div>
                        <i class="fa-solid fa-magnet mirror-icon"></i>
                    </a>` : ''}
                </div>
            `;
            downloadButtonsHtml = `
                <a href="https://dodi-repacks.site/?s=${encodeURIComponent(game.title)}" target="_blank" class="btn btn-primary">
                    <i class="fa-solid fa-circle-arrow-down"></i> Quick Repack Search
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
                initNewReleases();

                GAMES_DATA.liveTickerNews.unshift(`${newGame.crackGroup} cracked and repacked ${newGame.title} (${newGame.sizeRepack}) on release day!`);
                initLiveTicker();
            }
        };

        setTimeout(() => {
            runScheduler();
            setInterval(runScheduler, 10000);
        }, 5000); // Trigger first auto update in 5 seconds so user can see it quickly
    }

    function initializeAll() {
        // Load historically cracked games from localStorage first to prevent notification spam
        const crackedIds = JSON.parse(localStorage.getItem("neoplay_cracked_ids")) || [];
        if (crackedIds.length > 0 && GAMES_DATA.upcomingAutoCracks) {
            for (let i = GAMES_DATA.upcomingAutoCracks.length - 1; i >= 0; i--) {
                const game = GAMES_DATA.upcomingAutoCracks[i];
                if (crackedIds.includes(game.id)) {
                    GAMES_DATA.games.unshift(game);
                    GAMES_DATA.upcomingAutoCracks.splice(i, 1);
                }
            }
        }

        initLiveTicker();
        initDashboard();
        renderCracksCatalog();
        initNewReleases();
        renderFreeGames();
        loadRequests();
        startLiveAutoUpdateScheduler();

        // Simulating live check for new Epic Games updates
        setTimeout(() => {
            showToast("🎮 Connected online! Free game giveaways synchronized.", "success");
        }, 1800);
    }

    initializeAll();
});
