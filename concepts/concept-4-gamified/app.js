// Game State
let gameState = {
  player: {
    name: '',
    class: '',
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    booksRead: 0
  },
  unlockedTerritories: ['starting-realm'],
  currentTerritory: 'starting-realm',
  achievements: [],
  readingHistory: []
};

// Territories (Fantasy Subgenres)
const territories = {
  'starting-realm': {
    name: 'The Starting Realm',
    color: '#6b46c1',
    description: 'Where every reader begins their journey',
    unlocked: true
  },
  'cozy-haven': {
    name: 'Cozy Haven',
    color: '#f59e0b',
    description: 'Warm blankets and low stakes',
    unlocked: false,
    requirements: { booksRead: 1 }
  },
  'epic-highlands': {
    name: 'Epic Highlands',
    color: '#ef4444',
    description: 'Vast landscapes and grand adventures',
    unlocked: false,
    requirements: { booksRead: 2 }
  },
  'grimdark-wastes': {
    name: 'Grimdark Wastes',
    color: '#1f2937',
    description: 'Where heroes fear to tread',
    unlocked: false,
    requirements: { booksRead: 3, level: 2 }
  },
  'urban-city': {
    name: 'Urban City',
    color: '#3b82f6',
    description: 'Magic in the modern world',
    unlocked: false,
    requirements: { booksRead: 2 }
  },
  'academia-towers': {
    name: 'Academia Towers',
    color: '#8b5cf6',
    description: 'Knowledge and dark secrets',
    unlocked: false,
    requirements: { booksRead: 4, level: 3 }
  }
};

// Quests (Book Recommendations)
const quests = {
  'starting-realm': [
    {
      title: 'Read Your First Fantasy Epic',
      description: 'Daniel says: "A perfect book. And if you disagree with me on that this early on, too bad."',
      book: { title: 'The Hobbit', author: 'J.R.R. Tolkien' },
      xpReward: 50,
      difficulty: 'Beginner'
    },
    {
      title: 'Explore Epic Worldbuilding',
      description: 'Transitional story from classic to modern fantasy with beautiful prose.',
      book: { title: 'A Wizard of Earthsea', author: 'Ursula K. Le Guin' },
      xpReward: 60,
      difficulty: 'Beginner'
    }
  ],
  'cozy-haven': [
    {
      title: 'Embrace the Cozy Life',
      description: 'An orc opens a coffee shop. That\'s it. Peak cozy.',
      book: { title: 'Legends & Lattes', author: 'Travis Baldree' },
      xpReward: 70,
      difficulty: 'Easy'
    },
    {
      title: 'Find Your Heart',
      description: 'LGBTQ+ themes and heartwarming found family.',
      book: { title: 'The House in the Cerulean Sea', author: 'TJ Klune' },
      xpReward: 75,
      difficulty: 'Easy'
    }
  ],
  'epic-highlands': [
    {
      title: 'Enter the Cosmere',
      description: 'What if Sauron won? A nexus point that will consume your life. Your family will miss you.',
      book: { title: 'Mistborn: The Final Empire', author: 'Brandon Sanderson' },
      xpReward: 100,
      difficulty: 'Intermediate'
    },
    {
      title: 'Embrace the Hollowness',
      description: 'Once you finish, you\'ll have a hollowness in your chest you can never fill.',
      book: { title: 'The Eye of the World', author: 'Robert Jordan' },
      xpReward: 120,
      difficulty: 'Intermediate'
    }
  ],
  'grimdark-wastes': [
    {
      title: 'Question Humanity',
      description: 'Joe Abercrombie makes you love horrible people. It\'s a knack he has.',
      book: { title: 'The Blade Itself', author: 'Joe Abercrombie' },
      xpReward: 150,
      difficulty: 'Advanced'
    },
    {
      title: 'Maximum Darkness',
      description: 'That\'s too far for me, dog. But if you want it...',
      book: { title: 'The Black Company', author: 'Glen Cook' },
      xpReward: 200,
      difficulty: 'Expert'
    }
  ],
  'urban-city': [
    {
      title: 'Magic Meets Modern',
      description: 'Real-world epic urban fantasy. Fair warning: it\'s hornier than you expect.',
      book: { title: 'Storm Front (Dresden Files)', author: 'Jim Butcher' },
      xpReward: 90,
      difficulty: 'Intermediate'
    },
    {
      title: 'The Best Urban Epic Ever',
      description: 'Reservoir Dogs meets Godfather. The best corruption arcs you\'ll ever read.',
      book: { title: 'Jade City', author: 'Fonda Lee' },
      xpReward: 130,
      difficulty: 'Advanced'
    }
  ],
  'academia-towers': [
    {
      title: 'Dark Secrets at Yale',
      description: 'My favorite Leigh Bardugo book. Dark academia mystery perfection.',
      book: { title: 'Ninth House', author: 'Leigh Bardugo' },
      xpReward: 110,
      difficulty: 'Advanced'
    }
  ]
};

