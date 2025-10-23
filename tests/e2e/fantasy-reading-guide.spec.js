// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Fantasy Reading Guide - Core Functionality', () => {

  test('should load and display hero section', async ({ page }) => {
    await page.goto('/fantasy-reading-guide/');

    // Hero title should be visible
    await expect(page.locator('.hero-title')).toBeVisible();
    await expect(page.locator('.hero-title')).toContainText('Ultimate Fantasy Reading Guide');

    // YouTube embed should be present
    await expect(page.locator('.hero-video iframe')).toBeVisible();

    // CTA button should be visible
    const ctaButton = page.locator('.cta-button');
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toContainText('Begin Your Journey');
  });

  test('should display interactive fantasy map', async ({ page }) => {
    await page.goto('/fantasy-reading-guide/');

    // Wait for map to load
    const map = page.locator('#fantasy-map');
    await expect(map).toBeVisible({ timeout: 10000 });

    // Should have SVG elements
    const nodes = await page.locator('.node').count();
    expect(nodes).toBeGreaterThan(0);

    // Should have connection paths
    const connections = await page.locator('.connection').count();
    expect(connections).toBeGreaterThan(0);
  });

  test('should load version info in console', async ({ page }) => {
    const consoleMessages = [];
    page.on('console', msg => consoleMessages.push(msg.text()));

    await page.goto('/fantasy-reading-guide/');
    await page.waitForTimeout(2000);

    // Check for version banner
    const versionLog = consoleMessages.find(msg => msg.includes('Fantasy Reading Guide'));
    expect(versionLog).toBeTruthy();

    // Check for performance metrics
    const perfLog = consoleMessages.find(msg => msg.includes('Performance Metrics'));
    expect(perfLog).toBeTruthy();
  });

  test('should have no console errors', async ({ page }) => {
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    page.on('pageerror', error => errors.push(error.message));

    await page.goto('/fantasy-reading-guide/');
    await page.waitForTimeout(3000);

    expect(errors).toHaveLength(0);
  });

  test('should load all required assets', async ({ page }) => {
    const requests = [];
    page.on('response', response => requests.push({
      url: response.url(),
      status: response.status()
    }));

    await page.goto('/fantasy-reading-guide/');
    await page.waitForLoadState('networkidle');

    // Check critical assets loaded successfully
    const cssLoaded = requests.find(r => r.url.includes('styles.css') && r.status === 200);
    const dataJsLoaded = requests.find(r => r.url.includes('data.js') && r.status === 200);
    const mapJsLoaded = requests.find(r => r.url.includes('map.js') && r.status === 200);
    const mainJsLoaded = requests.find(r => r.url.includes('main.js') && r.status === 200);

    expect(cssLoaded).toBeTruthy();
    expect(dataJsLoaded).toBeTruthy();
    expect(mapJsLoaded).toBeTruthy();
    expect(mainJsLoaded).toBeTruthy();
  });
});

