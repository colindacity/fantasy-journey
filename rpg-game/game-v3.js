// ============================================
// FANTASY READING QUEST - Monument Valley Edition
// Beautiful, minimalist 2025 fantasy reading guide
// Version: 3.0.0 - Complete redesign
// ============================================

const GAME_VERSION = '3.0.0';
console.log('%c📚 Fantasy Reading Quest v' + GAME_VERSION, 'font-size: 24px; font-weight: bold; color: #fff; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 15px; border-radius: 8px;');
console.log('%c✨ Monument Valley Edition - Minimalist Fantasy', 'color: #a78bfa; font-weight: bold; font-size: 16px;');

// Monument Valley Color Palette
const COLORS = {
  sky: {
    top: 0x87ceeb,
    bottom: 0xffdab9
  },
  zones: {
    cozy: { primary: 0xf4a460, secondary: 0xdeb887, accent: 0xff6b6b },
    library: { primary: 0x6366f1, secondary: 0x818cf8, accent: 0xa78bfa },
    grimdark: { primary: 0x4c1d95, secondary: 0x6b21a8, accent: 0x7c3aed },
    epic: { primary: 0x0ea5e9, secondary: 0x38bdf8, accent: 0x7dd3fc },
    urban: { primary: 0xec4899, secondary: 0xf472b6, accent: 0xfbbf24 },
    workshop: { primary: 0xf97316, secondary: 0xfb923c, accent: 0xfde047 },
    ya: { primary: 0x14b8a6, secondary: 0x2dd4bf, accent: 0x5eead4 }
  },
  ui: {
    background: 0xffffff,
    text: 0x1f2937,
    accent: 0x8b5cf6,
    shadow: 0x000000
  }
};

// Game State
const gameState = {
  playerName: 'Reader',
  booksCollected: 0,
  booksRead: [],
  currentZone: 'world-map',
  readingLevel: 1,
  discoveryCount: 0,
  danielQuotes: [
    "Your wand is throbbing... for great fantasy books!",
    "Go read. I'm serious.",
    "This book slaps harder than a wet noodle!",
    "You little freak, you're going to love this.",
    "Your family is going to miss you."
  ]
};

