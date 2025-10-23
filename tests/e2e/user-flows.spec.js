// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('User Flow - Fantasy Reading Discovery Journey', () => {

  test('Complete user flow: Discover perfect fantasy subgenre', async ({ page }) => {
    // STEP 1: Land on homepage
    await page.goto('/fantasy-reading-guide/');
    await page.waitForSelector('.hero-title');

    await page.screenshot({ path: 'test-results/flow-1-landing.png', fullPage: true });

    // STEP 2: Watch intro video (simulate)
    const heroVideo = page.locator('.hero-video iframe');
    await expect(heroVideo).toBeVisible();

    // STEP 3: Click CTA to begin journey
    await page.click('.cta-button');
    await page.waitForTimeout(1000);

    await page.screenshot({ path: 'test-results/flow-2-map-view.png', fullPage: true });

    // STEP 4: Explore map
    const map = page.locator('#fantasy-map');
    await expect(map).toBeVisible();

    // STEP 5: Click on starting point (The Hobbit)
    await page.locator('[data-id="the-hobbit"]').click();
    await page.waitForSelector('#book-modal.active');

    await page.screenshot({ path: 'test-results/flow-3-first-book.png', fullPage: true });

    // STEP 6: Read book description
    const description = page.locator('#modal-description');
    await expect(description).toBeVisible();

    // STEP 7: Watch video snippet
    const modalVideo = page.locator('#modal-video iframe');
    if (await modalVideo.count() > 0) {
      await expect(modalVideo).toBeVisible();
    }

    // STEP 8: Make a decision
    const decisions = page.locator('.decision-option');
    const firstDecision = decisions.first();
    await expect(firstDecision).toBeVisible();

    await page.screenshot({ path: 'test-results/flow-4-decision-point.png', fullPage: true });

    await firstDecision.click();
    await page.waitForTimeout(500);

    await page.screenshot({ path: 'test-results/flow-5-next-book.png', fullPage: true });

    // STEP 9: Continue journey
    if (await page.locator('.decision-option').count() > 0) {
      await page.locator('.decision-option').first().click();
      await page.waitForTimeout(500);

      await page.screenshot({ path: 'test-results/flow-6-deeper.png', fullPage: true });
    }

    // STEP 10: Reach a subgenre endpoint
    const subgenreInfo = page.locator('#modal-recommendations');
    if (await subgenreInfo.isVisible()) {
      await page.screenshot({ path: 'test-results/flow-7-subgenre-found.png', fullPage: true });

      // Found subgenre!
      console.log('✅ User successfully discovered their subgenre!');
    }

    // STEP 11: Use search to find specific book
    await page.click('.modal-close');
    await page.fill('#book-search', 'mistborn');
    await page.waitForSelector('#search-results');

    await page.screenshot({ path: 'test-results/flow-8-search.png', fullPage: true });

    // STEP 12: Click search result
    await page.click('.search-result-item');
    await page.waitForSelector('#book-modal.active');

    await page.screenshot({ path: 'test-results/flow-9-search-result.png', fullPage: true });

    console.log('✅ Complete user flow executed successfully!');
  });

  test('User flow: Quick search for favorite author', async ({ page }) => {
    await page.goto('/fantasy-reading-guide/');

    // Search for author
    await page.fill('#book-search', 'brandon sanderson');
    await page.waitForSelector('#search-results');

    await page.screenshot({ path: 'test-results/flow-author-search-1.png' });

    // Click result
    if (await page.locator('.search-result-item').count() > 0) {
      await page.locator('.search-result-item').first().click();
      await page.waitForSelector('#book-modal.active');

      await page.screenshot({ path: 'test-results/flow-author-search-2.png', fullPage: true });

      console.log('✅ Author search flow completed!');
    }
  });

  test('User flow: Map exploration with zoom and pan', async ({ page }) => {
    await page.goto('/fantasy-reading-guide/');
    await page.waitForSelector('#fantasy-map');

    await page.screenshot({ path: 'test-results/flow-map-1-initial.png', fullPage: true });

    // Zoom in
    await page.click('#zoom-in');
    await page.click('#zoom-in');
    await page.waitForTimeout(500);

    await page.screenshot({ path: 'test-results/flow-map-2-zoomed.png', fullPage: true });

    // Pan around
    const map = page.locator('#fantasy-map');
    const box = await map.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down();
      await page.mouse.move(box.x + 200, box.y + 200);
      await page.mouse.up();
    }

    await page.screenshot({ path: 'test-results/flow-map-3-panned.png', fullPage: true });

    // Reset view
    await page.click('#reset-view');
    await page.waitForTimeout(500);

    await page.screenshot({ path: 'test-results/flow-map-4-reset.png', fullPage: true });

    console.log('✅ Map exploration flow completed!');
  });
});