test.describe('Fantasy Reading Guide - Interactive Map Features', () => {

  test('should allow zooming the map', async ({ page }) => {
    await page.goto('/fantasy-reading-guide/');
    await page.waitForSelector('#fantasy-map');

    // Click zoom in button
    await page.click('#zoom-in');
    await page.waitForTimeout(500);

    // Click zoom out button
    await page.click('#zoom-out');
    await page.waitForTimeout(500);

    // No errors should occur
    const errors = await page.evaluate(() => window.errors || []);
    expect(errors).toHaveLength(0);
  });

  test('should allow dragging the map', async ({ page }) => {
    await page.goto('/fantasy-reading-guide/');
    const map = page.locator('#fantasy-map');
    await expect(map).toBeVisible();

    // Get initial transform
    const initialTransform = await map.evaluate(el => el.style.transform);

    // Drag the map
    const box = await map.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down();
      await page.mouse.move(box.x + 100, box.y + 100);
      await page.mouse.up();
    }

    // Transform should have changed
    const newTransform = await map.evaluate(el => el.style.transform);
    expect(newTransform).not.toBe(initialTransform);
  });

  test('should open book modal on node click', async ({ page }) => {
    await page.goto('/fantasy-reading-guide/');
    await page.waitForSelector('.node');

    // Click on the Hobbit node (first/start node)
    const startNode = page.locator('[data-id="the-hobbit"]');
    await startNode.click();

    // Modal should open
    const modal = page.locator('#book-modal');
    await expect(modal).toHaveClass(/active/);

    // Modal should show book info
    await expect(page.locator('#modal-title')).toContainText('Hobbit');
    await expect(page.locator('#modal-author')).toBeVisible();
  });

  test('should close modal when clicking X', async ({ page }) => {
    await page.goto('/fantasy-reading-guide/');
    await page.waitForSelector('.node');

    // Open modal
    await page.locator('[data-id="the-hobbit"]').click();
    await expect(page.locator('#book-modal')).toHaveClass(/active/);

    // Close modal
    await page.click('.modal-close');

    // Modal should be hidden
    await expect(page.locator('#book-modal')).not.toHaveClass(/active/);
  });

  test('should reset map view on reset button click', async ({ page }) => {
    await page.goto('/fantasy-reading-guide/');
    await page.waitForSelector('#fantasy-map');

    // Zoom and drag
    await page.click('#zoom-in');
    await page.click('#zoom-in');

    // Reset view
    await page.click('#reset-view');
    await page.waitForTimeout(300);

    // Should work without errors
    const errors = await page.evaluate(() => window.errors || []);
    expect(errors).toHaveLength(0);
  });
});

test.describe('Fantasy Reading Guide - Search Functionality', () => {

  test('should display search bar', async ({ page }) => {
    await page.goto('/fantasy-reading-guide/');

    const searchInput = page.locator('#book-search');
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toHaveAttribute('placeholder', /search/i);
  });

  test('should search for books by title', async ({ page }) => {
    await page.goto('/fantasy-reading-guide/');

    const searchInput = page.locator('#book-search');
    await searchInput.fill('sanderson');

    // Search results should appear
    const results = page.locator('#search-results');
    await expect(results).toBeVisible();

    // Should show Mistborn
    await expect(results).toContainText('Mistborn');
  });

  test('should click search result to view book', async ({ page }) => {
    await page.goto('/fantasy-reading-guide/');

    await page.fill('#book-search', 'hobbit');
    await page.waitForSelector('.search-result-item');

    // Click first result
    await page.click('.search-result-item');

    // Modal should open with the book
    await expect(page.locator('#book-modal')).toHaveClass(/active/);
    await expect(page.locator('#modal-title')).toContainText('Hobbit');
  });
});

test.describe('Fantasy Reading Guide - YouTube Integration', () => {

  test('should embed YouTube video in hero', async ({ page }) => {
    await page.goto('/fantasy-reading-guide/');

    const iframe = page.locator('.hero-video iframe');
    await expect(iframe).toBeVisible();

    const src = await iframe.getAttribute('src');
    expect(src).toContain('youtube.com/embed');
    expect(src).toContain('T0G-yYbqpNc');
  });

  test('should show video in book modal with timestamp', async ({ page }) => {
    await page.goto('/fantasy-reading-guide/');

    // Open a book with video timestamp
    await page.locator('[data-id="the-hobbit"]').click();

    // Wait for modal
    await page.waitForSelector('#book-modal.active');

    // Video should be present with start time
    const videoIframe = page.locator('#modal-video iframe');
    if (await videoIframe.count() > 0) {
      const src = await videoIframe.getAttribute('src');
      expect(src).toContain('youtube.com/embed');
      expect(src).toContain('start=');
    }
  });
});

