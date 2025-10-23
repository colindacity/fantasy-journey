// Main Application Logic
// Handles modals, UI interactions, and YouTube embeds

// Version and Build Information Logger
class VersionLogger {
    constructor() {
        this.loadVersionInfo();
    }

    async loadVersionInfo() {
        try {
            const response = await fetch('version.json');
            if (response.ok) {
                const versionData = await response.json();
                this.logVersion(versionData);
                this.displayVersionBadge(versionData);
                window.APP_VERSION = versionData;
            } else {
                this.logDevelopmentVersion();
            }
        } catch (error) {
            this.logDevelopmentVersion();
        }
    }

    logVersion(data) {
        // Fancy console banner
        const styles = {
            title: 'font-size: 24px; font-weight: bold; color: #8b5cf6; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);',
            subtitle: 'font-size: 14px; color: #ec4899; font-weight: bold;',
            label: 'color: #06b6d4; font-weight: bold;',
            value: 'color: #fbbf24;',
            line: 'color: #8b5cf6;',
            success: 'color: #10b981; font-weight: bold;'
        };

        console.log('%c                                                    ', 'background: linear-gradient(90deg, #8b5cf6, #ec4899); padding: 2px;');
        console.log('%c🎮 Fantasy Reading Guide', styles.title);
        console.log('%c   Your Interactive Journey Through Fantasy Literature', styles.subtitle);
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', styles.line);

        console.log(`%c📦 Version:      %c${data.version}`, styles.label, styles.value);
        console.log(`%c📅 Build Date:   %c${new Date(data.buildDate).toLocaleString()}`, styles.label, styles.value);
        console.log(`%c🔨 Build #:      %c${data.buildNumber}`, styles.label, styles.value);
        console.log(`%c📝 Commit:       %c${data.commitSha?.substring(0, 7) || 'N/A'}`, styles.label, styles.value);
        console.log(`%c🔀 Branch:       %c${data.branch}`, styles.label, styles.value);
        console.log(`%c🤖 Deployer:     %c${data.deployer}`, styles.label, styles.value);

        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', styles.line);
        console.log('%c✨ Based on "The ULTIMATE Fantasy Reading Guide" YouTube video', 'color: #cbd5e1; font-style: italic;');
        console.log('%c🎬 https://www.youtube.com/watch?v=T0G-yYbqpNc', 'color: #94a3b8; font-style: italic;');
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', styles.line);
        console.log('%c✅ Application loaded successfully!', styles.success);
        console.log('%cTip: Click any book on the map to begin your journey!', 'color: #cbd5e1;');
        console.log('%c                                                    ', 'background: linear-gradient(90deg, #ec4899, #8b5cf6); padding: 2px;');

        // Performance metrics
        if (window.performance) {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                console.group('%c⚡ Performance Metrics', 'color: #fbbf24; font-weight: bold;');
                console.log(`%cPage Load: %c${(perfData.loadEventEnd - perfData.fetchStart).toFixed(2)}ms`, styles.label, styles.value);
                console.log(`%cDOM Ready: %c${(perfData.domContentLoadedEventEnd - perfData.fetchStart).toFixed(2)}ms`, styles.label, styles.value);
                console.groupEnd();
            }
        }

        // Easter egg
        console.log('%c\n🔮 Pro tip: Type "showAllBooks()" to list all books in the guide!', 'color: #8b5cf6; font-style: italic; font-size: 10px;');
    }

    logDevelopmentVersion() {
        console.log('%c🛠️ Fantasy Reading Guide - Development Mode', 'font-size: 18px; font-weight: bold; color: #fbbf24;');
        console.log('%cVersion: DEV', 'color: #ec4899;');
        console.log('%cRunning locally without build pipeline', 'color: #94a3b8; font-style: italic;');

        window.APP_VERSION = {
            version: 'dev',
            buildDate: new Date().toISOString(),
            environment: 'development'
        };
    }

    displayVersionBadge(data) {
        // Add a subtle version badge to the footer
        const footer = document.querySelector('.footer .container');
        if (footer && data.version) {
            const badge = document.createElement('p');
            badge.style.cssText = 'font-size: 0.75rem; color: var(--text-muted); margin-top: 0.5rem; font-family: monospace;';
            badge.innerHTML = `v${data.version} | Build #${data.buildNumber} | ${new Date(data.buildDate).toLocaleDateString()}`;
            footer.appendChild(badge);
        }
    }
}

