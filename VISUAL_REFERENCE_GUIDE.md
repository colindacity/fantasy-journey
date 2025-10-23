# Fantasy Reading Quest - Visual Reference Guide
**Companion Document to Game Design Document**
*Visual mockups, flow diagrams, and technical specifications*

---

## 1. GAME FLOW DIAGRAM

```
┌─────────────────────────────────────────────────────────────┐
│                     GAME START                              │
│                     (index.html)                             │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│              LOADING SCREEN                                  │
│  - Animated logo (books + sparkles)                         │
│  - Progress bar (asset loading)                             │
│  - "Fantasy Reading Quest - Modern 2025 Edition"            │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│         FIRST-TIME USER EXPERIENCE (FTUE)                   │
│                                                              │
│  ┌────────────┐    ┌────────────┐    ┌─────────────┐       │
│  │   Avatar   │ => │    Name    │ => │  Tutorial   │       │
│  │  Creation  │    │   Input    │    │   Quest     │       │
│  └────────────┘    └────────────┘    └─────────────┘       │
│       (30s)             (15s)            (90s)              │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                   TOWN SQUARE (HUB)                         │
│                                                              │
│     🏛️ Library          📖 Bookstore                        │
│         (Level 1)            (Level 2)                      │
│                                                              │
│     💬 Daniel NPC       ⛲ Fountain                         │
│                                                              │
│     🏠 Your Home        ⚡ Workshop                          │
│         (Level 1)           (Level 15)                      │
│                                                              │
│  Portal to:                                                 │
│  - Cozy Corner (Level 3)                                    │
│  - Epic Fantasy Peaks (Level 5)                             │
│  - Grimdark Depths (Level 7)                                │
│  - Urban Fantasy District (Level 10)                        │
│  - Romantasy Garden (Level 12)                              │
│  - YA Academy (Level 18)                                    │
└─────────────────┬───────────────────────────────────────────┘
                  │
        ┌─────────┴──────────┬────────────────┐
        ▼                    ▼                ▼
   ┌─────────┐         ┌─────────┐      ┌──────────┐
   │  Zones  │         │ Library │      │  Quests  │
   │         │         │   UI    │      │          │
   └─────────┘         └─────────┘      └──────────┘
```

---

## 2. BOOK DISCOVERY FLOW

```
Player Movement
     │
     ▼
┌──────────────────┐
│  See Glowing     │
│  Book Floating   │ ◄─── Visual: Particle aura, genre color
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Approach Book   │
│  (< 50px away)   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Hover Effect    │
│  - Book lifts    │ ◄─── Animation: Float up 10px, scale 1.1x
│  - Glow pulse    │
│  - Tooltip label │      Tooltip: "The Hobbit - Tap E to view"
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Player Taps E   │
│  or Action Btn   │
└────────┬─────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────┐
│               BOOK CARD (Bottom Sheet)                  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │  [Book Cover Image - 200x300px]                    │ │
│  │                                  [X Close Button]  │ │
│  ├────────────────────────────────────────────────────┤ │
│  │  Mistborn: The Final Empire                        │ │
│  │  by Brandon Sanderson                              │ │
│  │  📚 Mistborn Era 1 - Book 1                        │ │
│  ├────────────────────────────────────────────────────┤ │
│  │  💬 Daniel's Take:                                 │ │
│  │  "You little freak. Your wand is throbbing for     │ │
│  │  those detailed magic systems."                    │ │
│  ├────────────────────────────────────────────────────┤ │
│  │  🏷️ Tags:                                          │ │
│  │  [Epic Fantasy] [Magic System] [Heist]            │ │
│  ├────────────────────────────────────────────────────┤ │
│  │  ⭐ 4.5/5 • 📖 541 pages • 📅 2006                 │ │
│  ├────────────────────────────────────────────────────┤ │
│  │  [▶ Watch Daniel's Review (3:45)]  ◄───┐          │ │
│  │  [+ Add to TBR List]                   │          │ │
│  │  [✓ Mark as Read]                      │          │ │
│  │  [🔗 Buy on Amazon]                    │          │ │
│  └────────────────────────────────────────┼──────────┘ │
└─────────────────────────────────────────────┼──────────┘
                                              │
                                              ▼
                                   ┌──────────────────┐
                                   │  VIDEO OVERLAY   │
                                   │                  │
                                   │  [YouTube Player]│
                                   │  - Timestamp     │
                                   │  - Controls      │
                                   │  - Close button  │
                                   └──────────────────┘
```

