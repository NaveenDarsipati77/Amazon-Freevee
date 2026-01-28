// Watchlist state
let watchlist = [];

const profiles = [
    { name: "Naveen", seed: "Naveen", color: "var(--primary-color)" },
    { name: "Suresh", seed: "Suresh", color: "#e50914" },
    { name: "Kids", seed: "Felix", color: "#00a8e1" },
    { name: "Guest", seed: "Aneka", color: "#22c55e" }
];

let activeProfile = profiles[0];

// Navigation handler
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            const category = link.textContent.toLowerCase();
            filterContent(category);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

// Video Player Handler
function openVideoPlayer(title, trailerUrl) {
    const modal = document.getElementById('video-player-modal');
    const video = document.getElementById('main-video');
    const titleElement = document.getElementById('playing-title');

    modal.classList.add('active');
    titleElement.textContent = `Now Playing: ${title}`;

    // Find trailer if URL wasn't provided (fallback)
    const url = trailerUrl ||
        movieData.find(m => m.title.toLowerCase() === title.toLowerCase())?.trailer ||
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

    video.src = url;
    video.play();
}

function closeVideoPlayer() {
    const modal = document.getElementById('video-player-modal');
    const video = document.getElementById('main-video');

    modal.classList.remove('active');
    video.pause();
    video.src = "";
}

function initVideoPlayer() {
    const closeBtn = document.getElementById('close-player');
    const modal = document.getElementById('video-player-modal');

    closeBtn.addEventListener('click', closeVideoPlayer);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeVideoPlayer();
        }
    });

    // Event delegation for movie cards
    const container = document.querySelector('.row-container');
    if (container) {
        container.addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            if (card) {
                const title = card.dataset.title;
                const trailer = card.dataset.trailer;
                if (title) {
                    openVideoPlayer(title, trailer);
                }
            }
        });
    }

    // Keyboard support - Escape to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeVideoPlayer();
        }
    });
}