test.describe('User Flow - RPG Game Adventure', () => {

  test('Complete game flow: Start adventure and collect books', async ({ page }) => {
    // STEP 1: Load game
    await page.goto('/rpg-game/');

    await page.screenshot({ path: 'test-results/rpg-flow-1-loading.png', fullPage: true });

    // STEP 2: Wait for game to load
    await page.waitForSelector('#game-container canvas', { timeout: 10000 });
    await page.waitForSelector('#loading.hidden', { timeout: 10000 });

    await page.waitForTimeout(3000); // Let game initialize

    await page.screenshot({ path: 'test-results/rpg-flow-2-game-start.png', fullPage: true });

    // STEP 3: Check book counter
    const bookCount = page.locator('#bookCount');
    await expect(bookCount).toBeVisible();

    const initialCount = await bookCount.textContent();
    console.log(`Starting with ${initialCount} books`);

    // STEP 4: Simulate movement (if desktop)
    const isMobileDevice = await page.evaluate(() => window.innerWidth < 768);

    if (!isMobileDevice) {
      // Use keyboard controls
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(500);

      await page.screenshot({ path: 'test-results/rpg-flow-3-moved-right.png', fullPage: true });

      await page.keyboard.press('ArrowDown');
      await page.waitForTimeout(500);

      await page.screenshot({ path: 'test-results/rpg-flow-4-moved-down.png', fullPage: true });

      // Try to interact
      await page.keyboard.press('Space');
      await page.waitForTimeout(500);

      await page.screenshot({ path: 'test-results/rpg-flow-5-interaction.png', fullPage: true });

    } else {
      // Use mobile controls
      const joystick = page.locator('#joystick');
      await expect(joystick).toBeVisible();

      await page.screenshot({ path: 'test-results/rpg-flow-3-mobile-controls.png', fullPage: true });

      // Tap action button
      await page.tap('#actionButton');
      await page.waitForTimeout(500);

      await page.screenshot({ path: 'test-results/rpg-flow-4-mobile-action.png', fullPage: true });
    }

    // STEP 5: Check final state
    await page.waitForTimeout(2000);

    await page.screenshot({ path: 'test-results/rpg-flow-6-final-state.png', fullPage: true });

    console.log('✅ RPG game flow completed!');
  });

  test('Game flow: Save and restore', async ({ page }) => {
    // Play game
    await page.goto('/rpg-game/');
    await page.waitForSelector('#game-container canvas', { timeout: 10000 });
    await page.waitForTimeout(3000);

    // Set game state
    await page.evaluate(() => {
      localStorage.setItem('fantasy-rpg-save', JSON.stringify({
        playerName: 'TestHero',
        booksCollected: 3,
        booksRead: ['Book 1', 'Book 2', 'Book 3'],
        currentZone: 'library',
      }));
    });

    await page.screenshot({ path: 'test-results/rpg-flow-save-1.png', fullPage: true });

    // Reload
    await page.reload();
    await page.waitForSelector('#game-container canvas', { timeout: 10000 });
    await page.waitForTimeout(3000);

    await page.screenshot({ path: 'test-results/rpg-flow-save-2-restored.png', fullPage: true });

    // Verify book count restored
    const bookCount = page.locator('#bookCount');
    await expect(bookCount).toHaveText('3');

    console.log('✅ Save/restore flow completed!');
  });
});

test.describe('User Flow - Apps Index Navigation', () => {

  test('Navigate from apps index to both apps', async ({ page }) => {
    // STEP 1: Visit apps index
    await page.goto('/apps-index.html');
    await page.waitForLoadState('networkidle');

    await page.screenshot({ path: 'test-results/apps-flow-1-index.png', fullPage: true });

    // STEP 2: Click Fantasy Guide card
    await page.click('a[href="fantasy-reading-guide/"]');
    await page.waitForSelector('#fantasy-map');

    await page.screenshot({ path: 'test-results/apps-flow-2-fantasy-guide.png', fullPage: true });

    // STEP 3: Go back to index
    await page.goto('/apps-index.html');

    // STEP 4: Click RPG Game card
    await page.click('a[href="rpg-game/"]');
    await page.waitForSelector('#game-container canvas', { timeout: 10000 });

    await page.screenshot({ path: 'test-results/apps-flow-3-rpg-game.png', fullPage: true });

    console.log('✅ Apps navigation flow completed!');
  });
});

test.describe('User Flow - Mobile Experience', () => {

  test('Complete mobile user journey', async ({ page, isMobile }) => {
    if (!isMobile) test.skip();

    // STEP 1: Land on guide (mobile)
    await page.goto('/fantasy-reading-guide/');
    await page.waitForSelector('.hero-title');

    await page.screenshot({ path: 'test-results/mobile-flow-1-landing.png', fullPage: true });

    // STEP 2: Scroll down
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(300);

    await page.screenshot({ path: 'test-results/mobile-flow-2-scrolled.png', fullPage: true });

    // STEP 3: Tap node
    await page.tap('[data-id="the-hobbit"]');
    await page.waitForSelector('#book-modal.active');

    await page.screenshot({ path: 'test-results/mobile-flow-3-modal.png', fullPage: true });

    // STEP 4: Close modal
    await page.tap('.modal-close');
    await page.waitForTimeout(300);

    // STEP 5: Use search
    await page.tap('#book-search');
    await page.fill('#book-search', 'hobbit');
    await page.waitForSelector('#search-results');

    await page.screenshot({ path: 'test-results/mobile-flow-4-search.png', fullPage: true });

    console.log('✅ Mobile user flow completed!');
  });
});