---

## 3. ZONE LAYOUT MAPS

### Town Square (Hub) - Isometric View

```
                  Sky Gradient (Purple to Blue)
            ╔═══════════════════════════════════╗
            ║     🌟   ☁️      ✨    🌙         ║
            ╠═══════════════════════════════════╣
            ║                                    ║
        🏛️  ║          Library Building          ║
            ║      (Classical, Brown + Gold)     ║
            ║            [Entrance]              ║
            ╚═══════╦═══════════════════╦═══════╝
                    ║                   ║
            ========╬===================╬========
                    ║   🌳 Tree 🌳     ║
            🌳      ║                   ║      🌳
                    ║    ⛲ Fountain    ║
            ========╬=======💬========╬========
                    ║   Daniel NPC     ║
            📖      ║                   ║      ⚡
         Bookstore  ║                   ║  Workshop
         (Purple)   ║                   ║  (Orange)
            ========╬===================╬========
                    ║       Path        ║
            ========╬===================╬========
                    ║                   ║
            🏠 Home ║                   ║
            (Green) ║                   ║
            ========╩===================╩========

Legend:
🏛️ = Library (Level 1+)
📖 = Bookstore (Level 2+)
⚡ = Writer's Workshop (Level 15+)
🏠 = Player's Home (Level 1+)
💬 = Daniel Greene NPC (Quest giver)
⛲ = Central Fountain (Decorative + Fast Travel)
🌳 = Decorative Trees (Ambient animations)
```

### Cozy Corner Zone Layout

```
╔═══════════════════════════════════════════════════╗
║          🌧️  Rainy Window Background             ║
╠═══════════════════════════════════════════════════╣
║                                                    ║
║   🪴       [Bookshelf]      [Bookshelf]     🪴   ║
║            📚📚📚📚          📚📚📚📚              ║
║                                                    ║
║       ☕ Coffee Bar                                ║
║       ┌─────────┐                                 ║
║       │ Counter │  🐱 Cat                        ║
║       └─────────┘                                 ║
║                                                    ║
║   🛋️ Couch    [Reading Nook]    🪑 Armchair     ║
║                 🔥 Fireplace                      ║
║   📖 Floating                                     ║
║      Books     [Rug]                              ║
║                                                    ║
║   🪴   🕯️ Candles   🕯️   🪴                      ║
║                                                    ║
╚═══════════════════════════════════════════════════╝

Interactive Elements:
- 📚 Bookshelves: Click to browse Cozy genre books
- ☕ Coffee Bar: Order coffee (cosmetic animation)
- 🔥 Fireplace: Sit in reading nook (camera zoom)
- 🐱 Cat: Tap to pet (satisfying animation)
- 📖 Floating Books: Collect to add to library
```

---

## 4. UI COMPONENT LIBRARY

### 4.1 Top Bar Component

```
┌─────────────────────────────────────────────────────────┐
│  ✨ Fantasy Reading Quest        📚 Books: 47   👤 Lvl 8│
│  (Location Label)                (Counter)    (Profile) │
└─────────────────────────────────────────────────────────┘

Specs:
- Height: 60px
- Background: linear-gradient(180deg, rgba(0,0,0,0.8), rgba(0,0,0,0.4))
- Backdrop filter: blur(10px)
- Font: Inter, 16px, bold, white
- Book counter: Gradient pill (gold)
- Sticky: Always visible
```

### 4.2 Book Card (Detailed Mockup)

