# Fantasy Reading Quest - Implementation Guide
## Practical Code Examples for Visual Design System

This guide provides ready-to-use code snippets implementing the visual design specification.

---

## 1. CSS DESIGN TOKENS

### Design System Variables

```css
:root {
  /* ============================================
     COLOR SYSTEM - Zone Gradients
     ============================================ */

  /* Library Zone - Mystical Knowledge */
  --library-gradient: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
  --library-accent: linear-gradient(90deg, #FBBF24 0%, #F59E0B 100%);
  --library-bg: linear-gradient(180deg, #EEF2FF 0%, #F5F3FF 100%);
  --library-glow: radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%);

  /* Bookstore Zone - Modern Discovery */
  --bookstore-gradient: linear-gradient(135deg, #EC4899 0%, #F43F5E 100%);
  --bookstore-accent: linear-gradient(90deg, #FBBF24 0%, #F97316 100%);
  --bookstore-bg: linear-gradient(180deg, #FDF2F8 0%, #FFF1F2 100%);
  --bookstore-glow: radial-gradient(circle, rgba(251, 113, 133, 0.35) 0%, transparent 70%);

  /* Workshop Zone - Creative Craft */
  --workshop-gradient: linear-gradient(135deg, #F59E0B 0%, #EF4444 100%);
  --workshop-accent: linear-gradient(90deg, #FBBF24 0%, #DC2626 100%);
  --workshop-bg: linear-gradient(180deg, #FEF3C7 0%, #FEE2E2 100%);
  --workshop-glow: radial-gradient(circle, rgba(251, 146, 60, 0.4) 0%, transparent 70%);

  /* Home Zone - Peaceful Collection */
  --home-gradient: linear-gradient(135deg, #10B981 0%, #14B8A6 100%);
  --home-accent: linear-gradient(90deg, #34D399 0%, #2DD4BF 100%);
  --home-bg: linear-gradient(180deg, #D1FAE5 0%, #CCFBF1 100%);
  --home-glow: radial-gradient(circle, rgba(94, 234, 212, 0.35) 0%, transparent 70%);

  /* Hub World - Enchanted Town */
  --hub-sky: linear-gradient(180deg, #DBEAFE 0%, #FEF3C7 50%, #FBCFE8 100%);
  --hub-ground: linear-gradient(135deg, #A7F3D0 0%, #86EFAC 100%);

  /* ============================================
     UI COLOR SYSTEM
     ============================================ */

  /* Surfaces */
  --surface-primary: rgba(255, 255, 255, 0.95);
  --surface-secondary: rgba(255, 255, 255, 0.7);
  --surface-elevated: rgba(255, 255, 255, 0.98);
  --overlay-dark: rgba(15, 23, 42, 0.8);

  /* Text */
  --text-primary: #0F172A;
  --text-secondary: #1E293B;
  --text-body: #334155;
  --text-subtle: #64748B;
  --text-disabled: #94A3B8;
  --text-inverted: #FFFFFF;

  /* ============================================
     TYPOGRAPHY SYSTEM
     ============================================ */

  /* Font Families */
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-accent: 'Cinzel', Palatino, serif;

  /* Font Sizes (Fluid) */
  --text-display: clamp(48px, 8vw, 72px);
  --text-h1: clamp(32px, 5vw, 48px);
  --text-h2: clamp(24px, 4vw, 36px);
  --text-h3: clamp(20px, 3vw, 28px);
  --text-body-lg: 18px;
  --text-body: 16px;
  --text-body-sm: 14px;
  --text-caption: 12px;

  /* Line Heights */
  --leading-tight: 1.1;
  --leading-snug: 1.2;
  --leading-normal: 1.5;
  --leading-relaxed: 1.6;

  /* ============================================
     SPACING SYSTEM (8px base)
     ============================================ */

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;

  /* ============================================
     BORDER RADIUS
     ============================================ */

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-2xl: 24px;
  --radius-full: 9999px;

  /* ============================================
     SHADOWS
     ============================================ */

  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 20px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 40px rgba(0, 0, 0, 0.12);
  --shadow-xl: 0 20px 60px rgba(0, 0, 0, 0.15);
  --shadow-2xl: 0 30px 80px rgba(0, 0, 0, 0.2);

  /* ============================================
     ANIMATION TIMING
     ============================================ */

  --duration-fast: 150ms;
  --duration-base: 300ms;
  --duration-slow: 500ms;
  --duration-slower: 800ms;

  --ease-in: cubic-bezier(0.4, 0.0, 1, 1);
  --ease-out: cubic-bezier(0.0, 0.0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0.0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);

  /* ============================================
     BLUR AMOUNTS
     ============================================ */

  --blur-sm: 10px;
  --blur-md: 20px;
  --blur-lg: 30px;
}

/* Zone-specific CSS Custom Properties (set on body or container) */
[data-zone="library"] {
  --zone-gradient: var(--library-gradient);
  --zone-accent: var(--library-accent);
  --zone-bg: var(--library-bg);
  --zone-glow: var(--library-glow);
}

[data-zone="bookstore"] {
  --zone-gradient: var(--bookstore-gradient);
  --zone-accent: var(--bookstore-accent);
  --zone-bg: var(--bookstore-bg);
  --zone-glow: var(--bookstore-glow);
}

[data-zone="workshop"] {
  --zone-gradient: var(--workshop-gradient);
  --zone-accent: var(--workshop-accent);
  --zone-bg: var(--workshop-bg);
  --zone-glow: var(--workshop-glow);
}

[data-zone="home"] {
  --zone-gradient: var(--home-gradient);
  --zone-accent: var(--home-accent);
  --zone-bg: var(--home-bg);
  --zone-glow: var(--home-glow);
}
```

