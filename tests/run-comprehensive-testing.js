#!/usr/bin/env node

/**
 * Comprehensive Testing & LLM Review System
 *
 * This script:
 * 1. Runs all Playwright tests (functional, visual, user flows)
 * 2. Generates screenshots and reports
 * 3. Uses LLM agents to review screenshots as expert designers
 * 4. Generates comprehensive review reports
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🎯 Starting Comprehensive Testing & Review System\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

// Test configuration
const testSuites = [
  {
    name: 'RPG Game Tests',
    file: 'rpg-game.spec.js',
    description: 'Core functionality, mobile support, state management, performance'
  },
  {
    name: 'Fantasy Reading Guide Tests',
    file: 'fantasy-reading-guide.spec.js',
    description: 'Interactive map, search, modals, YouTube integration, accessibility'
  },
  {
    name: 'Visual Regression Tests',
    file: 'visual-regression.spec.js',
    description: 'Screenshot comparison across viewports and components'
  },
  {
    name: 'User Flow Tests',
    file: 'user-flows.spec.js',
    description: 'Complete user journeys with screenshots at each step'
  }
];

// Run tests
async function runTests() {
  console.log('📋 Test Suites:');
  testSuites.forEach((suite, i) => {
    console.log(`   ${i + 1}. ${suite.name}`);
    console.log(`      ${suite.description}`);
  });
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log('🧪 Running all test suites...\n');

  return new Promise((resolve, reject) => {
    const cmd = 'npx playwright test --reporter=html,json';

    exec(cmd, { cwd: __dirname }, (error, stdout, stderr) => {
      console.log(stdout);

      if (stderr) {
        console.error('Test stderr:', stderr);
      }

      if (error) {
        console.error('❌ Some tests failed, but continuing with review...\n');
      } else {
        console.log('✅ All tests passed!\n');
      }

      resolve();
    });
  });
}

// Generate test summary
function generateTestSummary() {
  console.log('📊 Generating test summary...\n');

  const resultsPath = path.join(__dirname, 'test-results/results.json');

  if (!fs.existsSync(resultsPath)) {
    console.log('⚠️  No test results file found. Skipping summary.\n');
    return null;
  }

  try {
    const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));

    const summary = {
      totalTests: 0,
      passed: 0,
      failed: 0,
      skipped: 0,
      duration: 0
    };

    results.suites?.forEach(suite => {
      suite.specs?.forEach(spec => {
        summary.totalTests++;

        spec.tests?.forEach(test => {
          const result = test.results?.[0];
          if (result) {
            summary.duration += result.duration || 0;

            if (result.status === 'passed') summary.passed++;
            else if (result.status === 'failed') summary.failed++;
            else if (result.status === 'skipped') summary.skipped++;
          }
        });
      });
    });

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📈 Test Results Summary');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Total Tests:    ${summary.totalTests}`);
    console.log(`✅ Passed:      ${summary.passed}`);
    console.log(`❌ Failed:      ${summary.failed}`);
    console.log(`⏭️  Skipped:     ${summary.skipped}`);
    console.log(`⏱️  Duration:    ${(summary.duration / 1000).toFixed(2)}s`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    return summary;
  } catch (error) {
    console.error('Error reading test results:', error.message);
    return null;
  }
}

// List all screenshots
function listScreenshots() {
  console.log('📸 Screenshot Inventory:\n');

  const screenshotsDir = path.join(__dirname, 'test-results');

  if (!fs.existsSync(screenshotsDir)) {
    console.log('⚠️  No screenshots directory found.\n');
    return [];
  }

  const screenshots = [];

  function scanDirectory(dir, prefix = '') {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        scanDirectory(fullPath, prefix + file + '/');
      } else if (file.endsWith('.png')) {
        screenshots.push({
          name: file,
          path: fullPath,
          relativePath: prefix + file,
          size: stat.size
        });
      }
    });
  }

  scanDirectory(screenshotsDir);

  // Group by category
  const categories = {
    'Fantasy Guide': screenshots.filter(s => s.name.includes('fantasy-guide')),
    'RPG Game': screenshots.filter(s => s.name.includes('rpg-game')),
    'Apps Index': screenshots.filter(s => s.name.includes('apps-index')),
    'User Flows': screenshots.filter(s => s.name.includes('flow-')),
    'Other': screenshots.filter(s =>
      !s.name.includes('fantasy-guide') &&
      !s.name.includes('rpg-game') &&
      !s.name.includes('apps-index') &&
      !s.name.includes('flow-')
    )
  };

  Object.entries(categories).forEach(([category, items]) => {
    if (items.length > 0) {
      console.log(`\n📁 ${category} (${items.length} screenshots):`);
      items.forEach((item, i) => {
        const sizeKB = (item.size / 1024).toFixed(1);
        console.log(`   ${i + 1}. ${item.name} (${sizeKB} KB)`);
      });
    }
  });

  console.log(`\n📊 Total: ${screenshots.length} screenshots\n`);

  return screenshots;
}

// Generate comprehensive report
function generateReport(summary, screenshots) {
  console.log('📄 Generating comprehensive report...\n');

  const report = {
    timestamp: new Date().toISOString(),
    summary,
    screenshots: screenshots.map(s => ({
      name: s.name,
      path: s.relativePath,
      category: categorizeScreenshot(s.name)
    })),
    recommendations: []
  };

  // Save report
  const reportPath = path.join(__dirname, 'test-results/comprehensive-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  console.log(`✅ Report saved to: ${reportPath}\n`);

  return report;
}

function categorizeScreenshot(name) {
  if (name.includes('fantasy-guide')) return 'Fantasy Reading Guide';
  if (name.includes('rpg-game')) return 'RPG Game';
  if (name.includes('apps-index')) return 'Apps Index';
  if (name.includes('flow-')) return 'User Flow';
  if (name.includes('mobile')) return 'Mobile';
  if (name.includes('desktop')) return 'Desktop';
  return 'Other';
}

// Instructions for LLM review
function generateLLMReviewInstructions() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🤖 LLM Expert Review Instructions');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log('The screenshots in test-results/ should be reviewed by:');
  console.log('');
  console.log('1. 👨‍🎨 Senior UX Designer');
  console.log('   Focus: Visual hierarchy, spacing, typography, color usage');
  console.log('   Check: Accessibility, readability, visual consistency');
  console.log('');
  console.log('2. 📱 Mobile UX Specialist');
  console.log('   Focus: Touch targets, mobile layouts, responsive design');
  console.log('   Check: Thumb zones, mobile navigation, viewport adaptation');
  console.log('');
  console.log('3. 🎮 Game Designer');
  console.log('   Focus: Game UI/UX, controls, feedback, progression');
  console.log('   Check: Clarity of objectives, intuitive controls');
  console.log('');
  console.log('4. 💻 Frontend Developer');
  console.log('   Focus: Performance, rendering, technical implementation');
  console.log('   Check: Loading states, animations, cross-browser issues');
  console.log('');
  console.log('5. ♿ Accessibility Expert');
  console.log('   Focus: WCAG compliance, contrast ratios, screen reader support');
  console.log('   Check: Alt text, keyboard navigation, focus indicators');
  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log('📋 Review Checklist:\n');
  console.log('Desktop Experience:');
  console.log('  ✓ Hero section impact and clarity');
  console.log('  ✓ Interactive map usability');
  console.log('  ✓ Modal design and spacing');
  console.log('  ✓ Typography scale and hierarchy');
  console.log('  ✓ Color contrast (4.5:1 minimum)');
  console.log('  ✓ Hover states and animations');
  console.log('');
  console.log('Mobile Experience:');
  console.log('  ✓ Touch target sizes (minimum 44x44px)');
  console.log('  ✓ Readable text without zooming');
  console.log('  ✓ Thumb-friendly navigation');
  console.log('  ✓ Proper viewport scaling');
  console.log('  ✓ Mobile controls accessibility');
  console.log('');
  console.log('Game Experience:');
  console.log('  ✓ Clear visual feedback');
  console.log('  ✓ Intuitive controls');
  console.log('  ✓ Performance (60fps target)');
  console.log('  ✓ Loading states');
  console.log('  ✓ UI clarity and legibility');
  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

// Main execution
async function main() {
  try {
    // Run all tests
    await runTests();

    // Generate summary
    const summary = generateTestSummary();

    // List screenshots
    const screenshots = listScreenshots();

    // Generate report
    generateReport(summary, screenshots);

    // Show LLM review instructions
    generateLLMReviewInstructions();

    console.log('✅ Comprehensive testing complete!\n');
    console.log('Next steps:');
    console.log('1. Review HTML report: open test-results/index.html');
    console.log('2. Review screenshots in: test-results/');
    console.log('3. Use Claude Code to run LLM-based expert reviews');
    console.log('4. Address any issues found');
    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error) {
    console.error('❌ Error during testing:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { runTests, generateTestSummary, listScreenshots, generateReport };