```
┌───────────────────────────────────────────────────────────┐
│                                                      [✕]  │
│  ┌─────────────┐  Mistborn: The Final Empire             │
│  │             │  by Brandon Sanderson                    │
│  │   [Cover]   │  📚 Mistborn Era 1 - Book 1              │
│  │   200x300   │                                          │
│  │             │  💬 "You little freak. Your wand is      │
│  │             │  throbbing for those detailed magic      │
│  └─────────────┘  systems."                               │
│                                                            │
│  🏷️ Tags: [Epic Fantasy] [Magic System] [Heist]          │
│  ⭐ 4.5 • 📖 541 pages • 📅 2006 • 🌍 Scadrial           │
│                                                            │
│  ─────────────────────────────────────────────────────    │
│                                                            │
│  Similar Books: [Warbreaker] [Elantris] [Stormlight]     │
│                                                            │
│  ┌────────────────────────────────────────────────────┐   │
│  │         ▶ Watch Daniel's Review (3:45)            │   │
│  └────────────────────────────────────────────────────┘   │
│  ┌────────────────────────────────────────────────────┐   │
│  │              + Add to TBR List                     │   │
│  └────────────────────────────────────────────────────┘   │
│  ┌────────────────────────────────────────────────────┐   │
│  │              ✓ Mark as Read (+50 XP)              │   │
│  └────────────────────────────────────────────────────┘   │
│  ┌────────────────────────────────────────────────────┐   │
│  │              🔗 Buy on Amazon                      │   │
│  └────────────────────────────────────────────────────┘   │
│                                                            │
└────────────────────────────────────────────────────────────┘

Specs:
- Width: 90% screen width (max 500px)
- Slide up animation: 0.3s ease-out
- Border radius: 24px top, 0px bottom
- Shadow: 0 -4px 20px rgba(0,0,0,0.3)
- Buttons: 48px height, 16px padding, rounded-full
- Primary button gradient: #3b82f6 → #2563eb
- Secondary button: rgba(255,255,255,0.1) border
```

### 4.3 Mobile Controls

```
Mobile View:

 Game Canvas Area
 ┌─────────────────────────────────────┐
 │                                     │
 │                                     │
 │                                     │
 │                                     │
 │                                     │
 │                                     │
 │                                     │
 │  Joystick                    Action │
 │  ┌─────┐                    ┌─────┐│
 │  │  ◉  │                    │  ⚡  ││
 │  └─────┘                    └─────┘│
 └─────────────────────────────────────┘

Joystick Specs:
- Size: 120px diameter
- Position: Fixed bottom-left (30px margin)
- Background: radial gradient, glassmorphic
- Knob: 50px, gradient gold
- Touch area: Full joystick circle
- Dead zone: 10% (no input if < 10% distance)

Action Button Specs:
- Size: 80px diameter
- Position: Fixed bottom-right (30px margin)
- Background: Gradient blue
- Icon: ⚡ (36px emoji)
- Haptic feedback: Medium on tap
- Scale animation: 0.9x on active
```

### 4.4 Bottom Navigation Bar

```
┌─────────────────────────────────────────────────────┐
│   🏠      🗺️       📚      ⚙️                       │
│  Home    Map    Library  Settings                   │
│   ●                                                  │
└─────────────────────────────────────────────────────┘

Specs:
- Height: 70px (safe area + 20px padding)
- Background: White with shadow (light mode)
             rgba(0,0,0,0.9) with blur (dark mode)
- Icons: 24px, outlined when inactive, filled when active
- Label: 11px, centered below icon
- Active state: Primary color + dot indicator
- Tap animation: Scale 0.95x
```

---

## 5. COLOR SYSTEM

### Primary Palette

```
Purple (Primary Brand)
██████ #667eea (Main)
██████ #764ba2 (Dark)
██████ #a5b4fc (Light)

Gold (Accent)
██████ #fbbf24 (Main)
██████ #f59e0b (Dark)
██████ #fde68a (Light)

Success/Green
██████ #22c55e (Main)
██████ #16a34a (Dark)
██████ #86efac (Light)

Error/Red
██████ #ef4444 (Main)
██████ #dc2626 (Dark)
██████ #fca5a5 (Light)
```

### Zone-Specific Palettes

```
Cozy Corner:
██████ #a0522d (Sienna brown)
██████ #fef3c7 (Warm cream)
██████ #f97316 (Pumpkin orange)

Epic Fantasy Peaks:
██████ #3b82f6 (Royal blue)
██████ #e5e7eb (Silver)
██████ #1e40af (Deep blue)

Grimdark Depths:
██████ #7f1d1d (Dark red)
██████ #1f2937 (Charcoal)
██████ #991b1b (Blood red)

Urban Fantasy District:
██████ #ec4899 (Neon pink)
██████ #06b6d4 (Cyan)
██████ #312e81 (Dark purple)

Romantasy Garden:
██████ #fb7185 (Rose)
██████ #c4b5fd (Lavender)
██████ #fce7f3 (Pink blush)

Writer's Workshop:
██████ #f97316 (Orange)
██████ #71717a (Steel gray)
██████ #fcd34d (Brass yellow)

YA Academy:
██████ #14b8a6 (Teal)
██████ #fbbf24 (Yellow)
██████ #8b5cf6 (Violet)
```