// Achievements
const achievements = [
  { id: 'first-book', title: 'First Steps', description: 'Read your first fantasy book', icon: '📖', unlocked: false },
  { id: 'level-5', title: 'Rising Reader', description: 'Reach level 5', icon: '⭐', unlocked: false },
  { id: 'five-books', title: 'Bookworm', description: 'Read 5 fantasy books', icon: '🐛', unlocked: false },
  { id: 'cozy-fan', title: 'Cozy Connoisseur', description: 'Explore Cozy Haven', icon: '☕', unlocked: false },
  { id: 'grimdark-survivor', title: 'Grimdark Survivor', description: 'Survive the Grimdark Wastes', icon: '⚔️', unlocked: false },
  { id: 'ten-books', title: 'Voracious Reader', description: 'Read 10 fantasy books', icon: '🦅', unlocked: false },
  { id: 'all-territories', title: 'Realm Explorer', description: 'Unlock all territories', icon: '🗺️', unlocked: false }
];

let currentQuest = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Check for saved game
  const saved = localStorage.getItem('fantasy-rpg-game');
  if (saved) {
    gameState = JSON.parse(saved);
    startGame();
  }

  // Character creation
  const nameInput = document.getElementById('characterName');
  const classCards = document.querySelectorAll('.class-card');
  const startBtn = document.getElementById('startQuestBtn');

  nameInput.addEventListener('input', validateForm);
  classCards.forEach(card => {
    card.addEventListener('click', () => {
      classCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      gameState.player.class = card.dataset.class;
      validateForm();
    });
  });

  startBtn.addEventListener('click', () => {
    gameState.player.name = nameInput.value.trim();
    saveGame();
    startGame();
  });

  // Event listeners
  document.getElementById('achievementsBtn').addEventListener('click', showAchievements);
  document.getElementById('closeAchievementsBtn').addEventListener('click', () => {
    document.getElementById('achievementsModal').classList.remove('active');
  });
  document.getElementById('completeQuestBtn').addEventListener('click', completeQuest);
  document.getElementById('nextQuestBtn').addEventListener('click', loadNextQuest);
  document.getElementById('closeLevelUpBtn').addEventListener('click', () => {
    document.getElementById('levelUpModal').classList.remove('active');
  });
});

function validateForm() {
  const name = document.getElementById('characterName').value.trim();
  const hasClass = gameState.player.class !== '';
  document.getElementById('startQuestBtn').disabled = !(name && hasClass);
}

function startGame() {
  document.getElementById('characterCreation').style.display = 'none';
  document.getElementById('gameMain').style.display = 'grid';
  updateUI();
  drawMap();
  loadQuest();
}

function updateUI() {
  document.getElementById('playerLevel').textContent = gameState.player.level;
  document.getElementById('booksCount').textContent = gameState.player.booksRead;

  const xpPercent = (gameState.player.xp / gameState.player.xpToNextLevel) * 100;
  document.getElementById('xpFill').style.width = `${xpPercent}%`;
  document.getElementById('xpText').textContent = `${gameState.player.xp} / ${gameState.player.xpToNextLevel}`;

  const unlockedAchievements = gameState.achievements.length;
  document.getElementById('achievementCount').textContent = unlockedAchievements;
}