// Mobile detection
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || ('ontouchstart' in window);

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
      const fill = document.getElementById('loadingFill');
      const text = document.getElementById('loadingText');
      if (fill) fill.style.width = (value * 100) + '%';
      if (text) text.textContent = `Loading your fantasy journey... ${Math.floor(value * 100)}%`;
    });

    // Create procedural geometric assets (Monument Valley style)
    this.createGeometricAssets();
  }

  createGeometricAssets() {
    // We'll generate these in create() after graphics context is ready
  }

  create() {
    // Generate all geometric graphics
    this.generateMonumentValleyGraphics();

    // Create character animation (smooth, not pixelated)
    this.createCharacterAnimations();

    // Hide loading screen with smooth fade
    setTimeout(() => {
      const loading = document.getElementById('loading');
      if (loading) {
        loading.style.transition = 'opacity 0.8s ease-out';
        loading.style.opacity = '0';
        setTimeout(() => loading.classList.add('hidden'), 800);
      }
    }, 300);

    // Load saved game
    const saved = localStorage.getItem('fantasy-rpg-save-v3');
    if (saved) {
      Object.assign(gameState, JSON.parse(saved));
    }

    // Show Daniel's welcome message
    this.showWelcomeMessage();

    // Start world map
    this.time.delayedCall(2000, () => {
      this.scene.start('WorldMapScene');
    });
  }

  generateMonumentValleyGraphics() {
    // Generate stylized character (NOT pixel art - smooth geometric)
    const charGraphics = this.add.graphics();

    // Body (gradient cape)
    charGraphics.fillGradientStyle(0x8b5cf6, 0x8b5cf6, 0x6366f1, 0x6366f1, 1);
    charGraphics.fillCircle(20, 30, 15); // Head
    charGraphics.fillRoundedRect(8, 42, 24, 35, 8); // Body/robe

    // Add magical book companion (orbiting)
    charGraphics.fillStyle(0xfbbf24, 1);
    charGraphics.fillRoundedRect(38, 20, 12, 16, 2);
    charGraphics.lineStyle(2, 0xf59e0b);
    charGraphics.strokeRoundedRect(38, 20, 12, 16, 2);

    charGraphics.generateTexture('player-character', 64, 80);
    charGraphics.destroy();

    // Generate magical tome (3D effect)
    this.createTomeTextures();

    // Generate zone monuments (7 geometric structures)
    this.createZoneMonuments();

    // Generate world map platform
    this.createWorldMapPlatform();
  }

  createTomeTextures() {
    // Epic Fantasy Tome (blue)
    this.createSingleTome('tome-epic', 0x3b82f6, 0x1d4ed8);

    // Cozy Tome (warm brown)
    this.createSingleTome('tome-cozy', 0xf4a460, 0xd4845c);

    // Grimdark Tome (dark purple)
    this.createSingleTome('tome-grimdark', 0x7c3aed, 0x5b21b6);

    // Urban Fantasy Tome (pink)
    this.createSingleTome('tome-urban', 0xec4899, 0xdb2777);

    // General Tome (gradient)
    this.createSingleTome('tome-general', 0x8b5cf6, 0x6366f1);
  }

  createSingleTome(key, color1, color2) {
    const g = this.add.graphics();

    // Book cover with depth
    g.fillGradientStyle(color1, color1, color2, color2, 1);
    g.fillRoundedRect(0, 0, 60, 80, 4);

    // Spine shadow
    g.fillStyle(0x000000, 0.2);
    g.fillRect(0, 0, 8, 80);

    // Highlight
    g.fillStyle(0xffffff, 0.3);
    g.fillRoundedRect(12, 8, 36, 64, 2);

    // Border
    g.lineStyle(2, 0x000000, 0.3);
    g.strokeRoundedRect(0, 0, 60, 80, 4);

    g.generateTexture(key, 60, 80);
    g.destroy();
  }

  createZoneMonuments() {
    // Cozy Corner - Warm cottage shape
    let g = this.add.graphics();
    g.fillStyle(0xf4a460, 1);
    g.fillRoundedRect(0, 20, 80, 60, 8);
    g.fillTriangle(0, 20, 40, 0, 80, 20); // Roof
    g.lineStyle(3, 0xd4845c);
    g.strokeRoundedRect(0, 20, 80, 60, 8);
    g.strokeTriangle(0, 20, 40, 0, 80, 20);
    g.generateTexture('monument-cozy', 80, 80);
    g.destroy();

    // Grand Library - Crystal tower
    g = this.add.graphics();
    g.fillGradientStyle(0x6366f1, 0x6366f1, 0x8b5cf6, 0x8b5cf6, 1);
    g.fillRect(20, 10, 40, 70);
    g.fillTriangle(20, 10, 40, -5, 60, 10);
    g.lineStyle(3, 0xa78bfa);
    g.strokeRect(20, 10, 40, 70);
    g.strokeTriangle(20, 10, 40, -5, 60, 10);
    g.generateTexture('monument-library', 80, 80);
    g.destroy();

    // Grimdark Depths - Dark fortress
    g = this.add.graphics();
    g.fillStyle(0x4c1d95, 1);
    g.fillRect(15, 15, 50, 65);
    g.fillTriangle(15, 15, 40, 0, 65, 15);
    g.lineStyle(3, 0x7c3aed);
    g.strokeRect(15, 15, 50, 65);
    g.generateTexture('monument-grimdark', 80, 80);
    g.destroy();

    // Epic Fantasy - Mountain peak
    g = this.add.graphics();
    g.fillStyle(0x0ea5e9, 1);
    g.fillTriangle(5, 80, 40, 5, 75, 80);
    g.lineStyle(3, 0x38bdf8);
    g.strokeTriangle(5, 80, 40, 5, 75, 80);
    g.generateTexture('monument-epic', 80, 80);
    g.destroy();

    // Urban Fantasy - City building
    g = this.add.graphics();
    g.fillGradientStyle(0xec4899, 0xec4899, 0xf472b6, 0xf472b6, 1);
    g.fillRoundedRect(10, 20, 60, 60, 4);
    g.lineStyle(3, 0xfbbf24);
    g.strokeRoundedRect(10, 20, 60, 60, 4);
    g.generateTexture('monument-urban', 80, 80);
    g.destroy();

    // Writer's Workshop - Gear/cog
    g = this.add.graphics();
    g.fillStyle(0xf97316, 1);
    g.fillCircle(40, 40, 30);
    g.lineStyle(4, 0xfb923c);
    g.strokeCircle(40, 40, 30);
    g.strokeCircle(40, 40, 15);
    g.generateTexture('monument-workshop', 80, 80);
    g.destroy();

    // YA Academy - Star shape
    g = this.add.graphics();
    g.fillStyle(0x14b8a6, 1);
    g.fillStar(40, 40, 5, 35, 20);
    g.lineStyle(3, 0x2dd4bf);
    g.strokeStar(40, 40, 5, 35, 20);
    g.generateTexture('monument-ya', 80, 80);
    g.destroy();
  }

  createWorldMapPlatform() {
    // Isometric platform base (Monument Valley style)
    const g = this.add.graphics();

    // Create gradient base
    g.fillGradientStyle(0xe5e7eb, 0xe5e7eb, 0xd1d5db, 0xd1d5db, 1);
    g.fillRect(0, 0, 200, 200);

    // Add grid lines for depth
    g.lineStyle(1, 0x9ca3af, 0.3);
    for (let i = 0; i < 200; i += 40) {
      g.lineBetween(i, 0, i, 200);
      g.lineBetween(0, i, 200, i);
    }

    g.generateTexture('platform-tile', 200, 200);
    g.destroy();
  }

  createCharacterAnimations() {
    // Character sprite exists, now create smooth animations
    // We'll use tweens instead of frame animations for smooth movement
  }

  showWelcomeMessage() {
    const randomQuote = Phaser.Math.RND.pick(gameState.danielQuotes);

    // Create welcome text that fades in/out
    const welcome = this.add.text(400, 300,
      `Welcome to Fantasy Reading Quest!\n\n"${randomQuote}"\n- Daniel Greene`,
      {
        fontSize: '20px',
        fontFamily: 'Georgia, serif',
        color: '#ffffff',
        align: 'center',
        backgroundColor: '#00000088',
        padding: { x: 30, y: 20 },
        wordWrap: { width: 600 }
      }
    ).setOrigin(0.5).setAlpha(0);

    this.tweens.add({
      targets: welcome,
      alpha: 1,
      duration: 1000,
      ease: 'Power2'
    });

    this.time.delayedCall(3000, () => {
      this.tweens.add({
        targets: welcome,
        alpha: 0,
        duration: 1000,
        onComplete: () => welcome.destroy()
      });
    });
  }
}

// ============================================
// WORLD MAP SCENE - Interactive Hub
// ============================================

class WorldMapScene extends Phaser.Scene {
  constructor() {
    super({ key: 'WorldMapScene' });
  }

  create() {
    gameState.currentZone = 'world-map';
    this.updateLocationLabel('🗺️ Fantasy Literature World Map');

    // Create Monument Valley-style world
    this.createIsometricWorld();

    // Create floating player character
    this.createStylizedPlayer();

    // Create 7 zone monuments in a beautiful layout
    this.createZoneMonuments();

    // Add atmospheric particles
    this.addAtmosphericParticles();

    // Setup camera
    this.cameras.main.setBounds(0, 0, 1600, 1200);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setZoom(isMobile ? 0.7 : 0.9);

    // Controls
    this.setupControls();

    if (isMobile) {
      this.setupMobileControls();
    }

    // Show tutorial hint
    this.showTutorialHint();

    this.updateBookCount();
  }