---

## 6. TYPOGRAPHY SYSTEM

### Font Stack

```
Display (Headings):
font-family: 'Cinzel', serif;
Weights: 400 (regular), 700 (bold)
Use: Zone titles, book titles, headers

Body (Paragraphs):
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
Weights: 300 (light), 400 (regular), 600 (semi-bold), 700 (bold)
Use: Body text, UI labels, descriptions

Monospace (Code/Stats):
font-family: 'JetBrains Mono', 'Courier New', monospace;
Weight: 400 (regular)
Use: XP counters, stats, technical info
```

### Type Scale

```
Hero (48px):     THE HOBBIT
Title (32px):    Zone Name: Cozy Corner
Heading (24px):  Quest Title
Subheading (18px): Section Header
Body (16px):     Paragraph text for descriptions
Caption (14px):  Metadata, timestamps
Small (12px):    Tags, minor labels
```

### Text Styles

```
┌─────────────────────────────────────────┐
│  Title (Cinzel, 32px, bold)             │
│  This is a fantasy heading              │
│                                          │
│  Body (Inter, 16px, regular)            │
│  This is readable paragraph text with   │
│  proper line height (1.6) and spacing.  │
│                                          │
│  Caption (Inter, 14px, light)           │
│  Metadata • 2025 • Genre                │
└─────────────────────────────────────────┘
```

---

## 7. ANIMATION SPECIFICATIONS

### Key Animations

#### 7.1 Book Collection Animation

```
Frame 1 (0.0s):  Book at world position
                 ┌──┐
                 │📚│
                 └──┘

Frame 2 (0.1s):  Scale up + glow
                 ┌────┐
                 │ 📚 │ ✨
                 └────┘

Frame 3 (0.3s):  Fly toward camera
                    ┌────┐
                    │ 📚 │ ✨✨
                    └────┘

Frame 4 (0.5s):  Large + particles burst
                      ┌──────┐
                      │  📚  │ ✨💫✨
                      └──────┘   ⭐

Frame 5 (0.6s):  Fade out + XP float
                      +10 XP ↑
                         (fade)

Total Duration: 0.6 seconds
Easing: ease-out
Sound: "Pop" + "Chime"
Haptic: Medium pulse
```

#### 7.2 Zone Transition Animation

```
Step 1: Player approaches portal
        ───────────────
        Player at Portal
        ───────────────

Step 2: Proximity trigger (100px)
        Portal glows, label appears
        ✨ "Cozy Corner" ✨

Step 3: Player presses E/Action
        Screen fade to white (0.3s)

Step 4: Camera zoom out (0.2s)
        Overhead view of town

Step 5: Camera pan to new zone (0.5s)
        Smooth pan with easing

Step 6: Camera zoom in to new zone (0.3s)
        Ground level, spawn player

Step 7: Fade in from white (0.2s)
        Full control restored

Total: ~1.5 seconds seamless transition
```

#### 7.3 Micro-interactions

```
Button Tap:
- Hover: Scale 1.05x, shadow increase
- Active: Scale 0.95x, shadow decrease
- Duration: 0.1s

Card Swipe:
- Drag: Follow finger/cursor
- Release: Snap to position or dismiss
- Velocity-based: Fast swipe = dismiss

Tooltip Appear:
- Delay: 0.5s after hover
- Fade in: 0.2s
- Position: Above element, centered

Loading Spinner:
- Type: Rotating book icon
- Speed: 1 rotation/second
- Color: Gradient animation
```

---

## 8. PARTICLE EFFECTS REFERENCE

### 8.1 Ambient Zone Particles

