// Fetch flowchart data
let flowchartData = null;
let journeyHistory = [];
let currentBook = null;

// Load data on page load
async function loadData() {
  try {
    const response = await fetch('../../shared/data/fantasy-flowchart.json');
    flowchartData = await response.json();

    // Load from localStorage if exists
    const saved = localStorage.getItem('fantasy-journey');
    if (saved) {
      const data = JSON.parse(saved);
      journeyHistory = data.history || [];
      currentBook = data.current || flowchartData.startingPoint;
    } else {
      currentBook = flowchartData.startingPoint;
    }

    displayBook(currentBook);
    updateProgress();
  } catch (error) {
    console.error('Error loading data:', error);
    document.getElementById('bookDisplay').innerHTML = `
      <div class="error-state">
        <h2>Oops! Something went wrong</h2>
        <p>Failed to load the fantasy flowchart data. Please refresh the page.</p>
      </div>
    `;
  }
}

// Display a book card
function displayBook(bookId) {
  const book = flowchartData.books[bookId];
  if (!book) {
    console.error('Book not found:', bookId);
    return;
  }

  // Add to history if not already there
  if (!journeyHistory.includes(bookId)) {
    journeyHistory.push(bookId);
    saveProgress();
  }

  const bookDisplay = document.getElementById('bookDisplay');

  // Check if this is a result/ending
  if (book.result) {
    showResult(book.result);
    return;
  }

  // Build tags HTML
  const tagsHTML = book.tags
    ? `<div class="book-tags">
        ${book.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
       </div>`
    : '';

  // Build questions HTML
  let questionsHTML = '';
  if (book.questions && book.questions.length > 0) {
    const question = book.questions[0]; // For now, show first question
    questionsHTML = `
      <div class="question-section">
        <div class="ornament"></div>
        <h3 class="question-text">${question.text}</h3>
        <div class="options-container">
          ${question.options.map((option, index) => `
            <button class="option-btn" onclick="handleChoice('${option.nextBook || option.result}', ${!!option.result})">
              <span>${option.text}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Build Daniel quote HTML
  const quoteHTML = book.danielQuote
    ? `<div class="daniel-quote">
        ${book.danielQuote}
        <div class="daniel-signature">— Daniel Greene</div>
       </div>`
    : '';

  bookDisplay.innerHTML = `
    <div class="book-card">
      <div class="book-header">
        <h2 class="book-title">${book.title}</h2>
        <p class="book-author">by ${book.author}</p>
        ${tagsHTML}
      </div>

      <div class="book-description">
        ${book.description}
      </div>

      ${quoteHTML}

      ${questionsHTML}
    </div>
  `;

  updateProgress();
}

// Handle user choice
function handleChoice(nextId, isResult) {
  if (isResult) {
    showResult(nextId);
  } else {
    currentBook = nextId;
    saveProgress();
    displayBook(nextId);

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Show result modal
function showResult(resultId) {
  const result = flowchartData.results[resultId];
  if (!result) {
    console.error('Result not found:', resultId);
    return;
  }

  const modal = document.getElementById('resultModal');
  document.getElementById('resultTitle').textContent = result.title;
  document.getElementById('resultDescription').textContent = result.description;
  document.getElementById('resultQuote').innerHTML = `
    ${result.danielQuote}
    <div class="daniel-signature">— Daniel Greene</div>
  `;

  // Build recommendations HTML
  const recommendationsHTML = result.recommendations
    ? `<div>
        <h3 style="color: var(--color-mystical-purple); margin: var(--spacing-lg) 0 var(--spacing-md) 0;">
          Recommended Books:
        </h3>
        <ul class="recommendation-list">
          ${result.recommendations.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
       </div>`
    : '';

  document.getElementById('resultRecommendations').innerHTML = recommendationsHTML;

  modal.classList.add('active');
}

// Update progress sidebar
function updateProgress() {
  const progressBooks = document.getElementById('progressBooks');
  const booksReadCount = document.getElementById('booksRead');

  if (journeyHistory.length === 0) {
    progressBooks.innerHTML = '<p class="progress-empty">Start your journey with The Hobbit!</p>';
    booksReadCount.textContent = '0';
    return;
  }

  const booksHTML = journeyHistory.map(bookId => {
    const book = flowchartData.books[bookId];
    if (!book) return '';
    return `<div class="progress-book-item">${book.title}</div>`;
  }).join('');

  progressBooks.innerHTML = booksHTML;
  booksReadCount.textContent = journeyHistory.length;
}

// Save progress to localStorage
function saveProgress() {
  localStorage.setItem('fantasy-journey', JSON.stringify({
    history: journeyHistory,
    current: currentBook
  }));
}

// Reset journey
function resetJourney() {
  if (confirm('Are you sure you want to start over? This will clear your current progress.')) {
    localStorage.removeItem('fantasy-journey');
    journeyHistory = [];
    currentBook = flowchartData.startingPoint;
    displayBook(currentBook);
    updateProgress();

    // Close modal if open
    document.getElementById('resultModal').classList.remove('active');
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  loadData();

  document.getElementById('resetBtn').addEventListener('click', resetJourney);
  document.getElementById('restartBtn').addEventListener('click', resetJourney);

  document.getElementById('closeModalBtn').addEventListener('click', () => {
    document.getElementById('resultModal').classList.remove('active');
  });

  // Close modal on background click
  document.getElementById('resultModal').addEventListener('click', (e) => {
    if (e.target.id === 'resultModal') {
      document.getElementById('resultModal').classList.remove('active');
    }
  });
});