function drawMap() {
  const svg = document.getElementById('mapSvg');
  svg.innerHTML = '';

  // Territory positions (simplified hexagonal layout)
  const positions = {
    'starting-realm': { x: 500, y: 300, r: 80 },
    'cozy-haven': { x: 300, y: 150, r: 70 },
    'epic-highlands': { x: 700, y: 150, r: 70 },
    'grimdark-wastes': { x: 800, y: 400, r: 70 },
    'urban-city': { x: 200, y: 400, r: 70 },
    'academia-towers': { x: 500, y: 500, r: 70 }
  };

  // Draw connections
  const connections = [
    ['starting-realm', 'cozy-haven'],
    ['starting-realm', 'epic-highlands'],
    ['starting-realm', 'urban-city'],
    ['epic-highlands', 'grimdark-wastes'],
    ['urban-city', 'academia-towers'],
    ['starting-realm', 'academia-towers']
  ];

  connections.forEach(([from, to]) => {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', positions[from].x);
    line.setAttribute('y1', positions[from].y);
    line.setAttribute('x2', positions[to].x);
    line.setAttribute('y2', positions[to].y);
    line.setAttribute('stroke', 'rgba(212, 175, 55, 0.3)');
    line.setAttribute('stroke-width', '3');
    svg.appendChild(line);
  });

  // Draw territories
  Object.entries(territories).forEach(([id, territory]) => {
    const pos = positions[id];
    const isUnlocked = gameState.unlockedTerritories.includes(id);
    const isCurrent = gameState.currentTerritory === id;

    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.classList.add('territory');
    if (isUnlocked) group.classList.add('unlocked');
    if (!isUnlocked) group.classList.add('locked');
    if (isCurrent) group.classList.add('current');

    // Circle
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', pos.x);
    circle.setAttribute('cy', pos.y);
    circle.setAttribute('r', pos.r);
    circle.setAttribute('fill', territory.color);
    circle.setAttribute('stroke', isCurrent ? '#d4af37' : '#fff');
    circle.setAttribute('stroke-width', isCurrent ? '4' : '2');

    // Text
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', pos.x);
    text.setAttribute('y', pos.y);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('fill', '#fff');
    text.setAttribute('font-family', 'Cinzel, serif');
    text.setAttribute('font-size', '14');
    text.setAttribute('font-weight', 'bold');
    text.textContent = territory.name;

    // Lock icon for locked territories
    if (!isUnlocked) {
      const lock = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      lock.setAttribute('x', pos.x);
      lock.setAttribute('y', pos.y - 20);
      lock.setAttribute('text-anchor', 'middle');
      lock.setAttribute('font-size', '24');
      lock.textContent = '🔒';
      group.appendChild(lock);
    }

    group.appendChild(circle);
    group.appendChild(text);

    if (isUnlocked) {
      group.style.cursor = 'pointer';
      group.addEventListener('click', () => selectTerritory(id));
    }

    svg.appendChild(group);
  });
}

function selectTerritory(territoryId) {
  if (!gameState.unlockedTerritories.includes(territoryId)) return;

  gameState.currentTerritory = territoryId;
  drawMap();
  loadQuest();
  saveGame();
}

function loadQuest() {
  const territoryQuests = quests[gameState.currentTerritory];
  if (!territoryQuests || territoryQuests.length === 0) {
    currentQuest = null;
    document.getElementById('activeQuest').innerHTML = '<p>No quests available in this territory yet!</p>';
    return;
  }

  // Get random quest from territory
  currentQuest = territoryQuests[Math.floor(Math.random() * territoryQuests.length)];

  document.getElementById('questTitle').textContent = currentQuest.title;
  document.getElementById('questDifficulty').textContent = currentQuest.difficulty;
  document.getElementById('questDescription').textContent = currentQuest.description;
  document.getElementById('questBook').innerHTML = `
    <strong>${currentQuest.book.title}</strong>
    <em>by ${currentQuest.book.author}</em>
    <div style="margin-top: 8px; color: #d4af37;">
      <strong>Reward:</strong> ${currentQuest.xpReward} XP
    </div>
  `;
}