  createIsometricWorld() {
    // Sky gradient background
    const bg = this.add.graphics();
    bg.fillGradientStyle(
      COLORS.sky.top, COLORS.sky.top,
      COLORS.sky.bottom, COLORS.sky.bottom,
      1
    );
    bg.fillRect(0, 0, 1600, 1200);

    // Create isometric platform tiles
    for (let x = 0; x < 1600; x += 200) {
      for (let y = 0; y < 1200; y += 200) {
        const tile = this.add.image(x + 100, y + 100, 'platform-tile');
        tile.setAlpha(0.7);

        // Add subtle float animation
        this.tweens.add({
          targets: tile,
          y: tile.y - 5,
          duration: 3000 + Math.random() * 2000,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut'
        });
      }
    }

    // Add geometric decorations (floating cubes, pyramids)
    this.createGeometricDecorations();

    // Physics world bounds
    this.physics.world.setBounds(0, 0, 1600, 1200);
  }

  createGeometricDecorations() {
    // Floating geometric shapes (Monument Valley aesthetic)
    const shapes = [
      { x: 200, y: 200, size: 40, type: 'cube', color: 0xfbbf24 },
      { x: 1400, y: 300, size: 50, type: 'pyramid', color: 0x8b5cf6 },
      { x: 300, y: 1000, size: 35, type: 'cube', color: 0xec4899 },
      { x: 1200, y: 900, size: 45, type: 'pyramid', color: 0x14b8a6 },
    ];

    shapes.forEach(shape => {
      const g = this.add.graphics();

      if (shape.type === 'cube') {
        // Isometric cube
        g.fillStyle(shape.color, 0.8);
        g.fillRect(0, 0, shape.size, shape.size);
        g.lineStyle(2, 0xffffff, 0.5);
        g.strokeRect(0, 0, shape.size, shape.size);
      } else {
        // Pyramid
        g.fillStyle(shape.color, 0.8);
        g.fillTriangle(
          shape.size / 2, 0,
          0, shape.size,
          shape.size, shape.size
        );
        g.lineStyle(2, 0xffffff, 0.5);
        g.strokeTriangle(
          shape.size / 2, 0,
          0, shape.size,
          shape.size, shape.size
        );
      }

      const sprite = this.add.renderTexture(shape.x, shape.y, shape.size, shape.size);
      sprite.draw(g);
      g.destroy();

      // Float animation
      this.tweens.add({
        targets: sprite,
        y: sprite.y - 20,
        duration: 4000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });

      // Slow rotation
      this.tweens.add({
        targets: sprite,
        angle: 360,
        duration: 20000,
        repeat: -1,
        ease: 'Linear'
      });
    });
  }

