// Main Application Logic
// Handles modals, UI interactions, and YouTube embeds

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

// Utility function to scroll to map
function scrollToMap() {
    const mapSection = document.getElementById('map-section');
    if (mapSection) {
        mapSection.scrollIntoView({ behavior: 'smooth' });
    }
}

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
        // Could show progress in UI
        const percentage = (this.visited.size / fantasyData.nodes.length * 100).toFixed(1);
        console.log(`Reading Journey Progress: ${this.visited.size}/${fantasyData.nodes.length} books explored (${percentage}%)`);
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

document.addEventListener('DOMContentLoaded', () => {
    app = new FantasyGuideApp();
    bookSearch = new BookSearch();
    progressTracker = new ProgressTracker();

    // Track visited nodes
    window.addEventListener('nodeClick', (e) => {
        progressTracker.markVisited(e.detail.id);
    });

    // Add some visual flair
    addParticleEffect();
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
