// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Visual Regression - Fantasy Reading Guide', () => {

  test('should match homepage screenshot', async ({ page }) => {
    await page.goto('/fantasy-reading-guide/');
    await page.waitForSelector('#fantasy-map');
    await page.waitForTimeout(2000); // Wait for animations

    await expect(page).toHaveScreenshot('fantasy-guide-homepage.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('should match hero section on desktop', async ({ page, isMobile }) => {
    if (isMobile) test.skip();

    await page.goto('/fantasy-reading-guide/');
    await page.waitForSelector('.hero-content');

    const hero = page.locator('.hero');
    await expect(hero).toHaveScreenshot('fantasy-guide-hero-desktop.png');
  });

  test('should match hero section on mobile', async ({ page, isMobile }) => {
    if (!isMobile) test.skip();

    await page.goto('/fantasy-reading-guide/');
    await page.waitForSelector('.hero-content');

    const hero = page.locator('.hero');
    await expect(hero).toHaveScreenshot('fantasy-guide-hero-mobile.png');
  });

  test('should match interactive map view', async ({ page }) => {
    await page.goto('/fantasy-reading-guide/');
    await page.waitForSelector('#fantasy-map');
    await page.waitForTimeout(1000);

    const mapSection = page.locator('.map-section');
    await expect(mapSection).toHaveScreenshot('fantasy-guide-map.png', {
      animations: 'disabled',
    });
  });

  test('should match book modal design', async ({ page }) => {
    await page.goto('/fantasy-reading-guide/');
    await page.waitForSelector('.node');

    // Open The Hobbit modal
    await page.locator('[data-id="the-hobbit"]').click();
    await page.waitForSelector('#book-modal.active');
    await page.waitForTimeout(500);

    const modal = page.locator('#book-modal');
    await expect(modal).toHaveScreenshot('fantasy-guide-book-modal.png');
  });

  test('should match map controls and legend', async ({ page }) => {
    await page.goto('/fantasy-reading-guide/');
    await page.waitForSelector('.map-controls');

    const controls = page.locator('.map-controls');
    await expect(controls).toHaveScreenshot('fantasy-guide-controls.png');

    const legend = page.locator('.map-legend');
    await expect(legend).toHaveScreenshot('fantasy-guide-legend.png');
  });

  test('should match search interface', async ({ page }) => {
    await page.goto('/fantasy-reading-guide/');

    const searchInput = page.locator('#book-search');
    await searchInput.fill('sanderson');
    await page.waitForSelector('#search-results');
    await page.waitForTimeout(300);

    const searchBar = page.locator('.search-bar');
    await expect(searchBar).toHaveScreenshot('fantasy-guide-search.png');
  });
});

test.describe('Visual Regression - RPG Game', () => {

  test('should match game loading screen', async ({ page }) => {
    await page.goto('/rpg-game/');

    const loading = page.locator('#loading');
    await expect(loading).toBeVisible();

    await expect(page).toHaveScreenshot('rpg-game-loading.png');
  });

  test('should match game canvas on desktop', async ({ page, isMobile }) => {
    if (isMobile) test.skip();

    await page.goto('/rpg-game/');
    await page.waitForSelector('#game-container canvas', { timeout: 10000 });
    await page.waitForTimeout(3000); // Wait for game to initialize

    await expect(page).toHaveScreenshot('rpg-game-desktop.png', {
      fullPage: true,
    });
  });

  test('should match game canvas on mobile', async ({ page, isMobile }) => {
    if (!isMobile) test.skip();

    await page.goto('/rpg-game/');
    await page.waitForSelector('#game-container canvas', { timeout: 10000 });
    await page.waitForTimeout(3000);

    await expect(page).toHaveScreenshot('rpg-game-mobile.png', {
      fullPage: true,
    });
  });

  test('should match mobile controls', async ({ page, isMobile }) => {
    if (!isMobile) test.skip();

    await page.goto('/rpg-game/');
    await page.waitForSelector('#mobile-controls.show', { timeout: 10000 });

    const controls = page.locator('#mobile-controls');
    await expect(controls).toHaveScreenshot('rpg-game-mobile-controls.png');
  });

  test('should match UI elements', async ({ page }) => {
    await page.goto('/rpg-game/');
    await page.waitForSelector('.bookshelf-counter', { timeout: 10000 });

    const bookCounter = page.locator('.bookshelf-counter');
    await expect(bookCounter).toHaveScreenshot('rpg-game-book-counter.png');
  });
});

test.describe('Visual Regression - Apps Index', () => {

  test('should match apps index page', async ({ page }) => {
    await page.goto('/apps-index.html');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('apps-index.png', {
      fullPage: true,
    });
  });

  test('should match apps index on mobile', async ({ page, isMobile }) => {
    if (!isMobile) test.skip();

    await page.goto('/apps-index.html');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('apps-index-mobile.png', {
      fullPage: true,
    });
  });

  test('should match app cards hover state', async ({ page, isMobile }) => {
    if (isMobile) test.skip(); // Skip hover tests on mobile

    await page.goto('/apps-index.html');

    const firstCard = page.locator('.app-card').first();
    await firstCard.hover();
    await page.waitForTimeout(300);

    await expect(firstCard).toHaveScreenshot('apps-index-card-hover.png');
  });
});

test.describe('Visual Regression - Cross-Viewport Consistency', () => {

  const viewports = [
    { width: 1920, height: 1080, name: 'desktop-fullhd' },
    { width: 1366, height: 768, name: 'desktop-hd' },
    { width: 768, height: 1024, name: 'tablet-portrait' },
    { width: 1024, height: 768, name: 'tablet-landscape' },
    { width: 375, height: 667, name: 'mobile-small' },
    { width: 414, height: 896, name: 'mobile-large' },
  ];

  for (const viewport of viewports) {
    test(`Fantasy Guide should render correctly at ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/fantasy-reading-guide/');
      await page.waitForSelector('#fantasy-map');
      await page.waitForTimeout(1500);

      await expect(page).toHaveScreenshot(`fantasy-guide-${viewport.name}.png`, {
        fullPage: false, // Just viewport
      });
    });

    test(`RPG Game should render correctly at ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/rpg-game/');
      await page.waitForSelector('#game-container canvas', { timeout: 10000 });
      await page.waitForTimeout(2000);

      await expect(page).toHaveScreenshot(`rpg-game-${viewport.name}.png`, {
        fullPage: false,
      });
    });
  }
});

test.describe('Visual Regression - Component States', () => {

  test('should match modal open state', async ({ page }) => {
    await page.goto('/fantasy-reading-guide/');
    await page.waitForSelector('.node');

    await page.locator('[data-id="the-hobbit"]').click();
    await page.waitForSelector('#book-modal.active');

    await expect(page).toHaveScreenshot('fantasy-guide-modal-open.png', {
      fullPage: true,
    });
  });

  test('should match modal closed state', async ({ page }) => {
    await page.goto('/fantasy-reading-guide/');
    await page.waitForSelector('.node');

    await page.locator('[data-id="the-hobbit"]').click();
    await page.waitForSelector('#book-modal.active');

    await page.click('.modal-close');
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('fantasy-guide-modal-closed.png');
  });

  test('should match zoomed map state', async ({ page }) => {
    await page.goto('/fantasy-reading-guide/');
    await page.waitForSelector('#fantasy-map');

    // Zoom in 3 times
    await page.click('#zoom-in');
    await page.click('#zoom-in');
    await page.click('#zoom-in');
    await page.waitForTimeout(500);

    const mapSection = page.locator('.map-section');
    await expect(mapSection).toHaveScreenshot('fantasy-guide-zoomed.png');
  });
});