  createStylizedPlayer() {
    this.player = this.physics.add.sprite(800, 600, 'player-character');
    this.player.setScale(1.2);
    this.player.setCollideWorldBounds(true);

    // Add soft shadow
    this.playerShadow = this.add.ellipse(
      this.player.x,
      this.player.y + 40,
      50, 25,
      0x000000, 0.2
    );

    // Add magical glow ring
    this.glowRing = this.add.circle(
      this.player.x,
      this.player.y,
      35,
      0x8b5cf6,
      0
    );
    this.glowRing.setStrokeStyle(2, 0x8b5cf6, 0.5);

    // Pulse animation for glow
    this.tweens.add({
      targets: this.glowRing,
      scaleX: 1.2,
      scaleY: 1.2,
      alpha: 0.3,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Orbiting book companion
    this.createBookCompanion();
  }

  createBookCompanion() {
    this.bookCompanion = this.add.sprite(
      this.player.x + 40,
      this.player.y - 20,
      'tome-general'
    );
    this.bookCompanion.setScale(0.4);
    this.bookCompanion.setAlpha(0.9);

    // Orbit animation
    let angle = 0;
    this.time.addEvent({
      delay: 50,
      callback: () => {
        angle += 0.05;
        const radius = 40;
        this.bookCompanion.x = this.player.x + Math.cos(angle) * radius;
        this.bookCompanion.y = this.player.y - 20 + Math.sin(angle) * radius;
        this.bookCompanion.angle += 1;
      },
      loop: true
    });
  }

  createZoneMonuments() {
    this.zones = [];

    const zoneData = [
      {
        key: 'cozy',
        x: 400,
        y: 300,
        name: '☕ Cozy Corner',
        description: 'Warm slice-of-life fantasy',
        color: COLORS.zones.cozy.primary,
        scene: 'LibraryScene' // We'll make Library the demo zone
      },
      {
        key: 'library',
        x: 800,
        y: 200,
        name: '📚 Grand Library',
        description: 'Epic fantasy & hard magic',
        color: COLORS.zones.library.primary,
        scene: 'LibraryScene',
        featured: true
      },
      {
        key: 'grimdark',
        x: 1200,
        y: 300,
        name: '⚔️ Grimdark Depths',
        description: 'Dark & morally gray tales',
        color: COLORS.zones.grimdark.primary,
        scene: 'ComingSoonScene'
      },
      {
        key: 'epic',
        x: 400,
        y: 700,
        name: '🏔️ Epic Fantasy Kingdom',
        description: 'Classic grand adventures',
        color: COLORS.zones.epic.primary,
        scene: 'ComingSoonScene'
      },
      {
        key: 'urban',
        x: 800,
        y: 800,
        name: '🌆 Urban Fantasy District',
        description: 'Magic in modern world',
        color: COLORS.zones.urban.primary,
        scene: 'ComingSoonScene'
      },
      {
        key: 'workshop',
        x: 1200,
        y: 700,
        name: '🔧 Writer\'s Workshop',
        description: 'Learn the craft',
        color: COLORS.zones.workshop.primary,
        scene: 'ComingSoonScene'
      },
      {
        key: 'ya',
        x: 800,
        y: 1000,
        name: '⭐ YA Academy',
        description: 'Young adult adventures',
        color: COLORS.zones.ya.primary,
        scene: 'ComingSoonScene'
      }
    ];

    zoneData.forEach(zone => {
      this.createZoneMonument(zone);
    });
  }

  createZoneMonument(data) {
    // Monument structure
    const monument = this.add.sprite(data.x, data.y, `monument-${data.key}`);
    monument.setScale(1.5);
    monument.setInteractive();

    // Floating platform beneath
    const platform = this.add.circle(data.x, data.y + 60, 70, 0xe5e7eb, 0.6);

    // Featured badge for demo zone
    if (data.featured) {
      const badge = this.add.text(data.x, data.y - 80, '▶ DEMO ZONE', {
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif',
        color: '#ffffff',
        backgroundColor: '#8b5cf6',
        padding: { x: 10, y: 5 },
        fontStyle: 'bold'
      }).setOrigin(0.5);

      this.tweens.add({
        targets: badge,
        y: badge.y - 5,
        duration: 1000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }

    // Label below
    const label = this.add.text(data.x, data.y + 100, data.name, {
      fontSize: '18px',
      fontFamily: 'Georgia, serif',
      color: '#1f2937',
      fontStyle: 'bold',
      stroke: '#ffffff',
      strokeThickness: 4
    }).setOrigin(0.5);

    // Floating animation
    this.tweens.add({
      targets: monument,
      y: monument.y - 10,
      duration: 3000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Colored light glow
    const glow = this.add.circle(data.x, data.y, 80, data.color, 0);
    glow.setStrokeStyle(3, data.color, 0.4);

    this.tweens.add({
      targets: glow,
      scaleX: 1.3,
      scaleY: 1.3,
      alpha: 0.2,
      duration: 2500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Hover effects
    monument.on('pointerover', () => {
      this.tweens.add({
        targets: monument,
        scaleX: 1.7,
        scaleY: 1.7,
        duration: 300,
        ease: 'Back.easeOut'
      });

      this.showZoneInfo(data);
    });

    monument.on('pointerout', () => {
      this.tweens.add({
        targets: monument,
        scaleX: 1.5,
        scaleY: 1.5,
        duration: 300
      });

      this.hideZoneInfo();
    });

    monument.on('pointerdown', () => {
      this.enterZone(data);
    });

    this.zones.push({
      monument,
      platform,
      label,
      glow,
      data
    });
  }

  showZoneInfo(data) {
    if (this.zoneInfoPanel) {
      this.zoneInfoPanel.destroy();
    }

    const panel = this.add.container(data.x, data.y - 150);

    const bg = this.add.graphics();
    bg.fillStyle(0xffffff, 0.95);
    bg.fillRoundedRect(-120, -50, 240, 100, 12);
    bg.lineStyle(3, data.color, 1);
    bg.strokeRoundedRect(-120, -50, 240, 100, 12);

    const title = this.add.text(0, -25, data.name, {
      fontSize: '18px',
      fontFamily: 'Georgia, serif',
      color: '#1f2937',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    const desc = this.add.text(0, 5, data.description, {
      fontSize: '14px',
      fontFamily: 'Arial, sans-serif',
      color: '#6b7280'
    }).setOrigin(0.5);

    const action = this.add.text(0, 30, data.featured ? 'Click to Enter ✨' : 'Coming Soon', {
      fontSize: '12px',
      fontFamily: 'Arial, sans-serif',
      color: data.featured ? '#8b5cf6' : '#9ca3af',
      fontStyle: 'italic'
    }).setOrigin(0.5);

    panel.add([bg, title, desc, action]);
    panel.setAlpha(0);
    panel.setScale(0.8);

    this.tweens.add({
      targets: panel,
      alpha: 1,
      scaleX: 1,
      scaleY: 1,
      duration: 200,
      ease: 'Back.easeOut'
    });

    this.zoneInfoPanel = panel;
  }

  hideZoneInfo() {
    if (this.zoneInfoPanel) {
      this.tweens.add({
        targets: this.zoneInfoPanel,
        alpha: 0,
        scaleX: 0.8,
        scaleY: 0.8,
        duration: 200,
        onComplete: () => {
          if (this.zoneInfoPanel) {
            this.zoneInfoPanel.destroy();
            this.zoneInfoPanel = null;
          }
        }
      });
    }
  }

  enterZone(data) {
    if (data.scene === 'ComingSoonScene') {
      this.showComingSoonMessage(data.name);
      return;
    }

    // Camera fade transition
    this.cameras.main.fade(800, 0, 0, 0);

    this.time.delayedCall(800, () => {
      this.scene.start(data.scene);
    });
  }

  showComingSoonMessage(zoneName) {
    const message = this.add.container(800, 600);

    const bg = this.add.graphics();
    bg.fillStyle(0x000000, 0.9);
    bg.fillRoundedRect(-200, -80, 400, 160, 16);

    const text = this.add.text(0, -20, `${zoneName}\nComing Soon!`, {
      fontSize: '24px',
      fontFamily: 'Georgia, serif',
      color: '#ffffff',
      align: 'center',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    const subtext = this.add.text(0, 30, 'This zone is under construction', {
      fontSize: '14px',
      fontFamily: 'Arial, sans-serif',
      color: '#9ca3af',
      align: 'center'
    }).setOrigin(0.5);

    message.add([bg, text, subtext]);
    message.setAlpha(0);
    message.setDepth(1000);

    this.tweens.add({
      targets: message,
      alpha: 1,
      duration: 300
    });

    this.time.delayedCall(2000, () => {
      this.tweens.add({
        targets: message,
        alpha: 0,
        duration: 300,
        onComplete: () => message.destroy()
      });
    });
  }

  addAtmosphericParticles() {
    // Gentle floating sparkles (not overdone)
    const particles = this.add.particles(800, -20, 'tome-general', {
      scale: { start: 0.1, end: 0 },
      alpha: { start: 0.6, end: 0 },
      tint: [0xfbbf24, 0x8b5cf6, 0xec4899],
      speedY: { min: 20, max: 50 },
      speedX: { min: -10, max: 10 },
      lifespan: 8000,
      frequency: 2000,
      emitZone: {
        type: 'random',
        source: new Phaser.Geom.Rectangle(0, 0, 1600, 20)
      }
    });
    particles.setDepth(-1);
  }

  showTutorialHint() {
    const hint = this.add.text(800, 100,
      'Walk around and click on monuments to explore!\n📚 The Grand Library is ready to explore!',
      {
        fontSize: '16px',
        fontFamily: 'Arial, sans-serif',
        color: '#1f2937',
        align: 'center',
        backgroundColor: '#ffffffdd',
        padding: { x: 20, y: 15 },
        borderRadius: 12
      }
    ).setOrigin(0.5).setAlpha(0).setScrollFactor(0);

    this.tweens.add({
      targets: hint,
      alpha: 1,
      duration: 500
    });

    this.time.delayedCall(5000, () => {
      this.tweens.add({
        targets: hint,
        alpha: 0,
        duration: 500,
        onComplete: () => hint.destroy()
      });
    });
  }

  setupControls() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  }

  setupMobileControls() {
    document.getElementById('mobile-controls').classList.add('show');

    this.joystickData = { x: 0, y: 0 };

    const joystick = document.getElementById('joystick');
    const knob = document.getElementById('joystick-knob');

    let isDragging = false;
    const joystickRadius = 40;

    const handleJoystickMove = (clientX, clientY) => {
      if (!isDragging) return;

      const rect = joystick.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      let deltaX = clientX - centerX;
      let deltaY = clientY - centerY;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance > joystickRadius) {
        deltaX = (deltaX / distance) * joystickRadius;
        deltaY = (deltaY / distance) * joystickRadius;
      }

      knob.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

      this.joystickData.x = deltaX / joystickRadius;
      this.joystickData.y = deltaY / joystickRadius;
    };

    joystick.addEventListener('touchstart', (e) => {
      isDragging = true;
      e.preventDefault();
    });

    joystick.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      handleJoystickMove(touch.clientX, touch.clientY);
      e.preventDefault();
    });

    const endDrag = () => {
      isDragging = false;
      knob.style.transform = 'translate(0, 0)';
      this.joystickData = { x: 0, y: 0 };
    };

    joystick.addEventListener('touchend', endDrag);
    joystick.addEventListener('touchcancel', endDrag);
  }

  update() {
    if (!this.player) return;

    const speed = 200;
    let velocityX = 0;
    let velocityY = 0;

    // Keyboard
    if (this.cursors.left.isDown || this.keyA.isDown) velocityX = -speed;
    else if (this.cursors.right.isDown || this.keyD.isDown) velocityX = speed;

    if (this.cursors.up.isDown || this.keyW.isDown) velocityY = -speed;
    else if (this.cursors.down.isDown || this.keyS.isDown) velocityY = speed;

    // Mobile joystick
    if (isMobile && this.joystickData) {
      if (Math.abs(this.joystickData.x) > 0.1 || Math.abs(this.joystickData.y) > 0.1) {
        velocityX = this.joystickData.x * speed;
        velocityY = this.joystickData.y * speed;
      }
    }

    this.player.setVelocity(velocityX, velocityY);

    // Update shadow and glow positions
    if (this.playerShadow) {
      this.playerShadow.setPosition(this.player.x, this.player.y + 40);
    }
    if (this.glowRing) {
      this.glowRing.setPosition(this.player.x, this.player.y);
    }

    // Slight tilt based on movement
    if (velocityX !== 0 || velocityY !== 0) {
      const targetAngle = velocityX * 0.05;
      this.player.angle = Phaser.Math.Linear(this.player.angle, targetAngle, 0.1);
    } else {
      this.player.angle = Phaser.Math.Linear(this.player.angle, 0, 0.1);
    }

    this.saveGame();
  }

  updateLocationLabel(text) {
    const label = document.getElementById('locationLabel');
    if (label) label.textContent = text;
  }

  updateBookCount() {
    const bookCount = document.getElementById('bookCount');
    if (bookCount) bookCount.textContent = gameState.booksCollected;
  }

  saveGame() {
    if (this.player) {
      gameState.playerPosition = { x: this.player.x, y: this.player.y };
    }
    localStorage.setItem('fantasy-rpg-save-v3', JSON.stringify(gameState));
  }
}

// ============================================
// LIBRARY SCENE - Perfect Demo Zone
// ============================================

class LibraryScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LibraryScene' });
  }

  create() {
    gameState.currentZone = 'library';
    this.updateLocationLabel('📚 The Grand Library of Sanderson');

    // Create beautiful library interior
    this.createLibraryInterior();

    // Create player
    this.createPlayer();

    // Create book collection (magical tomes)
    this.createBookCollection();

    // Add Daniel Greene NPC
    this.createDanielNPC();

    // Camera
    this.cameras.main.setBounds(0, 0, 1200, 800);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setZoom(1);

    // Fade in
    this.cameras.main.fadeIn(800);

    // Controls
    this.setupControls();

    if (isMobile) {
      this.setupMobileControls();
    }

    // Show welcome
    this.showLibraryWelcome();

    this.updateBookCount();
  }

  createLibraryInterior() {
    // Gradient floor (warm library aesthetic)
    const floor = this.add.graphics();
    floor.fillGradientStyle(
      0xfef3c7, 0xfef3c7,
      0xfde68a, 0xfde68a,
      1
    );
    floor.fillRect(0, 0, 1200, 800);

    // Add geometric pattern
    floor.lineStyle(1, 0xd97706, 0.1);
    for (let x = 0; x < 1200; x += 80) {
      for (let y = 0; y < 800; y += 80) {
        floor.strokeRect(x, y, 80, 80);
      }
    }

    // Walls
    floor.fillStyle(0x6366f1, 1);
    floor.fillRect(0, 0, 1200, 20); // Top
    floor.fillRect(0, 780, 1200, 20); // Bottom
    floor.fillRect(0, 0, 20, 800); // Left
    floor.fillRect(1180, 0, 20, 800); // Right

    // Add bookshelves (geometric)
    this.createBookshelves();

    // Add reading desks
    this.createReadingDesks();

    // Add exit portal
    this.createExitPortal();

    // Atmospheric lighting
    this.addLibraryLighting();
  }

  createBookshelves() {
    const shelfPositions = [
      { x: 150, y: 100 },
      { x: 450, y: 100 },
      { x: 750, y: 100 },
      { x: 1050, y: 100 },
      { x: 150, y: 650 },
      { x: 450, y: 650 },
      { x: 750, y: 650 },
      { x: 1050, y: 650 }
    ];

    shelfPositions.forEach(pos => {
      const g = this.add.graphics();

      // Shelf structure
      g.fillStyle(0x92400e, 1);
      g.fillRoundedRect(0, 0, 200, 120, 8);

      // Shelves
      g.lineStyle(3, 0x78350f);
      g.lineBetween(10, 40, 190, 40);
      g.lineBetween(10, 80, 190, 80);

      // Books on shelves (colorful spines)
      const colors = [0x3b82f6, 0xec4899, 0x8b5cf6, 0x14b8a6, 0xf97316];
      for (let i = 0; i < 8; i++) {
        const x = 15 + i * 22;
        const color = colors[i % colors.length];
        g.fillStyle(color, 1);
        g.fillRect(x, 15, 18, 20);
        g.fillRect(x, 55, 18, 20);
        g.fillRect(x, 85, 18, 20);
      }

      const shelf = this.add.renderTexture(pos.x, pos.y, 200, 120);
      shelf.draw(g);
      g.destroy();
    });
  }

  createReadingDesks() {
    const deskPositions = [
      { x: 300, y: 400 },
      { x: 600, y: 400 },
      { x: 900, y: 400 }
    ];

    deskPositions.forEach(pos => {
      const g = this.add.graphics();
      g.fillStyle(0xa0522d, 1);
      g.fillRoundedRect(0, 0, 120, 80, 8);
      g.lineStyle(2, 0x8b4513);
      g.strokeRoundedRect(0, 0, 120, 80, 8);

      const desk = this.add.renderTexture(pos.x, pos.y, 120, 80);
      desk.draw(g);
      g.destroy();
    });
  }

  createExitPortal() {
    // Portal back to world map
    const portal = this.add.circle(600, 750, 40, 0x8b5cf6, 0.3);
    portal.setStrokeStyle(3, 0xa78bfa, 1);
    portal.setInteractive();

    // Pulsing animation
    this.tweens.add({
      targets: portal,
      scaleX: 1.2,
      scaleY: 1.2,
      alpha: 0.5,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    const portalLabel = this.add.text(600, 750, '🚪 Exit to World Map', {
      fontSize: '14px',
      fontFamily: 'Arial, sans-serif',
      color: '#ffffff',
      backgroundColor: '#00000088',
      padding: { x: 10, y: 5 }
    }).setOrigin(0.5);

    portal.on('pointerdown', () => {
      this.cameras.main.fade(800);
      this.time.delayedCall(800, () => {
        this.scene.start('WorldMapScene');
      });
    });
  }

  addLibraryLighting() {
    // Soft ambient glow
    const glow1 = this.add.circle(300, 200, 150, 0xfbbf24, 0.05);
    const glow2 = this.add.circle(900, 200, 150, 0x8b5cf6, 0.05);
    const glow3 = this.add.circle(600, 600, 150, 0x6366f1, 0.05);

    [glow1, glow2, glow3].forEach(g => {
      this.tweens.add({
        targets: g,
        alpha: 0.1,
        duration: 3000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    });
  }

  createPlayer() {
    this.player = this.physics.add.sprite(600, 700, 'player-character');
    this.player.setScale(1);
    this.player.setCollideWorldBounds(true);

    this.playerShadow = this.add.ellipse(
      this.player.x,
      this.player.y + 40,
      40, 20,
      0x000000, 0.2
    );
  }

  createBookCollection() {
    // Featured fantasy books as magical tomes
    const books = [
      { title: 'The Way of Kings', author: 'Brandon Sanderson', x: 200, y: 200, color: 0x3b82f6, genre: 'epic' },
      { title: 'Mistborn: The Final Empire', author: 'Brandon Sanderson', x: 400, y: 200, color: 0x6366f1, genre: 'epic' },
      { title: 'The Name of the Wind', author: 'Patrick Rothfuss', x: 600, y: 200, color: 0xef4444, genre: 'epic' },
      { title: 'The Fellowship of the Ring', author: 'J.R.R. Tolkien', x: 800, y: 200, color: 0x22c55e, genre: 'epic' },
      { title: 'A Game of Thrones', author: 'George R.R. Martin', x: 1000, y: 200, color: 0x7c3aed, genre: 'grimdark' },
      { title: 'The Eye of the World', author: 'Robert Jordan', x: 200, y: 550, color: 0xf59e0b, genre: 'epic' },
      { title: 'The Blade Itself', author: 'Joe Abercrombie', x: 400, y: 550, color: 0x991b1b, genre: 'grimdark' },
      { title: 'The Fifth Season', author: 'N.K. Jemisin', x: 600, y: 550, color: 0x92400e, genre: 'epic' },
      { title: 'Jade City', author: 'Fonda Lee', x: 800, y: 550, color: 0x14b8a6, genre: 'urban' },
      { title: 'The Black Prism', author: 'Brent Weeks', x: 1000, y: 550, color: 0xfbbf24, genre: 'epic' }
    ];

    this.books = this.physics.add.staticGroup();

    books.forEach(book => {
      this.createMagicalTome(book);
    });

    // Collision for collecting
    this.physics.add.overlap(this.player, this.books, (player, tome) => {
      this.collectBook(tome);
    });
  }

  createMagicalTome(data) {
    // Create floating tome
    const tome = this.books.create(data.x, data.y, 'tome-epic');
    tome.setScale(0.8);
    tome.setData('bookData', data);
    tome.setInteractive();

    // Floating animation
    this.tweens.add({
      targets: tome,
      y: data.y - 10,
      duration: 2000 + Math.random() * 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Gentle rotation
    this.tweens.add({
      targets: tome,
      angle: 5,
      duration: 3000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Magical particles
    const particles = this.add.particles(data.x, data.y, 'tome-general', {
      scale: { start: 0.2, end: 0 },
      alpha: { start: 0.6, end: 0 },
      tint: data.color,
      speed: 20,
      lifespan: 1500,
      frequency: 400,
      angle: { min: 0, max: 360 }
    });

    // Hover effect
    tome.on('pointerover', () => {
      this.tweens.add({
        targets: tome,
        scaleX: 1,
        scaleY: 1,
        duration: 200,
        ease: 'Back.easeOut'
      });

      this.showBookInfo(data);
    });

    tome.on('pointerout', () => {
      this.tweens.add({
        targets: tome,
        scaleX: 0.8,
        scaleY: 0.8,
        duration: 200
      });

      this.hideBookInfo();
    });
  }

  showBookInfo(data) {
    if (this.bookInfoPanel) this.bookInfoPanel.destroy();

    const panel = this.add.container(data.x, data.y - 80);

    const bg = this.add.graphics();
    bg.fillStyle(0xffffff, 0.95);
    bg.fillRoundedRect(-140, -60, 280, 120, 12);
    bg.lineStyle(3, data.color, 1);
    bg.strokeRoundedRect(-140, -60, 280, 120, 12);

    const title = this.add.text(0, -30, data.title, {
      fontSize: '16px',
      fontFamily: 'Georgia, serif',
      color: '#1f2937',
      fontStyle: 'bold',
      align: 'center',
      wordWrap: { width: 260 }
    }).setOrigin(0.5);

    const author = this.add.text(0, 0, `by ${data.author}`, {
      fontSize: '13px',
      fontFamily: 'Arial, sans-serif',
      color: '#6b7280',
      align: 'center'
    }).setOrigin(0.5);

    const hint = this.add.text(0, 30, '▶ Walk close to collect', {
      fontSize: '11px',
      fontFamily: 'Arial, sans-serif',
      color: '#8b5cf6',
      fontStyle: 'italic'
    }).setOrigin(0.5);

    panel.add([bg, title, author, hint]);
    panel.setAlpha(0);
    panel.setDepth(1000);

    this.tweens.add({
      targets: panel,
      alpha: 1,
      y: panel.y - 10,
      duration: 200,
      ease: 'Back.easeOut'
    });

    this.bookInfoPanel = panel;
  }

  hideBookInfo() {
    if (this.bookInfoPanel) {
      this.tweens.add({
        targets: this.bookInfoPanel,
        alpha: 0,
        duration: 200,
        onComplete: () => {
          if (this.bookInfoPanel) {
            this.bookInfoPanel.destroy();
            this.bookInfoPanel = null;
          }
        }
      });
    }
  }

  collectBook(tome) {
    const bookData = tome.getData('bookData');

    // Check if already collected
    if (gameState.booksRead.includes(bookData.title)) {
      return;
    }

    // Add to collection
    gameState.booksRead.push(bookData.title);
    gameState.booksCollected++;
    gameState.discoveryCount++;

    // Particle explosion
    const burst = this.add.particles(tome.x, tome.y, 'tome-general', {
      speed: { min: 100, max: 300 },
      angle: { min: 0, max: 360 },
      scale: { start: 0.8, end: 0 },
      alpha: { start: 1, end: 0 },
      tint: bookData.color,
      lifespan: 1000,
      blendMode: 'ADD',
      emitting: false
    });

    burst.explode(30, tome.x, tome.y);

    // Camera flash
    this.cameras.main.flash(300, 255, 255, 255);

    // Remove tome
    tome.destroy();

    // Show collection message
    this.showCollectionMessage(bookData);

    // Update UI
    this.updateBookCount();

    // Save
    this.saveGame();
  }

  showCollectionMessage(bookData) {
    const message = this.add.container(600, 150);

    const bg = this.add.graphics();
    bg.fillStyle(0x8b5cf6, 0.95);
    bg.fillRoundedRect(-220, -70, 440, 140, 16);
    bg.lineStyle(4, 0xfbbf24);
    bg.strokeRoundedRect(-220, -70, 440, 140, 16);

    const icon = this.add.text(0, -35, '📚', {
      fontSize: '32px'
    }).setOrigin(0.5);

    const title = this.add.text(0, 0, `Collected: ${bookData.title}`, {
      fontSize: '18px',
      fontFamily: 'Georgia, serif',
      color: '#ffffff',
      fontStyle: 'bold',
      align: 'center',
      wordWrap: { width: 400 }
    }).setOrigin(0.5);

    const author = this.add.text(0, 30, `by ${bookData.author}`, {
      fontSize: '14px',
      fontFamily: 'Arial, sans-serif',
      color: '#e0e7ff',
      align: 'center'
    }).setOrigin(0.5);

    message.add([bg, icon, title, author]);
    message.setAlpha(0);
    message.setDepth(2000);
    message.setScrollFactor(0);

    this.tweens.add({
      targets: message,
      alpha: 1,
      y: 130,
      duration: 400,
      ease: 'Back.easeOut'
    });

    this.time.delayedCall(3000, () => {
      this.tweens.add({
        targets: message,
        alpha: 0,
        y: 100,
        duration: 400,
        onComplete: () => message.destroy()
      });
    });
  }

  createDanielNPC() {
    // Daniel Greene as NPC guide
    const daniel = this.add.circle(600, 400, 30, 0xf97316, 1);
    daniel.setStrokeStyle(4, 0xfbbf24);
    daniel.setInteractive();

    // Face icon
    const face = this.add.text(600, 400, '😊', {
      fontSize: '32px'
    }).setOrigin(0.5);

    // Label
    const label = this.add.text(600, 450, 'Daniel Greene', {
      fontSize: '14px',
      fontFamily: 'Arial, sans-serif',
      color: '#1f2937',
      backgroundColor: '#ffffffdd',
      padding: { x: 8, y: 4 },
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Floating animation
    this.tweens.add({
      targets: [daniel, face],
      y: '-=10',
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    daniel.on('pointerdown', () => {
      this.showDanielDialogue();
    });
  }

  showDanielDialogue() {
    const dialogues = [
      "Welcome to my library! These are some of my favorite epic fantasy books.",
      "Sanderson's magic systems are *chef's kiss*. Collect them all!",
      "If you haven't read Way of Kings yet, your wand is throbbing for it!",
      "The Blade Itself? Dark, gritty, and absolutely fantastic.",
      "Walk around and collect these tomes. Each one is a gateway to adventure!"
    ];

    const randomDialogue = Phaser.Math.RND.pick(dialogues);

    const dialogue = this.add.container(600, 300);

    const bg = this.add.graphics();
    bg.fillStyle(0x000000, 0.9);
    bg.fillRoundedRect(-250, -80, 500, 160, 16);

    const text = this.add.text(0, 0, randomDialogue, {
      fontSize: '16px',
      fontFamily: 'Arial, sans-serif',
      color: '#ffffff',
      align: 'center',
      wordWrap: { width: 460 }
    }).setOrigin(0.5);

    dialogue.add([bg, text]);
    dialogue.setAlpha(0);
    dialogue.setDepth(2000);
    dialogue.setScrollFactor(0);

    this.tweens.add({
      targets: dialogue,
      alpha: 1,
      duration: 300
    });

    this.time.delayedCall(4000, () => {
      this.tweens.add({
        targets: dialogue,
        alpha: 0,
        duration: 300,
        onComplete: () => dialogue.destroy()
      });
    });
  }

  showLibraryWelcome() {
    const welcome = this.add.text(600, 100,
      '📚 Welcome to The Grand Library!\nCollect magical tomes by walking close to them.',
      {
        fontSize: '16px',
        fontFamily: 'Arial, sans-serif',
        color: '#1f2937',
        align: 'center',
        backgroundColor: '#ffffffdd',
        padding: { x: 20, y: 15 }
      }
    ).setOrigin(0.5).setAlpha(0).setScrollFactor(0);

    this.tweens.add({
      targets: welcome,
      alpha: 1,
      duration: 500
    });

    this.time.delayedCall(5000, () => {
      this.tweens.add({
        targets: welcome,
        alpha: 0,
        duration: 500,
        onComplete: () => welcome.destroy()
      });
    });
  }

  setupControls() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  }

  setupMobileControls() {
    document.getElementById('mobile-controls').classList.add('show');

    this.joystickData = { x: 0, y: 0 };

    const joystick = document.getElementById('joystick');
    const knob = document.getElementById('joystick-knob');

    let isDragging = false;
    const joystickRadius = 40;

    const handleJoystickMove = (clientX, clientY) => {
      if (!isDragging) return;

      const rect = joystick.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      let deltaX = clientX - centerX;
      let deltaY = clientY - centerY;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance > joystickRadius) {
        deltaX = (deltaX / distance) * joystickRadius;
        deltaY = (deltaY / distance) * joystickRadius;
      }

      knob.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

      this.joystickData.x = deltaX / joystickRadius;
      this.joystickData.y = deltaY / joystickRadius;
    };

    joystick.addEventListener('touchstart', (e) => {
      isDragging = true;
      e.preventDefault();
    });

    joystick.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      handleJoystickMove(touch.clientX, touch.clientY);
      e.preventDefault();
    });

    const endDrag = () => {
      isDragging = false;
      knob.style.transform = 'translate(0, 0)';
      this.joystickData = { x: 0, y: 0 };
    };

    joystick.addEventListener('touchend', endDrag);
    joystick.addEventListener('touchcancel', endDrag);
  }

  update() {
    if (!this.player) return;

    const speed = 180;
    let velocityX = 0;
    let velocityY = 0;

    // Keyboard
    if (this.cursors.left.isDown || this.keyA.isDown) velocityX = -speed;
    else if (this.cursors.right.isDown || this.keyD.isDown) velocityX = speed;

    if (this.cursors.up.isDown || this.keyW.isDown) velocityY = -speed;
    else if (this.cursors.down.isDown || this.keyS.isDown) velocityY = speed;

    // Mobile joystick
    if (isMobile && this.joystickData) {
      if (Math.abs(this.joystickData.x) > 0.1 || Math.abs(this.joystickData.y) > 0.1) {
        velocityX = this.joystickData.x * speed;
        velocityY = this.joystickData.y * speed;
      }
    }

    this.player.setVelocity(velocityX, velocityY);

    // Update shadow
    if (this.playerShadow) {
      this.playerShadow.setPosition(this.player.x, this.player.y + 40);
    }

    // Slight tilt
    if (velocityX !== 0 || velocityY !== 0) {
      const targetAngle = velocityX * 0.03;
      this.player.angle = Phaser.Math.Linear(this.player.angle, targetAngle, 0.1);
    } else {
      this.player.angle = Phaser.Math.Linear(this.player.angle, 0, 0.1);
    }

    this.saveGame();
  }

  updateLocationLabel(text) {
    const label = document.getElementById('locationLabel');
    if (label) label.textContent = text;
  }

  updateBookCount() {
    const bookCount = document.getElementById('bookCount');
    if (bookCount) bookCount.textContent = gameState.booksCollected;
  }

  saveGame() {
    localStorage.setItem('fantasy-rpg-save-v3', JSON.stringify(gameState));
  }
}

// ============================================
// GAME CONFIGURATION
// ============================================

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  backgroundColor: '#87ceeb',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [
    PreloadScene,
    WorldMapScene,
    LibraryScene
  ],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  render: {
    antialias: true,
    antialiasGL: true,
    roundPixels: false
  }
};

const game = new Phaser.Game(config);
