// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Fantasy Reading Quest RPG - Core Functionality', () => {

  test('should load game and show correct version', async ({ page }) => {
    await page.goto('/rpg-game/');

    // Wait for game to load
    await page.waitForSelector('#game-container canvas', { timeout: 10000 });

    // Check console for version
    const consoleMessages = [];
    page.on('console', msg => consoleMessages.push(msg.text()));

    await page.reload();
    await page.waitForTimeout(2000);

    // Verify version is logged
    const versionLog = consoleMessages.find(msg => msg.includes('Fantasy Reading Quest v'));
    expect(versionLog).toBeTruthy();
    expect(versionLog).toContain('1.0.3');

    // Verify no errors
    const errors = consoleMessages.filter(msg => msg.toLowerCase().includes('error'));
    expect(errors).toHaveLength(0);
  });

  test('should not have duplicate scene key errors', async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));

    await page.goto('/rpg-game/');
    await page.waitForSelector('#game-container canvas', { timeout: 10000 });
    await page.waitForTimeout(3000);

    // Check for duplicate key error
    const duplicateKeyError = errors.find(err =>
      err.includes('duplicate key') ||
      err.includes('LibraryScene')
    );
    expect(duplicateKeyError).toBeUndefined();
  });

  test('should show loading screen and then game', async ({ page }) => {
    await page.goto('/rpg-game/');

    // Loading screen should be visible initially
    const loading = page.locator('#loading');
    await expect(loading).toBeVisible();

    // Game canvas should appear
    const canvas = page.locator('#game-container canvas');
    await expect(canvas).toBeVisible({ timeout: 10000 });

    // Loading screen should disappear
    await expect(loading).toHaveClass(/hidden/, { timeout: 5000 });
  });

  test('should display book counter UI', async ({ page }) => {
    await page.goto('/rpg-game/');
    await page.waitForSelector('#game-container canvas', { timeout: 10000 });

    // Book counter should be visible
    const bookCounter = page.locator('.bookshelf-counter');
    await expect(bookCounter).toBeVisible();

    // Should show "0" books initially
    const bookCount = page.locator('#bookCount');
    await expect(bookCount).toHaveText('0');
  });

  test('should initialize Phaser game engine', async ({ page }) => {
    const consoleMessages = [];
    page.on('console', msg => consoleMessages.push(msg.text()));

    await page.goto('/rpg-game/');
    await page.waitForSelector('#game-container canvas', { timeout: 10000 });
    await page.waitForTimeout(2000);

    // Check for Phaser initialization
    const phaserLog = consoleMessages.find(msg => msg.includes('Phaser v3.60.0'));
    expect(phaserLog).toBeTruthy();
  });

  test('should have cache-busting parameter on game.js', async ({ page }) => {
    await page.goto('/rpg-game/');

    // Wait for game.js to load
    await page.waitForLoadState('networkidle');

    // Check that game.js is loaded with cache-busting parameter
    const scriptRequests = [];
    page.on('request', request => {
      if (request.url().includes('game.js')) {
        scriptRequests.push(request.url());
      }
    });

    await page.reload();
    await page.waitForTimeout(1000);

    // Should have ?v= parameter
    const gameJsRequest = scriptRequests.find(url => url.includes('game.js'));
    expect(gameJsRequest).toBeTruthy();
    expect(gameJsRequest).toMatch(/game\.js\?v=\d+/);
  });
});

test.describe('Fantasy Reading Quest RPG - Mobile Support', () => {

  test('should show mobile controls on mobile device', async ({ page, isMobile }) => {
    await page.goto('/rpg-game/');
    await page.waitForSelector('#game-container canvas', { timeout: 10000 });

    const mobileControls = page.locator('#mobile-controls');
    const actionButton = page.locator('#actionButton');

    if (isMobile) {
      await expect(mobileControls).toHaveClass(/show/);
      await expect(actionButton).toHaveClass(/show/);
    } else {
      await expect(mobileControls).not.toHaveClass(/show/);
    }
  });

  test('should have touch-friendly UI elements on mobile', async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip();
    }

    await page.goto('/rpg-game/');
    await page.waitForSelector('#game-container canvas', { timeout: 10000 });

    // Joystick should be visible
    const joystick = page.locator('#joystick');
    await expect(joystick).toBeVisible();

    // Action button should be visible
    const actionButton = page.locator('#actionButton');
    await expect(actionButton).toBeVisible();
  });
});

test.describe('Fantasy Reading Quest RPG - Game State', () => {

  test('should save game state to localStorage', async ({ page }) => {
    await page.goto('/rpg-game/');
    await page.waitForSelector('#game-container canvas', { timeout: 10000 });
    await page.waitForTimeout(2000);

    // Check localStorage for saved game
    const savedGame = await page.evaluate(() => {
      return localStorage.getItem('fantasy-rpg-save');
    });

    expect(savedGame).toBeTruthy();
    const gameState = JSON.parse(savedGame);
    expect(gameState).toHaveProperty('playerName');
    expect(gameState).toHaveProperty('booksCollected');
  });

  test('should restore game state on reload', async ({ page }) => {
    // First visit: set some game state
    await page.goto('/rpg-game/');
    await page.waitForSelector('#game-container canvas', { timeout: 10000 });

    await page.evaluate(() => {
      localStorage.setItem('fantasy-rpg-save', JSON.stringify({
        playerName: 'TestPlayer',
        booksCollected: 5,
        booksRead: ['Test Book 1', 'Test Book 2'],
        visitedZones: ['library'],
        currentZone: 'library',
        playerPosition: { x: 100, y: 200 }
      }));
    });

    // Reload page
    await page.reload();
    await page.waitForSelector('#game-container canvas', { timeout: 10000 });
    await page.waitForTimeout(2000);

    // Check that book count is restored
    const bookCount = page.locator('#bookCount');
    await expect(bookCount).toHaveText('5');
  });
});

test.describe('Fantasy Reading Quest RPG - Performance', () => {

  test('should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/rpg-game/');
    await page.waitForSelector('#game-container canvas', { timeout: 10000 });

    const loadTime = Date.now() - startTime;

    // Game should load within 10 seconds
    expect(loadTime).toBeLessThan(10000);
  });

  test('should not have memory leaks', async ({ page }) => {
    await page.goto('/rpg-game/');
    await page.waitForSelector('#game-container canvas', { timeout: 10000 });

    // Get initial metrics
    const initialMetrics = await page.evaluate(() => ({
      memory: (performance as any).memory?.usedJSHeapSize || 0
    }));

    // Interact with game
    await page.waitForTimeout(5000);

    // Get final metrics
    const finalMetrics = await page.evaluate(() => ({
      memory: (performance as any).memory?.usedJSHeapSize || 0
    }));

    // Memory shouldn't grow excessively (allow 50MB growth)
    const memoryGrowth = finalMetrics.memory - initialMetrics.memory;
    expect(memoryGrowth).toBeLessThan(50 * 1024 * 1024);
  });
});

test.describe('Fantasy Reading Quest RPG - Cross-Browser Compatibility', () => {

  test('should work in all major browsers', async ({ page, browserName }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));

    await page.goto('/rpg-game/');
    await page.waitForSelector('#game-container canvas', { timeout: 10000 });
    await page.waitForTimeout(3000);

    // No errors in any browser
    expect(errors).toHaveLength(0);

    console.log(`✓ Game works in ${browserName}`);
  });
});
