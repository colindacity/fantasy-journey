// ============================================
// FANTASY READING QUEST - Modern 2025 Edition
// Professional mobile RPG with modern graphics
// Version: 2.0.0 - Complete visual overhaul
// ============================================

const GAME_VERSION = '2.0.0';
console.log('%c🎮 Fantasy Reading Quest v' + GAME_VERSION, 'font-size: 24px; font-weight: bold; color: #fff; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 15px; border-radius: 8px;');
console.log('%c✨ Modern 2025 Edition - Professional Graphics', 'color: #fbbf24; font-weight: bold; font-size: 16px;');

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
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                 ('ontouchstart' in window);

// Asset URLs - Using free Kenney assets via CDN
const ASSETS = {
  // Character sprites (we'll generate high-quality ones)
  PLAYER: 'https://raw.githubusercontent.com/photonstorm/phaser3-examples/master/public/assets/sprites/phaser-dude.png',
  // We'll use programmatic generation for everything else but make it BEAUTIFUL
};

// ============================================
// PRELOAD SCENE - Load Professional Assets
// ============================================

class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    // Progress bar styling
    this.load.on('progress', (value) => {
      const fill = document.getElementById('loadingFill');
      const text = document.getElementById('loadingText');
      if (fill) fill.style.width = (value * 100) + '%';
      if (text) text.textContent = `Loading assets... ${Math.floor(value * 100)}%`;
    });

    // Load sprite sheets from Kenney or OpenGameArt
    // For now, using Phaser example assets as placeholders
    this.load.spritesheet('player',
      'https://labs.phaser.io/assets/sprites/metalslug_monster39x40.png',
      { frameWidth: 39, frameHeight: 40 }
    );

    // Load tileset for environment
    this.load.image('tiles',
      'https://labs.phaser.io/assets/tilemaps/tiles/catastrophi_tiles_16.png'
    );

    // Load particle textures
    this.load.image('particle',
      'https://labs.phaser.io/assets/particles/white.png'
    );

    this.load.image('spark',
      'https://labs.phaser.io/assets/particles/yellow.png'
    );

    // Create procedural graphics for buildings and environment
    this.createProceduralAssets();
  }

  createProceduralAssets() {
    // We'll create these in the create() method after Phaser is ready
  }

  create() {
    // Generate high-quality procedural graphics
    this.generateModernGraphics();

    // Create player animations
    this.anims.create({
      key: 'walk-down',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'walk-up',
      frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'walk-left',
      frames: this.anims.generateFrameNumbers('player', { start: 8, end: 11 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'walk-right',
      frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 0 }),
      frameRate: 1
    });

    // Hide loading screen with smooth fade
    setTimeout(() => {
      const loading = document.getElementById('loading');
      if (loading) {
        loading.style.transition = 'opacity 0.5s ease-out';
        loading.style.opacity = '0';
        setTimeout(() => loading.classList.add('hidden'), 500);
      }
    }, 300);

    // Load saved game
    const saved = localStorage.getItem('fantasy-rpg-save');
    if (saved) {
      Object.assign(gameState, JSON.parse(saved));
    }

    // Start main world
    this.scene.start('MainWorldScene');
  }

  generateModernGraphics() {
    // Generate library building
    const libraryGraphics = this.add.graphics();
    libraryGraphics.lineStyle(4, 0x8b5a2b);
    libraryGraphics.fillStyle(0xa0522d, 1);
    libraryGraphics.fillRoundedRect(0, 0, 200, 180, 16);
    libraryGraphics.strokeRoundedRect(0, 0, 200, 180, 16);

    // Add roof
    libraryGraphics.fillStyle(0x6b3410, 1);
    libraryGraphics.fillTriangle(0, 20, 100, -20, 200, 20);
    libraryGraphics.lineStyle(3, 0x4a2408);
    libraryGraphics.strokeTriangle(0, 20, 100, -20, 200, 20);

    // Add windows
    libraryGraphics.fillStyle(0xffd700, 0.6);
    libraryGraphics.fillRoundedRect(20, 40, 50, 60, 8);
    libraryGraphics.fillRoundedRect(130, 40, 50, 60, 8);

    // Add door
    libraryGraphics.fillStyle(0x4a2408, 1);
    libraryGraphics.fillRoundedRect(75, 100, 50, 70, { tl: 8, tr: 8, bl: 0, br: 0 });

    libraryGraphics.generateTexture('library-building', 200, 200);
    libraryGraphics.destroy();

    // Generate bookstore building
    const bookstoreGraphics = this.add.graphics();
    bookstoreGraphics.lineStyle(4, 0x7c3aed);
    bookstoreGraphics.fillStyle(0x8b5cf6, 1);
    bookstoreGraphics.fillRoundedRect(0, 0, 200, 180, 16);
    bookstoreGraphics.strokeRoundedRect(0, 0, 200, 180, 16);

    // Modern flat roof
    bookstoreGraphics.fillStyle(0x6d28d9, 1);
    bookstoreGraphics.fillRoundedRect(0, 0, 200, 30, { tl: 16, tr: 16, bl: 0, br: 0 });

    // Large display windows
    bookstoreGraphics.fillStyle(0xc4b5fd, 0.7);
    bookstoreGraphics.fillRoundedRect(15, 45, 80, 80, 8);
    bookstoreGraphics.fillRoundedRect(105, 45, 80, 80, 8);

    // Entrance
    bookstoreGraphics.fillStyle(0x5b21b6, 1);
    bookstoreGraphics.fillRoundedRect(60, 130, 80, 50, 8);

    bookstoreGraphics.generateTexture('bookstore-building', 200, 200);
    bookstoreGraphics.destroy();

    // Generate workshop building (steampunk style)
    const workshopGraphics = this.add.graphics();
    workshopGraphics.lineStyle(4, 0xb45309);
    workshopGraphics.fillStyle(0xd97706, 1);
    workshopGraphics.fillRoundedRect(0, 0, 200, 180, 16);
    workshopGraphics.strokeRoundedRect(0, 0, 200, 180, 16);

    // Industrial style roof
    workshopGraphics.fillStyle(0x78350f, 1);
    workshopGraphics.fillRect(0, 0, 200, 25);

    // Large windows
    workshopGraphics.fillStyle(0xfcd34d, 0.6);
    for (let i = 0; i < 3; i++) {
      workshopGraphics.fillRoundedRect(15 + i * 60, 40, 45, 50, 6);
    }

    workshopGraphics.generateTexture('workshop-building', 200, 200);
    workshopGraphics.destroy();

    // Generate player home (cozy cottage)
    const homeGraphics = this.add.graphics();
    homeGraphics.lineStyle(4, 0x65a30d);
    homeGraphics.fillStyle(0x84cc16, 1);
    homeGraphics.fillRoundedRect(0, 0, 180, 160, 16);
    homeGraphics.strokeRoundedRect(0, 0, 180, 160, 16);

    // Thatched roof
    homeGraphics.fillStyle(0xca8a04, 1);
    homeGraphics.fillTriangle(0, 25, 90, -15, 180, 25);
    homeGraphics.lineStyle(3, 0x92400e);
    homeGraphics.strokeTriangle(0, 25, 90, -15, 180, 25);

    // Chimney
    homeGraphics.fillStyle(0x7c2d12, 1);
    homeGraphics.fillRect(130, -10, 20, 35);

    // Round window
    homeGraphics.fillStyle(0xfef3c7, 0.7);
    homeGraphics.fillCircle(90, 60, 25);

    // Door
    homeGraphics.fillStyle(0x7c2d12, 1);
    homeGraphics.fillRoundedRect(65, 100, 50, 60, { tl: 8, tr: 8, bl: 0, br: 0 });

    homeGraphics.generateTexture('home-building', 180, 180);
    homeGraphics.destroy();

    // Generate ground textures
    this.generateGroundTextures();
  }

  generateGroundTextures() {
    // Grass texture with variation
    const grassGraphics = this.add.graphics();
    grassGraphics.fillStyle(0x22c55e, 1);
    grassGraphics.fillRect(0, 0, 64, 64);

    // Add texture variation
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * 64;
      const y = Math.random() * 64;
      const shade = Math.random() > 0.5 ? 0x16a34a : 0x15803d;
      grassGraphics.fillStyle(shade, 0.3);
      grassGraphics.fillCircle(x, y, Math.random() * 3 + 1);
    }

    grassGraphics.generateTexture('grass', 64, 64);
    grassGraphics.destroy();

    // Stone path texture
    const stoneGraphics = this.add.graphics();
    stoneGraphics.fillStyle(0x9ca3af, 1);
    stoneGraphics.fillRect(0, 0, 64, 64);

    // Add stone pattern
    stoneGraphics.lineStyle(2, 0x6b7280, 0.5);
    stoneGraphics.strokeRect(2, 2, 28, 28);
    stoneGraphics.strokeRect(34, 2, 28, 28);
    stoneGraphics.strokeRect(2, 34, 28, 28);
    stoneGraphics.strokeRect(34, 34, 28, 28);

    stoneGraphics.generateTexture('stone', 64, 64);
    stoneGraphics.destroy();

    // Water texture
    const waterGraphics = this.add.graphics();
    waterGraphics.fillStyle(0x3b82f6, 0.6);
    waterGraphics.fillRect(0, 0, 64, 64);

    // Add shimmer
    for (let i = 0; i < 10; i++) {
      waterGraphics.fillStyle(0x60a5fa, 0.4);
      waterGraphics.fillCircle(Math.random() * 64, Math.random() * 64, Math.random() * 8);
    }

    waterGraphics.generateTexture('water', 64, 64);
    waterGraphics.destroy();
  }
}