// Hero buttons handler
function initHeroButtons() {
    let heroButtonsContainer = document.querySelector('.hero-buttons');
    if (!heroButtonsContainer) return;

    // Remove old listener if any to prevent duplicates
    const newContainer = heroButtonsContainer.cloneNode(true);
    heroButtonsContainer.parentNode.replaceChild(newContainer, heroButtonsContainer);
    heroButtonsContainer = newContainer; // Update reference to the new element

    heroButtonsContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn');
        if (!btn) return;

        const titleEl = document.querySelector('.hero-title');
        const currentTitle = titleEl ? titleEl.textContent.trim() : "";
        const btnText = (btn.innerText || btn.textContent || "").trim().toLowerCase();

        console.log(`Hero button clicked: "${btnText}" for movie: "${currentTitle}"`);

        if (btn.classList.contains('btn-primary')) {
            // Watch/Play action
            if (btnText.includes('watch') || btnText.includes('play') || btnText.includes('s1 e1')) {
                const movie = movieData.find(m => m.title.toLowerCase() === currentTitle.toLowerCase()) ||
                    movieData.find(m => currentTitle.toLowerCase().includes(m.title.toLowerCase()));

                console.log(`Found movie:`, movie);
                openVideoPlayer(currentTitle, movie?.trailer);
            } else if (btnText.includes('manage')) {
                alert('Watchlist management features are coming soon!');
            }
        }
        else if (btn.classList.contains('btn-secondary')) {
            // Add to List action
            const movie = movieData.find(m => m.title.toLowerCase() === currentTitle.toLowerCase());
            if (!movie) return;

            const index = watchlist.findIndex(m => m.title.toLowerCase() === currentTitle.toLowerCase());
            const isAdded = index === -1;

            if (isAdded) {
                watchlist.push(movie);
                btn.classList.add('added');
            } else {
                watchlist.splice(index, 1);
                btn.classList.remove('added');
            }

            btn.innerHTML = !isAdded
                ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg> Add to List`
                : `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Added`;
        }
    });
}

// Profile card handler
function initProfileCard() {
    const trigger = document.getElementById('profile-trigger');
    const card = document.getElementById('profile-card');
    const profileImg = trigger.querySelector('img');
    const activeAvatar = document.getElementById('active-avatar');
    const activeName = document.getElementById('active-name');

    // Dynamically render the profiles grid in the dropdown
    renderDropdownProfiles();

    function renderDropdownProfiles() {
        const grid = document.querySelector('.profiles-grid');
        if (!grid) return;

        grid.innerHTML = profiles.map(p => `
            <div class="profile-item ${p.name === activeProfile.name ? 'active' : ''}" data-name="${p.name}" data-seed="${p.seed}">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${p.seed}" alt="${p.name}">
                <span>${p.name}</span>
            </div>
        `).join('') + `
            <div class="profile-item add-profile">
                <div class="add-icon">+</div>
                <span>Add New</span>
            </div>
        `;

        // Re-attach listeners to new elements
        const profileItems = grid.querySelectorAll('.profile-item:not(.add-profile)');
        profileItems.forEach(item => {
            item.addEventListener('click', () => {
                const name = item.dataset.name;
                const seed = item.dataset.seed;
                activeProfile = profiles.find(p => p.name === name);
                const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;

                // Update active profiles in UI
                profileItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                // Update main navigations
                profileImg.src = avatarUrl;
                activeAvatar.src = avatarUrl;
                activeName.textContent = name;
                document.querySelector('.sidebar-user-name').textContent = name;

                console.log(`Switched to profile: ${name}`);
            });
        });

        const addBtn = grid.querySelector('.add-profile');
        addBtn.addEventListener('click', () => {
            const newName = prompt('Enter profile name:');
            if (newName) {
                profiles.push({ name: newName, seed: newName, color: '#fff' });
                renderDropdownProfiles();
            }
        });
    }

    profileImg.addEventListener('click', (e) => {
        e.stopPropagation();
        card.classList.toggle('active');
    });



    document.addEventListener('click', (e) => {
        if (!card.contains(e.target) && e.target !== profileImg) {
            card.classList.remove('active');
        }
    });

    // Sign out button
    const signOut = card.querySelector('.sign-out');
    signOut.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Are you sure you want to sign out?')) {
            document.getElementById('main-app').classList.add('hidden');
            document.getElementById('landing-page').classList.remove('hidden');
            card.classList.remove('active');
            console.log('User signed out');
        }
    });

    // Edit Profile Button (in profile card header)
    const editActiveProfileBtn = document.querySelector('.edit-profile-btn');
    if (editActiveProfileBtn) {
        editActiveProfileBtn.addEventListener('click', () => {
            const newName = prompt('Enter new profile name:', activeProfile.name);
            if (newName && newName.trim()) {
                const name = newName.trim();
                activeProfile.name = name;

                // Update UI
                activeName.textContent = name;
                document.querySelector('.sidebar-user-name').textContent = name;
                document.getElementById('edit-username').value = name;

                // Update in profile item list
                const activeItem = document.querySelector('.profile-item.active span');
                if (activeItem) activeItem.textContent = name;

                console.log(`Profile name updated to: ${name}`);
            }
        });
    }

    // Account Settings Modal Logic
    const accountTrigger = document.getElementById('account-settings-trigger');
    const accountModal = document.getElementById('account-modal');
    const closeAccountModal = document.getElementById('close-account-modal');
    const saveUsernameBtn = document.getElementById('save-username');
    const editUsernameInput = document.getElementById('edit-username');

    accountTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        accountModal.style.display = 'flex';
        card.classList.remove('active'); // Close profile card
    });

    closeAccountModal.addEventListener('click', () => {
        accountModal.style.display = 'none';
        card.classList.add('active'); // Go back to the profile card
    });

    window.addEventListener('click', (e) => {
        if (e.target === accountModal) {
            accountModal.style.display = 'none';
        }
    });

    saveUsernameBtn.addEventListener('click', () => {
        const newName = editUsernameInput.value.trim();
        if (newName) {
            // Update UI globally
            activeName.textContent = newName;
            // Also update the active profile item name if it exists
            const activeProfileItem = document.querySelector('.profile-item.active span');
            if (activeProfileItem) activeProfileItem.textContent = newName;

            // Update dashboard sidebar name
            const sidebarName = document.querySelector('.sidebar-user-name');
            if (sidebarName) sidebarName.textContent = newName;

            // Update activeProfile object
            activeProfile.name = newName;

            // Visual feedback
            saveUsernameBtn.textContent = 'Saved!';
            saveUsernameBtn.style.background = '#00a8e1';

            setTimeout(() => {
                saveUsernameBtn.textContent = 'Save';
                saveUsernameBtn.style.background = 'var(--primary-color)';
                accountModal.style.display = 'none';
            }, 1000);

            console.log(`Username updated to: ${newName}`);
        }
    });

    // Dashboard Switching Logic
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            sidebarLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Find the requested section (mocking content change)
            const sectionTitle = link.textContent.trim();
            const mainContent = document.querySelector('.dashboard-main');

            // If it's not Profile Info, show a "Coming Soon" or empty state
            if (sectionTitle !== 'Profile Info') {
                mainContent.innerHTML = `
                    <section class="dashboard-section active">
                        <div class="section-header">
                            <h1>${sectionTitle}</h1>
                        </div>
                        <div class="empty-dashboard-state">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 64px; height: 64px; opacity: 0.2; margin-bottom: 20px;">
                                <circle cx="12" cy="12" r="10"/>
                                <line x1="12" y1="8" x2="12" y2="12"/>
                                <line x1="12" y1="16" x2="12.01" y2="16"/>
                            </svg>
                            <p>This section is currently under construction. Check back soon for more updates!</p>
                            <button class="btn btn-secondary back-to-profile">Back to Profile</button>
                        </div>
                    </section>
                `;

                document.querySelector('.back-to-profile').addEventListener('click', () => {
                    sidebarLinks[0].click(); // Click Profile Info
                });
            } else {
                // Restore original Profile Info content (simplification: reloading might be needed or storing it)
                location.reload(); // Quick way to restore for this demo, or I could cache the HTML
            }
        });
    });

    // Manage Profiles Trigger
    const manageProfilesTrigger = document.getElementById('manage-profiles-trigger');
    if (manageProfilesTrigger) {
        manageProfilesTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('main-app').classList.add('hidden');
            document.getElementById('profile-selection').classList.remove('hidden');
            renderProfileSelection();
        });
    }

    const selectionManageBtn = document.querySelector('.manage-profiles-btn');
    if (selectionManageBtn) {
        selectionManageBtn.addEventListener('click', () => {
            const screen = document.getElementById('profile-selection');
            screen.classList.toggle('manage-mode');
            selectionManageBtn.classList.toggle('active');
            selectionManageBtn.textContent = screen.classList.contains('manage-mode') ? 'Done' : 'Manage Profiles';
        });
    }
}

// Search handler
function initSearch() {
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length > 2) {
            const results = movieData.filter(m => m.title.toLowerCase().includes(query));
            showSearchResults(results, query);
        } else if (query.length === 0) {
            filterContent('home');
        }
    });
}

function showSearchResults(results, query) {
    const container = document.querySelector('.row-container');
    container.innerHTML = `
        <div class="row">
            <h2 class="row-header">Search Results for "${query}"</h2>
            <div class="cards-scroll">
                ${results.length > 0
            ? results.map(m => createMovieCardHTML(m)).join('')
            : '<p style="color: var(--text-dim); padding: 40px;">No exact matches found. Try browsing our categories!</p>'}
            </div>
        </div>
    `;
}

const movieData = [
    {
        title: "Dark Whisper",
        img: "https://images.unsplash.com/photo-1440339738560-7ea831bc5244?auto=format&fit=crop&q=80&w=1000",
        trailer: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        rating: "TV-14",
        year: "2025",
        type: "movie"
    },
    {
        title: "Up All Night",
        img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1000",
        trailer: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        rating: "TV-PG",
        year: "2024",
        type: "tv"
    },
    {
        title: "Velocity",
        img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000",
        trailer: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        rating: "PG-13",
        year: "2026",
        type: "movie"
    },
    {
        title: "Neon Horizon",
        img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=2070",
        trailer: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        rating: "TV-MA",
        year: "2026",
        type: "tv"
    },
    {
        title: "Eternal Autumn",
        img: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=1000",
        trailer: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        rating: "PG-13",
        year: "2025",
        type: "movie"
    },
    {
        title: "The Silent House",
        img: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=1000",
        trailer: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        rating: "R",
        year: "2024",
        type: "movie"
    },
    {
        title: "Our Planet: Oceans",
        img: "https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&q=80&w=1000",
        trailer: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        rating: "TV-G",
        year: "2025",
        type: "tv"
    },
    {
        title: "Sky Pirates",
        img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1000",
        trailer: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackAds.mp4",
        rating: "PG",
        year: "2026",
        type: "tv"
    },
    {
        title: "Cyber Strike",
        img: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=1000",
        trailer: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        rating: "TV-MA",
        year: "2026",
        type: "movie"
    },
    {
        title: "Alpine Escape",
        img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000",
        trailer: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        rating: "PG",
        year: "2024",
        type: "movie"
    },
    {
        title: "Lost in Time",
        img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1000",
        trailer: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        rating: "TV-PG",
        year: "2025",
        type: "tv"
    },
    {
        title: "Grand Prix Royale",
        img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000",
        trailer: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        rating: "TV-14",
        year: "2026",
        type: "movie"
    },
    {
        title: "LIVE: NEWS NOW",
        img: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80&w=2070",
        trailer: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        rating: "LIVE",
        year: "2026",
        type: "tv"
    }
];

const heroImage = "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=2070";

const renderProfileSelection = () => {
    const grid = document.getElementById('selection-grid');
    if (!grid) return;

    grid.innerHTML = profiles.map(p => `
        <div class="selection-profile" data-name="${p.name}">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${p.seed}" alt="${p.name}" style="border-color: ${p.color}">
            <span>${p.name}</span>
        </div>
    `).join('') + `
        <div class="selection-profile add-profile-choice">
            <div class="add-icon-large">+</div>
            <span>Add Profile</span>
        </div>
    `;

    document.querySelectorAll('.selection-profile').forEach(el => {
        el.addEventListener('click', () => {
            if (el.classList.contains('add-profile-choice')) {
                const newName = prompt('Enter profile name:');
                if (newName) {
                    profiles.push({ name: newName, seed: newName, color: '#fff' });
                    renderProfileSelection();
                }
                return;
            }

            const isManageMode = document.getElementById('profile-selection').classList.contains('manage-mode');
            const name = el.dataset.name;

            if (isManageMode) {
                const newName = prompt('Rename profile:', name);
                if (newName && newName.trim()) {
                    const p = profiles.find(p => p.name === name);
                    if (p) {
                        p.name = newName.trim();
                        p.seed = newName.trim(); // Change avatar for fun
                        renderProfileSelection();
                    }
                }
                return;
            }

            activeProfile = profiles.find(p => p.name === name);
            launchMainApp();
        });
    });
};

const launchMainApp = () => {
    const mainApp = document.getElementById('main-app');
    const profileSelection = document.getElementById('profile-selection');

    profileSelection.classList.add('hidden');
    mainApp.classList.remove('hidden');

    // Update UI with selected profile
    const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${activeProfile.seed}`;
    document.querySelector('#profile-trigger img').src = avatarUrl;
    document.getElementById('active-avatar').src = avatarUrl;
    document.getElementById('active-name').textContent = activeProfile.name;
    const sidebarName = document.querySelector('.sidebar-user-name');
    if (sidebarName) sidebarName.textContent = activeProfile.name;

    // Initialize App
    const hero = document.getElementById('hero-section');
    if (hero) hero.style.backgroundImage = `url('${heroImage}')`;

    initNavigation();
    initHeroButtons();
    initProfileCard();
    initSearch();
    initVideoPlayer();
    renderAllRows();

    // Main App Back Button Listener
    const mainBackBtn = document.getElementById('main-back-nav');
    if (mainBackBtn && !mainBackBtn.hasListener) {
        mainBackBtn.addEventListener('click', () => {
            const activeLink = document.querySelector('.nav-links a.active');
            const category = activeLink ? activeLink.textContent.toLowerCase() : 'home';

            if (category === 'home') {
                if (confirm('Go back to profile selection?')) {
                    mainApp.classList.add('hidden');
                    document.getElementById('profile-selection').classList.remove('hidden');
                    renderProfileSelection();
                }
            } else {
                const homeLink = Array.from(document.querySelectorAll('.nav-links a')).find(l => l.textContent.toLowerCase() === 'home');
                if (homeLink) homeLink.click();
            }
        });
        mainBackBtn.hasListener = true;
    }

    // Sticky nav logic
    if (!window.hasStickyNavListener) {
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('.navbar');
            if (nav) {
                if (window.scrollY > 50) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
            }
        });
        window.hasStickyNavListener = true;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Entry sequence logic
    const splash = document.getElementById('splash-screen');
    const landing = document.getElementById('landing-page');
    const login = document.getElementById('login-page');
    const mainApp = document.getElementById('main-app');

    const getStartedBtn = document.getElementById('get-started-btn');
    const loginTriggerBtn = document.getElementById('login-trigger-btn');
    const loginForm = document.getElementById('login-form');

    // Auth navigation elements
    const registerPage = document.getElementById('register-page');
    const createAccountTrigger = document.getElementById('create-account-trigger');
    const backToLoginLink = document.getElementById('back-to-login');
    const registerForm = document.getElementById('register-form');

    // Back navigation buttons
    const loginToLandingBtn = document.getElementById('login-to-landing');
    const registerToLoginBtn = document.getElementById('register-to-login');
    const mainBackBtn = document.getElementById('main-back-nav');

    // 1. Splash Sequence
    setTimeout(() => {
        splash.style.opacity = '0';
        splash.style.transition = 'opacity 1s ease';
        setTimeout(() => {
            splash.classList.add('hidden');
            landing.classList.remove('hidden');
            landing.style.animation = 'fadeIn 1s ease';
        }, 1000);
    }, 2500);

    // 2. Landing -> Login
    const goToLogin = () => {
        landing.classList.add('hidden');
        login.classList.remove('hidden');
        login.style.animation = 'fadeIn 0.5s ease';
    };

    getStartedBtn.addEventListener('click', goToLogin);
    loginTriggerBtn.addEventListener('click', goToLogin);

    // 3. Login <-> Register Toggle
    createAccountTrigger.addEventListener('click', () => {
        login.classList.add('hidden');
        registerPage.classList.remove('hidden');
        registerPage.style.animation = 'fadeIn 0.5s ease';
    });

    const goBackToLogin = () => {
        registerPage.classList.add('hidden');
        login.classList.remove('hidden');
        login.style.animation = 'fadeIn 0.5s ease';
    };

    backToLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        goBackToLogin();
    });

    registerToLoginBtn.addEventListener('click', goBackToLogin);

    loginToLandingBtn.addEventListener('click', () => {
        login.classList.add('hidden');
        landing.classList.remove('hidden');
        landing.style.animation = 'fadeIn 0.5s ease';
    });

    // 4. Auth -> Profile Selection
    const enterApp = () => {
        login.classList.add('hidden');
        registerPage.classList.add('hidden');

        document.getElementById('profile-selection').classList.remove('hidden');
        renderProfileSelection();
    };

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        enterApp();
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        enterApp();
    });
});