function loadNextQuest() {
  loadQuest();
}

function completeQuest() {
  if (!currentQuest) return;

  // Add XP
  gameState.player.xp += currentQuest.xpReward;
  gameState.player.booksRead++;
  gameState.readingHistory.push({
    book: currentQuest.book,
    territory: gameState.currentTerritory,
    date: new Date()
  });

  // Check for level up
  if (gameState.player.xp >= gameState.player.xpToNextLevel) {
    levelUp();
  }

  // Check achievements
  checkAchievements();

  // Unlock territories
  checkTerritoryUnlocks();

  updateUI();
  saveGame();

  // Load next quest
  loadQuest();
}

function levelUp() {
  gameState.player.level++;
  gameState.player.xp -= gameState.player.xpToNextLevel;
  gameState.player.xpToNextLevel = Math.floor(gameState.player.xpToNextLevel * 1.5);

  // Show level up modal
  document.getElementById('levelUpNumber').textContent = gameState.player.level;
  document.getElementById('levelUpMessage').textContent =
    `You've grown as a ${gameState.player.class} reader!`;

  const rewards = ['New territories unlocked!', 'More challenging quests available!'];
  document.getElementById('levelUpRewards').innerHTML = rewards
    .map(r => `<p>✨ ${r}</p>`)
    .join('');

  document.getElementById('levelUpModal').classList.add('active');
}

function checkAchievements() {
  const toCheck = [
    { id: 'first-book', condition: gameState.player.booksRead >= 1 },
    { id: 'five-books', condition: gameState.player.booksRead >= 5 },
    { id: 'ten-books', condition: gameState.player.booksRead >= 10 },
    { id: 'level-5', condition: gameState.player.level >= 5 },
    { id: 'cozy-fan', condition: gameState.unlockedTerritories.includes('cozy-haven') },
    { id: 'grimdark-survivor', condition: gameState.unlockedTerritories.includes('grimdark-wastes') },
    { id: 'all-territories', condition: gameState.unlockedTerritories.length === Object.keys(territories).length }
  ];

  toCheck.forEach(check => {
    if (check.condition && !gameState.achievements.includes(check.id)) {
      unlockAchievement(check.id);
    }
  });
}

function unlockAchievement(achievementId) {
  gameState.achievements.push(achievementId);
  const achievement = achievements.find(a => a.id === achievementId);

  if (achievement) {
    showAchievementNotification(achievement);
  }
}

function showAchievementNotification(achievement) {
  document.getElementById('achievementTitle').textContent = achievement.title;
  document.getElementById('achievementDesc').textContent = achievement.description;

  const notif = document.getElementById('achievementNotif');
  notif.style.display = 'block';

  setTimeout(() => {
    notif.style.display = 'none';
  }, 4000);
}

function checkTerritoryUnlocks() {
  Object.entries(territories).forEach(([id, territory]) => {
    if (gameState.unlockedTerritories.includes(id)) return;

    const meetsRequirements =
      (!territory.requirements) ||
      (gameState.player.booksRead >= (territory.requirements.booksRead || 0) &&
       gameState.player.level >= (territory.requirements.level || 1));

    if (meetsRequirements) {
      gameState.unlockedTerritories.push(id);
      drawMap();
    }
  });
}

function showAchievements() {
  const grid = document.getElementById('achievementsGrid');
  grid.innerHTML = '';

  achievements.forEach(achievement => {
    const isUnlocked = gameState.achievements.includes(achievement.id);
    const div = document.createElement('div');
    div.className = `achievement-item ${isUnlocked ? '' : 'locked'}`;
    div.innerHTML = `
      <div class="achievement-item-header">
        <span class="achievement-item-icon">${isUnlocked ? achievement.icon : '🔒'}</span>
        <h4 class="achievement-item-title">${achievement.title}</h4>
      </div>
      <p class="achievement-item-desc">${achievement.description}</p>
    `;
    grid.appendChild(div);
  });

  document.getElementById('achievementsModal').classList.add('active');
}

function saveGame() {
  localStorage.setItem('fantasy-rpg-game', JSON.stringify(gameState));
}