// Developer console utilities
window.showAllBooks = function() {
    console.table(
        fantasyData.nodes.map(node => ({
            Title: node.title,
            Author: node.author,
            Type: node.type,
            Subgenre: node.subgenre || '-',
            'Must Read': node.mustRead ? '⭐' : '-'
        }))
    );
    console.log(`%c📚 Total books in guide: ${fantasyData.nodes.length}`, 'color: #8b5cf6; font-weight: bold;');
};

window.findBook = function(searchTerm) {
    const results = fantasyData.nodes.filter(node =>
        node.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        node.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (results.length > 0) {
        console.table(results.map(node => ({
            Title: node.title,
            Author: node.author,
            Type: node.type
        })));
    } else {
        console.log('%c❌ No books found matching: ' + searchTerm, 'color: #ef4444;');
    }
    return results;
};

window.getStats = function() {
    const stats = {
        totalBooks: fantasyData.nodes.length,
        mustReads: fantasyData.nodes.filter(n => n.mustRead).length,
        byType: {},
        subgenres: new Set()
    };

    fantasyData.nodes.forEach(node => {
        stats.byType[node.type] = (stats.byType[node.type] || 0) + 1;
        if (node.subgenre) stats.subgenres.add(node.subgenre);
    });

    stats.subgenres = stats.subgenres.size;

    console.log('%c📊 Fantasy Reading Guide Statistics', 'font-size: 16px; font-weight: bold; color: #8b5cf6;');
    console.table(stats);
    return stats;
};

class FantasyGuideApp {
    constructor() {
        this.modal = document.getElementById('book-modal');
        this.infoPanel = document.getElementById('info-panel');
        this.currentNode = null;

        this.init();
    }

    init() {
        // Listen for node clicks from the map
        window.addEventListener('nodeClick', (e) => {
            this.showBookModal(e.detail);
        });

        // Modal close handlers
        const modalClose = document.querySelector('.modal-close');
        if (modalClose) {
            modalClose.addEventListener('click', () => this.closeModal());
        }

        // Click outside modal to close
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Info panel close
        const panelClose = document.querySelector('.panel-close');
        if (panelClose) {
            panelClose.addEventListener('click', () => this.closeInfoPanel());
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
                this.closeInfoPanel();
            }
        });

        // Check for hash in URL to deep link to a book
        this.checkURLHash();
    }

    showBookModal(node) {
        this.currentNode = node;

        // Update modal content
        document.getElementById('modal-title').textContent = node.title;
        document.getElementById('modal-author').textContent = `by ${node.author}`;
        document.getElementById('modal-genre').textContent = this.getGenreLabel(node.type);

        // Update cover (using emoji for now)
        const cover = document.getElementById('modal-cover');
        cover.textContent = node.icon || '📖';

        // Update description
        const description = document.getElementById('modal-description');
        description.innerHTML = `<p>${node.description}</p>`;

        // Add quote if exists
        const quoteContainer = document.getElementById('modal-quote');
        if (node.quote) {
            quoteContainer.innerHTML = `<p>${node.quote}</p>`;
            quoteContainer.style.display = 'block';
        } else {
            quoteContainer.style.display = 'none';
        }

        // Add video embed if timestamp exists
        const videoContainer = document.getElementById('modal-video');
        if (node.videoTimestamp) {
            const videoHTML = `
                <h4>Watch the Guide</h4>
                <iframe
                    width="100%"
                    height="315"
                    src="https://www.youtube.com/embed/T0G-yYbqpNc?start=${node.videoTimestamp}"
                    title="Fantasy Reading Guide"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
                </iframe>
            `;
            videoContainer.innerHTML = videoHTML;
            videoContainer.style.display = 'block';
        } else {
            videoContainer.style.display = 'none';
        }

        // Add decision points if they exist
        const decisionsContainer = document.getElementById('modal-decisions');
        if (node.decisions && node.decisions.length > 0) {
            let decisionsHTML = '<h4>What did you think?</h4>';
            node.decisions.forEach(decision => {
                decisionsHTML += `
                    <div class="decision-option" data-next="${decision.nextNode}">
                        <strong>${decision.question}</strong>
                        <br>
                        <small>→ Next: ${this.getNodeTitle(decision.nextNode)}</small>
                    </div>
                `;
            });
            decisionsContainer.innerHTML = decisionsHTML;
            decisionsContainer.style.display = 'block';

            // Add click handlers to decision options
            setTimeout(() => {
                const options = decisionsContainer.querySelectorAll('.decision-option');
                options.forEach(option => {
                    option.addEventListener('click', () => {
                        const nextNodeId = option.getAttribute('data-next');
                        const nextNode = getNodeById(nextNodeId);
                        if (nextNode) {
                            this.showBookModal(nextNode);
                            if (window.fantasyMap) {
                                window.fantasyMap.focusNode(nextNodeId);
                            }
                        }
                    });
                });
            }, 0);
        } else {
            decisionsContainer.style.display = 'none';
        }

        // Add recommendations for subgenre endpoints
        const recommendationsContainer = document.getElementById('modal-recommendations');
        if (node.subgenre) {
            let recsHTML = `
                <h4>🎉 You found your subgenre: ${node.subgenre}!</h4>
                <p>Congratulations! You've discovered what you love. Here are more recommendations:</p>
            `;

            if (node.recommendations && node.recommendations.length > 0) {
                recsHTML += '<div class="recommendation-list">';
                node.recommendations.forEach(rec => {
                    recsHTML += `<span class="recommendation-chip">${rec}</span>`;
                });
                recsHTML += '</div>';
            }

            recsHTML += `
                <button class="cta-button" onclick="app.showSubgenrePanel('${node.subgenre}', '${node.id}')"
                    style="margin-top: 1rem;">
                    Explore ${node.subgenre}
                </button>
            `;

            recommendationsContainer.innerHTML = recsHTML;
            recommendationsContainer.style.display = 'block';
        } else {
            recommendationsContainer.style.display = 'none';
        }

        // Show modal with animation
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Update URL hash
        window.location.hash = node.id;
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        window.location.hash = '';

        // Stop any playing videos
        const videoContainer = document.getElementById('modal-video');
        videoContainer.innerHTML = '';
    }

    showSubgenrePanel(subgenre, nodeId) {
        const panel = this.infoPanel;
        const title = document.getElementById('panel-title');
        const description = document.getElementById('panel-description');
        const booksContainer = document.getElementById('panel-books');

        title.textContent = subgenre;

        // Get all books in this subgenre path
        const subgenreBooks = this.getBooksInPath(nodeId);

        description.textContent = `You've reached the ${subgenre} destination! Here's your reading journey so far:`;

        let booksHTML = '';
        subgenreBooks.forEach(book => {
            booksHTML += `
                <div class="panel-book-item" data-id="${book.id}">
                    <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">${book.icon || '📖'}</div>
                    <strong>${book.title}</strong>
                    <div style="font-size: 0.9rem; color: var(--text-muted);">${book.author}</div>
                </div>
            `;
        });

        booksContainer.innerHTML = booksHTML;

        // Add click handlers
        setTimeout(() => {
            const bookItems = booksContainer.querySelectorAll('.panel-book-item');
            bookItems.forEach(item => {
                item.addEventListener('click', () => {
                    const bookId = item.getAttribute('data-id');
                    const book = getNodeById(bookId);
                    if (book) {
                        this.showBookModal(book);
                        this.closeInfoPanel();
                    }
                });
            });
        }, 0);

        panel.classList.add('active');
    }

    closeInfoPanel() {
        this.infoPanel.classList.remove('active');
    }

    getBooksInPath(endNodeId) {
        // Trace back from endpoint to find the path
        const books = [];
        const visited = new Set();

        const findPaths = (nodeId) => {
            if (visited.has(nodeId)) return;
            visited.add(nodeId);

            const node = getNodeById(nodeId);
            if (node) {
                books.unshift(node);
            }

            // Find incoming connections
            const incoming = fantasyData.connections.filter(c => c.to === nodeId);
            incoming.forEach(conn => {
                findPaths(conn.from);
            });
        };

        findPaths(endNodeId);
        return books;
    }

    getNodeTitle(nodeId) {
        const node = getNodeById(nodeId);
        return node ? node.title : 'Unknown';
    }

    getGenreLabel(type) {
        const labels = {
            'start': 'Starting Point',
            'decision': 'Decision Point',
            'book': 'Recommended Read',
            'subgenre': 'Subgenre Destination'
        };
        return labels[type] || 'Book';
    }

    checkURLHash() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const node = getNodeById(hash);
            if (node) {
                setTimeout(() => {
                    this.showBookModal(node);
                    if (window.fantasyMap) {
                        window.fantasyMap.focusNode(hash);
                    }
                }, 500);
            }
        }
    }
}