---

## 2. COMPONENT EXAMPLES

### Glassmorphism Top Navigation

```html
<nav class="top-nav">
  <div class="nav-container">
    <div class="nav-logo">
      <svg class="logo-icon"><!-- Book icon --></svg>
      <span class="logo-text">Fantasy Quest</span>
    </div>

    <div class="nav-counter">
      <svg class="counter-icon"><!-- Book icon --></svg>
      <span class="counter-value">12</span>
    </div>
  </div>
</nav>
```

```css
.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  z-index: 1000;

  /* Glassmorphism */
  background: var(--surface-primary);
  backdrop-filter: blur(var(--blur-md));
  -webkit-backdrop-filter: blur(var(--blur-md));

  /* Subtle shadow */
  box-shadow: var(--shadow-sm);

  /* Smooth entrance */
  animation: slideDown 0.5s var(--ease-out);
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  padding: 0 var(--space-6);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  cursor: pointer;
  transition: transform var(--duration-base) var(--ease-out);
}

.nav-logo:hover {
  transform: scale(1.05);
}

.logo-icon {
  width: 32px;
  height: 32px;
}

.logo-text {
  font-family: var(--font-accent);
  font-size: 24px;
  font-weight: 600;
  background: var(--zone-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.05em;
}

.nav-counter {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  background: var(--zone-accent);
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.4);
  transition: all var(--duration-base) var(--ease-out);
}

.nav-counter:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(251, 191, 36, 0.5);
}

.counter-icon {
  width: 20px;
  height: 20px;
}

.counter-value {
  font-family: var(--font-body);
  font-size: var(--text-body-lg);
  font-weight: 800;
  color: var(--text-primary);
  min-width: 24px;
  text-align: center;
}
```

---

### Modern Book Card (3D Effect)

```html
<div class="book-card" data-book-id="1">
  <div class="book-cover">
    <div class="book-spine"></div>
    <div class="book-front">
      <div class="book-pattern"></div>
      <h3 class="book-title">The Way of Kings</h3>
      <p class="book-author">Brandon Sanderson</p>
      <div class="book-foil"></div>
    </div>
  </div>
  <div class="book-shadow"></div>
</div>
```