function filterContent(category) {
    const rowsContainer = document.querySelector('.row-container');
    const heroTitle = document.querySelector('.hero-title');
    const heroDesc = document.querySelector('.hero-description');
    const heroSection = document.getElementById('hero-section');
    const heroBadge = document.querySelector('.badge');
    const heroBtn = document.querySelector('.hero-buttons .btn-primary');
    const mainBackBtn = document.getElementById('main-back-nav');

    rowsContainer.style.opacity = '0';

    if (mainBackBtn) {
        if (category === 'home') {
            mainBackBtn.classList.add('hidden');
        } else {
            mainBackBtn.classList.remove('hidden');
        }
    }

    setTimeout(() => {
        if (category === 'home') {
            heroSection.style.backgroundImage = `url('${heroImage}')`;
            heroTitle.textContent = "NEON HORIZON";
            heroDesc.textContent = "In a future where light is currency, one smuggler must navigate the shadows of a decaying megacity to save the last sunrise.";
            heroBadge.textContent = "FREEVEE ORIGINAL";
            heroBadge.style.background = "var(--accent-purple)";
            heroBadge.style.color = "white";
            heroBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg> Watch Now`;

            const secondaryBtn = document.querySelector('.hero-buttons .btn-secondary');
            if (secondaryBtn) secondaryBtn.classList.remove('hidden');

            renderAllRows();
        }
        else if (category === 'movies') {
            const featured = movieData.find(m => m.title === "Dark Whisper");
            heroSection.style.backgroundImage = `url('${featured.img}')`;
            heroTitle.textContent = "DARK WHISPER";
            heroDesc.textContent = "An investigative journalist uncovers a chilling pattern of disappearances in a small town. The truth is deeper than she imagined.";
            heroBadge.textContent = "FEATURED MOVIE";
            heroBadge.style.background = "#e50914";
            heroBadge.style.color = "white";
            heroBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg> Watch Movie`;

            rowsContainer.innerHTML = `
                <div class="row">
                    <h2 class="row-header">Action Movies for You</h2>
                    <div class="cards-scroll">${renderMovieSet('movie')}</div>
                </div>
                <div class="row">
                    <h2 class="row-header">Critically Acclaimed Thrillers</h2>
                    <div class="cards-scroll">${renderMovieSet('movie')}</div>
                </div>
                <div class="row">
                    <h2 class="row-header">Award Winning Cinema</h2>
                    <div class="cards-scroll">${renderMovieSet('movie')}</div>
                </div>
            `;
        }
        else if (category === 'tv shows') {
            const featured = movieData.find(m => m.title === "Sky Pirates");
            heroSection.style.backgroundImage = `url('${featured.img}')`;
            heroTitle.textContent = "SKY PIRATES";
            heroDesc.textContent = "A group of daring outlaws take to the skies in high-tech airships to reclaim the world's stolen heritage. The sky is no longer the limit.";
            heroBadge.textContent = "FREEVEE ORIGINAL";
            heroBadge.style.background = "var(--accent-purple)";
            heroBadge.style.color = "white";
            heroBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg> Play S1 E1`;

            rowsContainer.innerHTML = `
                <div class="row">
                    <h2 class="row-header">Trending TV Series</h2>
                    <div class="cards-scroll">${renderMovieSet('tv')}</div>
                </div>
                <div class="row">
                    <h2 class="row-header">Freevee Original Series</h2>
                    <div class="cards-scroll">${renderMovieSet('tv')}</div>
                </div>
                <div class="row">
                    <h2 class="row-header">Binge these shows</h2>
                    <div class="cards-scroll">${renderMovieSet('tv')}</div>
                </div>
            `;
        }
        else if (category === 'live tv') {
            heroSection.style.backgroundImage = `url('https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80&w=2070')`;
            heroTitle.textContent = "LIVE: NEWS NOW";
            heroDesc.textContent = "Stay updated with global breaking news, 24/7 weather reports, and live sports updates across our 200+ free channels.";
            heroBadge.textContent = "🔴 LIVE";
            heroBadge.style.background = "#ff0000";
            heroBadge.style.color = "white";
            heroBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg> Watch Live`;

            rowsContainer.innerHTML = `
                <div class="row">
                    <h2 class="row-header">Top News Channels</h2>
                    <div class="cards-scroll">${renderMovieSet('tv')}</div>
                </div>
                <div class="row">
                    <h2 class="row-header">Freevee Sports Live</h2>
                    <div class="cards-scroll">${renderMovieSet('movie')}</div>
                </div>
            `;
        }
        else if (category === 'my list') {
            heroTitle.textContent = "YOUR WATCHLIST";
            heroDesc.textContent = "Pick up right where you left off. All your saved movies and TV shows are available here across all your devices.";
            heroBadge.textContent = "PERSONALIZED";
            heroBadge.style.background = "var(--accent-purple)";
            heroBadge.style.color = "white";
            heroBtn.innerHTML = `Manage List`;

            const secondaryBtn = document.querySelector('.hero-buttons .btn-secondary');
            if (secondaryBtn) secondaryBtn.classList.add('hidden');

            if (watchlist.length > 0) {
                rowsContainer.innerHTML = `
                    <div class="row">
                        <h2 class="row-header">Movies & TV Shows</h2>
                        <div class="cards-scroll">
                            ${watchlist.map(m => createMovieCardHTML(m)).join('')}
                        </div>
                    </div>
                `;
            } else {
                rowsContainer.innerHTML = `
                    <div class="row">
                        <div class="empty-list">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
                            <h3>Your list is empty</h3>
                            <p>Add titles that you want to watch later so you can easily find them here.</p>
                            <button class="btn btn-primary" onclick="document.querySelector('.nav-links a').click()">Browse Home</button>
                        </div>
                    </div>
                `;
            }
        }

        rowsContainer.style.opacity = '1';
        rowsContainer.style.transition = 'opacity 0.4s';

        // Re-initialize hero buttons to ensure listeners are active on new content
        initHeroButtons();
    }, 300);
}

