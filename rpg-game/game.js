// ============================================
// FANTASY READING QUEST - Main Game File
// A top-down RPG for discovering fantasy books
// ============================================

// Game Configuration
const config = {
  type: Phaser.AUTO,
  width: Math.min(1280, window.innerWidth),
  height: Math.min(720, window.innerHeight),
  parent: 'game-container',
  backgroundColor: '#1a1a2e',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [PreloadScene, MainWorldScene, LibraryScene, BookstoreScene, AuthorLandScene, WritersWorkshopScene, PlayerHomeScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  pixelArt: false,
  roundPixels: true
};

// Game State
const gameState = {
  playerName: 'Reader',
  booksCollected: 0,
  booksRead: [],
  visitedZones: [],
  currentZone: 'main-world',
  playerPosition: { x: 400, y: 300 }
};

// Mobile detection
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.UA) ||
                 ('ontouchstart' in window);

if (isMobile) {
  document.getElementById('mobile-controls').classList.add('show');
  document.getElementById('actionButton').classList.add('show');
}

// Start the game
const game = new Phaser.Game(config);

// ============================================
// PRELOAD SCENE
// ============================================

class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    // Update loading bar
    this.load.on('progress', (value) => {
      document.getElementById('loadingFill').style.width = (value * 100) + '%';
      document.getElementById('loadingText').textContent =
        `Loading assets... ${Math.floor(value * 100)}%`;
    });

    // Load placeholder graphics (we'll generate them programmatically)
    // In production, you'd load sprite sheets and tilemaps here

    // For now, we'll use simple colored rectangles and circles
    this.load.on('complete', () => {
      console.log('Assets loaded!');
    });
  }

  create() {
    // Hide loading screen
    setTimeout(() => {
      document.getElementById('loading').classList.add('hidden');
    }, 500);

    // Load saved game
    const saved = localStorage.getItem('fantasy-rpg-save');
    if (saved) {
      Object.assign(gameState, JSON.parse(saved));
    }

    // Start main world
    this.scene.start('MainWorldScene');
  }
}

// ============================================
// MAIN WORLD SCENE - Hub Area
// ============================================

class MainWorldScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainWorldScene' });
  }

  create() {
    gameState.currentZone = 'main-world';
    this.updateLocationLabel('Fantasy Reading Quest - Town Square');

    // Create world background
    this.createWorld();

    // Create player
    this.createPlayer();

    // Create zones/buildings
    this.createZones();

    // Setup camera
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setZoom(1);

    // Setup controls
    this.setupControls();

    // Create NPCs
    this.createNPCs();

    // Mobile joystick
    if (isMobile) {
      this.setupMobileControls();
    }

    // Update UI
    this.updateBookCount();
  }

  createWorld() {
    const width = 1600;
    const height = 1200;

    // Ground
    const ground = this.add.rectangle(width / 2, height / 2, width, height, 0x2d5016);

    // Paths
    const pathColor = 0x8b7355;

    // Main vertical path
    this.add.rectangle(width / 2, height / 2, 120, height, pathColor);

    // Horizontal path
    this.add.rectangle(width / 2, height / 2, width, 120, pathColor);

    // Town square center
    this.add.circle(width / 2, height / 2, 150, 0xd4af37, 0.3);

    // Add decorative elements
    this.addTrees();
    this.addFlowers();

    // World boundaries
    this.physics.world.setBounds(0, 0, width, height);
  }

  addTrees() {
    const treePositions = [
      [200, 200], [300, 250], [400, 180],
      [1200, 200], [1300, 280], [1100, 150],
      [200, 900], [350, 1000], [180, 1100],
      [1200, 950], [1350, 1050], [1150, 900]
    ];

    treePositions.forEach(([x, y]) => {
      // Tree trunk
      this.add.rectangle(x, y, 20, 40, 0x654321);
      // Tree foliage
      this.add.circle(x, y - 30, 40, 0x228b22);
    });
  }

  addFlowers() {
    const flowers = this.add.group();

    for (let i = 0; i < 50; i++) {
      const x = Phaser.Math.Between(100, 1500);
      const y = Phaser.Math.Between(100, 1100);

      // Avoid paths
      if (Math.abs(x - 800) < 100 || Math.abs(y - 600) < 100) continue;

      const colors = [0xff69b4, 0xffff00, 0xff0000, 0x9370db];
      const color = Phaser.Utils.Array.GetRandom(colors);

      this.add.circle(x, y, 4, color);
    }
  }

  createPlayer() {
    const startX = gameState.playerPosition.x || 800;
    const startY = gameState.playerPosition.y || 600;

    // Create player sprite (simple circle for now)
    this.player = this.physics.add.sprite(startX, startY, null);

    // Draw player as a character
    const graphics = this.make.graphics({ x: 0, y: 0 });
    graphics.fillStyle(0x6b46c1);
    graphics.fillCircle(0, 0, 20);
    graphics.fillStyle(0xffd700);
    graphics.fillCircle(0, -5, 8); // Head
    graphics.generateTexture('player', 40, 40);
    graphics.destroy();

    this.player.setTexture('player');
    this.player.setCollideWorldBounds(true);
    this.player.setDepth(10);

    // Player properties
    this.player.speed = 200;
    this.player.moving = false;
  }

  createZones() {
    this.zones = [];

    // Library - Top Left
    const library = this.createBuilding(300, 200, 200, 180, 0x8b4513, '📚 Library');
    library.zoneKey = 'LibraryScene';
    library.zoneName = 'Ancient Library';
    this.zones.push(library);

    // Bookstore - Top Right
    const bookstore = this.createBuilding(1300, 200, 200, 180, 0x4a6fa5, '🏪 Bookstore');
    bookstore.zoneKey = 'BookstoreScene';
    bookstore.zoneName = 'Mystic Bookstore';
    this.zones.push(bookstore);

    // Author Land - Bottom Right
    const authorLand = this.createBuilding(1300, 1000, 200, 180, 0x6b46c1, '✨ Author Realm');
    authorLand.zoneKey = 'AuthorLandScene';
    authorLand.zoneName = 'Author Realm';
    this.zones.push(authorLand);

    // Writer's Workshop - Bottom Left
    const workshop = this.createBuilding(300, 1000, 200, 180, 0x8b0000, '✍️ Writer\'s Workshop');
    workshop.zoneKey = 'WritersWorkshopScene';
    workshop.zoneName = 'Writer\'s Workshop';
    this.zones.push(workshop);

    // Player Home - Center Left
    const home = this.createBuilding(200, 600, 160, 140, 0xcd853f, '🏠 Your Home');
    home.zoneKey = 'PlayerHomeScene';
    home.zoneName = 'Your Home';
    this.zones.push(home);

    // Daniel Greene NPC (center of town square)
    this.createDanielNPC(800, 600);
  }

  createBuilding(x, y, width, height, color, label) {
    // Building structure
    const building = this.add.rectangle(x, y, width, height, color);
    building.setStrokeStyle(4, 0x000000);

    // Roof
    const roof = this.add.triangle(
      x, y - height / 2 - 20,
      0, 40,
      width / 2, 0,
      -width / 2, 0,
      color - 0x202020
    );
    roof.setStrokeStyle(2, 0x000000);

    // Door
    this.add.rectangle(x, y + height / 2 - 20, 40, 50, 0x654321);

    // Label
    const text = this.add.text(x, y - height / 2 - 50, label, {
      fontSize: '18px',
      fontStyle: 'bold',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 8, y: 4 }
    });
    text.setOrigin(0.5);

    // Interaction zone
    const zone = this.add.zone(x, y + height / 2 + 20, 80, 40);
    this.physics.add.existing(zone);
    zone.body.setAllowGravity(false);
    zone.body.moves = false;

    return zone;
  }

  createDanielNPC(x, y) {
    // Daniel Greene NPC in center
    const daniel = this.add.circle(x, y, 25, 0xd4af37);
    daniel.setStrokeStyle(3, 0x000000);

    const text = this.add.text(x, y - 50, '👨 Daniel Greene', {
      fontSize: '16px',
      fontStyle: 'bold',
      color: '#d4af37',
      backgroundColor: '#000000',
      padding: { x: 6, y: 3 }
    });
    text.setOrigin(0.5);

    const zone = this.add.zone(x, y, 60, 60);
    this.physics.add.existing(zone);
    zone.body.setAllowGravity(false);
    zone.body.moves = false;

    this.physics.add.overlap(this.player, zone, () => {
      this.showInteractionPrompt('Press SPACE to talk');
      this.currentInteraction = () => this.talkToDaniel();
    }, null, this);
  }

  createNPCs() {
    // Random readers walking around
    this.npcs = [];

    const npcData = [
      { x: 600, y: 400, color: 0xff6b6b, name: 'Fantasy Fan' },
      { x: 1000, y: 400, color: 0x4ecdc4, name: 'Book Collector' },
      { x: 600, y: 800, color: 0x95e1d3, name: 'Aspiring Writer' }
    ];

    npcData.forEach(data => {
      const npc = this.add.circle(data.x, data.y, 15, data.color);
      npc.setStrokeStyle(2, 0x000000);
      this.npcs.push(npc);

      // Random movement
      this.tweens.add({
        targets: npc,
        x: data.x + Phaser.Math.Between(-100, 100),
        y: data.y + Phaser.Math.Between(-100, 100),
        duration: 3000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    });
  }

  setupControls() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys('W,A,S,D,SPACE,E');

    // Zone interactions
    this.zones.forEach(zone => {
      this.physics.add.overlap(this.player, zone, (player, zoneObj) => {
        this.showInteractionPrompt(`Press SPACE to enter ${zoneObj.zoneName}`);
        this.currentInteraction = () => this.enterZone(zoneObj);
      }, null, this);
    });
  }

  setupMobileControls() {
    const joystick = document.getElementById('joystick');
    const knob = document.getElementById('joystickKnob');
    const actionBtn = document.getElementById('actionButton');

    let joystickActive = false;
    let joystickData = { x: 0, y: 0 };

    const handleJoystickStart = (e) => {
      joystickActive = true;
    };

    const handleJoystickMove = (e) => {
      if (!joystickActive) return;

      const rect = joystick.getBoundingClientRect();
      const touch = e.touches[0];
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      let dx = touch.clientX - centerX;
      let dy = touch.clientY - centerY;

      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 35;

      if (distance > maxDistance) {
        dx = (dx / distance) * maxDistance;
        dy = (dy / distance) * maxDistance;
      }

      knob.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;

      joystickData.x = dx / maxDistance;
      joystickData.y = dy / maxDistance;
    };

    const handleJoystickEnd = () => {
      joystickActive = false;
      knob.style.transform = 'translate(-50%, -50%)';
      joystickData = { x: 0, y: 0 };
    };

    joystick.addEventListener('touchstart', handleJoystickStart);
    joystick.addEventListener('touchmove', handleJoystickMove);
    joystick.addEventListener('touchend', handleJoystickEnd);

    actionBtn.addEventListener('click', () => {
      if (this.currentInteraction) {
        this.currentInteraction();
      }
    });

    this.mobileJoystick = joystickData;
  }

  update() {
    if (!this.player) return;

    let velocityX = 0;
    let velocityY = 0;

    // Keyboard controls
    if (this.cursors.left.isDown || this.keys.A.isDown) {
      velocityX = -this.player.speed;
    } else if (this.cursors.right.isDown || this.keys.D.isDown) {
      velocityX = this.player.speed;
    }

    if (this.cursors.up.isDown || this.keys.W.isDown) {
      velocityY = -this.player.speed;
    } else if (this.cursors.down.isDown || this.keys.S.isDown) {
      velocityY = this.player.speed;
    }

    // Mobile joystick
    if (this.mobileJoystick) {
      velocityX += this.mobileJoystick.x * this.player.speed;
      velocityY += this.mobileJoystick.y * this.player.speed;
    }

    // Apply velocity
    this.player.setVelocity(velocityX, velocityY);

    // Normalize diagonal movement
    if (velocityX !== 0 && velocityY !== 0) {
      this.player.setVelocity(velocityX * 0.7071, velocityY * 0.7071);
    }

    // Interaction
    if (Phaser.Input.Keyboard.JustDown(this.keys.SPACE) ||
        Phaser.Input.Keyboard.JustDown(this.keys.E)) {
      if (this.currentInteraction) {
        this.currentInteraction();
      }
    }

    // Save player position
    gameState.playerPosition = { x: this.player.x, y: this.player.y };
  }

  showInteractionPrompt(text) {
    if (this.interactionText) {
      this.interactionText.destroy();
    }

    this.interactionText = this.add.text(this.player.x, this.player.y - 60, text, {
      fontSize: '14px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 6, y: 3 }
    });
    this.interactionText.setOrigin(0.5);

    this.time.delayedCall(2000, () => {
      if (this.interactionText) {
        this.interactionText.destroy();
      }
    });
  }

  enterZone(zone) {
    console.log('Entering:', zone.zoneKey);
    this.scene.start(zone.zoneKey);
  }

  talkToDaniel() {
    this.showDialogue([
      "Hey there! Welcome to Fantasy Reading Quest!",
      "I'm Daniel Greene, your guide through the world of fantasy literature.",
      "Explore different zones to discover books, meet authors, and build your library!",
      "Check out the Library, Bookstore, or even visit Author Lands!",
      "Your journey starts now. Happy reading!"
    ]);
  }

  showDialogue(messages) {
    let currentIndex = 0;

    const dialogueBox = this.add.rectangle(
      this.cameras.main.centerX,
      this.cameras.main.height - 100,
      this.cameras.main.width - 40,
      120,
      0x000000,
      0.9
    );
    dialogueBox.setStrokeStyle(3, 0xd4af37);
    dialogueBox.setScrollFactor(0);
    dialogueBox.setDepth(1000);

    const dialogueText = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.height - 100,
      messages[0],
      {
        fontSize: '18px',
        color: '#ffffff',
        wordWrap: { width: this.cameras.main.width - 80 },
        align: 'center'
      }
    );
    dialogueText.setOrigin(0.5);
    dialogueText.setScrollFactor(0);
    dialogueText.setDepth(1001);

    const nextMessage = () => {
      currentIndex++;
      if (currentIndex < messages.length) {
        dialogueText.setText(messages[currentIndex]);
      } else {
        dialogueBox.destroy();
        dialogueText.destroy();
        this.input.keyboard.off('keydown-SPACE', nextMessage);
      }
    };

    this.input.keyboard.on('keydown-SPACE', nextMessage);

    // Auto-close after last message
    this.time.delayedCall(messages.length * 3000, () => {
      if (dialogueBox.active) {
        dialogueBox.destroy();
        dialogueText.destroy();
      }
    });
  }

  updateLocationLabel(text) {
    const label = document.getElementById('locationLabel');
    label.textContent = text;
    label.classList.add('show');
    setTimeout(() => label.classList.remove('show'), 3000);
  }

  updateBookCount() {
    document.getElementById('bookCount').textContent = gameState.booksCollected;
  }
}