```css
.book-card {
  position: relative;
  width: 80px;
  height: 120px;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: all var(--duration-base) var(--ease-out);
  animation: bookFloat 3s ease-in-out infinite;
}

@keyframes bookFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-4px); }
}

.book-card:hover {
  transform: translateY(-12px) rotateX(10deg) rotateY(-5deg);
  animation-play-state: paused;
}

.book-cover {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
}

.book-spine {
  position: absolute;
  left: -12px;
  width: 12px;
  height: 100%;
  background: linear-gradient(to right,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.1)
  );
  border-radius: 2px 0 0 2px;
  transform: rotateY(-90deg);
  transform-origin: right;
}

.book-front {
  width: 100%;
  height: 100%;
  background: var(--zone-gradient);
  border-radius: var(--radius-sm);
  padding: var(--space-2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.2),
    inset 0 0 0 1px rgba(255, 255, 255, 0.2);
}

.book-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.1;
  background-image:
    repeating-linear-gradient(45deg,
      transparent,
      transparent 10px,
      rgba(255, 255, 255, 0.1) 10px,
      rgba(255, 255, 255, 0.1) 20px
    );
}

.book-title {
  font-family: var(--font-display);
  font-size: 10px;
  font-weight: 700;
  color: var(--text-inverted);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  line-height: 1.2;
  position: relative;
  z-index: 1;
}

.book-author {
  font-family: var(--font-body);
  font-size: 7px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 1;
}

.book-foil {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg,
    transparent 0%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 100%
  );
  opacity: 0;
  transition: opacity var(--duration-base) var(--ease-out);
  pointer-events: none;
}

.book-card:hover .book-foil {
  opacity: 1;
}

.book-shadow {
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 8px;
  background: radial-gradient(ellipse,
    rgba(0, 0, 0, 0.3) 0%,
    transparent 70%
  );
  transition: all var(--duration-base) var(--ease-out);
}

.book-card:hover .book-shadow {
  width: 80%;
  opacity: 0.5;
  transform: translateX(-50%) scale(1.2);
}
```

---

### Modal Book Detail View

```html
<div class="modal-backdrop" id="bookModal">
  <div class="modal-container">
    <button class="modal-close" aria-label="Close">
      <svg><!-- X icon --></svg>
    </button>

    <div class="modal-content">
      <div class="book-detail-layout">
        <!-- Left: Book Cover -->
        <div class="book-detail-cover">
          <div class="book-card-large">
            <!-- Enlarged book card -->
          </div>
        </div>

        <!-- Right: Book Info -->
        <div class="book-detail-info">
          <h1 class="book-detail-title">The Way of Kings</h1>
          <p class="book-detail-author">by Brandon Sanderson</p>

          <div class="book-detail-meta">
            <span class="meta-badge">Epic Fantasy</span>
            <span class="meta-badge">Series Book 1</span>
          </div>

          <p class="book-detail-synopsis">
            Roshar is a world of stone and storms...
          </p>

          <div class="book-detail-stats">
            <div class="stat">
              <span class="stat-label">Year</span>
              <span class="stat-value">2010</span>
            </div>
            <div class="stat">
              <span class="stat-label">Pages</span>
              <span class="stat-value">1,007</span>
            </div>
            <div class="stat">
              <span class="stat-label">Rating</span>
              <span class="stat-value">4.6/5</span>
            </div>
          </div>

          <div class="book-detail-actions">
            <button class="btn-primary">Add to Library</button>
            <button class="btn-secondary">Watch Video</button>
          </div>
        </div>
      </div>

      <!-- Related Books -->
      <div class="book-detail-related">
        <h3>If you like this...</h3>
        <div class="related-books-grid">
          <!-- Mini book cards -->
        </div>
      </div>
    </div>
  </div>
</div>
```