// Utility function to scroll to map (legacy - map is now at top)
function scrollToMap() {
    const mapSection = document.getElementById('map-section');
    if (mapSection) {
        mapSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Welcome tooltip functions
function dismissWelcome() {
    const tooltip = document.getElementById('welcome-tooltip');
    if (tooltip) {
        tooltip.classList.add('hidden');
        localStorage.setItem('welcomeDismissed', 'true');
    }
}

function startJourney() {
    dismissWelcome();
    // Find and click The Hobbit
    const hobbitNode = getNodeById('the-hobbit');
    if (hobbitNode && window.app) {
        window.app.showBookModal(hobbitNode);
        if (window.fantasyMap) {
            window.fantasyMap.focusNode('the-hobbit');
        }
    }
}

// Show welcome on first visit
function checkWelcome() {
    const welcomed = localStorage.getItem('welcomeDismissed');
    const tooltip = document.getElementById('welcome-tooltip');

    if (!welcomed && tooltip) {
        // Show after a short delay to let map load
        setTimeout(() => {
            tooltip.classList.remove('hidden');
        }, 1500);
    } else if (tooltip) {
        tooltip.classList.add('hidden');
    }
}

// Hide loading indicator
function hideLoading() {
    const loading = document.getElementById('map-loading');
    if (loading) {
        loading.classList.add('hidden');
        setTimeout(() => {
            loading.style.display = 'none';
        }, 300);
    }
}

// Expose functions globally for onclick handlers
window.dismissWelcome = dismissWelcome;
window.startJourney = startJourney;

// Search functionality
class BookSearch {
    constructor() {
        this.setupSearch();
    }

    setupSearch() {
        // Create search bar
        const searchBar = document.createElement('div');
        searchBar.className = 'search-bar';
        searchBar.innerHTML = `
            <input type="text" id="book-search" placeholder="Search for a book or author..." />
            <div id="search-results" class="search-results"></div>
        `;

        const mapHeader = document.querySelector('.map-header');
        if (mapHeader) {
            mapHeader.appendChild(searchBar);
        }

        const searchInput = document.getElementById('book-search');
        const searchResults = document.getElementById('search-results');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase().trim();

                if (query.length < 2) {
                    searchResults.style.display = 'none';
                    return;
                }

                const results = fantasyData.nodes.filter(node =>
                    node.title.toLowerCase().includes(query) ||
                    node.author.toLowerCase().includes(query) ||
                    (node.subgenre && node.subgenre.toLowerCase().includes(query))
                );

                if (results.length > 0) {
                    let resultsHTML = '';
                    results.slice(0, 5).forEach(node => {
                        resultsHTML += `
                            <div class="search-result-item" data-id="${node.id}">
                                <span style="font-size: 1.5rem; margin-right: 0.5rem;">${node.icon || '📖'}</span>
                                <div>
                                    <strong>${node.title}</strong>
                                    <div style="font-size: 0.85rem; color: var(--text-muted);">${node.author}</div>
                                </div>
                            </div>
                        `;
                    });

                    searchResults.innerHTML = resultsHTML;
                    searchResults.style.display = 'block';

                    // Add click handlers
                    setTimeout(() => {
                        const items = searchResults.querySelectorAll('.search-result-item');
                        items.forEach(item => {
                            item.addEventListener('click', () => {
                                const nodeId = item.getAttribute('data-id');
                                const node = getNodeById(nodeId);
                                if (node) {
                                    app.showBookModal(node);
                                    if (window.fantasyMap) {
                                        window.fantasyMap.focusNode(nodeId);
                                    }
                                    searchResults.style.display = 'none';
                                    searchInput.value = '';
                                }
                            });
                        });
                    }, 0);
                } else {
                    searchResults.innerHTML = '<div style="padding: 1rem; color: var(--text-muted);">No results found</div>';
                    searchResults.style.display = 'block';
                }
            });

            // Close results when clicking outside
            document.addEventListener('click', (e) => {
                if (!searchBar.contains(e.target)) {
                    searchResults.style.display = 'none';
                }
            });
        }
    }
}