function renderMovieSet(type) {
    const movies = movieData.filter(m => m.type === type);
    let html = '';
    for (let i = 0; i < 18; i++) {
        html += createMovieCardHTML(movies[i % movies.length]);
    }
    return html;
}

function renderAllRows() {
    const container = document.querySelector('.row-container');
    container.innerHTML = `
        <div class="row">
            <h2 class="row-header">Trending Now</h2>
            <div class="cards-scroll" id="trending-row"></div>
        </div>
        <div class="row">
            <h2 class="row-header">Freevee Originals</h2>
            <div class="cards-scroll" id="originals-row"></div>
        </div>
        <div class="row">
            <h2 class="row-header">Popular Movies</h2>
            <div class="cards-scroll" id="movies-row"></div>
        </div>
        <div class="row">
            <h2 class="row-header">Live Channels</h2>
            <div class="cards-scroll" id="live-row"></div>
        </div>
        <div class="row">
            <h2 class="row-header">Global Favorites</h2>
            <div class="cards-scroll" id="global-row"></div>
        </div>
    `;

    const rowIds = ['trending-row', 'originals-row', 'movies-row', 'live-row', 'global-row'];
    rowIds.forEach(rowId => {
        const rowElement = document.getElementById(rowId);
        if (rowElement) {
            for (let i = 0; i < 18; i++) {
                const movie = movieData[i % movieData.length];
                const card = createMovieCard(movie);
                rowElement.appendChild(card);
            }
        }
    });
}

function createMovieCard(movie) {
    const card = document.createElement('div');
    card.innerHTML = createMovieCardHTML(movie);
    return card.firstElementChild; // Return the actual card element
}

function createMovieCardHTML(movie) {
    return `
        <div class="card" data-title="${movie.title}" data-trailer="${movie.trailer}">
            <img src="${movie.img}" alt="${movie.title}" loading="lazy">
            <div class="card-overlay">
                <h3 class="card-title">${movie.title}</h3>
                <div class="card-footer">
                    <span>${movie.year}</span>
                    <span>${movie.rating}</span>
                </div>
            </div>
        </div>
    `;
}