```css
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;

  /* Glassmorphism backdrop */
  background: var(--overlay-dark);
  backdrop-filter: blur(var(--blur-lg));
  -webkit-backdrop-filter: blur(var(--blur-lg));

  /* Center content */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-6);

  /* Animation */
  opacity: 0;
  animation: fadeIn var(--duration-base) var(--ease-out) forwards;
}

@keyframes fadeIn {
  to { opacity: 1; }
}

.modal-container {
  position: relative;
  max-width: 900px;
  max-height: 90vh;
  width: 100%;
  background: var(--surface-elevated);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-2xl);
  overflow: hidden;

  /* Animation */
  transform: scale(0.9);
  animation: scaleIn var(--duration-slow) var(--ease-bounce) forwards;
}

@keyframes scaleIn {
  to { transform: scale(1); }
}

.modal-close {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(0, 0, 0, 0.05);
  border-radius: var(--radius-md);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all var(--duration-fast) var(--ease-out);
}

.modal-close:hover {
  background: rgba(0, 0, 0, 0.1);
  transform: scale(1.1);
}

.modal-content {
  padding: var(--space-10);
  overflow-y: auto;
  max-height: 90vh;
}

.book-detail-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: var(--space-10);
  margin-bottom: var(--space-10);
}

@media (max-width: 768px) {
  .book-detail-layout {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }
}

.book-detail-cover {
  display: flex;
  justify-content: center;
}

.book-card-large {
  width: 240px;
  height: 360px;
  transform: rotate(-5deg);
  box-shadow: var(--shadow-xl);
  transition: transform var(--duration-base) var(--ease-out);
}

.book-card-large:hover {
  transform: rotate(0deg) scale(1.02);
}

.book-detail-title {
  font-family: var(--font-display);
  font-size: var(--text-h1);
  font-weight: 700;
  background: var(--zone-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--space-2);
  line-height: var(--leading-snug);
}

.book-detail-author {
  font-family: var(--font-body);
  font-size: var(--text-body-lg);
  color: var(--text-secondary);
  margin-bottom: var(--space-4);
}

.book-detail-meta {
  display: flex;
  gap: var(--space-2);
  margin-bottom: var(--space-6);
  flex-wrap: wrap;
}

.meta-badge {
  padding: var(--space-1) var(--space-3);
  background: var(--zone-gradient);
  color: var(--text-inverted);
  font-size: var(--text-body-sm);
  font-weight: 600;
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-sm);
}

.book-detail-synopsis {
  font-family: var(--font-body);
  font-size: var(--text-body);
  line-height: var(--leading-relaxed);
  color: var(--text-body);
  margin-bottom: var(--space-6);
}

.book-detail-stats {
  display: flex;
  gap: var(--space-6);
  margin-bottom: var(--space-8);
  padding: var(--space-4) 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.stat {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.stat-label {
  font-size: var(--text-caption);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-subtle);
}

.stat-value {
  font-size: var(--text-body-lg);
  font-weight: 700;
  color: var(--text-primary);
}

.book-detail-actions {
  display: flex;
  gap: var(--space-3);
}

/* Button Components */
.btn-primary {
  padding: var(--space-3) var(--space-8);
  background: var(--zone-gradient);
  color: var(--text-inverted);
  font-family: var(--font-body);
  font-size: var(--text-body);
  font-weight: 600;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all var(--duration-base) var(--ease-out);
}

.btn-primary:hover {
  transform: scale(1.02) translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.btn-primary:active {
  transform: scale(0.98);
}

.btn-secondary {
  padding: var(--space-3) var(--space-8);
  background: transparent;
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: var(--text-body);
  font-weight: 600;
  border: 2px solid currentColor;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--duration-base) var(--ease-out);
}

.btn-secondary:hover {
  background: rgba(0, 0, 0, 0.05);
  transform: scale(1.02);
}
```

---

### Notification Toast

```html
<div class="toast toast-success">
  <div class="toast-icon">
    <svg><!-- Checkmark icon --></svg>
  </div>
  <div class="toast-content">
    <h4 class="toast-title">Book Added!</h4>
    <p class="toast-message">The Way of Kings added to your library</p>
  </div>
  <button class="toast-dismiss" aria-label="Dismiss">
    <svg><!-- X icon --></svg>
  </button>
</div>
```

```css
.toast {
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%) translateY(-20px);
  min-width: 320px;
  max-width: 480px;

  /* Glassmorphism */
  background: var(--surface-elevated);
  backdrop-filter: blur(var(--blur-md));
  -webkit-backdrop-filter: blur(var(--blur-md));

  /* Layout */
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-5);
  border-radius: var(--radius-lg);
  border: 2px solid;
  box-shadow: var(--shadow-lg);

  /* Animation */
  opacity: 0;
  animation: toastSlideIn var(--duration-base) var(--ease-out) forwards;
  z-index: 10000;
}

@keyframes toastSlideIn {
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.toast-success {
  border-color: #10B981;
}

.toast-success .toast-icon {
  background: linear-gradient(135deg, #10B981, #14B8A6);
}

.toast-icon {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.toast-icon svg {
  width: 20px;
  height: 20px;
  color: white;
}

.toast-content {
  flex: 1;
}

.toast-title {
  font-family: var(--font-body);
  font-size: var(--text-body);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--space-1) 0;
}

.toast-message {
  font-family: var(--font-body);
  font-size: var(--text-body-sm);
  color: var(--text-body);
  margin: 0;
}

.toast-dismiss {
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  transition: background var(--duration-fast) var(--ease-out);
}

.toast-dismiss:hover {
  background: rgba(0, 0, 0, 0.05);
}

.toast-dismiss svg {
  width: 16px;
  height: 16px;
  color: var(--text-subtle);
}
```