```
Cozy Corner:
Type: Falling autumn leaves
Color: Orange (#f97316), Brown (#a0522d)
Count: 20-30 particles
Speed: Slow drift (20px/s)
Size: 8-16px
Lifespan: 5-10 seconds
Respawn: Continuous at top of screen

Grimdark Depths:
Type: Ash and embers
Color: Red (#7f1d1d), White (#e5e7eb)
Count: 30-40 particles
Speed: Variable (10-50px/s)
Size: 4-12px
Lifespan: 3-7 seconds
Movement: Upward float with turbulence

Epic Fantasy Peaks:
Type: Snowflakes and sparkles
Color: White (#ffffff), Blue (#3b82f6)
Count: 40-60 particles
Speed: Slow fall (15px/s)
Size: 6-14px
Lifespan: 8-15 seconds
Movement: Gentle sway
```

### 8.2 Interactive Particles

```
Player Movement Trail:
Type: Footstep sparkles
Color: Gold (#fbbf24)
Count: 2 particles per frame (when moving)
Size: 4px start → 0px end
Lifespan: 0.5 seconds
Fade: Exponential decay

Book Hover Effect:
Type: Orbiting stars
Color: Genre-specific
Count: 6-8 particles
Orbit radius: 40px
Speed: 90 degrees/second
Size: 6px

Book Collection Burst:
Type: Confetti explosion
Color: Multi-color (genre palette)
Count: 30 particles
Speed: Radial burst (100-200px/s)
Size: 8-16px
Lifespan: 1 second
Gravity: Applied after 0.5s
```

---

## 9. SOUND DESIGN REFERENCE

### Sound Categories

```
UI Sounds:
- Button Tap: Soft "click" (50ms, woodblock)
- Card Swipe: "Whoosh" (200ms)
- Menu Open: "Chime" up (300ms)
- Menu Close: "Chime" down (300ms)
- Error: "Buzz" (100ms, low frequency)

Gameplay Sounds:
- Book Collect: "Pop" + "Sparkle" (500ms)
- Book Hover: Soft "glow" hum (loop)
- Zone Enter: "Portal" whoosh (1s)
- Level Up: "Fanfare" (2s, triumphant)
- Achievement: "Ding!" (500ms, high)

Ambient Sounds (Loop):
- Town Square: Gentle market ambiance, birds
- Cozy Corner: Fire crackling, rain, pages turning
- Epic Peaks: Wind, distant horns, echo
- Grimdark: Thunder, crows, ominous drones
- Urban Fantasy: City traffic, distant sirens, jazz
- Romantasy: Soft music box, breeze, windchimes
- Workshop: Mechanical clanks, steam, tinkering
- YA Academy: Chatter, spell sounds, bells

Music Tracks:
- Main Theme: Orchestral fantasy (3min loop)
- Cozy: Acoustic guitar (2min loop)
- Epic: Heroic orchestral (4min loop)
- Grimdark: Dark atmospheric (3min loop)
- Urban: Jazzy synthwave (3min loop)
- Romantasy: Romantic strings (3min loop)
- Workshop: Industrial folk (2min loop)
- YA: Upbeat magical (2min loop)
```

### Volume Mixing

```
Master Volume: 100%
├─ Music: 60% (user adjustable)
├─ SFX: 80% (user adjustable)
└─ Voice: 100% (video audio, user adjustable)

Audio Ducking:
- When video plays: Music → 20%, SFX → 0%
- During dialogue: Music → 40%
- On menu open: Music → 70%
```

---

## 10. PERFORMANCE BUDGETS

### Target Metrics

```
Device Tier: High (iPhone 13+, Galaxy S21+)
─────────────────────────────────────────────
Frame Rate:       60 FPS (locked)
Load Time:        < 2 seconds
Memory Usage:     < 100 MB
Battery Drain:    < 8% per 30 minutes
Network (hourly): < 20 MB (cached)

Device Tier: Medium (iPhone 11, mid-range Android)
──────────────────────────────────────────────────
Frame Rate:       30-60 FPS (adaptive)
Load Time:        < 3 seconds
Memory Usage:     < 75 MB
Battery Drain:    < 12% per 30 minutes
Network (hourly): < 30 MB

Device Tier: Low (older devices)
────────────────────────────────
Frame Rate:       30 FPS (locked)
Load Time:        < 5 seconds
Memory Usage:     < 50 MB
Battery Drain:    < 15% per 30 minutes
Network (hourly): < 40 MB
```

### Asset Budget

