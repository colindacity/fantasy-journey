# Fantasy Reading Quest - Visual Mockup Reference
## Screen-by-Screen Design Descriptions

This document provides detailed visual descriptions of each screen and state, serving as a reference for designers and developers.

---

## TABLE OF CONTENTS
1. [Loading Screen](#1-loading-screen)
2. [Hub World - Main View](#2-hub-world---main-view)
3. [Indoor Zones - Library](#3-indoor-zones---library)
4. [Book Detail Modal](#4-book-detail-modal)
5. [Progress Dashboard](#5-progress-dashboard)
6. [Mobile Experience](#6-mobile-experience)

---

## 1. LOADING SCREEN

### Visual Layout
```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│              ✨ 📚                  │  ← Floating animated logo
│                                     │     (gentle up/down motion)
│                                     │
│      FANTASY READING QUEST          │  ← Gradient text
│                                     │     Playfair Display 48px
│      Modern 2025 Edition            │  ← Subtitle, Inter 16px
│                                     │
│                                     │
│      ▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱         │  ← Progress bar
│      ■■■■■■■■░░░░░░░░░░░░  45%     │     Gold gradient fill
│                                     │     Shimmer animation
│                                     │
│      Loading assets...              │  ← Status text
│                                     │
│                                     │
└─────────────────────────────────────┘

BACKGROUND: Deep indigo to purple gradient (vertical)
ANIMATION: Logo floats, progress bar fills with shimmer,
           particles drift across screen
TIMING: 2-3 seconds average load
```

### Details
- **Background**: Linear gradient 135° from #1e1b4b to #312e81
- **Logo Icons**: 72px, gentle float animation (3s sine wave)
- **Title**: White text with gold glow shadow (0 0 20px rgba(255,215,0,0.5))
- **Progress Bar**: 300px wide, 8px tall, rounded pill
- **Particles**: Tiny sparkles drifting diagonally (20-30 visible)

---

## 2. HUB WORLD - MAIN VIEW

### Visual Layout (Desktop)
```
┌─────────────────────────────────────────────────────────────┐
│ [📚 Fantasy Quest]              [🏆 Achievements] [📚 12]  │ ← Top Nav (80px)
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                   🌤️  ☁️                                    │
│                                                             │
│  🏛️                                            🏪          │
│  Ancient                                      Modern        │
│  Library                                      Bookstore     │
│  ✨✨✨                                        💖💖💖        │
│                                                             │
│                     💧                                      │
│           🌳      Fountain      🌳                          │
│                    ⚪⚪⚪                                    │
│                   ✨✨✨✨                                   │
│                                                             │
│                                                             │
│  🏭                                            🏡          │
│  Writer's                                     Your          │
│  Workshop                                     Library       │
│  🔥🔥🔥                                       🌿🌿🌿        │
│                                                             │
│           👤                                                │ ← Player
│          You                                                │    Character
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  [WASD] Move  •  [E] Interact  •  [ESC] Menu               │ ← Instructions
└─────────────────────────────────────────────────────────────┘

ZONES:
🏛️ Library (Top-Left): Indigo/Violet, Gold particles
🏪 Bookstore (Top-Right): Pink/Rose, Pink particles
🏭 Workshop (Bottom-Left): Orange/Red, Fire particles
🏡 Home (Bottom-Right): Green/Teal, Leaf particles
💧 Fountain (Center): Rainbow particles, flowing water
```

### Visual Description

**Sky (Top 40% of screen)**
- Gradient: Light blue → golden yellow → soft pink (eternal golden hour)
- Geometric clouds: Soft white rounded shapes, subtle drift animation
- Ambient particles: Tiny sparkles floating down (slow, varied colors)

**Ground (Bottom 60%)**
- Base: Soft emerald to green gradient
- Paths: Elegant curved stone paths (lighter gray gradient)
- Pattern: Herringbone tiles with subtle glow lines between
- Grass: Soft textured appearance (noise overlay at 5%)

**Buildings (Each 300-400px tall)**

*Library (Top-Left)*
```
    ⭐ ← Gold star finial
   ╱─╲
  ╱   ╲ ← Purple dome roof
 ┌─────┐
 │ □ □ │ ← Golden glowing windows
 │     │
 │ □ □ │
 │     │
 │  ▄  │ ← Arched entrance (warm glow)
 └─────┘
 ✨✨✨ ← Golden particles rising
```

*Bookstore (Top-Right)*
```
 ┌─────┐ ← "PAGE TURNER" neon sign
 │▓▓│▓▓│ ← Large glass windows
 │▓▓│▓▓│    (book displays visible)
 │▓▓│▓▓│
 │  ║  │ ← Modern glass door
 └─────┘
 💖💖💖 ← Pink glow particles
```

*Workshop (Bottom-Left)*
```
    ╥ ← Chimney with smoke
    ║
 ┌─────┐
 │□ □ □│ ← Industrial windows
 │□ □ □│
 │  ▓  │ ← Large barn door
 └─────┘
 🔥🔥🔥 ← Orange sparks rising
```

*Your Library (Bottom-Right)*
```
    ◜◝ ← Thatched roof
   ╱   ╲
  ╱ ⚫ ╲ ← Round window
 ┌──────┐
 │  🌸  │ ← Flower decorations
 │   ▓  │ ← Cozy rounded door
 └──────┘
 🌿🌿🌿 ← Peaceful leaves
```

**Central Fountain**
```
     ╱│╲ ← Water spray particles
    ╱ │ ╲
   ⚪⚪⚪ ← Iridescent marble
  ╱     ╲   (white→blue gradient)
 ┴───────┴
✨✨✨✨✨ ← Rainbow particles
```

**Player Character**
```
    😊 ← Simple friendly face
   ╱█╲    Hair (geometric style)
  ╱ █ ╲
  │ 📖│ ← Book emblem on chest
  │▓▓▓│   Gradient robe
  ╱│ │╲   (indigo→violet)
 ╱ │ │ ╲
   ░ ░ ← Soft shadow beneath
✨ ← Particle trail when moving
```

**Decorative Elements**
- Trees: Geometric foliage (3-4 layered circles), gentle sway
- Lamp Posts: Elegant modern posts with glowing spheres
- NPCs: 2-3 other readers browsing (pastel colored, simple animations)
- Ambient particles: 20-30 various colored sparkles floating
- Ground shadows: Soft ellipse shadows under all objects

---

## 3. INDOOR ZONES - LIBRARY

### Visual Layout
```
┌─────────────────────────────────────────────────────────────┐
│ [📚 Ancient Library]                            [📚 12] [X] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│    💡 ← Chandelier (gold glow, gentle sway)                │
│   ✨✨✨                                                     │
│                                                             │
│  ┌─────────────────────┐      ┌─────────────────────┐     │
│  │ 📕 📘 📗 📙 📔    │      │ 📕 📘 📗 📙 📔    │ ← Shelves
│  │ 📕 📘 📗 📙 📔    │      │ 📕 📘 📗 📙 📔    │
│  └─────────────────────┘      └─────────────────────┘     │
│                                                             │
│  ┌─────────────────────┐      ┌─────────────────────┐     │
│  │ 📕 📘 📗 📙 📔    │      │ 📕 📘 📗 📙 📔    │
│  │ 📕 📘 📗 📙 📔    │      │ 📕 📘 📗 📙 📔    │
│  └─────────────────────┘      └─────────────────────┘     │
│                                                             │
│                                                             │
│              [Decorative Rug Pattern]                       │
│                                                             │
│                    👤 ← Player                              │
│                    You                                      │
│                     ░                                       │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│            [ESC] Exit to Town Square                        │
└─────────────────────────────────────────────────────────────┘

LIGHTING:
💡 Chandelier: Primary warm light (center, yellow-gold glow)
🪟 Windows: Secondary soft blue light from sides
✨ Ambient: Low purple-tinted fill light
🕯️ Book shelves: Subtle glow from magical tomes
```

### Visual Description

**Ceiling & Lighting**
- Height: Shows ~70% of wall height
- Chandelier: Large geometric gold fixture (50px diameter)
  - Golden glow: Radial gradient 300px radius
  - Light rays: Particle system (slow drift, gold sparkles)
  - Animation: Gentle 5° sway (2s sine wave)

**Walls**
- Color: Soft cream with purple tint (gradient #F5F3FF)
- Texture: Subtle noise overlay (3% opacity)
- Features: Book-themed artwork, ornate wall sconces
- Windows: Tall arched windows with blue sky view
  - Light beams: Visible dust motes in window light

**Floor**
- Material: Polished wood parquet
- Pattern: Geometric herringbone (gradient browns)
- Reflection: Subtle shine (gradient overlay)
- Rug: Center decorative rug
  - Shape: 200×120px rounded rectangle
  - Color: Deep burgundy with gold pattern
  - Design: Geometric book-themed border

**Bookshelves**
- Arrangement: 4 main shelves (2 left, 2 right)
- Dimensions: 240px W × 160px H each
- Material: Rich wood (gradient brown)
- Books: Varied colors, slight 3D depth
  - Each book: 12px wide, varies in height
  - Colors: Purple, blue, red, green, gold, orange
  - Animation: Individual gentle float (3-5px, varied timing)
  - Hover: Lift 15px, glow ring, info tooltip
  - Spacing: 2-4px gaps between books

**Interactive Books**
```
Shelf 1 (Top-Left): Epic Fantasy
┌───┬───┬───┬───┬───┐
│ 📕│ 📘│ 📗│ 📙│ 📔│ ← Row 1
├───┼───┼───┼───┼───┤
│ 📕│ 📘│ 📗│ 📙│ 📔│ ← Row 2
└───┴───┴───┴───┴───┘
↑                   ↑
Purple            Gold
(Stormlight)   (First Law)

Each book on hover:
     ↗️ Lifts 15px
    ╔═══╗
    ║📕 ║ ← Scale 1.1
    ╚═══╝
   ✨ Glow ring (zone color)

  [The Way of Kings]
  by Brandon Sanderson
  ─ Press E to collect ─
```

**Environmental Effects**
- Dust motes: Visible in light beams (particle system)
- Book sparkles: Each book emits subtle matching color particles
- Chandelier glow: Pulsing intensity (slow, 0.8 ↔ 1.2)
- Ambient particles: 10-15 floating wisdom sparkles (gold)

**NPC Readers** (Optional)
- Count: 1-2 background characters
- Position: Standing at shelves, reading
- Design: Same style as player, pastel colors
- Animation: Idle reading pose, page turn occasionally

---

## 4. BOOK DETAIL MODAL

### Visual Layout
```
                ┌─────────────────────────────────────────┐
                │                                    [X]  │
                │  ╔═══════════════════════════════════╗  │
                │  ║                                   ║  │
   ╔═══════╗    │  ║  THE WAY OF KINGS                ║  │
   ║       ║    │  ║                                   ║  │
   ║ 📕   ║    │  ║  by Brandon Sanderson            ║  │
   ║       ║    │  ║                                   ║  │
   ║  🌟   ║    │  ║  ┌────┐  ┌──────────┐           ║  │
   ║       ║    │  ║  │Epic│  │Series #1 │           ║  │
   ╚═══════╝    │  ║  └────┘  └──────────┘           ║  │
  ↖️ Rotated    │  ║                                   ║  │
    -5°         │  ║  Roshar is a world of stone      ║  │
  240×360px     │  ║  and storms. Uncanny tempests    ║  │
  Enhanced      │  ║  of incredible power sweep...    ║  │
  cover art     │  ║                                   ║  │
  with 3D tilt  │  ║  ┌─────┬───────┬────────┐        ║  │
                │  ║  │Year │ Pages │ Rating │        ║  │
                │  ║  │2010 │ 1,007 │ 4.6/5  │        ║  │
                │  ║  └─────┴───────┴────────┘        ║  │
                │  ║                                   ║  │
                │  ║  ┌──────────────┐  ┌──────────┐  ║  │
                │  ║  │ Add to Lib ▶ │  │Watch Vid│  ║  │
                │  ║  └──────────────┘  └──────────┘  ║  │
                │  ║                                   ║  │
                │  ╚═══════════════════════════════════╝  │
                │                                         │
                │  If you like this...                    │
                │  ┌────┐ ┌────┐ ┌────┐ ┌────┐          │
                │  │ 📘 │ │ 📗 │ │ 📙 │ │ 📔 │  ←Mini   │
                │  └────┘ └────┘ └────┘ └────┘   books  │
                └─────────────────────────────────────────┘

BACKDROP: Blurred background (30px) + dark overlay rgba(15,23,42,0.8)
ANIMATION: Scale from 0.9 → 1.0 (elastic ease, 400ms)
SIZE: 900px W × auto H (90vw on mobile)
```

### Visual Description

**Backdrop**
- Blur: 30px backdrop-filter + webkit-backdrop-filter
- Overlay: Dark semi-transparent (rgba(15, 23, 42, 0.8))
- Click-to-dismiss: Clicking outside closes modal
- Animation: Fade in 300ms

**Modal Container**
- Background: Pure white (#FFFFFF)
- Border Radius: 24px (very rounded)
- Shadow: 0 30px 80px rgba(0,0,0,0.3) (dramatic elevation)
- Padding: 40px
- Max Height: 90vh (scrollable content)

**Close Button** (Top-Right)
```
  ┌───┐
  │ ✕ │ ← 32×32px
  └───┘
  Background: rgba(0,0,0,0.05)
  Hover: rgba(0,0,0,0.1) + scale 1.1
  Border-radius: 12px
```

**Main Layout Grid**
```
Left Column (240px)     Right Column (Flex-grow)
────────────────────    ─────────────────────────

   Enhanced Book        Title (48px Playfair)
   Cover Display        Author (18px Inter)
   • Rotated -5°        Genre Badges
   • Shadow beneath     Synopsis (200 words)
   • 3D tilt on hover   Metadata Stats
   • High quality       Action Buttons

   240×360px
```

**Book Cover (Left)**
- Size: 240px W × 360px H (enlarged 3x)
- Position: Floating with shadow
- Rotation: -5° initial tilt
- Shadow: 0 20px 60px rgba(0,0,0,0.3)
- Hover Effect: Rotates to 0°, scales 1.02
- 3D Tilt: Subtle movement following mouse (CSS transform)
- Details: Full resolution cover art with gradient overlay

**Title Section (Right)**
- Title Font: Playfair Display, 48px, weight 700
- Title Color: Gradient text (zone color)
- Title Effect: Background-clip: text
- Author Font: Inter, 18px, weight 400
- Author Color: Slate 700 (#334155)
- Spacing: 8px between title and author

**Genre Badges**
```
┌──────────┐  ┌─────────────┐
│Epic      │  │Series #1 of │  ← Gradient fills
│Fantasy   │  │Stormlight   │     Zone colors
└──────────┘  └─────────────┘     Rounded pills
                                  White text
```

**Synopsis**
- Font: Inter, 16px, weight 400
- Color: Slate 700 (#334155)
- Line Height: 1.6 (relaxed reading)
- Max Length: ~200 words
- Fade: Gradient fade at bottom if truncated

**Metadata Stats**
```
┌─────────────────────────────┐
│ YEAR    PAGES      RATING   │
│ 2010    1,007      4.6/5    │ ← Grid layout
└─────────────────────────────┘   Bordered top/bottom
                                  Labels: 12px caps
                                  Values: 18px bold
```

**Action Buttons**
- Primary (Add to Library):
  - Width: Auto (padding 16px 32px)
  - Height: 48px
  - Background: Zone gradient
  - Text: White, 16px Inter Semi-bold
  - Shadow: 0 4px 12px zone-color @ 40%
  - Hover: Scale 1.02, lift 2px, brighter 10%

- Secondary (Watch Video):
  - Same size as primary
  - Background: Transparent
  - Border: 2px solid zone color
  - Text: Zone color, same font
  - Hover: Background zone @ 10%

**Related Books Section**
- Title: "If you like this..." (20px Inter Semi-bold)
- Layout: Horizontal grid, 4 columns
- Book Size: 60px W × 90px H (mini cards)
- Spacing: 12px gap
- Interaction: Click to switch modal to that book
- Animation: Smooth cross-fade transition

---

## 5. PROGRESS DASHBOARD

### Visual Layout
```
┌─────────────────────────────────────────────────────────────┐
│ [📚 Your Reading Journey]                          [Back]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ╔══════════════════════╗    ╔══════════════════════╗      │
│  ║  BOOKS READ          ║    ║  CURRENT STREAK      ║      │
│  ║                      ║    ║                      ║      │
│  ║       24             ║    ║     🔥 7 days        ║      │
│  ║                      ║    ║                      ║      │
│  ║  ▰▰▰▰▰▰▰▰▰▱  80%    ║    ║  Don't break it!     ║      │
│  ║  to next level       ║    ║                      ║      │
│  ╚══════════════════════╝    ╚══════════════════════╝      │
│                                                             │
│  ╔══════════════════════╗    ╔══════════════════════╗      │
│  ║  GENRES EXPLORED     ║    ║  READING LEVEL       ║      │
│  ║                      ║    ║                      ║      │
│  ║      ◢◣              ║    ║   ⭐⭐⭐⭐☆           ║      │
│  ║     ◢ ◣              ║    ║                      ║      │
│  ║    ◢   ◣             ║    ║  "Avid Reader"       ║      │
│  ║   ◢─────◣            ║    ║  (Level 4/5)         ║      │
│  ║  Epic 45%            ║    ║                      ║      │
│  ║  Urban 30%           ║    ║  Next: "Book Sage"   ║      │
│  ║  Romance 25%         ║    ║  12 books to go      ║      │
│  ╚══════════════════════╝    ╚══════════════════════╝      │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ACHIEVEMENTS                                       │   │
│  │                                                     │   │
│  │  🏆        🏆        🏆        ⬜        ⬜         │   │
│  │  First    Book      Scholar   Book     Legendary   │   │
│  │  Steps    Worm               Sage      Reader      │   │
│  │                                                     │   │
│  │  Unlocked: 3/10                                    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  READING HISTORY                                    │   │
│  │                                                     │   │
│  │  📕 The Way of Kings        Completed • 3 days ago │   │
│  │  📘 The Name of the Wind     Reading • 45% done    │   │
│  │  📗 Mistborn                Started • 1 week ago   │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘

DESIGN: Cards with glassmorphism, gradient accents, smooth animations
LAYOUT: 2-column grid (stats), full-width sections (achievements, history)
COLORS: Zone-adaptive gradients based on most-read genre
```

### Visual Description

**Stats Cards** (2×2 Grid)
```
Each card:
┌──────────────────┐
│ TITLE            │ ← 12px caps, gray 500
│                  │
│   BIG NUMBER     │ ← 48px bold, primary color
│                  │
│ Progress/Detail  │ ← Secondary info
└──────────────────┘

Properties:
• Background: White 98% + blur 20px
• Border: 2px gradient (subtle)
• Border-radius: 20px
• Shadow: 0 10px 40px rgba(0,0,0,0.08)
• Padding: 24px
• Hover: Lift 4px, shadow intensifies
```

**Books Read Card**
- Number: 24 (large, bold, gradient text)
- Progress Bar:
  - Height: 12px
  - Fill: Zone gradient
  - Background: Gray 200
  - Label: "80% to next level"
  - Animation: Smooth fill (1s ease-out)

**Current Streak Card**
- Flame Icon: 🔥 (32px)
- Number: 7 days (large, bold)
- Encouragement: "Don't break it!" (small, playful)
- Glow: Subtle orange glow if active streak

**Genres Explored Card**
- Visual: Mini pie chart (simplified)
  - Epic: 45% (purple slice)
  - Urban: 30% (teal slice)
  - Romance: 25% (pink slice)
- Labels: Below chart with percentages
- Interactive: Hover slices to highlight

**Reading Level Card**
- Stars: ⭐⭐⭐⭐☆ (filled/empty)
- Title: "Avid Reader" (current level name)
- Level: 4/5
- Progress: "12 books to go" to next level
- Next Level: Preview "Book Sage"

**Achievements Section**
```
┌───┐  ┌───┐  ┌───┐  ┌───┐  ┌───┐
│🏆 │  │🏆 │  │🏆 │  │⬜ │  │⬜ │
└───┘  └───┘  └───┘  └───┘  └───┘
Earned        Earned        Locked
Glowing       Glowing       Grayscale

Each badge: 64×64px circular
Unlocked: Color + glow
Locked: Grayscale 40% opacity
Hover: Tooltip with description
Click: Details modal
```

**Reading History**
```
┌────────────────────────────────────────┐
│ 📕 The Way of Kings                   │
│    Completed • 3 days ago              │
│    ▰▰▰▰▰▰▰▰▰▰ 100%                    │
├────────────────────────────────────────┤
│ 📘 The Name of the Wind                │
│    Reading • 45% done                  │
│    ▰▰▰▰▰▱▱▱▱▱ 45%                     │
└────────────────────────────────────────┘

Each entry:
• Book icon: Colored book emoji/icon
• Title: 16px Semi-bold
• Status: 14px Regular, gray
• Progress bar: 8px tall, gradient
• Spacing: 16px between entries
• Hover: Lift, show "View Details"
```

---

## 6. MOBILE EXPERIENCE

### Portrait Layout (375×812px reference)
```
┌─────────────────────────┐
│ [📚]    Library    [12] │ ← Compact nav (64px)
├─────────────────────────┤
│                         │
│                         │
│       🏛️                │
│      Library            │
│                         │
│                         │
│        💧               │
│      Fountain           │
│                         │
│                         │
│        👤               │  ← Smaller viewport
│       Player            │     Zoomed out 0.8x
│                         │
│                         │
│                         │
│       🏪                │
│     Bookstore           │
│                         │
│                         │
│                         │
│                         │
├─────────────────────────┤
│                         │
│   🕹️         ⚡        │ ← Mobile controls
│   Joystick   Action     │    Always visible
│                         │
└─────────────────────────┘

ORIENTATION: Portrait primary, landscape supported
ZOOM: 0.8x camera zoom for better overview
CONTROLS: Virtual joystick + action button
TOUCH: All UI elements min 44×44px
```

### Mobile-Specific UI

**Compact Top Navigation**
```
┌─────────────────────────┐
│ [📚]  Library     [📚12]│
└─────────────────────────┘
Height: 64px
Logo: Icon only (32px)
Counter: Compact (icon + number)
Profile/Menu: Hidden in hamburger
```

**Virtual Joystick** (Bottom-Left)
```
     ┌─────────┐
     │    ●    │ ← 140px outer circle
     │   ○○○   │    Glassmorphism
     │  ○ ● ○  │    White 15% + blur
     │   ○○○   │
     │    ●    │    60px inner knob
     └─────────┘    Gradient (zone color)

Position: Fixed, 30px from bottom/left
Touch: Smooth drag, spring return
Deadzone: 10% center
Visual: Directional stretch on push
```

**Action Button** (Bottom-Right)
```
     ┌─────┐
     │     │
     │  ⚡  │ ← 80px diameter
     │     │    Gradient circle
     └─────┘    Blue gradient
                Glow shadow

Position: Fixed, 30px from bottom/right
Icon: Changes contextually
  • ⚡ Default (interact)
  • 👆 Touch prompt
  • ➜ Directional when near zone
States:
  • Idle: Gentle pulse
  • Available: Faster pulse + haptic
  • Pressed: Scale 0.92 + haptic
```

**Mobile Book Detail**
```
┌─────────────────────────┐
│ [X]                     │
│                         │
│     ╔═════════╗         │ ← Cover centered
│     ║  📕    ║         │    240×360px
│     ║         ║         │
│     ╚═════════╝         │
│                         │
│ THE WAY OF KINGS        │ ← Title
│ by Brandon Sanderson    │    Author
│                         │
│ [Epic] [Series #1]      │ ← Badges
│                         │
│ Synopsis text here      │ ← Scrollable
│ wrapping naturally on   │    content
│ mobile screen...        │
│                         │
│ ┌─────────────────────┐ │
│ │ Add to Library ▶   │ │ ← Full-width
│ └─────────────────────┘ │    buttons
│ ┌─────────────────────┐ │
│ │ Watch Video        │ │
│ └─────────────────────┘ │
│                         │
└─────────────────────────┘

Layout: Single column
Cover: Centered, smaller (200×300px)
Content: Full-width, scrollable
Buttons: Stacked, full-width
Padding: Reduced to 20px
```

**Mobile Gestures**
- **Swipe**: Quick navigation between zones
- **Pinch**: Zoom in/out (map view)
- **Tap**: Single tap to interact
- **Long Press**: Book detail preview
- **Double Tap**: Quick collect book

**Responsive Breakpoints**
```css
/* Mobile Portrait */
@media (max-width: 480px) {
  .nav-height: 64px;
  .book-card: 60×90px;
  .font-scale: 0.9;
}

/* Mobile Landscape */
@media (max-width: 896px) and (orientation: landscape) {
  .nav-height: 56px;
  .controls: Side-by-side;
}

/* Tablet Portrait */
@media (min-width: 768px) and (max-width: 1024px) {
  .nav-height: 72px;
  .book-card: 80×120px;
  .layout: 2-column grid;
}
```

---

## 7. ANIMATION SEQUENCES

### Book Collection Animation
```
Frame 1 (0ms):
  Player near book
  Book floating normally
  ┌──┐
  │📕│  ← Book
  └──┘
   👤   ← Player
   ↑ Proximity glow appears

Frame 2 (100ms):
  Interact pressed
  ┌──┐
  │📕│  ← Book lifts 10px
  └──┘
  ✨✨  Particles start
   👤

Frame 3 (300ms):
  Book spins toward camera
     📕  ← Rotating, scaling 1.2
    ✨✨✨
     👤

Frame 4 (500ms):
  Particle burst
    ✨
  ✨ 📕 ✨  ← Maximum burst
    ✨
     👤

Frame 5 (800ms):
  Book flies to UI
              →→→ 📕 ← Shrinking, moving

     👤

Frame 6 (1200ms):
  Counter increments
  [📚 13] ← Pop animation

  Toast appears
  ┌──────────────────┐
  │ ✓ Book Added!    │
  │ The Way of Kings │
  └──────────────────┘
```

### Zone Entrance Transition
```
Sequence:
1. Fade to Black (500ms)
   ▓▓▓▓▓▓▓▓▓▓

2. Scene Switch (100ms)
   [Loading new zone]

3. Fade from Black (500ms)
   ░░░░░░░░░░

4. Camera Settle (300ms)
   Slight zoom + pan

Total: 1400ms smooth transition
```

---

This mockup reference provides detailed visual descriptions of every major screen and interaction in the Fantasy Reading Quest application. Use these descriptions alongside the Visual Design Spec and Implementation Guide for complete design coverage.

**Remember**: The goal is BEAUTIFUL, MINIMALIST, MODERN 2025 - not retro, not pixel art, not 8-bit. Think Monument Valley meets Genshin Impact UI.