// Add search styles
const searchStyles = document.createElement('style');
searchStyles.textContent = `
    .search-bar {
        position: relative;
        max-width: 500px;
        margin: 2rem auto;
    }

    #book-search {
        width: 100%;
        padding: 1rem 1.5rem;
        background: var(--card-bg);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(139, 92, 246, 0.3);
        border-radius: 50px;
        color: var(--text-primary);
        font-size: 1rem;
        font-family: var(--font-body);
        transition: all 0.3s ease;
    }

    #book-search:focus {
        outline: none;
        border-color: var(--primary-purple);
        box-shadow: var(--shadow-glow);
    }

    #book-search::placeholder {
        color: var(--text-muted);
    }

    .search-results {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        margin-top: 0.5rem;
        background: var(--card-bg);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(139, 92, 246, 0.3);
        border-radius: 12px;
        max-height: 400px;
        overflow-y: auto;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
    }

    .search-result-item {
        display: flex;
        align-items: center;
        padding: 1rem;
        cursor: pointer;
        transition: all 0.2s ease;
        border-bottom: 1px solid rgba(139, 92, 246, 0.1);
    }

    .search-result-item:last-child {
        border-bottom: none;
    }

    .search-result-item:hover {
        background: rgba(139, 92, 246, 0.2);
    }
`;
document.head.appendChild(searchStyles);