---

## 3. PHASER 3 IMPLEMENTATION

### Modern Character Sprite (SVG-based)

```javascript
// In PreloadScene or asset generation
class ModernCharacterSprite {
  static generate(scene) {
    const graphics = scene.add.graphics();

    // Character dimensions
    const width = 60;
    const height = 60;
    const headRadius = 10;

    // === HEAD ===
    // Base head circle with gradient effect
    graphics.fillStyle(0xFFDBB5, 1); // Skin tone
    graphics.fillCircle(width/2, headRadius, headRadius);

    // Hair (stylized geometric)
    graphics.fillStyle(0x4A3428, 1); // Brown hair
    graphics.fillCircle(width/2 - 5, headRadius - 3, 8);
    graphics.fillCircle(width/2 + 5, headRadius - 3, 8);
    graphics.fillCircle(width/2, headRadius - 5, 9);

    // Eyes (simple dots)
    graphics.fillStyle(0x1E293B, 1);
    graphics.fillCircle(width/2 - 4, headRadius + 2, 1.5);
    graphics.fillCircle(width/2 + 4, headRadius + 2, 1.5);

    // Smile
    graphics.lineStyle(1, 0x1E293B, 1);
    graphics.arc(width/2, headRadius + 3, 4, 0.2, Math.PI - 0.2);
    graphics.strokePath();

    // === BODY ===
    graphics.lineStyle(0);

    // Robe/Coat (gradient simulation with layers)
    graphics.fillStyle(0x4F46E5, 1); // Indigo
    graphics.fillRoundedRect(width/2 - 12, 22, 24, 30, 4);

    // Lighter overlay for gradient effect
    graphics.fillStyle(0x7C3AED, 0.7); // Violet overlay
    graphics.fillRoundedRect(width/2 - 12, 22, 24, 15, 4);

    // Book emblem on chest
    graphics.fillStyle(0xFBBF24, 1); // Gold
    graphics.fillRect(width/2 - 3, 30, 6, 8);

    // === ARMS ===
    graphics.fillStyle(0x4F46E5, 1);
    // Left arm
    graphics.fillRoundedRect(width/2 - 16, 26, 5, 20, 2);
    // Right arm
    graphics.fillRoundedRect(width/2 + 11, 26, 5, 20, 2);

    // === LEGS ===
    graphics.fillStyle(0x334155, 1); // Dark gray
    // Left leg
    graphics.fillRoundedRect(width/2 - 8, 50, 6, 10, 2);
    // Right leg
    graphics.fillRoundedRect(width/2 + 2, 50, 6, 10, 2);

    // Generate texture
    graphics.generateTexture('modern-player', width, height);
    graphics.destroy();
  }

  static generateOrbitingBook(scene) {
    const graphics = scene.add.graphics();

    // Miniature book
    graphics.fillStyle(0x7C3AED, 1);
    graphics.fillRoundedRect(0, 0, 12, 16, 2);

    // Spine highlight
    graphics.fillStyle(0x8B5CF6, 1);
    graphics.fillRect(1, 1, 3, 14);

    // Border
    graphics.lineStyle(1, 0xFFFFFF, 0.5);
    graphics.strokeRoundedRect(0, 0, 12, 16, 2);

    graphics.generateTexture('orbiting-book', 12, 16);
    graphics.destroy();
  }
}

// In create() method:
ModernCharacterSprite.generate(this);
ModernCharacterSprite.generateOrbitingBook(this);

// Create character
this.player = this.physics.add.sprite(400, 300, 'modern-player');
this.player.setScale(1.5);

// Add orbiting book companion
this.orbitingBook = this.add.sprite(0, 0, 'orbiting-book');
this.orbitingBook.setOrigin(0.5);

// Orbit animation
this.orbitAngle = 0;
this.orbitRadius = 40;

// In update():
this.orbitAngle += 0.02;
this.orbitingBook.x = this.player.x + Math.cos(this.orbitAngle) * this.orbitRadius;
this.orbitingBook.y = this.player.y + Math.sin(this.orbitAngle) * this.orbitRadius - 20;
```

