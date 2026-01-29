/**
 * Freevee Clone - Re-developed Core Logic
 * Focus: Modularity, Speed, and Visual Polish
 */

// --- DATA: Premium Initial Set ---
const movieData = [
    // --- TRENDING NOW ---
    { id: "t1", title: "Avatar: The Way of Water", category: "trending", img: "https://upload.wikimedia.org/wikipedia/en/5/54/Avatar_The_Way_of_Water_poster.jpg", trailer: "https://www.youtube.com/embed/d9MyW72ELR0?autoplay=1&origin=http://127.0.0.1:5500", rating: "PG-13", year: "2022", type: "movie" },
    { id: "t2", title: "Top Gun: Maverick", category: "trending", img: "https://upload.wikimedia.org/wikipedia/en/1/13/Top_Gun_Maverick_Poster.jpg", trailer: "https://www.youtube.com/embed/giXco2jaZ_4?autoplay=1", rating: "PG-13", year: "2022", type: "movie" },
    { id: "t3", title: "Oppenheimer", category: "trending", img: "https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg", trailer: "https://www.youtube.com/embed/uYPbbksJxIg?autoplay=1", rating: "R", year: "2023", type: "movie" },
    { id: "t4", title: "Everything Everywhere All at Once", category: "trending", img: "https://upload.wikimedia.org/wikipedia/en/1/1e/Everything_Everywhere_All_at_Once.jpg", trailer: "https://www.youtube.com/embed/wxN1T1uxQ2g?autoplay=1", rating: "R", year: "2022", type: "movie" },

    // --- ACTION ---
    { id: "a1", title: "John Wick", category: "action", img: "https://upload.wikimedia.org/wikipedia/en/9/98/John_Wick_TeaserPoster.jpg", trailer: "https://www.youtube.com/embed/C0BMxPqM-tE?autoplay=1", rating: "R", year: "2014", type: "movie" },
    { id: "a2", title: "Mad Max: Fury Road", category: "action", img: "https://upload.wikimedia.org/wikipedia/en/6/6e/Mad_Max_Fury_Road.jpg", trailer: "https://www.youtube.com/embed/hEJnMQG9ev8?autoplay=1", rating: "R", year: "2015", type: "movie" },
    { id: "a3", title: "The Dark Knight", category: "action", img: "https://upload.wikimedia.org/wikipedia/en/8/8a/Dark_Knight.jpg", trailer: "https://www.youtube.com/embed/EXe4O3jP6pM?autoplay=1", rating: "PG-13", year: "2008", type: "movie" },
    { id: "a4", title: "Extraction", category: "action", img: "https://upload.wikimedia.org/wikipedia/en/8/89/Extraction_%282020_film%29_poster.jpg", trailer: "https://www.youtube.com/embed/L6P3nI6VnlY?autoplay=1", rating: "R", year: "2020", type: "movie" },
    { id: "a5", title: "Mission: Impossible – Fallout", category: "action", img: "https://upload.wikimedia.org/wikipedia/en/f/ff/Mission_Impossible_Fallout.jpg", trailer: "https://www.youtube.com/embed/wb4dgCJOd2Q?autoplay=1", rating: "PG-13", year: "2018", type: "movie" },
    { id: "a6", title: "Gladiator", category: "action", img: "https://upload.wikimedia.org/wikipedia/en/f/fb/Gladiator_%282000_film%29_poster.jpg", trailer: "https://www.youtube.com/embed/I_i_0-I631Q?autoplay=1", rating: "R", year: "2000", type: "movie" },
    { id: "a7", title: "War (Hindi)", category: "action", img: "https://upload.wikimedia.org/wikipedia/en/6/6f/War_official_poster.jpg", trailer: "https://www.youtube.com/embed/tQ0mzXRk-oM?autoplay=1", rating: "UA", year: "2019", type: "movie" },
    { id: "a8", title: "KGF Chapter 1", category: "action", img: "https://upload.wikimedia.org/wikipedia/en/c/cc/K.G.F_Chapter_1_poster.jpg", trailer: "https://www.youtube.com/embed/qXgF-iJ_ezE?autoplay=1", rating: "UA", year: "2018", type: "movie" },
    { id: "a9", title: "KGF Chapter 2", category: "action", img: "https://upload.wikimedia.org/wikipedia/en/d/d0/K.G.F_Chapter_2_poster.jpg", trailer: "https://www.youtube.com/embed/JKa05nyUmuQ?autoplay=1", rating: "UA", year: "2022", type: "movie" },
    { id: "a10", title: "Pushpa: The Rise", category: "action", img: "https://upload.wikimedia.org/wikipedia/en/7/75/Pushpa_The_Rise_poster.jpg", trailer: "https://www.youtube.com/embed/QX43QTYyV-8?autoplay=1", rating: "UA", year: "2021", type: "movie" },

    // --- SCI-FI ---
    { id: "s1", title: "Interstellar", category: "scifi", img: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg", trailer: "https://www.youtube.com/embed/zSWdZVtXT7E?autoplay=1", rating: "PG-13", year: "2014", type: "movie" },
    { id: "s2", title: "Inception", category: "scifi", img: "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg", trailer: "https://www.youtube.com/embed/YoHD9XEInc0?autoplay=1", rating: "PG-13", year: "2010", type: "movie" },
    { id: "s3", title: "The Matrix", category: "scifi", img: "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg", trailer: "https://www.youtube.com/embed/vKQi3bBA1y8?autoplay=1", rating: "R", year: "1999", type: "movie" },
    { id: "s4", title: "Avatar", category: "scifi", img: "https://upload.wikimedia.org/wikipedia/en/d/d6/Avatar_%282009_film%29_poster.jpg", trailer: "https://www.youtube.com/embed/5PSNL1qE6VY?autoplay=1", rating: "PG-13", year: "2009", type: "movie" },
    { id: "s5", title: "Tenet", category: "scifi", img: "https://images.unsplash.com/photo-1527224857853-e3df217f98c7?w=800", trailer: "https://www.youtube.com/embed/LdOM0x0XDvA?autoplay=1", rating: "PG-13", year: "2020", type: "movie" },
    { id: "s6", title: "Gravity", category: "scifi", img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800", trailer: "https://www.youtube.com/embed/OiTiKO58ERg?autoplay=1", rating: "PG-13", year: "2013", type: "movie" },
    { id: "s7", title: "The Martian", category: "scifi", img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800", trailer: "https://www.youtube.com/embed/ej3ioOneTy8?autoplay=1", rating: "PG-13", year: "2015", type: "movie" },
    { id: "s8", title: "Dune", category: "scifi", img: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=800", trailer: "https://www.youtube.com/embed/8g18jJcl_v8?autoplay=1", rating: "PG-13", year: "2021", type: "movie" },

    // --- HORROR ---
    { id: "h1", title: "The Conjuring", category: "horror", img: "https://images.unsplash.com/photo-1505635330303-d3f135ad0d9d?w=800", trailer: "https://www.youtube.com/embed/k10ETZ41q5o?autoplay=1", rating: "R", year: "2013", type: "movie" },
    { id: "h2", title: "Insidious", category: "horror", img: "https://images.unsplash.com/photo-1505635330303-d3f135ad0d9d?w=800", trailer: "https://www.youtube.com/embed/zuZnRUcoWos?autoplay=1", rating: "PG-13", year: "2010", type: "movie" },
    { id: "h3", title: "A Quiet Place", category: "horror", img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800", trailer: "https://www.youtube.com/embed/WR7Nf6iN8iE?autoplay=1", rating: "PG-13", year: "2018", type: "movie" },
    { id: "h4", title: "Hereditary", category: "horror", img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800", trailer: "https://www.youtube.com/embed/V6YhYh2z3vQ?autoplay=1", rating: "R", year: "2018", type: "movie" },
    { id: "h5", title: "It", category: "horror", img: "https://images.unsplash.com/photo-1505635330303-d3f135ad0d9d?w=800", trailer: "https://www.youtube.com/embed/FnCdOVs_X5E?autoplay=1", rating: "R", year: "2017", type: "movie" },
    { id: "h6", title: "Get Out", category: "horror", img: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800", trailer: "https://www.youtube.com/embed/DzfpyUB60YY?autoplay=1", rating: "R", year: "2017", type: "movie" },

    // --- ROMANCE ---
    { id: "r1", title: "Titanic", category: "romance", img: "https://images.unsplash.com/photo-1516589174184-e660e487494a?w=800", trailer: "https://www.youtube.com/embed/kVrqfYjkTdQ?autoplay=1", rating: "PG-13", year: "1997", type: "movie" },
    { id: "r2", title: "The Notebook", category: "romance", img: "https://images.unsplash.com/photo-1516589174184-e660e487494a?w=800", trailer: "https://www.youtube.com/embed/ce.png?autoplay=1", rating: "PG-13", year: "2004", type: "movie" },
    { id: "r3", title: "La La Land", category: "romance", img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800", trailer: "https://www.youtube.com/embed/0pdqf4P9MB8?autoplay=1", rating: "PG-13", year: "2016", type: "movie" },
    { id: "r4", title: "Pride & Prejudice", category: "romance", img: "https://images.unsplash.com/photo-1516589174184-e660e487494a?w=800", trailer: "https://www.youtube.com/embed/1dY1O9s4JdI?autoplay=1", rating: "PG", year: "2005", type: "movie" },
    { id: "r5", title: "Sita Ramam", category: "romance", img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800", trailer: "https://www.youtube.com/embed/uBw_M_R74oU?autoplay=1", rating: "UA", year: "2022", type: "movie" },
    { id: "r6", title: "Dilwale Dulhania Le Jayenge", category: "romance", img: "https://images.unsplash.com/photo-1516589174184-e660e487494a?w=800", trailer: "https://www.youtube.com/embed/c25GKl5VNeY?autoplay=1", rating: "UA", year: "1995", type: "movie" },

    // --- COMEDY ---
    { id: "c1", title: "The Hangover", category: "comedy", img: "https://images.unsplash.com/photo-1527224857853-e3df217f98c7?w=800", trailer: "https://www.youtube.com/embed/tcdUhdOlz9M?autoplay=1", rating: "R", year: "2009", type: "movie" },
    { id: "c2", title: "3 Idiots", category: "comedy", img: "https://images.unsplash.com/photo-1527224857853-e3df217f98c7?w=800", trailer: "https://www.youtube.com/embed/K0eDlFX9Gmc?autoplay=1", rating: "UA", year: "2009", type: "movie" },
    { id: "c3", title: "Superbad", category: "comedy", img: "https://images.unsplash.com/photo-1527224857853-e3df217f98c7?w=800", trailer: "https://www.youtube.com/embed/MNr3qD19m2Y?autoplay=1", rating: "R", year: "2007", type: "movie" },
    { id: "c4", title: "Jathi Ratnalu", category: "comedy", img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800", trailer: "https://www.youtube.com/embed/QfP4aZ2a4bE?autoplay=1", rating: "UA", year: "2021", type: "movie" },
    { id: "c5", title: "Home Alone", category: "comedy", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800", trailer: "https://www.youtube.com/embed/jEDaVHmw7r4?autoplay=1", rating: "PG", year: "1990", type: "movie" },

    // --- DRAMA ---
    { id: "d1", title: "The Shawshank Redemption", category: "drama", img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800", trailer: "https://www.youtube.com/embed/6hB3S9bIaco?autoplay=1", rating: "R", year: "1994", type: "movie" },
    { id: "d2", title: "Forrest Gump", category: "drama", img: "https://images.unsplash.com/photo-1505635330303-d3f135ad0d9d?w=800", trailer: "https://www.youtube.com/embed/bLvqoHBptjg?autoplay=1", rating: "PG-13", year: "1994", type: "movie" },
    { id: "d3", title: "Parasite", category: "drama", img: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800", trailer: "https://www.youtube.com/embed/5xH0HfJHsaY?autoplay=1", rating: "R", year: "2019", type: "movie" },
    { id: "d4", title: "Slumdog Millionaire", category: "drama", img: "https://images.unsplash.com/photo-1527224857853-e3df217f98c7?w=800", trailer: "https://www.youtube.com/embed/AIzbwV7on6Q?autoplay=1", rating: "R", year: "2008", type: "movie" },
    { id: "d5", title: "The Social Network", category: "drama", img: "https://images.unsplash.com/photo-1505635330303-d3f135ad0d9d?w=800", trailer: "https://www.youtube.com/embed/lB95KLmpLR4?autoplay=1", rating: "PG-13", year: "2010", type: "movie" },

    // --- THRILLER ---
    { id: "th1", title: "Se7en", category: "thriller", img: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=800", trailer: "https://www.youtube.com/embed/znmZoVkCjpI?autoplay=1", rating: "R", year: "1995", type: "movie" },
    { id: "th2", title: "Gone Girl", category: "thriller", img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800", trailer: "https://www.youtube.com/embed/Ym3LB0lOJ0o?autoplay=1", rating: "R", year: "2014", type: "movie" },
    { id: "th3", title: "Shutter Island", category: "thriller", img: "https://images.unsplash.com/photo-1505635330303-d3f135ad0d9d?w=800", trailer: "https://www.youtube.com/embed/5iaYLCiq5RM?autoplay=1", rating: "R", year: "2010", type: "movie" },
    { id: "th4", title: "Drishyam", category: "thriller", img: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800", trailer: "https://www.youtube.com/embed/AuuX2j14NBg?autoplay=1", rating: "UA", year: "2015", type: "movie" },
    { id: "th5", title: "The Silence of the Lambs", category: "thriller", img: "https://images.unsplash.com/photo-1542204172-3c35bba98807?w=800", trailer: "https://www.youtube.com/embed/W6Mm8Sbe__o?autoplay=1", rating: "R", year: "1991", type: "movie" },

    // --- FAMILY ---
    { id: "fm1", title: "The Lion King", category: "family", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800", trailer: "https://www.youtube.com/embed/7TavVZMewpY?autoplay=1", rating: "G", year: "1994", type: "movie" },
    { id: "fm2", title: "Coco", category: "family", img: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800", trailer: "https://www.youtube.com/embed/Rvr68u6k5sI?autoplay=1", rating: "PG", year: "2017", type: "movie" },
    { id: "fm3", title: "Frozen", category: "family", img: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=800", trailer: "https://www.youtube.com/embed/TbQm5doF_40?autoplay=1", rating: "PG", year: "2013", type: "movie" },
    { id: "fm4", title: "Toy Story", category: "family", img: "https://images.unsplash.com/photo-1596727147705-54a9d0c326e5?w=800", trailer: "https://www.youtube.com/embed/v-PjgYDrg70?autoplay=1", rating: "G", year: "1995", type: "movie" },
    { id: "fm5", title: "Encanto", category: "family", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800", trailer: "https://www.youtube.com/embed/CaimKeDcado?autoplay=1", rating: "PG", year: "2021", type: "movie" },

    // --- FANTASY ---
    { id: "f1", title: "Harry Potter Series", category: "fantasy", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800", trailer: "https://www.youtube.com/embed/VyHV0BRtdxo?autoplay=1", rating: "PG-13", year: "2001", type: "movie" },
    { id: "f2", title: "Lord of the Rings", category: "fantasy", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800", trailer: "https://www.youtube.com/embed/V75dMMIW2B4?autoplay=1", rating: "PG-13", year: "2001", type: "movie" },
    { id: "f3", title: "Baahubali: The Beginning", category: "fantasy", img: "https://images.unsplash.com/photo-1542204172-3c35bba98807?w=800", trailer: "https://www.youtube.com/embed/VdajsTgMCRs?autoplay=1", rating: "UA", year: "2015", type: "movie" },
    { id: "f4", title: "Baahubali: The Conclusion", category: "fantasy", img: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800", trailer: "https://www.youtube.com/embed/G62HrubdM5o?autoplay=1", rating: "UA", year: "2017", type: "movie" },

    // --- LIVE ---
    { id: "l1", title: "Action Movies Live", category: "live", img: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800", trailer: "https://www.youtube.com/embed/hEJnMQG9ev8?autoplay=1", rating: "LIVE", year: "2024", type: "tv" }
];

// --- CORE APP CONTROLLER ---
const FreeveeApp = {
    state: {
        watchlist: JSON.parse(localStorage.getItem('freevee_watchlist')) || [],
        searchQuery: ''
    },

    init() {
        this.handleSplash();
        this.bindEvents();
        this.renderAll();
    },

    handleSplash() {
        const progress = document.getElementById('loader-progress');
        const splash = document.getElementById('splash');
        const app = document.getElementById('app-content');

        setTimeout(() => {
            progress.style.width = '100%';
        }, 100);

        setTimeout(() => {
            splash.style.opacity = '0';
            setTimeout(() => {
                splash.classList.add('hidden');
                app.classList.remove('hidden');
                app.style.animation = 'fadeIn 1s ease-out forwards';
            }, 500);
        }, 2200);
    },

    bindEvents() {
        // Sticky Header Logic
        window.addEventListener('scroll', () => {
            const nav = document.getElementById('navbar');
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // Close Player
        document.getElementById('close-player').addEventListener('click', () => {
            const modal = document.getElementById('player-modal');
            const video = document.getElementById('video-element');
            modal.classList.remove('active');
            video.pause();
        });

        // Hero Interaction
        const heroPlayBtn = document.getElementById('hero-play');
        const heroAddListBtn = document.getElementById('hero-add-list');
        const heroId = 't1'; // Avatar ID

        if (heroPlayBtn) {
            heroPlayBtn.addEventListener('click', () => {
                const hero = movieData.find(m => m.id === heroId);
                this.playVideo(hero);
            });
        }

        if (heroAddListBtn) {
            heroAddListBtn.addEventListener('click', () => {
                this.toggleWatchlist(heroId);
                // Update button state text
                const inList = this.state.watchlist.includes(heroId);
                heroAddListBtn.innerHTML = inList
                    ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Added`
                    : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"></path></svg> Add to List`;
            });

            // Initial state check
            const inList = this.state.watchlist.includes(heroId);
            if (inList) {
                heroAddListBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Added`;
            }
        }

        // Search Interaction
        const searchTrigger = document.getElementById('search-trigger');
        const closeSearch = document.getElementById('close-search');
        const searchInput = document.getElementById('search-input');
        const searchContainer = document.querySelector('.search-container');

        if (searchTrigger && closeSearch && searchInput) {
            searchTrigger.addEventListener('click', () => {
                searchContainer.classList.add('active');
                searchTrigger.classList.add('hidden');
                closeSearch.classList.remove('hidden');
                searchInput.focus();
            });

            closeSearch.addEventListener('click', () => {
                searchContainer.classList.remove('active');
                searchTrigger.classList.remove('hidden');
                closeSearch.classList.add('hidden');
                searchInput.value = '';
                this.handleSearch('');
            });

            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        // Watchlist Nav Button
        const watchlistBtn = document.getElementById('nav-watchlist-btn');
        if (watchlistBtn) {
            watchlistBtn.addEventListener('click', () => {
                const myListRow = document.getElementById('row-mylist');
                if (myListRow) {
                    myListRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else {
                    this.showToast('Your watchlist is empty', 'info');
                }
            });
        }
    },

    handleSearch(query) {
        this.state.searchQuery = query.toLowerCase();
        this.renderAll();
    },

    toggleWatchlist(id) {
        const index = this.state.watchlist.indexOf(id);
        if (index === -1) {
            this.state.watchlist.push(id);
            this.showToast('Added to Watchlist');
        } else {
            this.state.watchlist.splice(index, 1);
            this.showToast('Removed from Watchlist');
        }
        localStorage.setItem('freevee_watchlist', JSON.stringify(this.state.watchlist));
        this.renderAll();
    },

    showToast(message) {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--accent-primary)" stroke="none">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
            </svg>
            <span>${message}</span>
        `;
        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('removing');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    renderAll() {
        const container = document.getElementById('rows-container');

        // Search Mode
        if (this.state.searchQuery.length > 0) {
            const results = movieData.filter(m =>
                m.title.toLowerCase().includes(this.state.searchQuery) ||
                m.category.includes(this.state.searchQuery)
            );

            if (results.length === 0) {
                container.innerHTML = `<div class="container" style="padding-top: 2rem; text-align: center;"><h2>No results found</h2><p>Try searching for something else.</p></div>`;
                return;
            }

            container.innerHTML = `
                <div class="row">
                    <h2>Search Results</h2>
                    <div class="cards-container" style="display: flex; flex-wrap: wrap; overflow: visible;">
                        ${results.map(movie => this.createMovieCardHTML(movie)).join('')}
                    </div>
                </div>
            `;
            return;
        }

        // Standard Mode
        let rowsHTML = '';

        // My List Row
        if (this.state.watchlist.length > 0) {
            const mylistMovies = movieData.filter(m => this.state.watchlist.includes(m.id));
            if (mylistMovies.length > 0) {
                rowsHTML += `
                    <div class="row" id="row-mylist">
                        <h2>My List</h2>
                        <div class="cards-container">
                             ${mylistMovies.map(movie => this.createMovieCardHTML(movie)).join('')}
                        </div>
                    </div>
                `;
            }
        }

        // Categories
        const categories = [
            { title: "Trending Now", category: "trending" },
            { title: "Action & Adventure", category: "action" },
            { title: "Sci-Fi Dimensions", category: "scifi" },
            { title: "Horror Nights", category: "horror" },
            { title: "Romance", category: "romance" },
            { title: "Laugh Out Loud", category: "comedy" },
            { title: "Critically Acclaimed Dramas", category: "drama" },
            { title: "Thriller & Crime", category: "thriller" },
            { title: "Family & Kids", category: "family" },
            { title: "Fantasy Worlds", category: "fantasy" },
            { title: "Live Channels", category: "live" }
        ];

        rowsHTML += categories.map(row => this.createRowHTML(row)).join('');
        container.innerHTML = rowsHTML;
    },

    createRowHTML(row) {
        const filteredMovies = movieData.filter(m => m.category === row.category);
        if (filteredMovies.length === 0) return '';

        return `
            <div class="row">
                <h2>${row.title}</h2>
                <div class="cards-container">
                    ${filteredMovies.map(movie => this.createMovieCardHTML(movie)).join('')}
                </div>
            </div>
        `;
    },

    createMovieCardHTML(movie) {
        const inWatchlist = this.state.watchlist.includes(movie.id);
        const iconPath = inWatchlist
            ? "M5 13l4 4L19 7" // Checkmark
            : "M12 5v14M5 12h14"; // Plus

        return `
            <div class="movie-card" 
                 onclick="FreeveeApp.playVideoById('${movie.id}')"
                 onmouseenter="FreeveeApp.handleCardHover(this, true, '${movie.id}')"
                 onmouseleave="FreeveeApp.handleCardHover(this, false, '${movie.id}')">
                <img src="${movie.img}" alt="${movie.title}" loading="lazy">
                <div class="preview-container"></div>
                <div class="card-overlay">
                    <p class="card-title">${movie.title}</p>
                    <div class="card-meta">
                        <span>${movie.year}</span>
                        <span>•</span>
                        <span>${movie.rating}</span>
                    </div>
                    <div class="card-actions">
                        <button class="action-circle" title="Play" onclick="event.stopPropagation(); FreeveeApp.playVideoById('${movie.id}')">
                             <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg>
                        </button>
                        <button class="action-circle" title="${inWatchlist ? 'Remove from List' : 'Add to List'}" 
                                onclick="event.stopPropagation(); FreeveeApp.toggleWatchlist('${movie.id}')"
                                style="${inWatchlist ? 'background: var(--accent-primary); color: var(--bg-dark);' : ''}">
                             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                 <path d="${iconPath}"></path>
                             </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    handleCardHover(el, isEnter, movieId) {
        const container = el.querySelector('.preview-container');
        if (!container) return;

        if (isEnter) {
            el.hoverTimeout = setTimeout(() => {
                const movie = movieData.find(m => m.id === movieId);
                if (movie && movie.trailer && movie.trailer.includes('youtube.com')) {
                    // Optimized YouTube Embed for Preview
                    // controls=0, disablekb=1, fs=0, modestbranding=1, iv_load_policy=3 (no annotations)
                    // mute=1 is required for autoplay in most browsers
                    const embedUrl = movie.trailer.split('?')[0] + '?autoplay=1&mute=1&controls=0&disablekb=1&fs=0&modestbranding=1&iv_load_policy=3&loop=1';

                    container.innerHTML = `<iframe src="${embedUrl}" allow="autoplay" frameborder="0"></iframe>`;
                    el.classList.add('playing');
                }
            }, 800); // 800ms delay to prevent accidental triggers/flashing
        } else {
            clearTimeout(el.hoverTimeout);
            container.innerHTML = ''; // Destroy iframe immediately to stop audio/video
            el.classList.remove('playing');
        }
    },

    playVideoById(id) {
        const movie = movieData.find(m => m.id === id);
        if (movie) this.playVideo(movie);
    },

    playVideo(movie) {
        const modal = document.getElementById('player-modal');
        const wrapper = modal.querySelector('.video-wrapper') || modal.querySelector('.video-container'); // Fallback if wrapper changes

        // Reset container content
        if (!wrapper) return;
        wrapper.innerHTML = '';

        if (movie.trailer && (movie.trailer.includes('youtube.com') || movie.trailer.includes('youtu.be'))) {
            // Create Iframe for YouTube
            const iframe = document.createElement('iframe');
            iframe.src = movie.trailer;
            iframe.title = "YouTube video player";
            iframe.frameBorder = "0";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
            iframe.allowFullscreen = true;
            wrapper.appendChild(iframe);
        } else {
            // Create Video Element for Files
            const video = document.createElement('video');
            video.id = 'video-element';
            video.controls = true;
            video.autoplay = true;
            video.muted = false; // Unmute by default for modal

            const source = document.createElement('source');
            source.src = movie.trailer;
            source.type = 'video/mp4';

            video.appendChild(source);
            wrapper.appendChild(video);

            video.play().catch(e => console.log("Auto-play blocked", e));
        }

        modal.classList.add('active');
    }
};

// Start the App
document.addEventListener('DOMContentLoaded', () => FreeveeApp.init());
