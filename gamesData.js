// Mock Database for NEO-PLAY Games Portal
const GAMES_DATA = {
    // Latest Cracked/Repacked Games
    games: [
        {
            id: "black-myth-wukong",
            title: "Black Myth: Wukong",
            bgClass: "card-wukong",
            imgUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/2358720/header.jpg",
            category: "Action",
            releaseDate: "2024-08-20",
            crackDate: "2024-09-05",
            crackStatus: "Cracked",
            crackGroup: "RUNE",
            sizeRepack: "38.4 GB",
            sizeOriginal: "118.2 GB",
            rating: 9.6,
            developer: "Game Science",
            repackVersion: "v1.0.8 + Pre-order DLC",
            description: "Black Myth: Wukong is an action RPG rooted in Chinese mythology based on Journey to the West.",
            requirements: {
                minimum: "OS: Windows 10 | CPU: Intel i5-8400 | RAM: 16 GB | GPU: GTX 1060 | Storage: 130 GB HDD",
                recommended: "OS: Windows 10/11 | CPU: Intel i7-9700 | RAM: 16 GB | GPU: RTX 2060 | Storage: 130 GB SSD"
            },
            features: [
                "DRM protection bypassed completely",
                "Languages: Multi-language support auto-detection",
                "ZStandard compression applied for fast extracting"
            ],
            downloads: {
                magnet: "magnet:?xt=urn:btih:bmwukongrune...",
                torrent: "#",
                direct: "https://gofile.io/d/neoplay_wukong_repack"
            }
        },
        {
            id: "elden-ring-shadow",
            title: "Elden Ring: Shadow of the Erdtree",
            bgClass: "card-elden",
            imgUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg",
            category: "RPG",
            releaseDate: "2024-06-21",
            crackDate: "2024-06-21",
            crackStatus: "Cracked",
            crackGroup: "PLAZA-RUNE",
            sizeRepack: "42.1 GB",
            sizeOriginal: "82.5 GB",
            rating: 9.8,
            developer: "FromSoftware Inc.",
            repackVersion: "Premium Edition v1.12.3",
            description: "The Shadow of the Erdtree expansion features an all-new story set in the Land of Shadow.",
            requirements: {
                minimum: "OS: Windows 10 | CPU: Intel i5-8400 | RAM: 12 GB | GPU: GTX 1060 | Storage: 85 GB SSD",
                recommended: "OS: Windows 10/11 | CPU: Intel i7-8700K | RAM: 16 GB | GPU: RTX 3060 | Storage: 85 GB SSD"
            },
            features: [
                "Includes base game + Shadow of the Erdtree DLC pre-installed",
                "DRM bypassed with Goldberg emulator hook"
            ],
            downloads: {
                magnet: "magnet:?xt=urn:btih:eldenringshadow...",
                torrent: "#",
                direct: "https://gofile.io/d/neoplay_elden_shadow"
            }
        },
        {
            id: "ghost-of-tsushima",
            title: "Ghost of Tsushima Director's Cut",
            bgClass: "card-tsushima",
            imgUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/2215430/header.jpg",
            category: "Adventure",
            releaseDate: "2024-05-16",
            crackDate: "2024-05-16",
            crackStatus: "Cracked",
            crackGroup: "FLT",
            sizeRepack: "34.8 GB",
            sizeOriginal: "60.4 GB",
            rating: 9.5,
            developer: "Sucker Punch",
            repackVersion: "v1.0.4 Director's Cut",
            description: "For the first time on PC, play through Jin Sakai's journey in this complete experience.",
            requirements: {
                minimum: "OS: Windows 10 | CPU: Intel i3-7100 | RAM: 8 GB | GPU: GTX 960 | Storage: 75 GB SSD",
                recommended: "OS: Windows 10/11 | CPU: Intel i5-8600 | RAM: 16 GB | GPU: RTX 2060 | Storage: 75 GB SSD"
            },
            features: [
                "Includes Iki Island Expansion, Legends Co-op Mode",
                "Cracked by FLT. Online coop multiplayer fix available"
            ],
            downloads: {
                magnet: "magnet:?xt=urn:btih:ghosttsushimaflt...",
                torrent: "#",
                direct: "https://gofile.io/d/neoplay_tsushima_flt"
            }
        },
        {
            id: "cyberpunk-phantom-liberty",
            title: "Cyberpunk 2077: Phantom Liberty",
            bgClass: "card-cyberpunk",
            imgUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg",
            category: "RPG",
            releaseDate: "2023-09-26",
            crackDate: "2023-09-26",
            crackStatus: "Cracked",
            crackGroup: "GOG-DRMFree",
            sizeRepack: "54.2 GB",
            sizeOriginal: "102.1 GB",
            rating: 9.4,
            developer: "CD PROJEKT RED",
            repackVersion: "v2.12a + Redmod",
            description: "Phantom Liberty is a new spy-thriller expansion for the open-world action RPG.",
            requirements: {
                minimum: "OS: Windows 10 | CPU: Intel i7-6700 | RAM: 12 GB | GPU: GTX 1060 | Storage: 70 GB SSD",
                recommended: "OS: Windows 10/11 | CPU: Intel i7-12700 | RAM: 16 GB | GPU: RTX 3070 | Storage: 70 GB SSD"
            },
            features: [
                "GOG release, DRM-Free. No crack installer required!",
                "Includes base game + Phantom Liberty expansion"
            ],
            downloads: {
                magnet: "magnet:?xt=urn:btih:cyberpunk2077gog...",
                torrent: "#",
                direct: "https://gofile.io/d/neoplay_cyberpunk_pl"
            }
        },
        {
            id: "silent-hill-2-remake",
            title: "Silent Hill 2 Remake",
            bgClass: "card-silenthill2",
            imgUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/2124490/header.jpg",
            category: "Survival",
            releaseDate: "2024-10-08",
            crackDate: "2024-10-08",
            crackStatus: "Cracked",
            crackGroup: "RUNE",
            sizeRepack: "29.4 GB",
            sizeOriginal: "50.0 GB",
            rating: 9.3,
            developer: "Bloober Team",
            repackVersion: "v1.0.4 Deluxe Edition",
            description: "A psychological survival horror remake, James returns to the spectral ghost town.",
            requirements: {
                minimum: "OS: Windows 10 | CPU: Intel i5-8400 | RAM: 16 GB | GPU: GTX 1080 | Storage: 50 GB SSD",
                recommended: "OS: Windows 11 | CPU: Intel i7-8700 | RAM: 16 GB | GPU: RTX 2080 | Storage: 50 GB SSD"
            },
            features: [
                "DRM bypassed with RUNE emulator hook",
                "DirectX 12 support, pre-configured DLSS & FSR profiles"
            ],
            downloads: {
                magnet: "magnet:?xt=urn:btih:silenthill2rune...",
                torrent: "#",
                direct: "https://gofile.io/d/neoplay_sh2"
            }
        },
        {
            id: "god-of-war-ragnarok",
            title: "God of War Ragnarök",
            bgClass: "card-ragnarok",
            imgUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/2322010/header.jpg",
            category: "Action",
            releaseDate: "2024-09-19",
            crackDate: "2024-09-19",
            crackStatus: "Cracked",
            crackGroup: "RUNE",
            sizeRepack: "68.2 GB",
            sizeOriginal: "175.7 GB",
            rating: 9.7,
            developer: "Santa Monica Studio",
            repackVersion: "v1.3 + Valhalla DLC",
            description: "Kratos and Atreus embark on an epic journey through the Nine Realms as forces prepare for battle.",
            requirements: {
                minimum: "OS: Windows 10 | CPU: Intel i5-4670K | RAM: 8 GB | GPU: GTX 1060 | Storage: 190 GB SSD",
                recommended: "OS: Windows 10/11 | CPU: Intel i7-7700K | RAM: 16 GB | GPU: RTX 3070 | Storage: 190 GB SSD"
            },
            features: [
                "PSN registration requirement fully bypassed",
                "Includes Valhalla roguelike DLC and high resolution assets"
            ],
            downloads: {
                magnet: "magnet:?xt=urn:btih:gowragnarokrune...",
                torrent: "#",
                direct: "https://gofile.io/d/neoplay_gowr"
            }
        },
        {
            id: "red-dead-redemption-2",
            title: "Red Dead Redemption 2",
            bgClass: "card-rdr2",
            imgUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg",
            category: "Adventure",
            releaseDate: "2019-12-05",
            crackDate: "2020-10-22",
            crackStatus: "Cracked",
            crackGroup: "EMPRESS",
            sizeRepack: "66.3 GB",
            sizeOriginal: "119.5 GB",
            rating: 9.9,
            developer: "Rockstar Games",
            repackVersion: "v1.0.1436.28 Ultimate",
            description: "An epic tale of Arthur Morgan and the Van der Linde gang on the run in wild America.",
            requirements: {
                minimum: "OS: Windows 10 | CPU: Intel i5-2500K | RAM: 8 GB | GPU: GTX 770 | Storage: 150 GB HDD",
                recommended: "OS: Windows 10/11 | CPU: Intel i7-4770K | RAM: 12 GB | GPU: GTX 1060 | Storage: 150 GB SSD"
            },
            features: [
                "Empress Social Club bypass v2 applied",
                "Includes all story mode content and Ultimate Edition add-ons"
            ],
            downloads: {
                magnet: "magnet:?xt=urn:btih:rdr2empress...",
                torrent: "#",
                direct: "https://gofile.io/d/neoplay_rdr2"
            }
        },
        {
            id: "forza-horizon-5",
            title: "Forza Horizon 5",
            bgClass: "card-forza",
            imgUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/header.jpg",
            category: "Racing",
            releaseDate: "2021-11-09",
            crackDate: "2021-11-12",
            crackStatus: "Cracked",
            crackGroup: "EMPRESS",
            sizeRepack: "62.4 GB",
            sizeOriginal: "123.8 GB",
            rating: 9.3,
            developer: "Playground Games",
            repackVersion: "v1.634 + 42 DLCs",
            description: "Explore the vibrant and ever-evolving open world landscapes of Mexico with limitless fun.",
            requirements: {
                minimum: "OS: Windows 10 | CPU: Intel i5-4460 | RAM: 8 GB | GPU: GTX 970 | Storage: 110 GB HDD",
                recommended: "OS: Windows 10/11 | CPU: Intel i7-10700K | RAM: 16 GB | GPU: RTX 2070 | Storage: 110 GB SSD"
            },
            features: [
                "Multiplayer online-fix by 0xdeadc0de included",
                "All 42 DLCs pre-unlocked (Hot Wheels, Rally Expansions)"
            ],
            downloads: {
                magnet: "magnet:?xt=urn:btih:forzahorizon5empress...",
                torrent: "#",
                direct: "https://gofile.io/d/neoplay_forza5"
            }
        },
        {
            id: "resident-evil-4-remake",
            title: "Resident Evil 4 Remake",
            bgClass: "card-re4",
            imgUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/header.jpg",
            category: "Action",
            releaseDate: "2023-03-24",
            crackDate: "2023-05-15",
            crackStatus: "Cracked",
            crackGroup: "EMPRESS",
            sizeRepack: "32.1 GB",
            sizeOriginal: "58.0 GB",
            rating: 9.7,
            developer: "Capcom",
            repackVersion: "Deluxe + Separate Ways",
            description: "Agent Leon S. Kennedy tracks the president's kidnapped daughter to a secluded European village.",
            requirements: {
                minimum: "OS: Windows 10 | CPU: Intel i5-7500 | RAM: 8 GB | GPU: GTX 1050 Ti | Storage: 60 GB SSD",
                recommended: "OS: Windows 10/11 | CPU: Intel i7-8700 | RAM: 16 GB | GPU: GTX 1070 | Storage: 60 GB SSD"
            },
            features: [
                "Empress Denuvo V18 bypass applied",
                "Includes 'Separate Ways' Story DLC, Mercenaries Mode"
            ],
            downloads: {
                magnet: "magnet:?xt=urn:btih:re4remakeempress...",
                torrent: "#",
                direct: "https://gofile.io/d/neoplay_re4_remake"
            }
        },
        {
            id: "spider-man-2",
            title: "Marvel's Spider-Man 2",
            bgClass: "card-spiderman",
            imgUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/2651280/header.jpg",
            category: "Adventure",
            releaseDate: "2025-01-30",
            crackDate: "2025-01-31",
            crackStatus: "Cracked",
            crackGroup: "FLT / RUNE",
            sizeRepack: "48.9 GB",
            sizeOriginal: "92.0 GB",
            rating: 9.4,
            developer: "Insomniac Games",
            repackVersion: "v1.1.2 + All DLCs",
            description: "Spider-Men Peter Parker and Miles Morales fight to save New York City from the monstrous Venom.",
            requirements: {
                minimum: "OS: Windows 10 | CPU: Intel i3-8100 | RAM: 16 GB | GPU: GTX 1650 | Storage: 95 GB SSD",
                recommended: "OS: Windows 10/11 | CPU: Intel i5-11600K | RAM: 16 GB | GPU: RTX 3060 | Storage: 95 GB SSD"
            },
            features: [
                "Steam DRM bypassed with FLT/RUNE emulator client",
                "All suits pre-unlocked"
            ],
            downloads: {
                magnet: "magnet:?xt=urn:btih:spiderman2rune...",
                torrent: "#",
                direct: "https://gofile.io/d/neoplay_spiderman2"
            }
        },
        {
            id: "tekken-8",
            title: "Tekken 8",
            bgClass: "card-tekken",
            imgUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/1778820/header.jpg",
            category: "Fighting",
            releaseDate: "2024-01-26",
            crackDate: "2024-01-26",
            crackStatus: "Cracked",
            crackGroup: "TENOKE",
            sizeRepack: "28.5 GB",
            sizeOriginal: "76.4 GB",
            rating: 9.1,
            developer: "Bandai Namco",
            repackVersion: "Deluxe Edition v1.04",
            description: "The legendary saga continues with the tragic conflict of Mishima and Kazama bloodlines.",
            requirements: {
                minimum: "OS: Windows 10 | CPU: Intel i5-6600K | RAM: 8 GB | GPU: GTX 1050Ti | Storage: 100 GB SSD",
                recommended: "OS: Windows 10/11 | CPU: Intel i7-7700K | RAM: 16 GB | GPU: RTX 2070 | Storage: 100 GB SSD"
            },
            features: [
                "TENOKE Steam crack applied",
                "Includes Eddy Gordo and Season 1 Fighter Pass DLCs"
            ],
            downloads: {
                magnet: "magnet:?xt=urn:btih:tekken8tenoke...",
                torrent: "#",
                direct: "https://gofile.io/d/neoplay_tekken8"
            }
        },
        {
            id: "palworld",
            title: "Palworld",
            bgClass: "card-palworld",
            imgUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/1623730/header.jpg",
            category: "Survival",
            releaseDate: "2024-01-19",
            crackDate: "2024-01-19",
            crackStatus: "Cracked",
            crackGroup: "Goldberg",
            sizeRepack: "12.8 GB",
            sizeOriginal: "22.0 GB",
            rating: 8.9,
            developer: "Pocketpair",
            repackVersion: "v0.3.4 (Offline/Online)",
            description: "Fight, farm, build and work alongside mysterious creatures called 'Pals'.",
            requirements: {
                minimum: "OS: Windows 10 | CPU: Intel i5-3570K | RAM: 16 GB | GPU: GTX 1050 | Storage: 40 GB SSD",
                recommended: "OS: Windows 10/11 | CPU: Intel i9-9900K | RAM: 32 GB | GPU: RTX 2070 | Storage: 40 GB SSD"
            },
            features: [
                "Steam Early Access build with Goldberg steam client bypass",
                "Play online coop multiplayer on official/community servers"
            ],
            downloads: {
                magnet: "magnet:?xt=urn:btih:palworldgoldberg...",
                torrent: "#",
                direct: "https://gofile.io/d/neoplay_palworld"
            }
        },
        {
            id: "hades-2",
            title: "Hades II",
            bgClass: "card-hades2",
            imgUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/1145350/header.jpg",
            category: "RPG",
            releaseDate: "2024-05-06",
            crackDate: "2024-05-06",
            crackStatus: "Cracked",
            crackGroup: "Goldberg",
            sizeRepack: "4.2 GB",
            sizeOriginal: "10.0 GB",
            rating: 9.5,
            developer: "Supergiant Games",
            repackVersion: "v0.3.1 (Early Access)",
            description: "Battle beyond the Underworld using dark magic to confront the Titan of Time.",
            requirements: {
                minimum: "OS: Windows 10 | CPU: Dual Core 2.4 GHz | RAM: 8 GB | GPU: GTX 950 | Storage: 10 GB SSD",
                recommended: "OS: Windows 10/11 | CPU: Quad Core 3.0 GHz | RAM: 16 GB | GPU: GTX 1060 | Storage: 10 GB SSD"
            },
            features: [
                "Standalone Early Access build, cracked using Goldberg emulator",
                "Includes official soundtrack pre-packaged"
            ],
            downloads: {
                magnet: "magnet:?xt=urn:btih:hades2goldberg...",
                torrent: "#",
                direct: "https://gofile.io/d/neoplay_hades2"
            }
        },
        {
            id: "hogwarts-legacy",
            title: "Hogwarts Legacy",
            bgClass: "card-hogwarts",
            imgUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/header.jpg",
            category: "RPG",
            releaseDate: "2023-02-10",
            crackDate: "2023-02-23",
            crackStatus: "Cracked",
            crackGroup: "EMPRESS",
            sizeRepack: "51.3 GB",
            sizeOriginal: "85.2 GB",
            rating: 9.2,
            developer: "Avalanche Software",
            repackVersion: "Deluxe + Dark Arts Pack",
            description: "Experience Hogwarts in the 1800s. Make allies, battle Dark wizards and decide the fate of the wizarding world.",
            requirements: {
                minimum: "OS: Windows 10 | CPU: Intel i5-6600 | RAM: 16 GB | GPU: GTX 960 | Storage: 85 GB SSD",
                recommended: "OS: Windows 10/11 | CPU: Intel i7-8700 | RAM: 16 GB | GPU: RTX 1080 Ti | Storage: 85 GB SSD"
            },
            features: [
                "Empress Denuvo V17 bypass crack applied",
                "Dark Arts cosmetic packs and Onyx Hippogriff Mount included"
            ],
            downloads: {
                magnet: "magnet:?xt=urn:btih:hogwartsempress...",
                torrent: "#",
                direct: "https://gofile.io/d/neoplay_hogwarts"
            }
        },
        {
            id: "alan-wake-2",
            title: "Alan Wake 2",
            bgClass: "card-alanwake2",
            imgUrl: "https://www.alanwake.com/wp-content/uploads/2023/08/AW2_11-08-23_027.png",
            category: "Survival",
            releaseDate: "2023-10-27",
            crackDate: "2023-10-27",
            crackStatus: "Cracked",
            crackGroup: "RUNE",
            sizeRepack: "41.6 GB",
            sizeOriginal: "78.0 GB",
            rating: 9.5,
            developer: "Remedy Entertainment",
            repackVersion: "v1.0.16 + Night Springs DLC",
            description: "A string of ritualistic murders threatens Bright Falls, an eerie Pacific Northwest community.",
            requirements: {
                minimum: "OS: Windows 10/11 | CPU: Intel i5-7600K | RAM: 16 GB | GPU: RTX 2060 | Storage: 90 GB SSD",
                recommended: "OS: Windows 10/11 | CPU: Intel i7-10700K | RAM: 16 GB | GPU: RTX 3070 | Storage: 90 GB SSD"
            },
            features: [
                "Epic Games Store DRM bypassed via RUNE emulator hook",
                "Includes Night Springs DLC and Deluxe item packs"
            ],
            downloads: {
                magnet: "magnet:?xt=urn:btih:alanwake2rune...",
                torrent: "#",
                direct: "https://gofile.io/d/neoplay_aw2"
            }
        },
        {
            id: "red-dead-redemption-1",
            title: "Red Dead Redemption 1 Remaster",
            bgClass: "card-rdr1",
            imgUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/2668510/header.jpg",
            category: "Adventure",
            releaseDate: "2024-10-29",
            crackDate: "2024-10-29",
            crackStatus: "Cracked",
            crackGroup: "RUNE",
            sizeRepack: "9.2 GB",
            sizeOriginal: "12.0 GB",
            rating: 9.4,
            developer: "Double Eleven",
            repackVersion: "v1.0.1 + Undead Nightmare",
            description: "Experience the epic western adventures of John Marston ported natively to PC.",
            requirements: {
                minimum: "OS: Windows 10 | CPU: Intel i5-4670 | RAM: 8 GB | GPU: GTX 960 | Storage: 12 GB SSD",
                recommended: "OS: Windows 10/11 | CPU: Intel i5-8400 | RAM: 16 GB | GPU: RTX 2060 | Storage: 12 GB SSD"
            },
            features: [
                "Steam DRM bypassed. Undead Nightmare expansion included",
                "Support for ultra-wide monitors and 4K resolution"
            ],
            downloads: {
                magnet: "magnet:?xt=urn:btih:rdr1runepc...",
                torrent: "#",
                direct: "https://gofile.io/d/neoplay_rdr1"
            }
        },
        {
            id: "lego-star-wars-skywalker",
            title: "Lego Star Wars: The Skywalker Saga",
            bgClass: "card-lego",
            imgUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/924890/header.jpg",
            category: "Adventure",
            releaseDate: "2022-04-05",
            crackDate: "2022-04-06",
            crackStatus: "Cracked",
            crackGroup: "CODEX",
            sizeRepack: "21.6 GB",
            sizeOriginal: "40.0 GB",
            rating: 9.0,
            developer: "TT Games",
            repackVersion: "Galactic Edition v1.0.0.12",
            description: "Play through all nine Star Wars saga films in a brand-new LEGO video game.",
            requirements: {
                minimum: "OS: Windows 10 | CPU: Intel i5-2400 | RAM: 8 GB | GPU: GTX 750 Ti | Storage: 40 GB HDD",
                recommended: "OS: Windows 10/11 | CPU: Intel i5-6600 | RAM: 8 GB | GPU: GTX 1060 | Storage: 40 GB SSD"
            },
            features: [
                "Cracked and packaged by CODEX",
                "Includes all Character Passes and extra DLC Packs"
            ],
            downloads: {
                magnet: "magnet:?xt=urn:btih:legostarwarscodex...",
                torrent: "#",
                direct: "https://gofile.io/d/neoplay_lego"
            }
        },
        {
            id: "spiderman-remastered",
            title: "Marvel's Spider-Man Remastered",
            bgClass: "card-spidypc",
            imgUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/1817070/header.jpg",
            category: "Action",
            releaseDate: "2022-08-12",
            crackDate: "2022-08-12",
            crackStatus: "Cracked",
            crackGroup: "FLT",
            sizeRepack: "37.5 GB",
            sizeOriginal: "65.0 GB",
            rating: 9.6,
            developer: "Insomniac Games",
            repackVersion: "v1.10 + Pre-order Suits",
            description: "Peter Parker battles big crime and iconic villains in Marvel's New York.",
            requirements: {
                minimum: "OS: Windows 10 | CPU: Intel i3-4160 | RAM: 8 GB | GPU: GTX 950 | Storage: 75 GB SSD",
                recommended: "OS: Windows 10/11 | CPU: Intel i5-4670 | RAM: 16 GB | GPU: GTX 1060 | Storage: 75 GB SSD"
            },
            features: [
                "Cracked by Fairlight (FLT) on release day",
                "Includes City That Never Sleeps DLC missions"
            ],
            downloads: {
                magnet: "magnet:?xt=urn:btih:spidermanpcflt...",
                torrent: "#",
                direct: "https://gofile.io/d/neoplay_spiders1"
            }
        },
        {
            id: "god-of-war-2018",
            title: "God of War",
            bgClass: "card-gow2018",
            imgUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg",
            category: "Action",
            releaseDate: "2022-01-14",
            crackDate: "2022-01-14",
            crackStatus: "Cracked",
            crackGroup: "FLT",
            sizeRepack: "25.8 GB",
            sizeOriginal: "40.0 GB",
            rating: 9.8,
            developer: "Santa Monica Studio",
            repackVersion: "v1.0.12 PC Edition",
            description: "His vengeance against the Gods of Olympus far behind him, Kratos now lives as a man in the realm of Norse Gods.",
            requirements: {
                minimum: "OS: Windows 10 | CPU: Intel i5-2500k | RAM: 8 GB | GPU: GTX 960 | Storage: 50 GB SSD",
                recommended: "OS: Windows 10/11 | CPU: Intel i7-4770k | RAM: 8 GB | GPU: GTX 1060 | Storage: 50 GB SSD"
            },
            features: [
                "Cracked by FLT. Supports DLSS, FSR, and 21:9 ultra-wide resolutions",
                "Includes digital soundtrack and art books inside folders"
            ],
            downloads: {
                magnet: "magnet:?xt=urn:btih:gow2018flt...",
                torrent: "#",
                direct: "https://gofile.io/d/neoplay_gow2018"
            }
        },
        {
            id: "grand-theft-auto-v",
            title: "Grand Theft Auto V",
            bgClass: "card-gtav",
            imgUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg",
            category: "Action",
            releaseDate: "2015-04-14",
            crackDate: "2015-05-01",
            crackStatus: "Cracked",
            crackGroup: "RELOADED",
            sizeRepack: "36.2 GB",
            sizeOriginal: "105.0 GB",
            rating: 9.7,
            developer: "Rockstar North",
            repackVersion: "v1.0.2802 / Online DLCs",
            description: "A young street hustler, retired bank robber and terrifying psychopath find themselves entangled with the criminal underworld.",
            requirements: {
                minimum: "OS: Windows 10 64-bit | CPU: Intel Core 2 Q6600 | RAM: 4 GB | GPU: 9800 GT | Storage: 110 GB HDD",
                recommended: "OS: Windows 11 64-bit | CPU: Intel i5-3470 | RAM: 8 GB | GPU: GTX 660 | Storage: 110 GB HDD"
            },
            features: [
                "Social Club bypassed. Offline play launcher hook",
                "Pre-packaged Online DLC content for Story mode sandbox"
            ],
            downloads: {
                magnet: "magnet:?xt=urn:btih:gtavreloaded...",
                torrent: "#",
                direct: "https://gofile.io/d/neoplay_gtav"
            }
        },
        {
            id: "baldurs-gate-3",
            title: "Baldur's Gate 3",
            bgClass: "card-bg3",
            imgUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg",
            category: "RPG",
            releaseDate: "2023-08-03",
            crackDate: "2023-08-03",
            crackStatus: "Cracked",
            crackGroup: "GOG-DRMFree",
            sizeRepack: "62.4 GB",
            sizeOriginal: "124.0 GB",
            rating: 9.9,
            developer: "Larian Studios",
            repackVersion: "v4.1.1 Digital Deluxe",
            description: "Gather your party, and return to the Forgotten Realms in a tale of fellowship and betrayal, sacrifice and survival, and the lure of absolute power.",
            requirements: {
                minimum: "OS: Windows 10 64-bit | CPU: Intel i5-4690 | RAM: 8 GB | GPU: GTX 970 | Storage: 150 GB SSD",
                recommended: "OS: Windows 10/11 64-bit | CPU: Intel i7-8700K | RAM: 16 GB | GPU: RTX 2060 | Storage: 150 GB SSD"
            },
            features: [
                "DRM-Free GOG digital copy. No crack required. Launch and play",
                "Includes Digital Deluxe items (cosmetics, dice skins, OST)"
            ],
            downloads: {
                magnet: "magnet:?xt=urn:btih:bg3gogdeluxe...",
                torrent: "#",
                direct: "https://gofile.io/d/neoplay_bg3"
            }
        },
        {
            id: "doom-eternal",
            title: "Doom Eternal",
            bgClass: "card-doom",
            imgUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/782330/header.jpg",
            category: "Shooter",
            releaseDate: "2020-03-20",
            crackDate: "2020-03-20",
            crackStatus: "Cracked",
            crackGroup: "CODEX / Bethesda",
            sizeRepack: "22.5 GB",
            sizeOriginal: "50.0 GB",
            rating: 9.5,
            developer: "id Software",
            repackVersion: "v6.66 + The Ancient Gods 1 & 2",
            description: "Hell’s armies have invaded Earth. Become the Slayer in an epic single-player campaign to conquer demons across dimensions.",
            requirements: {
                minimum: "OS: Windows 10 | CPU: Intel i5-3570 | RAM: 8 GB | GPU: GTX 1050 Ti | Storage: 50 GB HDD",
                recommended: "OS: Windows 10/11 | CPU: Intel i7-6700K | RAM: 8 GB | GPU: GTX 1067 | Storage: 50 GB SSD"
            },
            features: [
                "DRM-Free via Bethesda exe bypass. All DLCs pre-instantiated",
                "Lossless repack with minor download size"
            ],
            downloads: {
                magnet: "magnet:?xt=urn:btih:doometernalcodex...",
                torrent: "#",
                direct: "https://gofile.io/d/neoplay_doom"
            }
        },
        {
            id: "sekiro-shadows-die-twice",
            title: "Sekiro: Shadows Die Twice",
            bgClass: "card-sekiro",
            imgUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/814380/header.jpg",
            category: "Action",
            releaseDate: "2019-03-22",
            crackDate: "2019-03-22",
            crackStatus: "Cracked",
            crackGroup: "CODEX",
            sizeRepack: "9.5 GB",
            sizeOriginal: "15.0 GB",
            rating: 9.7,
            developer: "FromSoftware",
            repackVersion: "v1.06 GOTY Edition",
            description: "Carve your own clever path to vengeance in the award-winning adventure from developer FromSoftware.",
            requirements: {
                minimum: "OS: Windows 10 | CPU: Intel i3-2100 | RAM: 4 GB | GPU: GTX 760 | Storage: 25 GB HDD",
                recommended: "OS: Windows 10/11 | CPU: Intel i5-2500K | RAM: 8 GB | GPU: GTX 970 | Storage: 25 GB SSD"
            },
            features: [
                "Cracked by CODEX. GOTY Update pre-installed",
                "Includes boss challenge modes, remnants, and developer skins"
            ],
            downloads: {
                magnet: "magnet:?xt=urn:btih:sekirocodex...",
                torrent: "#",
                direct: "https://gofile.io/d/neoplay_sekiro"
            }
        },
        {
            id: "horizon-forbidden-west",
            title: "Horizon Forbidden West Complete Edition",
            bgClass: "card-horizon2",
            imgUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/2109060/header.jpg",
            category: "Adventure",
            releaseDate: "2024-03-21",
            crackDate: "2024-03-21",
            crackStatus: "Cracked",
            crackGroup: "Goldberg",
            sizeRepack: "52.8 GB",
            sizeOriginal: "102.5 GB",
            rating: 9.3,
            developer: "Guerrilla Games",
            repackVersion: "Complete Edition v1.1.48",
            description: "Experience the far future of lands afar. Aloy leads a team to face a final terraforming blight threat.",
            requirements: {
                minimum: "OS: Windows 10 | CPU: Intel i3-8100 | RAM: 16 GB | GPU: GTX 1650 | Storage: 150 GB SSD",
                recommended: "OS: Windows 10/11 | CPU: Intel i5-8600 | RAM: 16 GB | GPU: RTX 3060 | Storage: 150 GB SSD"
            },
            features: [
                "Steam DRM bypassed via Goldberg emulator hook",
                "Burning Shores DLC included"
            ],
            downloads: {
                magnet: "magnet:?xt=urn:btih:hfwgoldberg...",
                torrent: "#",
                direct: "https://gofile.io/d/neoplay_hfw"
            }
        },
        {
            id: "helldivers-2",
            title: "Helldivers 2",
            bgClass: "card-helldivers2",
            imgUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/553850/header.jpg",
            category: "Shooter",
            releaseDate: "2024-02-08",
            crackDate: "Pending",
            crackStatus: "Uncracked",
            crackGroup: "None",
            sizeRepack: "-",
            sizeOriginal: "70.0 GB",
            rating: 9.1,
            developer: "Arrowhead Game Studios",
            repackVersion: "No Repack Available Yet",
            description: "The Galaxy’s Last Line of Offence. Enlist in the Helldivers and join the fight for democracy in a fast and frantic multiplayer shooter.",
            requirements: {
                minimum: "OS: Windows 10 | CPU: Intel i7-4790K | RAM: 8 GB | GPU: GTX 1050 Ti | Storage: 100 GB HDD/SSD",
                recommended: "OS: Windows 10/11 | CPU: Intel i7-9700k | RAM: 16 GB | GPU: RTX 2060 | Storage: 100 GB SSD"
            },
            features: [
                "Online multiplayer service requirement - nHEART protection",
                "Currently uncracked due to network authentication layers"
            ],
            downloads: {
                magnet: "",
                torrent: "",
                direct: ""
            }
        },
        {
            id: "monster-hunter-wilds",
            title: "Monster Hunter Wilds",
            bgClass: "card-mhwilds",
            imgUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/2636800/header.jpg",
            category: "Action",
            releaseDate: "2025-02-28",
            crackDate: "Pending",
            crackStatus: "Upcoming",
            crackGroup: "None",
            sizeRepack: "-",
            sizeOriginal: "140.0 GB",
            rating: 9.5,
            developer: "Capcom",
            repackVersion: "No Repack Available Yet",
            description: "Embark on an expansive ecosystem hunt in vibrant wildernesses. Dynamic environment combat.",
            requirements: {
                minimum: "OS: Windows 10 | CPU: Intel i5-11600K | RAM: 16 GB | GPU: RTX 2060 | Storage: 140 GB SSD",
                recommended: "OS: Windows 10/11 | CPU: Intel i7-12700 | RAM: 16 GB | GPU: RTX 4060 | Storage: 140 GB SSD"
            },
            features: [
                "Scheduled for release with Capcom anti-tamper + Denuvo V20",
                "Crack status monitored on launch"
            ],
            downloads: {
                magnet: "",
                torrent: "",
                direct: ""
            }
        },
        {
            id: "civilization-vii",
            title: "Sid Meier's Civilization VII",
            bgClass: "card-civ7",
            imgUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/1295660/header.jpg",
            category: "Strategy",
            releaseDate: "2025-02-11",
            crackDate: "Pending",
            crackStatus: "Uncracked",
            crackGroup: "None",
            sizeRepack: "-",
            sizeOriginal: "65.0 GB",
            rating: 8.8,
            developer: "Firaxis Games",
            repackVersion: "No Repack Available Yet",
            description: "Sid Meier’s Civilization VII empowers you to build the greatest empire the world has ever seen!",
            requirements: {
                minimum: "OS: Windows 10 | CPU: Intel i5-4690 | RAM: 8 GB | GPU: GTX 1050 | Storage: 70 GB SSD",
                recommended: "OS: Windows 10/11 | CPU: Intel i7-8700 | RAM: 16 GB | GPU: RTX 3060 | Storage: 70 GB SSD"
            },
            features: [
                "Currently protected by Denuvo v19",
                "Monitored closely by cracking groups"
            ],
            downloads: {
                magnet: "",
                torrent: "",
                direct: ""
            }
        },
        {
            id: "sand-raiders-of-sophie",
            title: "SAND: Raiders of Sophie",
            bgClass: "card-sand",
            imgUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/1431300/header.jpg",
            category: "Shooter",
            releaseDate: "2026-06-22",
            crackDate: "Pending",
            crackStatus: "Uncracked",
            crackGroup: "None",
            sizeRepack: "-",
            sizeOriginal: "28.0 GB",
            rating: 7.8,
            developer: "Hologryph",
            repackVersion: "No Repack Available Yet",
            description: "SAND is a PvPvE extraction shooter where you traverse a fallen world inside giant walking dreadnoughts, seeking hidden treasures in an evaporating sea.",
            requirements: {
                minimum: "OS: Windows 10/11 | CPU: Intel i5-9600K | RAM: 16 GB | GPU: GTX 1070 | Storage: 30 GB SSD",
                recommended: "OS: Windows 10/11 | CPU: Intel i7-11700K | RAM: 16 GB | GPU: RTX 3070 | Storage: 30 GB SSD"
            },
            features: [
                "Online PvPvE extraction shooter gameplay",
                "Requires network authorization, currently uncracked"
            ],
            downloads: {
                magnet: "",
                torrent: "",
                direct: ""
            }
        }
    ],

    // Target pool for simulated live 'auto updates'
    upcomingAutoCracks: [
        {
            id: "stalker-2",
            title: "S.T.A.L.K.E.R. 2: Heart of Chornobyl",
            bgClass: "card-stalker2",
            imgUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/1643320/header.jpg",
            category: "Shooter",
            releaseDate: "2024-11-20",
            crackDate: "2024-11-20",
            crackStatus: "Cracked",
            crackGroup: "RUNE",
            sizeRepack: "72.4 GB",
            sizeOriginal: "152.0 GB",
            rating: 9.4,
            developer: "GSC Game World",
            repackVersion: "v1.0.2 + DLC",
            description: "Explore the vast Chornobyl Exclusion Zone full of dangerous anomalies and powerful artifacts.",
            requirements: {
                minimum: "OS: Windows 10 | CPU: Ryzen 5 1600X | RAM: 8 GB | GPU: GTX 1060 | Storage: 160 GB SSD",
                recommended: "OS: Windows 10/11 | CPU: Ryzen 7 3700X | RAM: 16 GB | GPU: RTX 2070 Super | Storage: 160 GB SSD"
            },
            features: [
                "DRM-Free GoG and Steam Goldberg crack applied",
                "Includes digital deluxe rewards and exclusive outfits"
            ],
            downloads: {
                magnet: "magnet:?xt=urn:btih:stalker2runepc...",
                torrent: "#",
                direct: "https://gofile.io/d/neoplay_stalker2"
            }
        },
        {
            id: "indiana-jones",
            title: "Indiana Jones and the Great Circle",
            bgClass: "card-indianajones",
            imgUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/2677660/header.jpg",
            category: "Adventure",
            releaseDate: "2024-12-09",
            crackDate: "2024-12-10",
            crackStatus: "Cracked",
            crackGroup: "FLT",
            sizeRepack: "45.8 GB",
            sizeOriginal: "95.0 GB",
            rating: 9.2,
            developer: "MachineGames",
            repackVersion: "v1.0.12 Premium",
            description: "Unravel one of history’s greatest mysteries in Indiana Jones and the Great Circle™.",
            requirements: {
                minimum: "OS: Windows 10 | CPU: Intel i7-8700K | RAM: 16 GB | GPU: RTX 3060 | Storage: 100 GB SSD",
                recommended: "OS: Windows 11 | CPU: Intel i7-10700K | RAM: 16 GB | GPU: RTX 3080 | Storage: 100 GB SSD"
            },
            features: [
                "Bypasses Bethesda launcher client hooks + Steam DRM",
                "All premium cosmetic textures and digital artwork pre-bundled"
            ],
            downloads: {
                magnet: "magnet:?xt=urn:btih:indyjonespcflt...",
                torrent: "#",
                direct: "https://gofile.io/d/neoplay_indy"
            }
        }
    ],

    // Release updates / Calendar
    releasesTimeline: [
        {
            id: "civ7-timeline",
            title: "Sid Meier's Civilization VII",
            releaseDate: "2025-02-11",
            category: "Strategy",
            protection: "Denuvo V19",
            status: "Uncracked",
            daysAgo: "Recent Release",
            statusClass: "status-uncracked"
        },
        {
            id: "spiderman2-timeline",
            title: "Marvel's Spider-Man 2",
            releaseDate: "2025-01-30",
            category: "Adventure",
            protection: "Steam DRM + PSN Account",
            status: "Cracked",
            daysAgo: "Cracked in 1 day",
            statusClass: "status-cracked"
        },
        {
            id: "monsterhunterwilds-timeline",
            title: "Monster Hunter Wilds",
            releaseDate: "2025-02-28",
            category: "Action",
            protection: "Denuvo V20",
            status: "Uncracked",
            daysAgo: "Upcoming Release",
            statusClass: "status-upcoming"
        },
        {
            id: "gta6-timeline",
            title: "Grand Theft Auto VI",
            releaseDate: "2025-Q3/Q4",
            category: "Action",
            protection: "Rockstar Social Club + Arxan",
            status: "Upcoming",
            daysAgo: "Upcoming Release",
            statusClass: "status-upcoming"
        },
        {
            id: "kingdomcome2-timeline",
            title: "Kingdom Come: Deliverance II",
            releaseDate: "2025-02-11",
            category: "RPG",
            protection: "Steam DRM (Denuvo Removed!)",
            status: "Cracked",
            daysAgo: "Cracked on Day-1",
            statusClass: "status-cracked"
        },
        {
            id: "deathstranding2-timeline",
            title: "Death Stranding 2: On The Beach",
            releaseDate: "2025-Q4",
            category: "Adventure",
            protection: "TBA",
            status: "Upcoming",
            daysAgo: "Upcoming Release",
            statusClass: "status-upcoming"
        },
        {
            id: "doomdarkages-timeline",
            title: "Doom: The Dark Ages",
            releaseDate: "2025-Q2/Q3",
            category: "Shooter",
            protection: "Denuvo + Bethesda Launcher",
            status: "Upcoming",
            daysAgo: "Upcoming Release",
            statusClass: "status-upcoming"
        },
        {
            id: "ac-black-flag-remake-timeline",
            title: "Assassin's Creed IV: Black Flag Remake",
            releaseDate: "2026-07-17",
            category: "Action",
            protection: "Ubisoft Connect DRM + Hypervisor",
            status: "Cracked",
            daysAgo: "Cracked",
            statusClass: "status-cracked"
        },
        {
            id: "ac-mirage-timeline",
            title: "Assassin's Creed Mirage",
            releaseDate: "2023-10-05",
            category: "Action",
            protection: "Denuvo (Bypassed)",
            status: "Cracked",
            daysAgo: "Cracked",
            statusClass: "status-cracked"
        },
        {
            id: "ac-shadows-timeline",
            title: "Assassin's Creed Shadows",
            releaseDate: "2025-02-14",
            category: "Action",
            protection: "Denuvo (Bypassed)",
            status: "Cracked",
            daysAgo: "Cracked",
            statusClass: "status-cracked"
        }
    ],

    // Steam & Epic free games
    freeGames: [
        {
            id: "epic-1",
            store: "epic",
            type: "active",
            title: "Echo Generation: Midnight Edition",
            originalPrice: "$14.99",
            discount: "100% OFF",
            startDate: "July 16, 2026",
            endDate: "July 23, 2026",
            url: "https://store.epicgames.com/en-US/p/echo-generation-midnight-edition",
            imgUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/1705850/header.jpg"
        },
        {
            id: "epic-2",
            store: "epic",
            type: "active",
            title: "Luto",
            originalPrice: "$19.99",
            discount: "100% OFF",
            startDate: "July 16, 2026",
            endDate: "July 23, 2026",
            url: "https://store.epicgames.com/en-US/p/luto",
            imgUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/1749670/header.jpg"
        },
        {
            id: "epic-upcoming-1",
            store: "epic",
            type: "upcoming",
            title: "Foretales",
            originalPrice: "$14.99",
            discount: "Free Next Week",
            startDate: "July 23, 2026",
            endDate: "July 30, 2026",
            url: "https://store.epicgames.com/",
            imgUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/1556440/header.jpg"
        }
    ],

    // News Feed elements (simulating live crawl updates)
    liveTickerNews: [
        "RUNE releases bypass crack for Black Myth Wukong after Denuvo validation patch v1.0.8",
        "Epic Games Store announces next week's free titles: F.I.S.T and Duskers",
        "Steam Summer Sale Live: publisher-direct promotions for indie games",
        "FitGirl confirms repack size optimization for Ghost of Tsushima: down to 34.8 GB",
        "DODI Repack: Elden Ring Shadow of the Erdtree repack v1.12.3 released",
        "Anti-piracy protection updates: Denuvo v20 implemented in upcoming Monster Hunter Wilds"
    ],

    // Simulated community requests
    communityRequests: [
        { id: 1, title: "Grand Theft Auto V v1.68 (Latest Online DLC)", platform: "Epic Games", votes: 412, date: "2026-07-10", status: "Repacked" },
        { id: 2, title: "Black Myth: Wukong update v1.0.9 hotfix", platform: "Steam", votes: 356, date: "2026-07-12", status: "Cracking" },
        { id: 3, title: "Star Wars Outlaws", platform: "Ubisoft Connect", votes: 298, date: "2026-07-08", status: "Queue" },
        { id: 4, title: "Red Dead Redemption 1 PC Remaster", platform: "Steam", votes: 247, date: "2026-07-14", status: "Repacked" },
        { id: 5, title: "Indiana Jones and the Great Circle", platform: "Steam", votes: 231, date: "2026-07-13", status: "Queue" },
        { id: 6, title: "Dragon Age: The Veilguard", platform: "EA App", votes: 198, date: "2026-07-11", status: "Queue" }
    ]
};