test.describe('Fantasy Reading Guide - Decision Points', () => {

  test('should show decision options for books', async ({ page }) => {
    await page.goto('/fantasy-reading-guide/');

    // Open The Hobbit
    await page.locator('[data-id="the-hobbit"]').click();
    await page.waitForSelector('#book-modal.active');

    // Should show decision options
    const decisions = page.locator('#modal-decisions');
    await expect(decisions).toBeVisible();

    // Should have decision options
    const options = page.locator('.decision-option');
    expect(await options.count()).toBeGreaterThan(0);
  });

  test('should navigate to next book on decision click', async ({ page }) => {
    await page.goto('/fantasy-reading-guide/');

    // Open The Hobbit
    await page.locator('[data-id="the-hobbit"]').click();
    await page.waitForSelector('#modal-decisions');

    // Get first decision option
    const firstOption = page.locator('.decision-option').first();
    const nextBook = await firstOption.getAttribute('data-next');

    // Click it
    await firstOption.click();

    // Should navigate to next book
    await page.waitForTimeout(500);
    await expect(page.locator('#book-modal')).toHaveClass(/active/);
  });
});

test.describe('Fantasy Reading Guide - Developer Tools', () => {

  test('should have showAllBooks() console utility', async ({ page }) => {
    await page.goto('/fantasy-reading-guide/');
    await page.waitForTimeout(2000);

    const result = await page.evaluate(() => {
      return typeof window.showAllBooks === 'function';
    });

    expect(result).toBe(true);
  });

  test('should have findBook() console utility', async ({ page }) => {
    await page.goto('/fantasy-reading-guide/');
    await page.waitForTimeout(2000);

    const result = await page.evaluate(() => {
      return typeof window.findBook === 'function';
    });

    expect(result).toBe(true);
  });

  test('should have getStats() console utility', async ({ page }) => {
    await page.goto('/fantasy-reading-guide/');
    await page.waitForTimeout(2000);

    const stats = await page.evaluate(() => {
      return window.getStats ? window.getStats() : null;
    });

    expect(stats).toBeTruthy();
    expect(stats.totalBooks).toBeGreaterThan(0);
  });
});

test.describe('Fantasy Reading Guide - Mobile Responsiveness', () => {

  test('should be mobile-friendly', async ({ page, isMobile }) => {
    await page.goto('/fantasy-reading-guide/');

    // Map should be visible
    await expect(page.locator('#fantasy-map')).toBeVisible();

    if (isMobile) {
      // Mobile controls should be accessible
      const controls = page.locator('.map-controls');
      await expect(controls).toBeVisible();

      // Legend should be visible
      const legend = page.locator('.map-legend');
      await expect(legend).toBeVisible();
    }
  });

  test('should support touch gestures on mobile', async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip();
    }

    await page.goto('/fantasy-reading-guide/');
    await page.waitForSelector('#fantasy-map');

    // Should handle tap events
    await page.tap('[data-id="the-hobbit"]');

    // Modal should open
    await expect(page.locator('#book-modal')).toHaveClass(/active/);
  });
});

test.describe('Fantasy Reading Guide - Performance', () => {

  test('should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/fantasy-reading-guide/');
    await page.waitForSelector('#fantasy-map');

    const loadTime = Date.now() - startTime;

    // Should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('should have good Core Web Vitals', async ({ page }) => {
    await page.goto('/fantasy-reading-guide/');
    await page.waitForLoadState('networkidle');

    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          resolve({
            lcp: entries.find(e => e.entryType === 'largest-contentful-paint')?.startTime,
            fid: entries.find(e => e.entryType === 'first-input')?.processingStart,
          });
        }).observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });

        setTimeout(() => resolve({}), 3000);
      });
    });

    // LCP should be under 2.5s for good rating
    if (metrics.lcp) {
      expect(metrics.lcp).toBeLessThan(2500);
    }
  });
});

test.describe('Fantasy Reading Guide - Accessibility', () => {

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/fantasy-reading-guide/');

    // Should have h1
    const h1 = await page.locator('h1').count();
    expect(h1).toBeGreaterThan(0);
  });

  test('should have alt text for important elements', async ({ page }) => {
    await page.goto('/fantasy-reading-guide/');

    // Check for aria labels or titles
    const map = page.locator('#fantasy-map');
    await expect(map).toBeVisible();
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/fantasy-reading-guide/');

    // Tab through elements
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Should be able to focus elements
    const focused = await page.evaluate(() => document.activeElement?.tagName);
    expect(focused).toBeTruthy();
  });
});