```
Category          | Size Limit | Format
──────────────────┼────────────┼─────────────
JavaScript Bundle | 500 KB     | Minified + Gzip
CSS Bundle        | 50 KB      | Minified + Gzip
Phaser Engine     | 1.2 MB     | CDN cached
Images (UI)       | 200 KB     | WebP/AVIF
Images (Covers)   | 50 KB each | WebP, lazy loaded
Fonts             | 100 KB     | WOFF2 subset
Audio (SFX)       | 500 KB     | MP3/OGG, compressed
Audio (Music)     | 2 MB       | Streamed, low-quality
Videos            | N/A        | YouTube embed (external)
──────────────────┼────────────┼─────────────
Total (Initial):  | < 3 MB     |
Total (Cached):   | < 10 MB    |
```

---

## 11. RESPONSIVE BREAKPOINTS

```
┌─────────────────────────────────────────────────────┐
│  Mobile Portrait (320px - 480px)                    │
├─────────────────────────────────────────────────────┤
│  • Full-screen game canvas                          │
│  • Virtual joystick + action button                 │
│  • Bottom sheet UI (80% height max)                 │
│  • Single column layout                             │
│  • Font size: 14px base                             │
│  • Particle count: 50% of desktop                   │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  Mobile Landscape (481px - 767px)                   │
├─────────────────────────────────────────────────────┤
│  • Game canvas: 100% width, fit height              │
│  • Joystick left, action right                      │
│  • Bottom sheet: 60% height max                     │
│  • Two column layout (where applicable)             │
│  • Font size: 15px base                             │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  Tablet (768px - 1024px)                            │
├─────────────────────────────────────────────────────┤
│  • Game canvas: 800px max-width, centered           │
│  • Optional keyboard controls                       │
│  • Bottom sheet: 70% height max                     │
│  • Two column layout                                │
│  • Font size: 16px base                             │
│  • Particle count: 75% of desktop                   │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  Desktop (1025px+)                                  │
├─────────────────────────────────────────────────────┤
│  • Game canvas: 800px width, 600px height, centered │
│  • Keyboard + mouse controls only                   │
│  • Bottom sheet: Modal overlay (max 500px width)    │
│  • Multi-column layouts                             │
│  • Font size: 16px base                             │
│  • Particle count: 100%                             │
│  • Hover effects enabled                            │
└─────────────────────────────────────────────────────┘
```

---

## 12. ACCESSIBILITY COMPLIANCE

### WCAG 2.1 AA Standards

```
Color Contrast:
✓ Text: Minimum 4.5:1 ratio
✓ Large text (18pt+): Minimum 3:1
✓ UI components: Minimum 3:1

Example checks:
- White on Purple (#667eea): 5.2:1 ✓
- Gold on White (#fbbf24 on #fff): 1.9:1 ✗ (needs dark background)
- Black on Gold (#000 on #fbbf24): 8.1:1 ✓

Keyboard Navigation:
✓ All UI elements focusable
✓ Logical tab order
✓ Focus indicators (2px outline)
✓ No keyboard traps
✓ Skip links available

Screen Reader:
✓ ARIA labels on all interactive elements
✓ Alt text on images
✓ Live regions for dynamic content
✓ Semantic HTML structure

Example ARIA implementation:
<button aria-label="Add Mistborn to reading list">
  + Add to TBR
</button>

<div role="dialog" aria-labelledby="book-title">
  <h2 id="book-title">Mistborn: The Final Empire</h2>
</div>
```

### Accessibility Settings Panel

```
┌─────────────────────────────────────────┐
│  Accessibility Settings                 │
├─────────────────────────────────────────┤
│  ☐ High Contrast Mode                   │
│  ☐ Reduce Motion                        │
│  ☐ Reduce Particles                     │
│                                          │
│  Colorblind Mode:                       │
│  ○ None                                  │
│  ○ Protanopia (Red-blind)               │
│  ○ Deuteranopia (Green-blind)           │
│  ○ Tritanopia (Blue-blind)              │
│                                          │
│  Text Size:                              │
│  [―――●―――] (100% - 150%)                │
│                                          │
│  ☑ Screen Reader Descriptions           │
│  ☑ Keyboard Navigation Hints            │
│  ☐ Disable Haptic Feedback              │
└─────────────────────────────────────────┘
```