// Seeding function to dynamic load 150+ games into the database
(function seedExtraGames() {
    const seeds = [
        ["The Witcher 3: Wild Hunt", 292030, "RPG", "CD PROJEKT RED", "50 GB", "PLAZA"],
        ["Skyrim Special Edition", 489830, "RPG", "Bethesda", "15 GB", "CODEX"],
        ["Fallout 4", 377160, "RPG", "Bethesda", "30 GB", "CODEX"],
        ["Lies of P", 1627720, "Action", "NEOWIZ", "40 GB", "RUNE"],
        ["Armored Core VI: Fires of Rubicon", 1874850, "Action", "FromSoftware", "60 GB", "RUNE"],
        ["Dark Souls III", 379720, "Action", "FromSoftware", "25 GB", "CODEX"],
        ["Dark Souls II: Scholar of the First Sin", 236430, "Action", "FromSoftware", "15 GB", "CODEX"],
        ["Dark Souls Remastered", 570940, "Action", "FromSoftware", "8 GB", "CODEX"],
        ["Lego Star Wars: The Skywalker Saga", 924890, "Adventure", "TT Games", "40 GB", "CODEX"],
        ["Dying Light", 239140, "Survival", "Techland", "40 GB", "RELOADED"],
        ["Dying Light 2 Stay Human", 534380, "Action", "Techland", "60 GB", "EMPRESS"],
        ["Dead Island 2", 934700, "Action", "Deep Silver", "45 GB", "EMPRESS"],
        ["Dead Space Remake", 1693980, "Survival", "Motive Studio", "50 GB", "RUNE"],
        ["Resident Evil Village", 1111660, "Survival", "Capcom", "30 GB", "EMPRESS"],
        ["Resident Evil 7: Biohazard", 418370, "Survival", "Capcom", "24 GB", "CODEX"],
        ["Resident Evil 2 Remake", 883710, "Survival", "Capcom", "26 GB", "CODEX"],
        ["Resident Evil 3 Remake", 952060, "Survival", "Capcom", "25 GB", "CODEX"],
        ["Sons of the Forest", 1326470, "Survival", "Endnight Games", "15 GB", "Goldberg"],
        ["The Forest", 242760, "Survival", "Endnight Games", "5 GB", "RELOADED"],
        ["Subnautica", 264710, "Survival", "Unknown Worlds", "20 GB", "CODEX"],
        ["Subnautica: Below Zero", 848450, "Survival", "Unknown Worlds", "15 GB", "CODEX"],
        ["Green Hell", 815370, "Survival", "Creepy Jar", "8 GB", "PLAZA"],
        ["Valheim", 892970, "Survival", "Iron Gate", "2 GB", "Goldberg"],
        ["Slay the Spire", 646570, "Strategy", "Mega Crit", "1 GB", "GOG"],
        ["Hollow Knight", 367520, "Adventure", "Team Cherry", "9 GB", "GOG"],
        ["Hades", 1145360, "RPG", "Supergiant Games", "15 GB", "GOG"],
        ["Terraria", 105600, "RPG", "Re-Logic", "1.5 GB", "GOG"],
        ["Celeste", 504230, "Adventure", "Maddy Makes Games", "2 GB", "GOG"],
        ["Cuphead", 268910, "Action", "Studio MDHR", "4 GB", "GOG"],
        ["Dead Cells", 588650, "Action", "Motion Twin", "5 GB", "GOG"],
        ["Dave the Diver", 1868140, "RPG", "MINTROCKET", "10 GB", "RUNE"],
        ["Dredge", 1562430, "Adventure", "Black Salt Games", "2 GB", "GOG"],
        ["Stardew Valley", 413150, "RPG", "ConcernedApe", "1 GB", "GOG"],
        ["Cities: Skylines", 255710, "Strategy", "Colossal Order", "12 GB", "CODEX"],
        ["Cities: Skylines II", 949230, "Strategy", "Colossal Order", "60 GB", "RUNE"],
        ["Frostpunk", 506140, "Strategy", "11 bit studios", "10 GB", "CODEX"],
        ["Frostpunk 2", 1601580, "Strategy", "11 bit studios", "30 GB", "RUNE"],
        ["Satisfactory", 526870, "Strategy", "Coffee Stain Studios", "15 GB", "Goldberg"],
        ["Factorio", 427520, "Strategy", "Wube Software", "3 GB", "GOG"],
        ["Manor Lords", 1363080, "Strategy", "Slavic Magic", "15 GB", "Goldberg"],
        ["Civilization VI", 289070, "Strategy", "Firaxis Games", "16 GB", "CODEX"],
        ["Star Wars Jedi: Fallen Order", 1172380, "Action", "Respawn", "55 GB", "CODEX"],
        ["Star Wars Jedi: Survivor", 1774580, "Action", "Respawn", "155 GB", "RUNE"],
        ["Assassin's Creed", 15100, "Action", "Ubisoft", "8 GB", "RELOADED"],
        ["Assassin's Creed II", 33230, "Action", "Ubisoft", "12 GB", "SKIDROW"],
        ["Assassin's Creed Brotherhood", 48190, "Action", "Ubisoft", "12 GB", "SKIDROW"],
        ["Assassin's Creed Revelations", 201870, "Action", "Ubisoft", "12 GB", "SKIDROW"],
        ["Assassin's Creed III Remastered", 911400, "Action", "Ubisoft", "45 GB", "CODEX"],
        ["Assassin's Creed IV Black Flag", 242050, "Action", "Ubisoft", "30 GB", "RELOADED"],
        ["Assassin's Creed IV: Black Flag Remake", 242050, "Action", "Ubisoft", "60 GB", "Hypervisor"],
        ["Assassin's Creed Liberation HD", 260210, "Action", "Ubisoft", "6 GB", "SKIDROW"],
        ["Assassin's Creed Rogue", 311560, "Action", "Ubisoft", "12 GB", "CODEX"],
        ["Assassin's Creed Unity", 289650, "Action", "Ubisoft", "50 GB", "RELOADED"],
        ["Assassin's Creed Syndicate", 368500, "Action", "Ubisoft", "50 GB", "CODEX"],
        ["Assassin's Creed Origins", 582160, "RPG", "Ubisoft", "60 GB", "CODEX"],
        ["Assassin's Creed Odyssey", 812140, "RPG", "Ubisoft", "80 GB", "EMPRESS"],
        ["Assassin's Creed Valhalla", 2208920, "RPG", "Ubisoft", "130 GB", "EMPRESS"],
        ["Assassin's Creed Mirage", 2333900, "Action", "Ubisoft", "40 GB", "Delusional"],
        ["Assassin's Creed Shadows", 2266850, "Action", "Ubisoft", "70 GB", "RUNE"],
        ["Watch Dogs 2", 447040, "Action", "Ubisoft", "40 GB", "CODEX"],
        ["Far Cry 6", 1876850, "Action", "Ubisoft", "90 GB", "EMPRESS"],
        ["Far Cry 5", 552520, "Action", "Ubisoft", "45 GB", "CODEX"],
        ["Far Cry 4", 298110, "Action", "Ubisoft", "30 GB", "RELOADED"],
        ["Far Cry 3", 220240, "Action", "Ubisoft", "15 GB", "RELOADED"],
        ["Need for Speed Heat", 1222680, "Racing", "Criterion Games", "35 GB", "CODEX"],
        ["Need for Speed Unbound", 1377580, "Racing", "Criterion Games", "50 GB", "Uncracked"],
        ["BeamNG.drive", 284160, "Racing", "BeamNG", "30 GB", "Goldberg"],
        ["SnowRunner", 1465360, "Racing", "Saber Interactive", "35 GB", "RUNE"],
        ["Wreckfest", 228380, "Racing", "Bugbear", "30 GB", "RELOADED"],
        ["Forza Horizon 4", 1293830, "Racing", "Playground Games", "90 GB", "LOOTBOX"],
        ["Euro Truck Simulator 2", 227300, "Racing", "SCS Software", "15 GB", "Goldberg"],
        ["American Truck Simulator", 270880, "Racing", "SCS Software", "12 GB", "Goldberg"],
        ["Microsoft Flight Simulator", 1250410, "Racing", "Asobo Studio", "150 GB", "HOODLUM"],
        ["Assetto Corsa Competizione", 805550, "Racing", "Kunos Simulazioni", "20 GB", "CODEX"],
        ["Half-Life 2", 220, "Shooter", "Valve", "7 GB", "RELOADED"],
        ["Half-Life: Alyx", 548430, "Shooter", "Valve", "67 GB", "VREX"],
        ["Black Mesa", 362890, "Shooter", "Crowbar Collective", "25 GB", "CODEX"],
        ["Metro Exodus", 412020, "Shooter", "4A Games", "70 GB", "CODEX"],
        ["Metro Last Light Redux", 287390, "Shooter", "4A Games", "10 GB", "CODEX"],
        ["Metro 2033 Redux", 286690, "Shooter", "4A Games", "8 GB", "CODEX"],
        ["Bioshock Infinite", 8870, "Shooter", "Irrational Games", "20 GB", "RELOADED"],
        ["Borderlands 3", 397540, "Shooter", "Gearbox", "75 GB", "CODEX"],
        ["Borderlands 2", 49520, "Shooter", "Gearbox", "13 GB", "RELOADED"],
        ["Fallout: New Vegas", 22380, "RPG", "Obsidian Entertainment", "10 GB", "RELOADED"],
        ["Dishonored 2", 403640, "Adventure", "Arkane Studios", "45 GB", "STEAMPUNKS"],
        ["Dishonored: Death of the Outsider", 614570, "Adventure", "Arkane Studios", "30 GB", "CODEX"],
        ["Prey", 480490, "Survival", "Arkane Studios", "38 GB", "BALDMAN"],
        ["Deathloop", 1252330, "Shooter", "Arkane Studios", "35 GB", "EMPRESS"],
        ["Control", 870780, "Action", "Remedy", "42 GB", "CODEX"],
        ["Hitman 3", 1659040, "Action", "IO Interactive", "70 GB", "CODEX"],
        ["Payday 2", 218620, "Shooter", "Overkill", "50 GB", "Goldberg"],
        ["Left 4 Dead 2", 550, "Shooter", "Valve", "15 GB", "RELOADED"],
        ["Warhammer: Vermintide 2", 552500, "Action", "Fatshark", "65 GB", "CODEX"],
        ["Deep Rock Galactic", 548430, "Shooter", "Ghost Ship Games", "3 GB", "Goldberg"],
        ["Risk of Rain 2", 632360, "Shooter", "Hopoo Games", "4 GB", "GOG"],
        ["Divinity: Original Sin 2", 435150, "RPG", "Larian Studios", "60 GB", "GOG"],
        ["Pathfinder: Wrath of the Righteous", 1184150, "RPG", "Owlcat Games", "50 GB", "GOG"],
        ["Dragon Age: Inquisition", 1222690, "RPG", "BioWare", "40 GB", "CODEX"],
        ["Mass Effect Legendary Edition", 1328670, "RPG", "BioWare", "110 GB", "FLT"],
        ["S.T.A.L.K.E.R. Shadow of Chernobyl", 4500, "Shooter", "GSC Game World", "6 GB", "GOG"],
        ["S.T.A.L.K.E.R. Call of Pripyat", 20500, "Shooter", "GSC Game World", "5 GB", "GOG"],
        ["S.T.A.L.K.E.R. Clear Sky", 20510, "Shooter", "GSC Game World", "5 GB", "GOG"],
        ["Total War: Warhammer III", 1142710, "Strategy", "Creative Assembly", "120 GB", "EMPRESS"],
        ["Total War: Three Kingdoms", 770720, "Strategy", "Creative Assembly", "45 GB", "CODEX"],
        ["Total War: Rome II", 214950, "Strategy", "Creative Assembly", "35 GB", "RELOADED"],
        ["Mount & Blade II: Bannerlord", 261550, "RPG", "TaleWorlds", "60 GB", "RUNE"],
        ["The Sims 4", 1222670, "Strategy", "Maxis", "55 GB", "CODEX"],
        ["The Outer Worlds", 578650, "RPG", "Obsidian Entertainment", "40 GB", "CODEX"],
        ["Rage 2", 548570, "Shooter", "id Software", "50 GB", "CODEX"],
        ["Wolfenstein II: The New Colossus", 612880, "Shooter", "MachineGames", "55 GB", "CODEX"],
        ["Wolfenstein: The New Order", 201810, "Shooter", "MachineGames", "40 GB", "RELOADED"],
        ["Ori and the Blind Forest", 261570, "Adventure", "Moon Studios", "8 GB", "GOG"],
        ["Ori and the Will of the Wisps", 1057090, "Adventure", "Moon Studios", "20 GB", "GOG"],
        ["Outlast 2", 414700, "Survival", "Red Barrels", "24 GB", "CODEX"],
        ["Outlast", 238320, "Survival", "Red Barrels", "5 GB", "RELOADED"],
        ["Amnesia: The Dark Descent", 57300, "Survival", "Frictional Games", "2 GB", "GOG"],
        ["Amnesia: Rebirth", 992770, "Survival", "Frictional Games", "35 GB", "CODEX"],
        ["Amnesia: The Bunker", 1944430, "Survival", "Frictional Games", "35 GB", "RUNE"],
        ["SOMA", 282140, "Survival", "Frictional Games", "25 GB", "CODEX"],
        ["Alien: Isolation", 214490, "Survival", "Creative Assembly", "35 GB", "CODEX"],
        ["Grim Dawn", 219990, "RPG", "Crate Entertainment", "8 GB", "GOG"],
        ["Pillars of Eternity II: Deadfire", 560130, "RPG", "Obsidian Entertainment", "45 GB", "GOG"],
        ["Pillars of Eternity", 291650, "RPG", "Obsidian Entertainment", "14 GB", "GOG"],
        ["Tyranny", 362960, "RPG", "Obsidian Entertainment", "15 GB", "GOG"],
        ["Wasteland 3", 719040, "RPG", "inXile Entertainment", "45 GB", "GOG"],
        ["Torment: Tides of Numenera", 272270, "RPG", "inXile Entertainment", "20 GB", "GOG"],
        ["Disco Elysium", 632470, "RPG", "ZA/UM", "20 GB", "GOG"],
        ["Kingdom Come: Deliverance", 379430, "RPG", "Warhorse Studios", "70 GB", "CODEX"],
        ["Vampyr", 427290, "RPG", "DONTNOD", "30 GB", "CODEX"],
        ["A Plague Tale: Requiem", 1182900, "Adventure", "Asobo Studio", "55 GB", "RUNE"],
        ["Detroit: Become Human", 1150640, "Adventure", "Quantic Dream", "55 GB", "CODEX"],
        ["Heavy Rain", 960910, "Adventure", "Quantic Dream", "35 GB", "CODEX"],
        ["Beyond: Two Souls", 960990, "Adventure", "Quantic Dream", "40 GB", "CODEX"],
        ["Kena: Bridge of Spirits", 1956980, "Adventure", "Ember Lab", "25 GB", "FLT"],
        ["Death Stranding Director's Cut", 1850570, "Adventure", "Kojima Productions", "80 GB", "FLT"],
        ["Days Gone", 1030840, "Action", "Bend Studio", "70 GB", "FLT"],
        ["Horizon Zero Dawn", 1151640, "Adventure", "Guerrilla Games", "75 GB", "CODEX"]
    ];

    const extraSeeds = [
        ["Portal", 400, "Puzzle", "Valve", "8 GB", "RELOADED"],
        ["Garry's Mod", 4000, "Sandbox", "Facepunch", "5 GB", "Goldberg"],
        ["Spec Ops: The Line", 50300, "Shooter", "Yager", "8 GB", "FLT"],
        ["Batman: Arkham Asylum GOTY", 35140, "Action", "Rocksteady", "8 GB", "PROPHET"],
        ["Batman: Arkham City GOTY", 200260, "Action", "Rocksteady", "18 GB", "PROPHET"],
        ["Batman: Arkham Knight", 208650, "Action", "Rocksteady", "50 GB", "CPY"],
        ["Tomb Raider (2013)", 203160, "Adventure", "Crystal Dynamics", "12 GB", "SKIDROW"],
        ["Rise of the Tomb Raider", 391220, "Adventure", "Crystal Dynamics", "30 GB", "CONSPIR4CY"],
        ["Shadow of the Tomb Raider", 750920, "Adventure", "Eidos", "40 GB", "CODEX"],
        ["Inside", 304430, "Puzzle", "Playdead", "3 GB", "CONSPIR4CY"],
        ["Limbo", 48110, "Puzzle", "Playdead", "0.2 GB", "GOG"],
        ["Persona 5 Royal", 1687950, "RPG", "ATLUS", "45 GB", "Uncracked"],
        ["NieR: Automata", 524220, "Action", "PlatinumGames", "50 GB", "BALDMAN"],
        ["Dishonored: Definitive Edition", 205100, "Adventure", "Arkane", "20 GB", "PROPHET"],
        ["Wolfenstein: The Old Blood", 350080, "Shooter", "MachineGames", "38 GB", "CODEX"],
        ["BioShock 2 Remastered", 409720, "Shooter", "2K Games", "20 GB", "CODEX"],
        ["Batman: Arkham Origins", 209000, "Action", "WB Games", "27 GB", "RELOADED"],
        ["Middle-earth: Shadow of Mordor", 241930, "Action", "Monolith", "45 GB", "CODEX"],
        ["Middle-earth: Shadow of War", 356190, "Action", "Monolith", "95 GB", "CODEX"],
        ["Just Cause 3", 225540, "Action", "Avalanche Studios", "38 GB", "CPY"],
        ["Just Cause 4", 517630, "Action", "Avalanche Studios", "42 GB", "CODEX"],
        ["Sleeping Dogs: Deluxe", 307690, "Action", "United Front Games", "20 GB", "CODEX"],
        ["Deus Ex: Human Revolution", 238010, "RPG", "Eidos", "17 GB", "RELOADED"],
        ["Deus Ex: Mankind Divided", 337000, "RPG", "Eidos", "45 GB", "SKIDROW"],
        ["Thief (2014)", 239160, "Adventure", "Eidos", "25 GB", "RELOADED"],
        ["Hitman: Absolution", 203140, "Action", "IO Interactive", "24 GB", "SKIDROW"],
        ["Hitman 2 (2018)", 863550, "Action", "IO Interactive", "60 GB", "FCP"],
        ["Max Payne 3", 204100, "Shooter", "Rockstar Games", "35 GB", "RELOADED"],
        ["L.A. Noire", 110800, "Adventure", "Team Bondi", "16 GB", "SKIDROW"],
        ["Mafia II: Definitive", 1030830, "Action", "Hangar 13", "45 GB", "CODEX"],
        ["Mafia III: Definitive", 1030820, "Action", "Hangar 13", "50 GB", "CODEX"],
        ["Bully: Scholarship Edition", 12200, "Action", "Rockstar Games", "4 GB", "PROPHET"],
        ["Alan Wake (2012)", 108710, "Survival", "Remedy", "8 GB", "SKIDROW"],
        ["Alan Wake's American Nightmare", 202750, "Survival", "Remedy", "3 GB", "SKIDROW"],
        ["Quantum Break", 474960, "Adventure", "Remedy", "68 GB", "SKIDROW"],
        ["Sunset Overdrive", 847370, "Action", "Insomniac Games", "30 GB", "CODEX"],
        ["Fallout 3 GOTY", 22370, "RPG", "Bethesda", "7 GB", "PROPHET"],
        ["Fallout 76", 1151340, "RPG", "Bethesda", "80 GB", "Uncracked"],
        ["TES IV: Oblivion GOTY", 22330, "RPG", "Bethesda", "6 GB", "PROPHET"],
        ["TES III: Morrowind GOTY", 22320, "RPG", "Bethesda", "1.5 GB", "GOG"],
        ["Mass Effect Legendary", 1328670, "RPG", "BioWare", "110 GB", "FLT"],
        ["Mass Effect Andromeda", 1238000, "RPG", "BioWare", "55 GB", "CPY"],
        ["Dragon Age: Origins GOTY", 17430, "RPG", "BioWare", "24 GB", "PROPHET"],
        ["Dragon Age II", 1238040, "RPG", "BioWare", "10 GB", "RELOADED"],
        ["Little Nightmares", 424840, "Puzzle", "Tarsier Studios", "10 GB", "CODEX"],
        ["Little Nightmares II", 860510, "Puzzle", "Tarsier Studios", "15 GB", "CODEX"],
        ["Spelunky 2", 1190460, "Adventure", "Mossmouth", "1 GB", "GOG"],
        ["Slime Rancher", 433340, "Sandbox", "Monomi Park", "4 GB", "GOG"],
        ["Slime Rancher 2", 1657630, "Sandbox", "Monomi Park", "6 GB", "Goldberg"],
        ["Core Keeper", 1621690, "Sandbox", "Pugstorm", "2 GB", "Goldberg"],
        ["Sun Haven", 1439520, "RPG", "Pixel Sprout", "4 GB", "Goldberg"],
        ["Sea of Stars", 1659420, "RPG", "Sabotage Studio", "5 GB", "GOG"],
        ["Chained Echoes", 1229240, "RPG", "Matthias Linda", "1 GB", "GOG"],
        ["Octopath Traveler", 921570, "RPG", "Square Enix", "5 GB", "CODEX"],
        ["Octopath Traveler II", 1971650, "RPG", "Square Enix", "8 GB", "RUNE"],
        ["Persona 4 Golden", 1113000, "RPG", "ATLUS", "14 GB", "CODEX"],
        ["Persona 3 Reload", 2161700, "RPG", "ATLUS", "30 GB", "Uncracked"],
        ["NieR Replicant", 1113560, "Action", "Toylogic", "26 GB", "CODEX"],
        ["Code Vein", 678960, "RPG", "Bandai Namco", "35 GB", "CODEX"],
        ["Scarlet Nexus", 775500, "RPG", "Bandai Namco", "50 GB", "CODEX"],
        ["Tales of Arise", 740130, "RPG", "Bandai Namco", "45 GB", "CODEX"],
        ["Monster Hunter World", 582010, "Action", "Capcom", "52 GB", "CODEX"],
        ["Monster Hunter Rise", 1446780, "Action", "Capcom", "36 GB", "EMPRESS"],
        ["Devil May Cry 5", 601150, "Action", "Capcom", "35 GB", "CODEX"],
        ["Resident Evil 4 (2005)", 254700, "Survival", "Capcom", "15 GB", "RELOADED"],
        ["Resident Evil 5 Gold", 21690, "Survival", "Capcom", "8 GB", "RELOADED"],
        ["Resident Evil 6", 221040, "Survival", "Capcom", "16 GB", "RELOADED"],
        ["Resident Evil Revelations", 222480, "Survival", "Capcom", "8 GB", "RELOADED"],
        ["RE Revelations 2", 287290, "Survival", "Capcom", "17 GB", "CODEX"],
        ["Dead Rising 3", 265550, "Action", "Capcom", "30 GB", "CODEX"],
        ["Outlast Trinity", 414700, "Survival", "Red Barrels", "24 GB", "CODEX"],
        ["Guilty Gear -Strive-", 1384160, "Fighting", "Arc System Works", "25 GB", "CODEX"],
        ["Dragon Ball FighterZ", 678950, "Fighting", "Arc System Works", "6 GB", "CODEX"],
        ["Street Fighter 6", 1364780, "Fighting", "Capcom", "60 GB", "Uncracked"],
        ["Mortal Kombat 11", 976310, "Fighting", "NetherRealm", "110 GB", "EMPRESS"],
        ["Mortal Kombat 1", 1971870, "Fighting", "NetherRealm", "140 GB", "Uncracked"],
        ["Witcher 2 Assassins of Kings", 20920, "RPG", "CD PROJEKT RED", "25 GB", "GOG"],
        ["Witcher Enhanced Edition", 20900, "RPG", "CD PROJEKT RED", "15 GB", "GOG"],
        ["RAGE", 9200, "Shooter", "id Software", "25 GB", "RELOADED"],
        ["Metro 2033", 43110, "Shooter", "4A Games", "8 GB", "RELOADED"],
        ["Crysis Remastered", 1283080, "Shooter", "Crytek", "20 GB", "CPY"],
        ["Crysis 2 Remastered", 1309000, "Shooter", "Crytek", "15 GB", "CODEX"],
        ["Crysis 3 Remastered", 1309010, "Shooter", "Crytek", "18 GB", "CODEX"],
        ["System Shock Remake", 482400, "RPG", "Nightdive", "10 GB", "RUNE"],
        ["Dead Space (2008)", 17470, "Survival", "EA Biotech", "7 GB", "RELOADED"],
        ["Dead Space 2", 47780, "Survival", "Visceral", "10 GB", "RELOADED"],
        ["Dead Space 3", 1238060, "Survival", "Visceral", "15 GB", "RELOADED"],
        ["Sniper Elite 4", 312660, "Shooter", "Rebellion", "60 GB", "STEAMPUNKS"],
        ["Sniper Elite 5", 1402320, "Shooter", "Rebellion", "85 GB", "FLT"],
        ["Ghostrunner", 1139900, "Action", "One More Level", "22 GB", "CODEX"],
        ["Ghostrunner 2", 2144740, "Action", "One More Level", "35 GB", "RUNE"],
        ["Stellaris: Galaxy", 281990, "Strategy", "Paradox", "10 GB", "CODEX"],
        ["Hearts of Iron IV Cadet", 394360, "Strategy", "Paradox", "5 GB", "CODEX"],
        ["Europa Universalis IV Extreme", 236850, "Strategy", "Paradox", "6 GB", "CODEX"],
        ["Crusader Kings III Royal", 1158310, "Strategy", "Paradox", "8 GB", "RUNE"],
        ["Victoria 3", 529340, "Strategy", "Paradox", "20 GB", "FLT"],
        ["Anno 1800", 916440, "Strategy", "Ubisoft", "60 GB", "EMPRESS"],
        ["Tropico 6", 492720, "Strategy", "Limbic", "25 GB", "CODEX"],
        ["Desperados III", 610370, "Strategy", "Mimimi", "15 GB", "CODEX"],
        ["Shadow Tactics Shogun", 418240, "Strategy", "Mimimi", "10 GB", "GOG"],
        ["Civilization IV", 3900, "Strategy", "Firaxis Games", "8 GB", "RELOADED"],
        ["Supermarket Simulator", 2670630, "Simulation", "Nokta Games", "4 GB", "Goldberg"],
        ["Contraband Police", 756800, "Simulation", "Crazy Rocks", "12 GB", "RUNE"],
        ["Teardown", 1167630, "Simulation", "Tuxedo Labs", "4 GB", "FLT"],
        ["PowerWash Simulator", 1503990, "Simulation", "FuturLab", "8 GB", "FLT"],
        ["Farming Simulator 22", 1248130, "Simulation", "Giants Software", "35 GB", "FLT"],
        ["Farming Simulator 19", 787860, "Simulation", "Giants Software", "20 GB", "CODEX"],
        ["House Flipper", 613100, "Simulation", "Empyrean", "6 GB", "CODEX"],
        ["House Flipper 2", 1190970, "Simulation", "Empyrean", "18 GB", "RUNE"],
        ["Gas Station Simulator", 1149620, "Simulation", "DRAGO entertainment", "15 GB", "FLT"],
        ["Car Mechanic Simulator 2021", 1190000, "Simulation", "Red Dot Games", "22 GB", "FLT"],
        ["PC Building Simulator", 621060, "Simulation", "Claudiu Kiss", "8 GB", "CODEX"],
        ["Thief Simulator", 704850, "Simulation", "Noble Muffins", "5 GB", "CODEX"],
        ["Thief Simulator 2", 1996010, "Simulation", "Mr.Halo", "12 GB", "RUNE"],
        ["Cooking Simulator", 641320, "Simulation", "Big Cheese Studio", "8 GB", "CODEX"],
        ["Internet Cafe Simulator 2", 1563180, "Simulation", "Cheesecake Dev", "7 GB", "PLAZA"],
        ["My Summer Car", 516750, "Simulation", "Amistech Games", "1 GB", "Goldberg"],
        ["Kerbal Space Program", 220200, "Simulation", "Squad", "4 GB", "GOG"],
        ["Kerbal Space Program 2", 954850, "Simulation", "Intercept Games", "45 GB", "RUNE"],
        ["Construction Simulator", 1273400, "Simulation", "weltenbauer.", "25 GB", "RUNE"],
        ["Goat Simulator 3", 1420160, "Simulation", "Coffee Stain North", "12 GB", "RUNE"],
        ["Sand Land", 1979440, "RPG", "ILCA, Inc.", "19 GB", "RUNE"],
        ["FIFA 23", 1811260, "Simulation", "EA Sports", "50 GB", "MKDEV"],
        ["FIFA 22", 1506830, "Simulation", "EA Sports", "45 GB", "MKDEV"],
        ["EA Sports FC 24", 2195250, "Simulation", "EA Sports", "48 GB", "Hypervisor"],
        ["EA Sports FC 25", 2669320, "Simulation", "EA Sports", "50 GB", "Hypervisor"],
        ["EA Sports FC 26", 3405690, "Simulation", "EA Sports", "52 GB", "Hypervisor"],
        ["Cricket 19", 1028630, "Simulation", "Big Ant Studios", "15 GB", "CODEX"],
        ["Cricket 22", 1498440, "Simulation", "Big Ant Studios", "25 GB", "FLT"],
        ["Cricket 24", 2358260, "Simulation", "Big Ant Studios", "30 GB", "RUNE"],
        ["Cricket 26", 3468650, "Simulation", "Big Ant Studios", "35 GB", "RUNE"],
        ["F1 2020", 1080110, "Racing", "Codemasters", "45 GB", "CODEX"],
        ["F1 2021", 1135950, "Racing", "Codemasters", "50 GB", "CODEX"],
        ["F1 22", 1692250, "Racing", "Codemasters / EA Sports", "55 GB", "Razor1911"],
        ["F1 23", 2108330, "Racing", "Codemasters / EA Sports", "60 GB", "Razor1911"],
        ["F1 24", 2488620, "Racing", "Codemasters / EA Sports", "65 GB", "Delusional"],
        ["F1 25", 3120450, "Racing", "Codemasters / EA Sports", "70 GB", "Uncracked"],
        ["The Planet Crafter", 1280730, "Survival", "Miju Games", "4 GB", "TENOKE"],
        ["Grand Theft Auto III", 12100, "Action", "Rockstar Games", "1 GB", "HOODLUM"],
        ["Grand Theft Auto: Vice City", 12110, "Action", "Rockstar Games", "1.5 GB", "HOODLUM"],
        ["Grand Theft Auto: San Andreas", 12120, "Action", "Rockstar Games", "4 GB", "HOODLUM"],
        ["Grand Theft Auto IV", 12210, "Action", "Rockstar Games", "22 GB", "PROPHET"],
        ["Grand Theft Auto: The Trilogy - The Definitive Edition", 1501270, "Action", "Rockstar Games", "45 GB", "FLT"],
        ["Grand Theft Auto VI", 999999, "Action", "Rockstar Games", "150 GB", "Upcoming"],
        ["Euro Truck Simulator 2", 227300, "Simulation", "SCS Software", "15 GB", "CODEX"],
        ["American Truck Simulator", 270880, "Simulation", "SCS Software", "12 GB", "CODEX"],
        ["Microsoft Flight Simulator", 1250410, "Simulation", "Asobo Studio", "150 GB", "HOODLUM"],
        ["Cities: Skylines", 255710, "Simulation", "Colossal Order", "12 GB", "CODEX"],
        ["Cities: Skylines II", 949230, "Simulation", "Colossal Order", "60 GB", "RUNE"],
        ["The Sims 4", 1222670, "Simulation", "Maxis", "65 GB", "RELOADED"],
        ["RimWorld", 294100, "Simulation", "Ludeon Studios", "3 GB", "GOG"],
        ["Train Simulator Classic", 24010, "Simulation", "Dovetail Games", "40 GB", "RUNE"],
        ["Drug Dealer Simulator 2", 1785630, "Simulation", "Byterunners", "25 GB", "RUNE"],
        ["Gold Rush: The Game", 451340, "Simulation", "Code Horizon", "19 GB", "CODEX"],
        ["Lawn Mowing Simulator", 1488150, "Simulation", "Skyhook Games", "20 GB", "FLT"],
        ["Tavern Manager Simulator", 2756770, "Simulation", "One More Games", "6 GB", "TENOKE"],
        ["Car For Sale Simulator 2023", 2248760, "Simulation", "Red Axe Games", "10 GB", "TENOKE"],
        ["Ship Graveyard Simulator 2", 2201940, "Simulation", "Games Incubator", "18 GB", "RUNE"],
        ["Police Simulator: Patrol Officers", 997010, "Simulation", "Aesir Interactive", "12 GB", "FLT"]
    ];

    const allSeeds = [...seeds, ...extraSeeds];

    allSeeds.forEach(seed => {
        const [title, appId, cat, dev, size, group] = seed;
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

        // Avoid adding duplicates of custom hardcoded items
        if (GAMES_DATA.games.some(g => g.id === slug || g.title.toLowerCase() === title.toLowerCase())) {
            return;
        }

        const isCracked = group !== "Uncracked" && group !== "Pending" && group !== "Upcoming";
        const crackStatusVal = isCracked ? "Cracked" : (group === "Upcoming" ? "Upcoming" : "Uncracked");
        const crackGroupVal = isCracked ? group : "None";
        const repackSz = isCracked ? (parseFloat(size) * 0.45).toFixed(1) + " GB" : "-";

        GAMES_DATA.games.push({
            id: slug,
            appId: appId,
            title: title,
            bgClass: "card-seeded",
            imgUrl: title.includes("Far Cry 6") ? "assets/images/fc6_header.png"
                : title.includes("Mirage") ? "assets/images/mirage_header.png"
                    : title.includes("Shadows") ? "assets/images/shadows_header.png"
                        : title.includes("FC 26") ? "assets/images/fc26_header.jpg"
                            : title.includes("Cricket 22") ? "assets/images/cricket22_header.jpg"
                                : title.includes("Cricket 26") ? "assets/images/cricket26_header.jpg"
                                    : title.includes("Planet Crafter") ? "assets/images/planet_crafter_header.jpg"
                                        : title.includes("Grand Theft Auto VI") ? "assets/images/gta6_header.jpg"
                                            : `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/header.jpg`,
            category: cat,
            releaseDate: "2022-01-01",
            crackDate: isCracked ? "2022-01-02" : "Pending",
            crackStatus: crackStatusVal,
            crackGroup: crackGroupVal,
            sizeRepack: repackSz,
            sizeOriginal: size,
            rating: parseFloat((8.0 + Math.random() * 1.9).toFixed(1)),
            developer: dev,
            repackVersion: isCracked ? `v1.0 + Crack (${group})` : "No Repack Available",
            description: `${title} is a premier ${cat} game developed by ${dev}, offering rich visuals, state-of-the-art gameplay mechanics, and engaging environments.`,
            requirements: {
                minimum: `OS: Windows 10 | CPU: Intel Core i5 | RAM: 8 GB | GPU: GTX 1060 | Storage: ${size} HDD`,
                recommended: `OS: Windows 11 | CPU: Intel Core i7 | RAM: 16 GB | GPU: RTX 3060 | Storage: ${size} SSD`
            },
            features: [
                isCracked ? `Standalone repack with ${group} crack applied` : "No crack available",
                "Full high-quality texture compression",
                "Direct installation wrapper"
            ],
            downloads: {
                magnet: isCracked ? `magnet:?xt=urn:btih:${slug}repack...` : "",
                torrent: isCracked ? "#" : "",
                direct: isCracked ? `https://gofile.io/d/neoplay_${slug}` : ""
            }
        });
    });

    // === Post-loop overrides for specific games ===
    const cricket26Entry = GAMES_DATA.games.find(g => g.id === "cricket-26");
    if (cricket26Entry) {
        cricket26Entry.downloads.direct = "https://gamedrive.org/?s=Cricket+26";
        cricket26Entry.crackDate = "2026-07-01";
    }

    const acBlackFlagRemakeEntry = GAMES_DATA.games.find(g => g.id === "assassin-s-creed-iv-black-flag-remake");
    if (acBlackFlagRemakeEntry) {
        acBlackFlagRemakeEntry.downloads.direct = "https://gamedrive.org/?s=Assassins+Creed+IV+Black+Flag+Remake";
        acBlackFlagRemakeEntry.crackDate = "2026-07-17";
    }

    const mirageEntry = GAMES_DATA.games.find(g => g.id === "assassin-s-creed-mirage");
    if (mirageEntry) {
        mirageEntry.downloads.direct = "https://gamedrive.org/?s=Assassins+Creed+Mirage";
        mirageEntry.crackDate = "2026-07-17";
    }

    const shadowsEntry = GAMES_DATA.games.find(g => g.id === "assassin-s-creed-shadows");
    if (shadowsEntry) {
        shadowsEntry.downloads.direct = "https://gamedrive.org/?s=Assassins+Creed+Shadows";
        shadowsEntry.crackDate = "2026-07-17";
    }

    // Sanitize all cracked games to only keep the GameDrive direct link
    GAMES_DATA.games.forEach(game => {
        if (game.crackStatus === "Cracked" || game.crackStatus === "Bypass") {
            const cleanSearchTitle = game.title.replace(/\s*\([^)]*\)/g, "").trim();
            const isScrapedGD = game.downloads.direct && game.downloads.direct.startsWith("https://gamedrive.org/");
            game.downloads = {
                magnet: "",
                torrent: "",
                direct: isScrapedGD ? game.downloads.direct : `https://gamedrive.org/?s=${encodeURIComponent(cleanSearchTitle)}`
            };
        }
    });

    GAMES_DATA.upcomingAutoCracks.forEach(game => {
        if (game.crackStatus === "Cracked" || game.crackStatus === "Bypass") {
            const cleanSearchTitle = game.title.replace(/\s*\([^)]*\)/g, "").trim();
            game.downloads = {
                magnet: "",
                torrent: "",
                direct: `https://gamedrive.org/?s=${encodeURIComponent(cleanSearchTitle)}`
            };
        }
    });

})();