// ============================================
// MAIN WORLD SCENE - Modern Hub
// ============================================

class MainWorldScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainWorldScene' });
  }

  create() {
    gameState.currentZone = 'main-world';
    this.updateLocationLabel('✨ Fantasy Reading Quest - Enchanted Town Square');

    // Create beautiful tiled world
    this.createModernWorld();

    // Create animated player
    this.createModernPlayer();

    // Create zones with modern graphics
    this.createModernZones();

    // Add particle effects
    this.addAmbientParticles();

    // Add dynamic lighting
    if (this.lights) {
      this.lights.enable().setAmbientColor(0x808080);
    }

    // Setup camera with smooth follow
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    this.cameras.main.setZoom(isMobile ? 0.8 : 1);
    this.cameras.main.setBounds(0, 0, 1600, 1200);

    // Setup controls
    this.setupControls();

    // Create NPCs with animations
    this.createModernNPCs();

    // Add weather effects
    this.addWeatherEffects();

    // Setup mobile controls
    if (isMobile) {
      this.setupMobileControls();
    }

    this.updateBookCount();
  }

  createModernWorld() {
    // Create layered background
    const bg = this.add.graphics();

    // Sky gradient
    const gradient = bg.fillGradientStyle(0x87ceeb, 0x87ceeb, 0xe0f2fe, 0xe0f2fe, 1);
    bg.fillRect(0, 0, 1600, 1200);

    // Create tiled ground
    for (let x = 0; x < 1600; x += 64) {
      for (let y = 0; y < 1200; y += 64) {
        const texture = (x + y) % 192 === 0 ? 'stone' : 'grass';
        this.add.image(x + 32, y + 32, texture).setAlpha(0.9);
      }
    }

    // Add decorative trees and elements
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * 1400 + 100;
      const y = Math.random() * 1000 + 100;
      this.createTree(x, y);
    }

    // Add water fountain in center
    this.createFountain(800, 600);

    // World bounds
    this.physics.world.setBounds(0, 0, 1600, 1200);
  }

  createTree(x, y) {
    // Tree trunk
    const trunk = this.add.graphics();
    trunk.fillStyle(0x8b4513, 1);
    trunk.fillRect(x - 10, y, 20, 40);

    // Tree foliage (three circles for depth)
    const foliage1 = this.add.circle(x, y - 10, 35, 0x228b22, 0.7);
    const foliage2 = this.add.circle(x - 15, y - 20, 30, 0x32cd32, 0.8);
    const foliage3 = this.add.circle(x + 15, y - 15, 28, 0x3cb371, 0.75);

    // Add subtle animation
    this.tweens.add({
      targets: [foliage1, foliage2, foliage3],
      scaleX: 1.05,
      scaleY: 0.95,
      duration: 3000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  createFountain(x, y) {
    // Fountain base
    const base = this.add.circle(x, y, 60, 0x708090);
    const water = this.add.circle(x, y, 50, 0x4682b4, 0.6);

    // Particle fountain
    const particles = this.add.particles(x, y - 20, 'spark', {
      speed: { min: 50, max: 150 },
      angle: { min: 260, max: 280 },
      scale: { start: 0.3, end: 0 },
      alpha: { start: 0.6, end: 0 },
      tint: 0x4682b4,
      lifespan: 2000,
      frequency: 50,
      gravityY: 200
    });

    // Animate water
    this.tweens.add({
      targets: water,
      scaleX: 1.1,
      scaleY: 1.1,
      alpha: 0.4,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  createModernPlayer() {
    this.player = this.physics.add.sprite(400, 300, 'player');
    this.player.setCollideWorldBounds(true);
    this.player.setScale(1.5);

    // Add glow effect
    this.player.setPipeline('Light2D');

    // Add shadow
    const shadow = this.add.ellipse(this.player.x, this.player.y + 20, 40, 20, 0x000000, 0.3);
    this.shadow = shadow;

    // Particle trail when moving
    this.playerTrail = this.add.particles(0, 0, 'particle', {
      follow: this.player,
      quantity: 1,
      scale: { start: 0.2, end: 0 },
      alpha: { start: 0.5, end: 0 },
      tint: 0xffd700,
      lifespan: 500,
      frequency: 100,
      emitting: false
    });

    this.player.play('idle');
  }

  createModernZones() {
    this.zones = [];

    // Library - top left
    const library = this.add.image(300, 200, 'library-building');
    library.setInteractive();
    this.addBuildingEffects(library, 0xffd700);
    this.zones.push({
      sprite: library,
      label: '📚 Ancient Library',
      scene: 'LibraryScene',
      particles: this.createZoneParticles(300, 180, 0xffd700)
    });

    // Bookstore - top right
    const bookstore = this.add.image(1300, 200, 'bookstore-building');
    bookstore.setInteractive();
    this.addBuildingEffects(bookstore, 0x8b5cf6);
    this.zones.push({
      sprite: bookstore,
      label: '🏪 Modern Bookstore',
      scene: 'BookstoreScene',
      particles: this.createZoneParticles(1300, 180, 0x8b5cf6)
    });

    // Writer's Workshop - bottom left
    const workshop = this.add.image(300, 1000, 'workshop-building');
    workshop.setInteractive();
    this.addBuildingEffects(workshop, 0xd97706);
    this.zones.push({
      sprite: workshop,
      label: '🔧 Writer\'s Workshop',
      scene: 'WritersWorkshopScene',
      particles: this.createZoneParticles(300, 980, 0xd97706)
    });

    // Player Home - bottom right
    const home = this.add.image(1300, 1000, 'home-building');
    home.setInteractive();
    this.addBuildingEffects(home, 0x84cc16);
    this.zones.push({
      sprite: home,
      label: '🏠 Your Library',
      scene: 'PlayerHomeScene',
      particles: this.createZoneParticles(1300, 980, 0x84cc16)
    });

    // Add hover effects
    this.zones.forEach(zone => {
      zone.sprite.on('pointerover', () => {
        this.tweens.add({
          targets: zone.sprite,
          scaleX: 1.05,
          scaleY: 1.05,
          duration: 200,
          ease: 'Back.easeOut'
        });
        this.showZoneLabel(zone.label, zone.sprite.x, zone.sprite.y - 120);
      });

      zone.sprite.on('pointerout', () => {
        this.tweens.add({
          targets: zone.sprite,
          scaleX: 1,
          scaleY: 1,
          duration: 200
        });
        this.hideZoneLabel();
      });

      zone.sprite.on('pointerdown', () => {
        this.enterZone(zone.scene);
      });
    });
  }

  addBuildingEffects(building, color) {
    // Add subtle floating animation
    this.tweens.add({
      targets: building,
      y: building.y - 5,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Add dynamic light
    if (this.lights) {
      const light = this.lights.addLight(building.x, building.y, 200, color, 0.5);
      this.tweens.add({
        targets: light,
        intensity: 0.8,
        duration: 3000,
        yoyo: true,
        repeat: -1
      });
    }
  }

  createZoneParticles(x, y, color) {
    const particles = this.add.particles(x, y, 'spark', {
      speed: 20,
      angle: { min: 0, max: 360 },
      scale: { start: 0.2, end: 0 },
      alpha: { start: 0.6, end: 0 },
      tint: color,
      lifespan: 2000,
      frequency: 200,
      gravityY: -50
    });
    return particles;
  }

  addAmbientParticles() {
    // Floating magical particles across the scene
    this.add.particles(800, -10, 'particle', {
      emitZone: { type: 'random', source: new Phaser.Geom.Rectangle(0, 0, 1600, 20) },
      speedY: { min: 20, max: 50 },
      speedX: { min: -10, max: 10 },
      scale: { start: 0.3, end: 0 },
      alpha: { start: 0.8, end: 0 },
      tint: [0xffd700, 0xff69b4, 0x00ffff, 0x90ee90],
      lifespan: 8000,
      frequency: 500
    });
  }

  addWeatherEffects() {
    // Subtle floating leaves or sparkles
    this.add.particles(800, 600, 'spark', {
      emitZone: { type: 'random', source: new Phaser.Geom.Rectangle(-100, 0, 1800, 1200) },
      speedX: { min: 10, max: 30 },
      speedY: { min: -5, max: 5 },
      scale: { start: 0.15, end: 0 },
      alpha: { start: 0.4, end: 0 },
      tint: [0xffffff, 0xfffacd],
      lifespan: 5000,
      frequency: 1000,
      angle: 45
    });
  }

  createModernNPCs() {
    // Create animated NPCs
    const npc1 = this.physics.add.sprite(800, 400, 'player');
    npc1.setTint(0xff6b6b);
    npc1.play('idle');
    this.addNPCBehavior(npc1);

    const npc2 = this.physics.add.sprite(600, 700, 'player');
    npc2.setTint(0x4ecdc4);
    npc2.play('idle');
    this.addNPCBehavior(npc2);
  }

  addNPCBehavior(npc) {
    // Random wandering
    this.time.addEvent({
      delay: 3000,
      callback: () => {
        const direction = Phaser.Math.Between(0, 3);
        const speed = 50;

        switch(direction) {
          case 0: npc.setVelocity(0, -speed); npc.play('walk-up', true); break;
          case 1: npc.setVelocity(0, speed); npc.play('walk-down', true); break;
          case 2: npc.setVelocity(-speed, 0); npc.play('walk-left', true); break;
          case 3: npc.setVelocity(speed, 0); npc.play('walk-right', true); break;
        }

        this.time.delayedCall(1000, () => {
          npc.setVelocity(0, 0);
          npc.play('idle');
        });
      },
      loop: true
    });
  }

  setupControls() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
  }

  setupMobileControls() {
    // Virtual joystick is already in HTML, just need to make it functional
    document.getElementById('mobile-controls').classList.add('show');
    document.getElementById('actionButton').classList.add('show');

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

    // Action button
    document.getElementById('actionButton').addEventListener('touchstart', () => {
      this.checkZoneInteraction();
    });
  }

  update() {
    if (!this.player) return;

    // Update shadow position
    if (this.shadow) {
      this.shadow.setPosition(this.player.x, this.player.y + 20);
    }

    const speed = 200;
    let velocityX = 0;
    let velocityY = 0;
    let isMoving = false;

    // Keyboard controls
    if (this.cursors.left.isDown || this.keyA.isDown) {
      velocityX = -speed;
      isMoving = true;
      this.player.play('walk-left', true);
    } else if (this.cursors.right.isDown || this.keyD.isDown) {
      velocityX = speed;
      isMoving = true;
      this.player.play('walk-right', true);
    }

    if (this.cursors.up.isDown || this.keyW.isDown) {
      velocityY = -speed;
      isMoving = true;
      this.player.play('walk-up', true);
    } else if (this.cursors.down.isDown || this.keyS.isDown) {
      velocityY = speed;
      isMoving = true;
      this.player.play('walk-down', true);
    }

    // Mobile joystick
    if (isMobile && this.joystickData) {
      if (Math.abs(this.joystickData.x) > 0.1 || Math.abs(this.joystickData.y) > 0.1) {
        velocityX = this.joystickData.x * speed;
        velocityY = this.joystickData.y * speed;
        isMoving = true;

        if (Math.abs(velocityX) > Math.abs(velocityY)) {
          this.player.play(velocityX > 0 ? 'walk-right' : 'walk-left', true);
        } else {
          this.player.play(velocityY > 0 ? 'walk-down' : 'walk-up', true);
        }
      }
    }

    this.player.setVelocity(velocityX, velocityY);

    // Enable/disable particle trail
    if (isMoving) {
      this.playerTrail.start();
    } else {
      this.playerTrail.stop();
      this.player.play('idle', true);
    }

    // Check for interaction with E key
    if (Phaser.Input.Keyboard.JustDown(this.keyE)) {
      this.checkZoneInteraction();
    }

    // Save game state
    this.saveGame();
  }

  checkZoneInteraction() {
    this.zones.forEach(zone => {
      const distance = Phaser.Math.Distance.Between(
        this.player.x, this.player.y,
        zone.sprite.x, zone.sprite.y
      );

      if (distance < 150) {
        this.enterZone(zone.scene);
      }
    });
  }

  enterZone(sceneKey) {
    // Fade transition
    this.cameras.main.fadeOut(500);
    this.time.delayedCall(500, () => {
      this.scene.start(sceneKey);
    });
  }

  showZoneLabel(text, x, y) {
    if (this.zoneLabel) {
      this.zoneLabel.destroy();
    }

    const label = this.add.text(x, y, text, {
      fontSize: '24px',
      fontFamily: 'Arial, sans-serif',
      color: '#ffffff',
      backgroundColor: '#000000aa',
      padding: { x: 15, y: 10 },
      borderRadius: 8
    });
    label.setOrigin(0.5);
    label.setDepth(1000);
    label.setScrollFactor(1);

    this.tweens.add({
      targets: label,
      alpha: { from: 0, to: 1 },
      y: y - 10,
      duration: 200,
      ease: 'Back.easeOut'
    });

    this.zoneLabel = label;
  }

  hideZoneLabel() {
    if (this.zoneLabel) {
      this.tweens.add({
        targets: this.zoneLabel,
        alpha: 0,
        duration: 200,
        onComplete: () => {
          if (this.zoneLabel) {
            this.zoneLabel.destroy();
            this.zoneLabel = null;
          }
        }
      });
    }
  }

  updateLocationLabel(text) {
    const label = document.getElementById('locationLabel');
    if (label) {
      label.textContent = text;
    }
  }

  updateBookCount() {
    const bookCount = document.getElementById('bookCount');
    if (bookCount) {
      bookCount.textContent = gameState.booksCollected;
    }
  }

  saveGame() {
    if (this.player) {
      gameState.playerPosition = { x: this.player.x, y: this.player.y };
    }
    localStorage.setItem('fantasy-rpg-save', JSON.stringify(gameState));
  }
}

// ============================================
// BASE INDOOR SCENE - Modern Interior Design
// ============================================

class BaseIndoorScene extends Phaser.Scene {
  constructor(config) {
    super(config);
  }

  create() {
    this.createModernInterior();
    this.createModernPlayer();
    this.createModernBookshelves();
    this.setupControls();
    this.addIndoorLighting();

    if (isMobile) {
      this.setupMobileControls();
    }

    this.updateBookCount();
  }

  createModernInterior() {
    // Rich wooden floor with pattern
    const floor = this.add.graphics();

    // Create parquet floor pattern
    for (let x = 0; x < 800; x += 80) {
      for (let y = 0; y < 600; y += 80) {
        const shade = ((x + y) / 80) % 2 === 0 ? 0x8b4513 : 0xa0522d;
        floor.fillStyle(shade, 1);
        floor.fillRect(x, y, 80, 80);

        // Add wood grain effect
        floor.lineStyle(1, 0x654321, 0.3);
        for (let i = 0; i < 5; i++) {
          floor.lineBetween(x, y + i * 16, x + 80, y + i * 16);
        }
      }
    }

    // Walls with texture
    const wallColor = 0x2c1810;
    floor.fillStyle(wallColor, 1);
    floor.fillRect(0, 0, 800, 20); // Top wall
    floor.fillRect(0, 580, 800, 20); // Bottom wall
    floor.fillRect(0, 0, 20, 600); // Left wall
    floor.fillRect(780, 0, 20, 600); // Right wall

    // Add decorative elements
    this.addRug(400, 300);
    this.addChandelier(400, 100);
  }

  addRug(x, y) {
    const rug = this.add.graphics();
    rug.fillStyle(0x8b0000, 0.7);
    rug.fillRoundedRect(x - 100, y - 60, 200, 120, 8);

    // Pattern
    rug.lineStyle(3, 0xffd700, 0.5);
    rug.strokeRoundedRect(x - 90, y - 50, 180, 100, 6);
    rug.strokeRoundedRect(x - 80, y - 40, 160, 80, 4);
  }

  addChandelier(x, y) {
    const chandelier = this.add.circle(x, y, 25, 0xffd700, 0.8);

    // Add light rays
    this.add.particles(x, y, 'spark', {
      speed: 10,
      angle: { min: 0, max: 360 },
      scale: { start: 0.3, end: 0 },
      alpha: { start: 0.8, end: 0 },
      tint: 0xffd700,
      lifespan: 1000,
      frequency: 200,
      blendMode: 'ADD'
    });

    // Gentle sway
    this.tweens.add({
      targets: chandelier,
      x: x - 5,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  addIndoorLighting() {
    if (this.lights) {
      this.lights.enable().setAmbientColor(0x555555);

      // Chandelier light
      this.lights.addLight(400, 100, 300, 0xffd700, 1.5);

      // Window lights
      this.lights.addLight(100, 200, 150, 0x87ceeb, 0.8);
      this.lights.addLight(700, 200, 150, 0x87ceeb, 0.8);
    }
  }

  createModernPlayer() {
    this.player = this.physics.add.sprite(400, 500, 'player');
    this.player.setCollideWorldBounds(true);
    this.player.setScale(1.5);
    this.player.setPipeline('Light2D');

    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    // Shadow
    this.shadow = this.add.ellipse(this.player.x, this.player.y + 20, 40, 20, 0x000000, 0.3);
  }

  createModernBookshelves() {
    this.books = this.physics.add.staticGroup();

    const bookData = [
      { x: 150, y: 150, title: 'The Way of Kings', author: 'Brandon Sanderson', color: 0x3b82f6 },
      { x: 300, y: 150, title: 'The Name of the Wind', author: 'Patrick Rothfuss', color: 0xef4444 },
      { x: 450, y: 150, title: 'The Fellowship of the Ring', author: 'J.R.R. Tolkien', color: 0x22c55e },
      { x: 600, y: 150, title: 'A Game of Thrones', author: 'George R.R. Martin', color: 0x8b5cf6 },
      { x: 150, y: 250, title: 'The Eye of the World', author: 'Robert Jordan', color: 0xf59e0b },
      { x: 300, y: 250, title: 'Mistborn', author: 'Brandon Sanderson', color: 0x06b6d4 },
    ];

    bookData.forEach(data => {
      this.createBookDisplay(data);
    });

    // Overlap detection for picking up books
    this.physics.add.overlap(this.player, this.books, this.collectBook, null, this);
  }

  createBookDisplay(data) {
    // Book with 3D effect
    const book = this.add.graphics();

    // Shadow
    book.fillStyle(0x000000, 0.2);
    book.fillRoundedRect(5, 5, 70, 90, 4);

    // Book cover
    book.fillStyle(data.color, 1);
    book.fillRoundedRect(0, 0, 70, 90, 4);

    // Spine highlight
    book.fillStyle(0xffffff, 0.3);
    book.fillRect(5, 5, 10, 80);

    // Border
    book.lineStyle(2, 0x000000, 0.5);
    book.strokeRoundedRect(0, 0, 70, 90, 4);

    book.generateTexture(`book-${data.x}-${data.y}`, 75, 95);
    book.destroy();

    const bookSprite = this.books.create(data.x, data.y, `book-${data.x}-${data.y}`);
    bookSprite.setData('bookInfo', data);
    bookSprite.setInteractive();
    bookSprite.setScale(0.8);

    // Hover effect
    bookSprite.on('pointerover', () => {
      this.tweens.add({
        targets: bookSprite,
        scaleX: 0.9,
        scaleY: 0.9,
        y: bookSprite.y - 10,
        duration: 200,
        ease: 'Back.easeOut'
      });

      this.showBookInfo(data);
    });

    bookSprite.on('pointerout', () => {
      this.tweens.add({
        targets: bookSprite,
        scaleX: 0.8,
        scaleY: 0.8,
        y: data.y,
        duration: 200
      });

      this.hideBookInfo();
    });

    // Floating animation
    this.tweens.add({
      targets: bookSprite,
      y: data.y - 3,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
      delay: Math.random() * 1000
    });

    // Add sparkle particles
    this.add.particles(data.x, data.y, 'spark', {
      speed: 10,
      angle: { min: 0, max: 360 },
      scale: { start: 0.2, end: 0 },
      alpha: { start: 0.6, end: 0 },
      tint: data.color,
      lifespan: 1500,
      frequency: 500
    });
  }

  showBookInfo(data) {
    if (this.bookInfoPanel) {
      this.bookInfoPanel.destroy();
    }

    const panel = this.add.container(400, 450);

    const bg = this.add.graphics();
    bg.fillStyle(0x000000, 0.9);
    bg.fillRoundedRect(-150, -60, 300, 120, 12);
    bg.lineStyle(3, 0xffd700, 1);
    bg.strokeRoundedRect(-150, -60, 300, 120, 12);

    const title = this.add.text(0, -30, data.title, {
      fontSize: '18px',
      fontFamily: 'Georgia, serif',
      color: '#ffd700',
      fontStyle: 'bold',
      align: 'center'
    }).setOrigin(0.5);

    const author = this.add.text(0, 0, `by ${data.author}`, {
      fontSize: '14px',
      fontFamily: 'Arial, sans-serif',
      color: '#ffffff',
      align: 'center'
    }).setOrigin(0.5);

    const instruction = this.add.text(0, 30, 'Press E to collect', {
      fontSize: '12px',
      fontFamily: 'Arial, sans-serif',
      color: '#aaaaaa',
      align: 'center'
    }).setOrigin(0.5);

    panel.add([bg, title, author, instruction]);
    panel.setDepth(1000);
    panel.setAlpha(0);

    this.tweens.add({
      targets: panel,
      alpha: 1,
      y: 470,
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

  collectBook(player, book) {
    const bookInfo = book.getData('bookInfo');

    if (!gameState.booksRead.includes(bookInfo.title)) {
      gameState.booksRead.push(bookInfo.title);
      gameState.booksCollected++;

      // Explosion of particles
      const burst = this.add.particles(book.x, book.y, 'spark', {
        speed: { min: 100, max: 200 },
        angle: { min: 0, max: 360 },
        scale: { start: 0.5, end: 0 },
        alpha: { start: 1, end: 0 },
        tint: bookInfo.color,
        lifespan: 1000,
        blendMode: 'ADD',
        emitting: false
      });

      burst.explode(20);

      // Flash effect
      this.cameras.main.flash(200, 255, 255, 255, false, (camera, progress) => {
        if (progress === 1) {
          burst.destroy();
        }
      });

      book.destroy();
      this.updateBookCount();

      this.showCollectionNotification(bookInfo);
    }
  }

  showCollectionNotification(bookInfo) {
    const notification = this.add.container(400, 100);

    const bg = this.add.graphics();
    bg.fillStyle(0x22c55e, 0.95);
    bg.fillRoundedRect(-200, -40, 400, 80, 12);

    const icon = this.add.text(-180, 0, '📚', {
      fontSize: '32px'
    }).setOrigin(0.5);

    const text = this.add.text(-120, -10, `Collected: ${bookInfo.title}`, {
      fontSize: '16px',
      fontFamily: 'Arial, sans-serif',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0, 0.5);

    const subtext = this.add.text(-120, 10, `by ${bookInfo.author}`, {
      fontSize: '12px',
      fontFamily: 'Arial, sans-serif',
      color: '#e0e0e0'
    }).setOrigin(0, 0.5);

    notification.add([bg, icon, text, subtext]);
    notification.setDepth(2000);
    notification.setAlpha(0);
    notification.setY(50);

    this.tweens.add({
      targets: notification,
      alpha: 1,
      y: 100,
      duration: 300,
      ease: 'Back.easeOut'
    });

    this.time.delayedCall(3000, () => {
      this.tweens.add({
        targets: notification,
        alpha: 0,
        y: 50,
        duration: 300,
        onComplete: () => notification.destroy()
      });
    });
  }

  setupControls() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
  }

  setupMobileControls() {
    document.getElementById('mobile-controls').classList.add('show');
    document.getElementById('actionButton').classList.add('show');

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

    // Update shadow
    if (this.shadow) {
      this.shadow.setPosition(this.player.x, this.player.y + 20);
    }

    const speed = 200;
    let velocityX = 0;
    let velocityY = 0;
    let isMoving = false;

    // Keyboard controls
    if (this.cursors.left.isDown || this.keyA.isDown) {
      velocityX = -speed;
      isMoving = true;
      this.player.play('walk-left', true);
    } else if (this.cursors.right.isDown || this.keyD.isDown) {
      velocityX = speed;
      isMoving = true;
      this.player.play('walk-right', true);
    }

    if (this.cursors.up.isDown || this.keyW.isDown) {
      velocityY = -speed;
      isMoving = true;
      this.player.play('walk-up', true);
    } else if (this.cursors.down.isDown || this.keyS.isDown) {
      velocityY = speed;
      isMoving = true;
      this.player.play('walk-down', true);
    }

    // Mobile joystick
    if (isMobile && this.joystickData) {
      if (Math.abs(this.joystickData.x) > 0.1 || Math.abs(this.joystickData.y) > 0.1) {
        velocityX = this.joystickData.x * speed;
        velocityY = this.joystickData.y * speed;
        isMoving = true;

        if (Math.abs(velocityX) > Math.abs(velocityY)) {
          this.player.play(velocityX > 0 ? 'walk-right' : 'walk-left', true);
        } else {
          this.player.play(velocityY > 0 ? 'walk-down' : 'walk-up', true);
        }
      }
    }

    this.player.setVelocity(velocityX, velocityY);

    if (!isMoving) {
      this.player.play('idle', true);
    }

    // Exit to main world
    if (Phaser.Input.Keyboard.JustDown(this.keyESC)) {
      this.exitToMainWorld();
    }

    this.saveGame();
  }

  exitToMainWorld() {
    this.cameras.main.fadeOut(500);
    this.time.delayedCall(500, () => {
      this.scene.start('MainWorldScene');
    });
  }

  updateLocationLabel(text) {
    const label = document.getElementById('locationLabel');
    if (label) {
      label.textContent = text;
    }
  }

  updateBookCount() {
    const bookCount = document.getElementById('bookCount');
    if (bookCount) {
      bookCount.textContent = gameState.booksCollected;
    }
  }

  saveGame() {
    localStorage.setItem('fantasy-rpg-save', JSON.stringify(gameState));
  }
}

// ============================================
// SCENE INSTANCES
// ============================================

class LibraryScene extends BaseIndoorScene {
  constructor() {
    super({ key: 'LibraryScene' });
  }

  create() {
    super.create();
    this.updateLocationLabel('📚 Ancient Library - Hall of Epic Fantasy');
  }
}

class BookstoreScene extends BaseIndoorScene {
  constructor() {
    super({ key: 'BookstoreScene' });
  }

  create() {
    super.create();
    this.updateLocationLabel('🏪 Modern Bookstore - New Releases & Bestsellers');
  }
}

class AuthorLandScene extends BaseIndoorScene {
  constructor() {
    super({ key: 'AuthorLandScene' });
  }

  create() {
    super.create();
    this.updateLocationLabel('✍️ Author Lands - Meet Your Favorite Authors');
  }
}

class WritersWorkshopScene extends BaseIndoorScene {
  constructor() {
    super({ key: 'WritersWorkshopScene' });
  }

  create() {
    super.create();
    this.updateLocationLabel('🔧 Writer\'s Workshop - Learn the Craft');
  }
}

class PlayerHomeScene extends BaseIndoorScene {
  constructor() {
    super({ key: 'PlayerHomeScene' });
  }

  create() {
    super.create();
    this.updateLocationLabel('🏠 Your Personal Library - Your Collection');
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
  backgroundColor: '#1a1a1a',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [
    PreloadScene,
    MainWorldScene,
    LibraryScene,
    BookstoreScene,
    AuthorLandScene,
    WritersWorkshopScene,
    PlayerHomeScene
  ],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  render: {
    pixelArt: false,
    antialias: true,
    antialiasGL: true,
    roundPixels: false
  }
};

const game = new Phaser.Game(config);