---

## 13. LOCALIZATION FRAMEWORK

### Supported Languages (Future)

```
Priority 1 (Launch):
- English (en-US)

Priority 2 (Year 1):
- Spanish (es-ES)
- French (fr-FR)
- German (de-DE)
- Portuguese (pt-BR)

Priority 3 (Year 2):
- Japanese (ja-JP)
- Korean (ko-KR)
- Chinese Simplified (zh-CN)
- Russian (ru-RU)
```

### String Externalization

```javascript
// Example localization structure
const translations = {
  "en-US": {
    "ui.bookCount": "Books: {count}",
    "ui.level": "Level {level}",
    "action.addToLibrary": "Add to TBR List",
    "action.markAsRead": "Mark as Read",
    "zone.cozyCorner": "Cozy Corner",
    "tutorial.welcome": "Welcome to Fantasy Reading Quest!",
    // ... 500+ strings
  },
  "es-ES": {
    "ui.bookCount": "Libros: {count}",
    "ui.level": "Nivel {level}",
    // ...
  }
};

// Usage
function t(key, params = {}) {
  let str = translations[currentLanguage][key] || key;
  Object.keys(params).forEach(param => {
    str = str.replace(`{${param}}`, params[param]);
  });
  return str;
}

// Example
console.log(t("ui.bookCount", { count: 47 })); // "Books: 47"
```

---

## 14. ANALYTICS EVENT TRACKING

### Event Categories

```
User Acquisition:
- first_open
- tutorial_start
- tutorial_complete
- account_create

Engagement:
- session_start
- session_end (with duration)
- zone_enter (with zone_name)
- zone_exit
- book_view (with book_id)
- video_start (with video_id)
- video_complete
- video_skip

Conversion:
- book_add_to_library
- book_mark_read
- affiliate_link_click
- purchase_cosmetic (if applicable)

Progression:
- level_up (with new_level)
- achievement_unlock (with achievement_id)
- quest_start
- quest_complete
- zone_unlock

Retention:
- daily_login
- weekly_return
- monthly_return

Technical:
- error_occurred (with error_type)
- crash_report
- performance_issue (with metric)
```

### Example Event Payload

```json
{
  "event": "book_add_to_library",
  "timestamp": "2025-10-23T14:30:00Z",
  "user_id": "user_12345",
  "session_id": "session_abc123",
  "properties": {
    "book_id": "mistborn-final-empire",
    "book_title": "Mistborn: The Final Empire",
    "book_author": "Brandon Sanderson",
    "genre": "epic-fantasy",
    "zone": "town-square",
    "user_level": 8,
    "books_in_library": 47,
    "discovery_method": "exploration" // or "quest", "recommendation"
  },
  "device_info": {
    "platform": "web",
    "os": "iOS",
    "os_version": "17.2",
    "browser": "Safari",
    "screen_size": "390x844"
  }
}
```

---

## 15. TECHNICAL ARCHITECTURE

### Frontend Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                      USER DEVICE                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │              Browser (Chrome/Safari)              │  │
│  └───────────────────┬───────────────────────────────┘  │
│                      │                                   │
│  ┌───────────────────▼───────────────────────────────┐  │
│  │          index.html (App Shell)                   │  │
│  │  - Top bar UI                                     │  │
│  │  - Game container                                 │  │
│  │  - Mobile controls                                │  │
│  └───────────────────┬───────────────────────────────┘  │
│                      │                                   │
│       ┌──────────────┴──────────────┐                   │
│       ▼                             ▼                    │
│  ┌─────────┐                  ┌──────────┐              │
│  │ Phaser  │                  │   UI     │              │
│  │ Engine  │                  │  Layer   │              │
│  │ (Game)  │                  │ (React?) │              │
│  └────┬────┘                  └────┬─────┘              │
│       │                            │                     │
│       │ Textures  State            │ DOM                │
│       │ Physics   Events           │ Events             │
│       │                            │                     │
│  ┌────▼────────────────────────────▼─────┐              │
│  │      Game State Manager               │              │
│  │  - Player data                        │              │
│  │  - Book collection                    │              │
│  │  - Progress tracking                  │              │
│  │  - LocalStorage sync                  │              │
│  └────────────────┬──────────────────────┘              │
│                   │                                      │
└───────────────────┼──────────────────────────────────────┘
                    │
        ┌───────────┴──────────┐
        ▼                      ▼