// ============================================
// LIBRARY SCENE
// ============================================

class LibraryScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LibraryScene' });
  }

  create() {
    this.createLibraryWorld();
    this.createPlayer();
    this.createBookshelves();
    this.setupControls();
    this.updateLocationLabel('Ancient Library - Explore Thousands of Fantasy Books');

    if (isMobile) {
      this.setupMobileControls();
    }
  }

  createLibraryWorld() {
    // Library floor
    this.add.rectangle(640, 360, 1280, 720, 0x8b7355);

    // Walls
    this.add.rectangle(640, 20, 1280, 40, 0x654321);
    this.add.rectangle(640, 700, 1280, 40, 0x654321);
    this.add.rectangle(20, 360, 40, 720, 0x654321);
    this.add.rectangle(1260, 360, 40, 720, 0x654321);

    // Carpet
    this.add.rectangle(640, 360, 600, 500, 0x8b0000, 0.3);

    // Exit door
    this.createExitDoor(640, 680);
  }

  createBookshelves() {
    // Create interactive bookshelves with different genres
    const shelves = [
      { x: 200, y: 200, genre: 'Epic Fantasy', books: ['Mistborn', 'The Way of Kings', 'The Eye of the World'] },
      { x: 500, y: 200, genre: 'Grimdark', books: ['The Blade Itself', 'The Black Company'] },
      { x: 800, y: 200, genre: 'Cozy Fantasy', books: ['Legends & Lattes', 'The House in the Cerulean Sea'] },
      { x: 1100, y: 200, genre: 'Urban Fantasy', books: ['The Dresden Files', 'Jade City'] },
    ];

    shelves.forEach(shelf => {
      this.createBookshelf(shelf.x, shelf.y, shelf.genre, shelf.books);
    });
  }

  createBookshelf(x, y, genre, books) {
    // Bookshelf visual
    const shelf = this.add.rectangle(x, y, 150, 200, 0x654321);
    shelf.setStrokeStyle(3, 0x000000);

    // Add colorful books
    for (let i = 0; i < 8; i++) {
      const bookX = x - 60 + (i * 15);
      const bookY = y - 40 + Phaser.Math.Between(-10, 10);
      const bookColor = Phaser.Display.Color.RandomRGB().color;
      this.add.rectangle(bookX, bookY, 12, 50, bookColor);
    }

    // Genre label
    this.add.text(x, y - 130, genre, {
      fontSize: '16px',
      fontStyle: 'bold',
      color: '#d4af37',
      backgroundColor: '#000000',
      padding: { x: 6, y: 3 }
    }).setOrigin(0.5);

    // Interaction zone
    const zone = this.add.zone(x, y + 120, 150, 60);
    this.physics.add.existing(zone);
    zone.books = books;
    zone.genre = genre;

    this.physics.add.overlap(this.player, zone, () => {
      this.showInteractionPrompt(`Press SPACE to browse ${genre}`);
      this.currentInteraction = () => this.browseShelf(zone);
    }, null, this);
  }

  browseShelf(shelf) {
    const bookList = shelf.books.join(', ');
    this.showBookOverlay(shelf.genre, shelf.books);
  }

  showBookOverlay(genre, books) {
    // Create overlay
    const overlay = this.add.rectangle(640, 360, 800, 500, 0x000000, 0.95);
    overlay.setStrokeStyle(4, 0xd4af37);
    overlay.setScrollFactor(0);
    overlay.setDepth(2000);
    overlay.setInteractive();

    const title = this.add.text(640, 150, genre, {
      fontSize: '32px',
      fontStyle: 'bold',
      color: '#d4af37'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(2001);

    let yPos = 220;
    books.forEach(book => {
      const bookBtn = this.add.text(640, yPos, `📖 ${book}`, {
        fontSize: '20px',
        color: '#ffffff',
        backgroundColor: '#6b46c1',
        padding: { x: 20, y: 10 }
      }).setOrigin(0.5).setScrollFactor(0).setDepth(2001).setInteractive();

      bookBtn.on('pointerdown', () => {
        this.addToLibrary(book);
        bookBtn.setStyle({ backgroundColor: '#228b22' });
        bookBtn.setText(`✓ ${book} - Added to Library!`);
      });

      yPos += 60;
    });

    const closeBtn = this.add.text(640, 550, 'Close [ESC]', {
      fontSize: '18px',
      color: '#ffffff',
      backgroundColor: '#8b0000',
      padding: { x: 15, y: 8 }
    }).setOrigin(0.5).setScrollFactor(0).setDepth(2001).setInteractive();

    closeBtn.on('pointerdown', () => {
      overlay.destroy();
      title.destroy();
      closeBtn.destroy();
      this.children.list.filter(child =>
        child.depth === 2001 && child.type === 'Text'
      ).forEach(child => child.destroy());
    });
  }

  addToLibrary(bookTitle) {
    if (!gameState.booksRead.includes(bookTitle)) {
      gameState.booksRead.push(bookTitle);
      gameState.booksCollected++;
      this.saveGame();
      document.getElementById('bookCount').textContent = gameState.booksCollected;
    }
  }

  createPlayer() {
    this.player = this.physics.add.sprite(640, 600, 'player');
    this.player.setCollideWorldBounds(true);
    this.player.setDepth(10);
    this.player.speed = 200;
  }

  createExitDoor(x, y) {
    const door = this.add.rectangle(x, y, 80, 60, 0x654321);
    door.setStrokeStyle(3, 0x000000);

    const text = this.add.text(x, y - 40, '🚪 Exit', {
      fontSize: '14px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 4, y: 2 }
    }).setOrigin(0.5);

    const zone = this.add.zone(x, y, 80, 60);
    this.physics.add.existing(zone);

    this.physics.add.overlap(this.player, zone, () => {
      this.showInteractionPrompt('Press SPACE to exit');
      this.currentInteraction = () => this.scene.start('MainWorldScene');
    }, null, this);
  }

  setupControls() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys('W,A,S,D,SPACE,E,ESC');

    this.input.keyboard.on('keydown-ESC', () => {
      this.scene.start('MainWorldScene');
    });
  }

  setupMobileControls() {
    const actionBtn = document.getElementById('actionButton');
    actionBtn.onclick = () => {
      if (this.currentInteraction) {
        this.currentInteraction();
      }
    };
  }

  update() {
    if (!this.player) return;

    let velocityX = 0;
    let velocityY = 0;

    if (this.cursors.left.isDown || this.keys.A.isDown) velocityX = -this.player.speed;
    else if (this.cursors.right.isDown || this.keys.D.isDown) velocityX = this.player.speed;

    if (this.cursors.up.isDown || this.keys.W.isDown) velocityY = -this.player.speed;
    else if (this.cursors.down.isDown || this.keys.S.isDown) velocityY = this.player.speed;

    this.player.setVelocity(velocityX, velocityY);

    if (velocityX !== 0 && velocityY !== 0) {
      this.player.setVelocity(velocityX * 0.7071, velocityY * 0.7071);
    }

    if (Phaser.Input.Keyboard.JustDown(this.keys.SPACE) ||
        Phaser.Input.Keyboard.JustDown(this.keys.E)) {
      if (this.currentInteraction) {
        this.currentInteraction();
      }
    }
  }

  showInteractionPrompt(text) {
    if (this.interactionText) this.interactionText.destroy();

    this.interactionText = this.add.text(this.player.x, this.player.y - 60, text, {
      fontSize: '14px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 6, y: 3 }
    }).setOrigin(0.5);

    this.time.delayedCall(2000, () => {
      if (this.interactionText) this.interactionText.destroy();
    });
  }

  updateLocationLabel(text) {
    const label = document.getElementById('locationLabel');
    label.textContent = text;
    label.classList.add('show');
  }

  saveGame() {
    localStorage.setItem('fantasy-rpg-save', JSON.stringify(gameState));
  }
}

// ============================================
// PLACEHOLDER SCENES (to be expanded)
// ============================================

class BookstoreScene extends LibraryScene {
  constructor() {
    super();
    this.scene.key = 'BookstoreScene';
  }

  create() {
    super.create();
    this.updateLocationLabel('Mystic Bookstore - Buy and Discover New Releases');
  }
}

class AuthorLandScene extends LibraryScene {
  constructor() {
    super();
    this.scene.key = 'AuthorLandScene';
  }

  create() {
    super.create();
    this.updateLocationLabel('Author Realm - Meet Your Favorite Fantasy Authors');
  }
}

class WritersWorkshopScene extends LibraryScene {
  constructor() {
    super();
    this.scene.key = 'WritersWorkshopScene';
  }

  create() {
    super.create();
    this.updateLocationLabel('Writer\'s Workshop - Learn the Craft from Masters');
  }
}

class PlayerHomeScene extends LibraryScene {
  constructor() {
    super();
    this.scene.key = 'PlayerHomeScene';
  }

  create() {
    super.create();
    this.updateLocationLabel('Your Home - Your Personal Fantasy Library');
  }
}