---

### Modern Building Graphics

```javascript
class ModernBuildings {
  static generateLibrary(scene) {
    const graphics = scene.add.graphics();
    const width = 300;
    const height = 400;

    // === MAIN BUILDING ===
    // Create gradient effect with layered fills
    graphics.fillStyle(0x4F46E5, 1); // Base indigo
    graphics.fillRoundedRect(50, 100, 200, 280, 16);

    // Violet highlight (top portion)
    graphics.fillStyle(0x7C3AED, 0.7);
    graphics.fillRoundedRect(50, 100, 200, 140, 16);

    // === ENTRANCE ===
    // Grand arched doorway
    graphics.fillStyle(0x1E293B, 1);
    graphics.fillRect(120, 280, 60, 100);

    // Arch top
    graphics.fillCircle(150, 280, 30);

    // Door glow (inner light)
    graphics.fillStyle(0xFBBF24, 0.6);
    graphics.fillRect(125, 290, 50, 90);

    // === WINDOWS ===
    graphics.fillStyle(0xFBBF24, 0.7);

    // Top floor windows
    graphics.fillRoundedRect(70, 130, 40, 60, 8);
    graphics.fillRoundedRect(190, 130, 40, 60, 8);

    // Second floor windows
    graphics.fillRoundedRect(70, 210, 40, 50, 8);
    graphics.fillRoundedRect(190, 210, 40, 50, 8);

    // === DOME ROOF ===
    graphics.fillStyle(0x6D28D9, 1);
    graphics.fillEllipse(150, 100, 120, 60);

    // Dome highlight
    graphics.fillStyle(0x8B5CF6, 0.5);
    graphics.fillEllipse(150, 95, 100, 45);

    // Star finial
    graphics.fillStyle(0xFBBF24, 1);
    graphics.fillCircle(150, 70, 8);

    // Star points (simplified)
    for (let i = 0; i < 5; i++) {
      const angle = (i * Math.PI * 2 / 5) - Math.PI / 2;
      graphics.fillTriangle(
        150, 70,
        150 + Math.cos(angle) * 12,
        70 + Math.sin(angle) * 12,
        150 + Math.cos(angle + 0.4) * 5,
        70 + Math.sin(angle + 0.4) * 5
      );
    }

    // === DECORATIVE COLUMNS ===
    graphics.fillStyle(0xE0E7FF, 1);
    // Left column
    graphics.fillRect(45, 200, 12, 180);
    graphics.fillRect(40, 195, 22, 10); // Capital
    // Right column
    graphics.fillRect(243, 200, 12, 180);
    graphics.fillRect(238, 195, 22, 10); // Capital

    // === GENERATE ===
    graphics.generateTexture('library-modern', width, height);
    graphics.destroy();
  }

  static generateBookstore(scene) {
    const graphics = scene.add.graphics();
    const width = 320;
    const height = 360;

    // === MODERN BUILDING ===
    // Base structure
    graphics.fillStyle(0xFAFAFA, 1);
    graphics.fillRoundedRect(40, 60, 240, 280, 12);

    // === GLASS FACADE ===
    // Large windows (gradient glass effect)
    graphics.fillStyle(0xEC4899, 0.15); // Pink tint
    graphics.fillRoundedRect(50, 100, 100, 200, 8);
    graphics.fillRoundedRect(170, 100, 100, 200, 8);

    // Window frames
    graphics.lineStyle(4, 0xE0E0E0, 1);
    graphics.strokeRoundedRect(50, 100, 100, 200, 8);
    graphics.strokeRoundedRect(170, 100, 100, 200, 8);

    // Grid pattern on glass
    graphics.lineStyle(2, 0xE0E0E0, 0.5);
    for (let i = 1; i < 4; i++) {
      graphics.lineBetween(50, 100 + i * 50, 150, 100 + i * 50);
      graphics.lineBetween(170, 100 + i * 50, 270, 100 + i * 50);
    }

    // === ENTRANCE ===
    graphics.fillStyle(0xEC4899, 0.9);
    graphics.fillRoundedRect(130, 260, 60, 80, 8);

    // Door handle
    graphics.fillStyle(0xFBBF24, 1);
    graphics.fillCircle(180, 300, 4);

    // === SIGNAGE ===
    graphics.fillStyle(0xF43F5E, 1);
    graphics.fillRoundedRect(80, 70, 160, 20, 4);

    // === NEON ACCENT LINE ===
    graphics.lineStyle(3, 0xEC4899, 1);
    graphics.strokeRoundedRect(40, 60, 240, 280, 12);

    // Glow effect simulation (multiple strokes)
    graphics.lineStyle(1, 0xF43F5E, 0.5);
    graphics.strokeRoundedRect(38, 58, 244, 284, 14);

    graphics.generateTexture('bookstore-modern', width, height);
    graphics.destroy();
  }
}

// Generate in PreloadScene create():
ModernBuildings.generateLibrary(this);
ModernBuildings.generateBookstore(this);
```

