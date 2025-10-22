# 🎮 Console Version Logging Examples

## What You'll See in the Browser Console

When the Fantasy Reading Guide loads, it displays a beautiful, styled console banner.

## 🚀 Production Build (GitHub Pages)

```javascript

🎮 Fantasy Reading Guide
   Your Interactive Journey Through Fantasy Literature
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 Version:      v1.8-1549476
📅 Build Date:   10/22/2025, 11:45:23 PM
🔨 Build #:      3
📝 Commit:       1549476
🔀 Branch:       claude/redesign-youtube-clone-011CUP5xmZw5CYhippuyQtLw
🤖 Deployer:     GitHub Actions
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ Based on "The ULTIMATE Fantasy Reading Guide" YouTube video
🎬 https://www.youtube.com/watch?v=T0G-yYbqpNc
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Application loaded successfully!
Tip: Click any book on the map to begin your journey!


⚡ Performance Metrics
  Page Load: 1234.56ms
  DOM Ready: 987.65ms

🔮 Pro tip: Type "showAllBooks()" to list all books in the guide!
```

**Colors:**
- Title: Purple gradient (#8b5cf6)
- Labels: Cyan (#06b6d4)
- Values: Gold (#fbbf24)
- Success: Green (#10b981)
- Lines: Purple (#8b5cf6)

## 🛠️ Development Build (Local)

```javascript
🛠️ Fantasy Reading Guide - Development Mode
Version: DEV
Running locally without build pipeline
```

## 📊 Developer Utilities

### Show All Books
```javascript
> showAllBooks()

┌─────────┬────────────────────────────────────────┬────────────────────┬──────────┬──────────────┬───────────┐
│ (index) │                 Title                  │       Author       │   Type   │   Subgenre   │ Must Read │
├─────────┼────────────────────────────────────────┼────────────────────┼──────────┼──────────────┼───────────┤
│    0    │           'The Hobbit'                 │  'J.R.R. Tolkien'  │ 'start'  │      '-'     │    '⭐'   │
│    1    │      'A Wizard of Earthsea'            │ 'Ursula K. Le Guin'│'decision'│      '-'     │    '-'    │
│    2    │          'Small Gods'                  │ 'Terry Pratchett'  │  'book'  │      '-'     │    '-'    │
│   ...   │                 ...                    │        ...         │   ...    │     ...      │    ...    │
└─────────┴────────────────────────────────────────┴────────────────────┴──────────┴──────────────┴───────────┘

📚 Total books in guide: 50
```

### Find Book
```javascript
> findBook('sanderson')

┌─────────┬────────────────────────────────┬────────────────────┬──────────┐
│ (index) │             Title              │       Author       │   Type   │
├─────────┼────────────────────────────────┼────────────────────┼──────────┤
│    0    │  'Mistborn: The Final Empire'  │'Brandon Sanderson' │'decision'│
└─────────┴────────────────────────────────┴────────────────────┴──────────┘
```

### Get Statistics
```javascript
> getStats()

📊 Fantasy Reading Guide Statistics

┌─────────────┬────────┐
│   (index)   │ Values │
├─────────────┼────────┤
│ totalBooks  │   50   │
│ mustReads   │   8    │
│  subgenres  │   12   │
└─────────────┴────────┘

byType: {
  start: 1,
  decision: 23,
  book: 19,
  subgenre: 7
}
```

## 🔍 Accessing Version Info Programmatically

```javascript
// Version data is stored globally
console.log(window.APP_VERSION);

/*
{
  version: "v1.8-1549476",
  buildDate: "2025-10-22T23:45:23Z",
  commitSha: "1549476a1b2c3d4e5f6...",
  branch: "main",
  buildNumber: "3",
  repository: "colindacity/fantasy-journey",
  deployer: "GitHub Actions"
}
*/
```

## 📱 Mobile Console

On mobile devices, you can view the console using:
- **iOS Safari**: Settings → Safari → Advanced → Web Inspector
- **Android Chrome**: chrome://inspect
- **Firefox Mobile**: about:debugging

## 🎨 Color Scheme

The console output uses carefully selected colors for maximum readability:

```javascript
const styles = {
  title:    'color: #8b5cf6; font-size: 24px; font-weight: bold;',
  subtitle: 'color: #ec4899; font-size: 14px;',
  label:    'color: #06b6d4; font-weight: bold;',
  value:    'color: #fbbf24;',
  line:     'color: #8b5cf6;',
  success:  'color: #10b981; font-weight: bold;'
}
```

## 🐛 Debugging Tips

### Check if Version Loaded
```javascript
if (window.APP_VERSION) {
  console.log('✅ Version loaded:', window.APP_VERSION.version);
} else {
  console.log('❌ Version not loaded - check network tab');
}
```

### View version.json Directly
Navigate to: `https://your-site.github.io/version.json`

### Performance Debugging
```javascript
// Built-in performance metrics
const perfData = performance.getEntriesByType('navigation')[0];
console.log('Load time:', perfData.loadEventEnd - perfData.fetchStart);
```

## 📝 Version Number Format

```
v1.{commits}-{short-sha}
```

Where:
- `1` = Major version (manual)
- `{commits}` = Total commits in repo
- `{short-sha}` = First 7 chars of git SHA

Example: `v1.245-a1b2c3d`

## 🎯 Footer Version Badge

At the bottom of the page, you'll also see a subtle version badge:

```
v1.8-1549476 | Build #3 | 10/22/2025
```

This is automatically added by the build pipeline!

## 🔗 Additional Resources

- Check `deployment-info.html` for full deployment details
- View `version.json` for machine-readable data
- See `DEPLOYMENT.md` for CI/CD pipeline docs

---

**Pro Tip:** Open your browser's developer console (F12) right now to see these in action!