// Stats tracker
class ProgressTracker {
    constructor() {
        this.visited = new Set(JSON.parse(localStorage.getItem('visitedBooks') || '[]'));
        this.updateStats();
    }

    markVisited(nodeId) {
        this.visited.add(nodeId);
        localStorage.setItem('visitedBooks', JSON.stringify([...this.visited]));
        this.updateStats();
    }

    updateStats() {
        // Update UI progress indicators
        const totalBooks = fantasyData.nodes.length;
        const percentage = (this.visited.size / totalBooks * 100).toFixed(1);

        // Update progress bar
        const progressFill = document.getElementById('progress-fill');
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
        }

        // Update counter
        const booksExplored = document.getElementById('books-explored');
        const totalBooksElement = document.getElementById('total-books');
        if (booksExplored) {
            booksExplored.textContent = this.visited.size;
        }
        if (totalBooksElement) {
            totalBooksElement.textContent = totalBooks;
        }

        // Console log
        console.log(`📚 Reading Journey Progress: ${this.visited.size}/${totalBooks} books explored (${percentage}%)`);

        // Achievement unlocked
        if (this.visited.size === 10 && !localStorage.getItem('achievement_10')) {
            this.showAchievement('🎯 Explorer!', 'You\'ve discovered 10 books!');
            localStorage.setItem('achievement_10', 'true');
        }
        if (this.visited.size === 25 && !localStorage.getItem('achievement_25')) {
            this.showAchievement('📚 Bookworm!', 'You\'ve explored 25 books!');
            localStorage.setItem('achievement_25', 'true');
        }
        if (this.visited.size === totalBooks && !localStorage.getItem('achievement_all')) {
            this.showAchievement('🏆 Master Reader!', 'You\'ve discovered ALL books!');
            localStorage.setItem('achievement_all', 'true');
        }
    }

    showAchievement(title, message) {
        // Simple achievement notification
        const achievement = document.createElement('div');
        achievement.className = 'achievement-toast';
        achievement.innerHTML = `
            <div class="achievement-content">
                <h4>${title}</h4>
                <p>${message}</p>
            </div>
        `;
        document.body.appendChild(achievement);

        setTimeout(() => achievement.classList.add('show'), 100);
        setTimeout(() => {
            achievement.classList.remove('show');
            setTimeout(() => achievement.remove(), 300);
        }, 3000);
    }

    reset() {
        this.visited.clear();
        localStorage.removeItem('visitedBooks');
        this.updateStats();
    }
}

// Initialize app
let app;
let bookSearch;
let progressTracker;
let versionLogger;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize version logging first
    versionLogger = new VersionLogger();

    app = new FantasyGuideApp();
    bookSearch = new BookSearch();
    progressTracker = new ProgressTracker();

    // Track visited nodes
    window.addEventListener('nodeClick', (e) => {
        progressTracker.markVisited(e.detail.id);
    });

    // Add some visual flair
    addParticleEffect();

    // Hide loading indicator after map loads
    setTimeout(() => {
        hideLoading();
        checkWelcome();
    }, 1000);

    // Expose app globally
    window.app = app;
});

// Particle effect for hero section
function addParticleEffect() {
    const hero = document.querySelector('.hero-background');
    if (!hero) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: radial-gradient(circle, rgba(251, 191, 36, 0.8), transparent);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
        `;
        hero.appendChild(particle);
    }
}

// Expose app globally for button onclick handlers
window.app = app;