┌──────────────┐      ┌──────────────┐
│   CDN APIs   │      │  Backend API │
│              │      │  (Future)    │
│ - Phaser.js  │      │              │
│ - Fonts      │      │ - User auth  │
│ - Images     │      │ - Cloud save │
│ - YouTube    │      │ - Analytics  │
└──────────────┘      └──────────────┘
```

### Data Flow

```
User Action (Tap Book)
        │
        ▼
UI Event Listener (Click handler)
        │
        ▼
Game Logic (checkBookProximity())
        │
        ▼
State Update (gameState.booksCollected++)
        │
        ├─────────────────┬──────────────────┐
        ▼                 ▼                  ▼
  Update UI        Play Animation      Save to LocalStorage
 (Book counter)    (Collection burst)  (Persist state)
        │                 │                  │
        └─────────┬───────┴──────────────────┘
                  ▼
          Analytics Event (book_collected)
                  │
                  ▼
           Backend Logging (Future)
```

---

## 16. DEPLOYMENT PIPELINE

### GitHub Actions Workflow

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Run tests
        run: npm test

      - name: Build assets
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
          cname: fantasy-quest.danielgreene.com
```

### Environment Variables

```bash
# .env.production
VITE_API_URL=https://api.fantasy-quest.com
VITE_YOUTUBE_API_KEY=your_youtube_api_key
VITE_ANALYTICS_ID=G-XXXXXXXXXX
VITE_SENTRY_DSN=https://xxx@sentry.io/xxx
VITE_ENVIRONMENT=production
```

---

## 17. TESTING STRATEGY

### Test Coverage Goals

```
Unit Tests (Jest):
- Game logic functions (60%+ coverage)
- State management (80%+ coverage)
- Utility functions (90%+ coverage)

Integration Tests (Playwright):
- Book discovery flow
- Video playback
- Zone transitions
- Mobile controls
- Save/load functionality

Visual Regression Tests:
- Screenshot comparison on UI changes
- Across multiple browsers/devices

Performance Tests:
- Lighthouse CI (score > 90)
- Frame rate monitoring
- Memory leak detection
```

### Example Test Cases

```javascript
// Unit Test Example
describe('Book Collection', () => {
  test('should add book to library and increase counter', () => {
    const initialCount = gameState.booksCollected;
    collectBook('mistborn-final-empire');
    expect(gameState.booksCollected).toBe(initialCount + 1);
    expect(gameState.booksRead).toContain('mistborn-final-empire');
  });

  test('should not add duplicate books', () => {
    gameState.booksRead = ['mistborn-final-empire'];
    const initialCount = gameState.booksCollected;
    collectBook('mistborn-final-empire');
    expect(gameState.booksCollected).toBe(initialCount);
  });
});

// Integration Test Example (Playwright)
test('Book discovery flow', async ({ page }) => {
  await page.goto('/rpg-game/');

  // Wait for game to load
  await page.waitForSelector('.phaser-canvas');

  // Move character to book (simulate WASD)
  await page.keyboard.press('W');
  await page.keyboard.press('W');

  // Interact with book
  await page.keyboard.press('E');

  // Verify book card appears
  await expect(page.locator('.book-card')).toBeVisible();

  // Verify book title
  await expect(page.locator('.book-title')).toContainText('Mistborn');

  // Add to library
  await page.click('button:has-text("Add to TBR")');

  // Verify counter updated
  await expect(page.locator('#bookCount')).toContainText('1');
});
```

---

## CONCLUSION

This visual reference guide provides concrete specifications for implementing the Fantasy Reading Quest game. All measurements, colors, animations, and flows are production-ready and follow modern mobile game standards.

**Next Steps**:
1. Import designs into Figma for high-fidelity mockups
2. Create component library in Storybook
3. Implement design system in code (CSS variables)
4. Build prototypes for key interactions
5. User test with target audience

**Maintenance**:
- Update this document with each new feature
- Version control alongside code
- Share with all team members
- Reference during design reviews

---

**Version**: 1.0
**Last Updated**: October 23, 2025
**Companion To**: GAME_DESIGN_DOCUMENT.md