---

## 4. PARTICLE SYSTEMS (Refined)

```javascript
// Ambient magical particles (floating in hub world)
this.ambientParticles = this.add.particles(0, 0, 'particle', {
  x: { min: 0, max: 1600 },
  y: -20,
  speedY: { min: 20, max: 50 },
  speedX: { min: -20, max: 20 },
  scale: { start: 0.3, end: 0 },
  alpha: { start: 0.6, end: 0 },
  tint: [0xFBBF24, 0xEC4899, 0x8B5CF6, 0x14B8A6], // Mixed colors
  lifespan: 8000,
  frequency: 400,
  blendMode: 'ADD'
});

// Book collection burst
collectBook(player, book) {
  const bookColor = book.getData('color') || 0x8B5CF6;

  const burst = this.add.particles(book.x, book.y, 'particle', {
    speed: { min: 100, max: 300 },
    angle: { min: 0, max: 360 },
    scale: { start: 0.6, end: 0 },
    alpha: { start: 1, end: 0 },
    tint: bookColor,
    lifespan: 1200,
    gravityY: 200,
    blendMode: 'ADD'
  });

  burst.explode(30);

  // Cleanup after animation
  this.time.delayedCall(1500, () => burst.destroy());

  // Flash effect
  this.cameras.main.flash(300, 255, 255, 255, false);

  // Book flies to counter
  this.tweens.add({
    targets: book,
    x: 700, // Counter position
    y: 50,
    scale: 0,
    duration: 1000,
    ease: 'Cubic.easeIn',
    onComplete: () => {
      book.destroy();
      this.updateBookCount();
    }
  });
}
```

---

## 5. ACCESSIBILITY IMPLEMENTATION

```css
/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .book-card {
    animation: none;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  :root {
    --text-primary: #000000;
    --text-secondary: #1a1a1a;
    --surface-primary: #ffffff;
  }

  .btn-primary,
  .book-card {
    border: 2px solid #000000;
  }
}

/* Focus visible (keyboard navigation) */
*:focus-visible {
  outline: 3px solid var(--zone-gradient);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* Screen reader only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

```html
<!-- Semantic HTML example -->
<nav aria-label="Main navigation">
  <ul role="list">
    <li><a href="#library" aria-label="Visit the Ancient Library">📚 Library</a></li>
  </ul>
</nav>

<button
  class="book-card"
  aria-label="View details for The Way of Kings by Brandon Sanderson"
  data-book-id="1">
  <!-- Book card content -->
</button>
```

---

## 6. RESPONSIVE DESIGN

```css
/* Mobile-first approach */
.book-detail-layout {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

/* Tablet and up */
@media (min-width: 768px) {
  .book-detail-layout {
    flex-direction: row;
    gap: var(--space-10);
  }

  .book-detail-cover {
    flex: 0 0 240px;
  }

  .book-detail-info {
    flex: 1;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .nav-container {
    padding: 0 var(--space-10);
  }

  .book-card {
    width: 100px;
    height: 150px;
  }
}

/* Large screens */
@media (min-width: 1440px) {
  :root {
    --text-display: 72px;
    --text-h1: 48px;
  }
}
```

---

This implementation guide provides production-ready code that follows the visual design specification. All components use the design system tokens, ensuring consistency throughout the application.

**Next Steps**:
1. Copy design tokens to your CSS
2. Implement components one by one
3. Test across devices and browsers
4. Refine based on user feedback
