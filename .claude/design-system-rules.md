# Figma to Code Integration Rules - KHVD 2025

## Design System Overview

This document provides comprehensive rules for integrating Figma designs into the KHVD 2025 exhibition codebase using the Model Context Protocol (MCP).

---

## 1. Token Definitions

### Location

All design tokens are defined in: [src/app.css](src/app.css)

### Token Structure

Tokens use **CSS Custom Properties** within the `@theme` directive (TailwindCSS v4 pattern):

```css
@theme {
	/* Brand Colors */
	--color-primary: #fc451e;

	/* Responsive Breakpoints */
	--breakpoint-xs: 421px;
	--breakpoint-tablet: 960px;
	--breakpoint-desktop: 1351px;

	/* Font Families */
	--font-sans: 'Pretendard Variable', Pretendard, ...;
	--font-display: 'Bebas Neue', Impact, sans-serif;

	/* Font Weights */
	--font-weight-regular: 400;
	--font-weight-medium: 500;
	--font-weight-semibold: 600;
	--font-weight-bold: 700;

	/* Typography - Mobile First */
	--font-size-h0: 7.5rem; /* 120px */
	--line-height-h0: 0.96;
	/* ... (see full token list below) */

	/* Typography - PC Overrides */
	--font-size-h0-tablet: 18.75rem; /* 300px */
	/* ... (see full token list below) */
}
```

### Available Design Tokens

#### Color Tokens

- **Primary Brand Color**: `#FC451E` (vibrant orange-red)
  - Usage: `text-primary`, `bg-primary`, `border-primary`

#### Breakpoint Tokens

- **Extra Small Mobile**: 0px - 420px (default, no prefix)
- **Mobile**: 421px - 959px (prefix: `xs:`)
- **Tablet**: 960px - 1350px (prefix: `tablet:`)
- **Desktop**: 1351px+ (prefix: `desktop:`)

#### Typography Tokens

**Mobile Typography (Base):**

- `--font-size-h0: 7.5rem` (120px) / `--line-height-h0: 0.96`
- `--font-size-h1: 3.5rem` (56px) / `--line-height-h1: 1.2`
- `--font-size-h2: 3rem` (48px) / `--line-height-h2: 1.2`
- `--font-size-h3: 2.5rem` (40px) / `--line-height-h3: 1`
- `--font-size-h4: 2rem` (32px) / `--line-height-h4: 1`
- `--font-size-h5: 1.75rem` (28px) / `--line-height-h5: 1.2`
- `--font-size-h6: 1.5rem` (24px) / `--line-height-h6: 1`
- `--font-size-h7: 1.25rem` (20px) / `--line-height-h7: 1.4`
- `--font-size-h8: 1.125rem` (18px) / `--line-height-h8: 1.2`
- `--font-size-b1: 1rem` (16px) / `--line-height-b1: 1.4`
- `--font-size-b2: 0.9375rem` (15px) / `--line-height-b2: 1.5`
- `--font-size-b3: 0.875rem` (14px) / `--line-height-b3: 1.2`

**PC Typography (Tablet/Desktop ≥960px):**

- `--font-size-h0-tablet: 18.75rem` (300px)
- `--font-size-h1-tablet: 13.125rem` (210px)
- `--font-size-h2-tablet: 8.25rem` (132px)
- `--font-size-h3-tablet: 7.5rem` (120px)
- `--font-size-h4-tablet: 6.25rem` (100px)
- `--font-size-h5-tablet: 3.75rem` (60px) / `--line-height-h5-tablet: 1.3`
- `--font-size-h6-tablet: 3.25rem` (52px) / `--line-height-h6-tablet: 1.1`
- `--font-size-h7-tablet: 2.5rem` (40px) / `--line-height-h7-tablet: 1.6`
- `--font-size-h8-tablet: 2rem` (32px) / `--line-height-h8-tablet: 1.4`
- `--font-size-h9-tablet: 1.75rem` (28px) / `--line-height-h9-tablet: 1.4`
- `--font-size-h10-tablet: 1.5rem` (24px) / `--line-height-h10-tablet: 1.5`
- `--font-size-b1-tablet: 1.25rem` (20px) / `--line-height-b1-tablet: 1.5`
- `--font-size-b2-tablet: 1.125rem` (18px) / `--line-height-b2-tablet: 1.4`
- `--font-size-b3-tablet: 0.9375rem` (15px) / `--line-height-b3-tablet: 1.2`

### Token Transformation System

- **No Build-Time Transformation**: Tokens are used directly in CSS as custom properties
- **Runtime Transformation**: Browser handles CSS custom properties natively
- **Responsive Overrides**: Media queries apply PC tokens at ≥960px breakpoint

---

## 2. Component Library

### Component Location

All UI components are stored in: [src/lib/components/](src/lib/components/)

### Current Component Inventory

#### 1. **CustomCursor** (`CustomCursor.svelte`)

**Purpose**: Custom dual-square cursor system (120x120 outer + 52x52 inner)

**Key Features:**

- Tracks mouse position with state management
- Hover detection for clickable elements
- Rotation animation on hover (45deg)
- Easing transitions (cubic-bezier)

**Usage Pattern:**

```svelte
<script>
	import CustomCursor from '$lib/components/CustomCursor.svelte';
</script>

<CustomCursor />
```

**Technical Details:**

- Uses Svelte 5 `$state` runes for reactivity
- Event listeners: `mousemove`, `mouseover`
- Clickable detection: tags, roles, cursor pointer, onclick
- Global cursor disabled via `* { cursor: none !important; }`

#### 2. **FlipClock** (`FlipClock.svelte`)

**Purpose**: 3D flip-card countdown timer

**Key Features:**

- Real-time countdown calculation
- 3D flip animation (0.95s cubic-bezier)
- Separate top/bottom halves for realistic flip effect
- Responsive sizing (mobile: 40x55px, PC: 100x140px)
- Hidden seconds on mobile

**Props:**

- `targetDate: Date` - Countdown target

**Usage Pattern:**

```svelte
<script>
	import FlipClock from '$lib/components/FlipClock.svelte';
</script>

<FlipClock targetDate={new Date('2025-11-05')} />
```

**Technical Details:**

- Uses `perspective: 300px` for 3D effect
- Keyframe animation: `flipDown` (0deg → -180deg)
- Backface visibility hidden for clean animation
- Updates every 1000ms via interval

#### 3. **Footer** (`Footer.svelte`)

**Purpose**: Site-wide footer with exhibition information

**Key Features:**

- 3-column grid layout (mobile: 1 col, tablet: 3 cols)
- Exhibition information display
- Social media links (Instagram, Phone, Naver)
- Archive links (2023, 2024)
- Large R=VD logo
- White-on-black color scheme

**Usage Pattern:**

```svelte
<script>
	import Footer from '$lib/components/Footer.svelte';
</script>

<Footer />
```

**Technical Details:**

- Max width: 1920px with auto margins
- Responsive padding: `px-4 tablet:px-6 desktop:px-8`
- SVG icons from `/icons/` directory
- Typography: `text-h7 tablet:text-h6` for headers

### Component Architecture

**Framework**: Svelte 5 with TypeScript
**Reactivity Model**: Runes-based (`$state`, `$props`, `$derived`)
**Component Pattern**: Single-file components (.svelte)
**Styling**: Scoped `<style>` blocks + TailwindCSS utility classes

### Component Documentation

- **No Storybook**: Documentation lives in CLAUDE.md and component comments
- **Type Safety**: All components use TypeScript with `lang="ts"` attribute
- **Props Interface**: Props defined with `let { prop }: { prop: Type } = $props()`

---

## 3. Frameworks & Libraries

### UI Framework

**SvelteKit 2.0** - Full-stack framework

- File-based routing in `src/routes/`
- Server-side rendering (SSR) capabilities
- API routes via `+server.ts` files
- Layout system via `+layout.svelte`

**Svelte 5** - Component framework

- Runes-based reactivity (`$state`, `$props`, `$derived`)
- Modern lifecycle: `onMount`, `onDestroy`
- Template syntax: `{#if}`, `{#each}`, `{@render}`

### Styling Framework

**TailwindCSS v4** (Beta) - Utility-first CSS

- **CSS-Based Configuration**: Uses `@theme` directive in CSS (not JS config)
- **Import Method**: `@import "tailwindcss"` in `app.css`
- **Custom Utilities**: Typography classes (`.text-mobile-h0`, `.text-pc-h1`, etc.)

**PostCSS** - CSS Processing

- **Autoprefixer**: Vendor prefix automation
- **Tailwind Integration**: `@tailwindcss/postcss` plugin

### Animation Library

**svelte-motion** (v0.12.2) - Framer Motion for Svelte

- Declarative animations
- Spring physics
- Gesture support
- Usage: `import { Motion } from 'svelte-motion'`

### Build System

**Vite 5** - Dev server and bundler

- Fast HMR (Hot Module Replacement)
- Native ESM support
- Optimized production builds
- SvelteKit integration via `@sveltejs/vite-plugin-svelte`

**Adapter**: `@sveltejs/adapter-auto` - Auto-detects deployment platform

---

## 4. Asset Management

### Asset Storage Structure

```
static/
├── icons/              # SVG icons (UI elements, social, navigation)
├── logo.svg            # Main black logo
├── logo_white.svg      # White logo for dark backgrounds
└── teaser.png          # Teaser page image
```

### Asset Referencing

**Static Files**: Referenced from root (`/`) in templates

```svelte
<img src="/logo.svg" alt="R=VD" />
<img src="/icons/insta_fill_white.svg" alt="Instagram" />
```

**Import Pattern**: Not used (static file serving only)

### Asset Optimization

- **Manual Optimization**: SVGs should be pre-optimized before adding
- **No Build-Time Processing**: Static files served as-is
- **CDN Configuration**: None (local serving only)
- **Image Format Strategy**: SVG for icons/logos, PNG for raster images

### Responsive Images

**Strategy**: Use CSS sizing rather than multiple image files

```svelte
<img src="/logo_white.svg" alt="R=VD" class="h-auto w-[280px] tablet:w-[420px] desktop:w-[560px]" />
```

---

## 5. Icon System

### Icon Storage

**Location**: [static/icons/](static/icons/)

### Icon Inventory

#### Social Icons

- `insta_fill.svg` / `insta_fill_white.svg` - Instagram (filled)
- `insta_line.svg` - Instagram (outline)
- `call.svg` / `call_white.svg` - Phone
- `naver.svg` / `naver_white.svg` - Naver
- `mail_line.svg` - Email (outline)

#### Navigation Icons

- `arrow_next.svg` - Next arrow
- `arrow_before.svg` - Previous arrow
- `arrow_diagonal_forward.svg` - Diagonal forward arrow
- `arrow_diagonal_before.svg` - Diagonal back arrow
- `arrow_circle_right.svg` - Circle right arrow
- `arrow_circle_fill_left.svg` - Filled circle left arrow
- `arrow_circle_fill_right.svg` - Filled circle right arrow

#### UI State Icons

- `Property 1=hambuger.svg` - Menu hamburger
- `Property 1=close.svg` - Close icon
- `State=Active.svg` - Active state indicator
- `State=Unactive.svg` - Inactive state indicator
- `pencil_line.svg` - Edit/pencil icon

### Icon Usage Pattern

**Direct Reference Method** (Recommended):

```svelte
<img src="/icons/insta_fill_white.svg" alt="Instagram" class="h-8 w-8" />
```

**Link Wrapper for Clickable Icons**:

```svelte
<a
	href="https://instagram.com"
	target="_blank"
	rel="noopener noreferrer"
	class="transition-opacity hover:opacity-70"
	aria-label="Instagram"
>
	<img src="/icons/insta_fill_white.svg" alt="Instagram" class="h-8 w-8" />
</a>
```

### Icon Naming Convention

**Pattern**: `{name}_{variant}_{color?}.svg`

- **Base name**: Describes function (e.g., `insta`, `arrow`, `call`)
- **Variant**: Style type (`fill`, `line`, `circle`, `diagonal`)
- **Color suffix** (optional): `_white` for white variants

**Examples:**

- `insta_fill.svg` → Instagram filled icon (default color)
- `insta_fill_white.svg` → Instagram filled icon (white)
- `arrow_circle_right.svg` → Arrow in circle, pointing right

### Icon Import Strategy

**Static Serving Only**: No JavaScript imports required

- No icon component wrapper needed
- No sprite sheet generation
- Direct file path references

---

## 6. Styling Approach

### CSS Methodology

**Hybrid Approach**: TailwindCSS utility classes + Scoped component styles

#### Primary: TailwindCSS Utilities

Used for layout, spacing, responsive design, colors:

```svelte
<div class="flex items-center justify-center gap-3">
	<h2 class="text-h7 tablet:text-h6 text-primary">Title</h2>
</div>
```

#### Secondary: Scoped Component Styles

Used for complex animations, 3D effects, custom behaviors:

```svelte
<style>
	.flip-card {
		position: relative;
		width: 100px;
		height: 140px;
		perspective: 300px;
	}

	@keyframes flipDown {
		0% {
			transform: rotateX(0deg);
		}
		100% {
			transform: rotateX(-180deg);
		}
	}
</style>
```

### Global Styles

**Location**: [src/app.css](src/app.css)

**Imported in Layout**: `+layout.svelte` imports `../app.css`

**Contents:**

1. Tailwind import: `@import "tailwindcss"`
2. Global cursor reset: `* { cursor: none !important; }`
3. Theme tokens: `@theme { ... }`
4. Typography utility classes (mobile/PC separated)

### Responsive Design Implementation

#### Mobile-First Approach

Base styles target mobile (0-959px), then scale up:

```svelte
<!-- Mobile: text-b1 (16px), Tablet+: text-b1 (20px) --><p class="text-b1">Content</p>
```

#### Explicit Breakpoint Classes

Use prefixes for tablet/desktop overrides:

```svelte
<div class="px-4 tablet:px-6 desktop:px-8">
	<h1 class="text-h1 tablet:text-h0">Title</h1>
</div>
```

#### Typography Classes System

**Mobile Classes**: `.text-mobile-h0` through `.text-mobile-b3`
**PC Classes**: `.text-pc-h0` through `.text-pc-b3` (apply at ≥960px)

**Automatic Responsive Typography** (Custom Classes):

```css
/* Mobile first in @theme */
--font-size-h0: 7.5rem;

/* PC override at 960px+ */
@media (min-width: 960px) {
	.text-pc-h0 {
		font-size: var(--font-size-h0-tablet); /* 18.75rem */
	}
}
```

#### Grid Responsive Pattern

```svelte
<div class="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3">
	<!-- Auto-responsive grid -->
</div>
```

### Styling Best Practices

1. **Utility-First**: Prefer Tailwind utilities over custom CSS
2. **Component-Scoped Animations**: Use `<style>` blocks for keyframes
3. **Consistent Spacing**: Use Tailwind spacing scale (`gap-3`, `px-4`, etc.)
4. **Typography Tokens**: Use custom typography classes (`text-h1`, `text-b1`)
5. **Color Tokens**: Use `text-primary`, `bg-primary` for brand color

---

## 7. Project Structure

### Directory Organization

```
khvd-2025/
├── src/
│   ├── app.css                    # Global styles + design tokens
│   ├── app.html                   # HTML template
│   ├── app.d.ts                   # TypeScript app types
│   ├── hooks.server.ts            # Server-side hooks (auth)
│   │
│   ├── lib/                       # Shared code
│   │   ├── components/            # Reusable components
│   │   │   ├── CustomCursor.svelte
│   │   │   ├── FlipClock.svelte
│   │   │   └── Footer.svelte
│   │   ├── assets/                # Imported assets
│   │   │   └── teaser.png
│   │   ├── auth.ts                # Authentication utilities
│   │   └── config.ts              # Exhibition configuration
│   │
│   └── routes/                    # File-based routing
│       ├── +layout.svelte         # Root layout
│       ├── +page.svelte           # Home page (/)
│       ├── teaser/
│       │   └── +page.svelte       # Teaser page (/teaser)
│       ├── exhibition/
│       │   ├── +page.svelte       # Exhibition main (/exhibition)
│       │   └── works/
│       │       ├── +page.svelte   # Works listing (/exhibition/works)
│       │       └── [slug]/
│       │           └── +page.svelte  # Work detail (/exhibition/works/[slug])
│       └── admin/
│           ├── +page.svelte       # Admin dashboard (/admin)
│           ├── login/
│           │   └── +page.svelte   # Login page (/admin/login)
│           └── logout/
│               └── +server.ts     # Logout API (/admin/logout)
│
├── static/                        # Static assets
│   ├── icons/                     # SVG icons
│   ├── logo.svg
│   ├── logo_white.svg
│   └── teaser.png
│
├── .claude/                       # Claude AI configuration
│   └── design-system-rules.md    # This document
│
├── .vscode/                       # VSCode settings
│
├── svelte.config.js               # SvelteKit configuration
├── vite.config.ts                 # Vite configuration
├── tsconfig.json                  # TypeScript configuration
├── postcss.config.js              # PostCSS configuration
├── eslint.config.js               # ESLint configuration
├── .prettierrc                    # Prettier configuration
├── package.json                   # Dependencies
└── CLAUDE.md                      # Project documentation
```

### Routing Patterns

#### Public Routes

- `/` - Home page
- `/teaser` - Teaser page (date-restricted)
- `/exhibition` - Exhibition main page
- `/exhibition/works` - Works listing
- `/exhibition/works/[slug]` - Individual work detail

#### Protected Routes (Auth Required)

- `/admin` - Admin dashboard
- `/admin/login` - Login page
- `/admin/logout` - Logout endpoint (POST)

#### Route File Conventions

- `+page.svelte` - Page component (client + server)
- `+layout.svelte` - Layout wrapper for nested routes
- `+server.ts` - API endpoint (server-only)
- `+page.ts` - Page data loading (client + server)
- `+page.server.ts` - Page data loading (server-only)
- `[slug]/` - Dynamic route parameter

### Feature Organization Pattern

**Domain-Based Grouping**: Features grouped by route domain

- Exhibition features → `routes/exhibition/`
- Admin features → `routes/admin/`
- Shared components → `lib/components/`
- Shared utilities → `lib/`

### Import Alias

**`$lib/`**: Alias for `src/lib/` directory

```typescript
import Footer from '$lib/components/Footer.svelte';
import { EXHIBITION_CONFIG } from '$lib/config';
```

---

## 8. Figma Integration Guidelines

### Design Token Mapping

#### When Converting Figma Designs to Code:

**Colors:**

- Primary brand color in Figma → Use `text-primary` or `bg-primary`
- Custom colors → Add to `@theme { --color-{name}: #hex; }` in `app.css`

**Typography:**
| Figma Size (Mobile) | Figma Size (PC) | CSS Class | Font |
|---------------------|-----------------|-----------|------|
| 120px | 300px | `text-mobile-h0` / `text-pc-h0` | Bebas Neue |
| 56px | 210px | `text-mobile-h1` / `text-pc-h1` | Bebas Neue |
| 48px | 132px | `text-mobile-h2` / `text-pc-h2` | Bebas Neue |
| 40px | 120px | `text-mobile-h3` / `text-pc-h3` | Bebas Neue |
| 32px | 100px | `text-mobile-h4` / `text-pc-h4` | Bebas Neue |
| 28px | 60px | `text-mobile-h5` / `text-pc-h5` | Bebas Neue |
| 24px | 52px | `text-mobile-h6` / `text-pc-h6` | Pretendard |
| 20px | 40px | `text-mobile-h7` / `text-pc-h7` | Pretendard |
| 18px | 32px | `text-mobile-h8` / `text-pc-h8` | Pretendard |
| - | 28px | `text-pc-h9` | Pretendard |
| - | 24px | `text-pc-h10` | Pretendard |
| 16px | 20px | `text-mobile-b1` / `text-pc-b1` | Pretendard |
| 15px | 18px | `text-mobile-b2` / `text-pc-b2` | Pretendard |
| 14px | 15px | `text-mobile-b3` / `text-pc-b3` | Pretendard |

**Spacing:**

- Use Tailwind spacing scale: `gap-{n}`, `px-{n}`, `py-{n}`, `space-{n}`
- Common values: 2, 3, 4, 6, 8, 12, 16

**Breakpoints:**
| Figma Frame | CSS Class Prefix | Breakpoint |
|-------------|------------------|------------|
| Extra Small Mobile (0-420px) | (none) | Default |
| Mobile (421-959px) | `xs:` | ≥421px |
| Tablet (960-1350px) | `tablet:` | ≥960px |
| Desktop (1351px+) | `desktop:` | ≥1351px |

### Component Generation Workflow

1. **Analyze Figma Design**
   - Identify reusable components
   - Map typography to CSS classes
   - Note animations/interactions

2. **Create Component File**
   - Location: `src/lib/components/{ComponentName}.svelte`
   - Use TypeScript: `<script lang="ts">`
   - Define props with types

3. **Implement Responsive Design**
   - Mobile-first base styles
   - Add `tablet:` and `desktop:` modifiers
   - Use custom typography classes

4. **Add to Component Library**
   - Export from component directory
   - Document in CLAUDE.md
   - Add usage examples

### Asset Export from Figma

**Icons:**

- Export as SVG
- Naming: `{name}_{variant}_{color?}.svg`
- Location: `static/icons/`
- Optimization: Remove unnecessary attributes

**Images:**

- Export as PNG (or WebP for photos)
- Naming: descriptive kebab-case
- Location: `static/` or `static/images/`
- Optimization: Use appropriate compression

**Logos:**

- Export as SVG for scalability
- Provide color variants (black, white)
- Location: `static/`

### Code Generation Best Practices

1. **Use Semantic HTML**
   - Proper heading hierarchy (h1-h6)
   - Accessible markup (aria-labels, alt text)
   - Semantic tags (header, nav, main, footer)

2. **Maintain Design System Consistency**
   - Use existing tokens and classes
   - Don't create redundant utilities
   - Follow established patterns

3. **Responsive Design**
   - Mobile-first approach (extra small mobile default)
   - Test at all breakpoints (421px, 960px, 1351px)
   - Use responsive typography classes

4. **Performance Considerations**
   - Minimize custom CSS
   - Use TailwindCSS utilities
   - Optimize assets before import

5. **TypeScript Integration**
   - Define prop interfaces
   - Use strict typing
   - Leverage TypeScript for safety

---

## 9. Code Examples

### Creating a New Component

```svelte
<!-- src/lib/components/ExampleCard.svelte -->
<script lang="ts">
	// Props with TypeScript types
	let {
		title,
		description,
		imageUrl
	}: {
		title: string;
		description: string;
		imageUrl: string;
	} = $props();

	// State management
	let isHovered = $state(false);
</script>

<div
	class="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105"
	onmouseenter={() => (isHovered = true)}
	onmouseleave={() => (isHovered = false)}
>
	<img src={imageUrl} alt={title} class="w-full h-48 object-cover rounded-md mb-4" />
	<h3 class="text-mobile-h7 tablet:text-pc-h8 font-bold text-primary mb-2">{title}</h3>
	<p class="text-mobile-b2 tablet:text-pc-b2">{description}</p>
</div>
```

### Using Animation with svelte-motion

```svelte
<script>
	import { Motion } from 'svelte-motion';
</script>

<Motion
	initial={{ opacity: 0, y: 20 }}
	animate={{ opacity: 1, y: 0 }}
	transition={{ duration: 0.5, ease: 'easeOut' }}
	whileHover={{ scale: 1.05 }}
	whileTap={{ scale: 0.95 }}
>
	<button class="bg-primary text-white px-6 py-3 rounded-full"> Click Me </button>
</Motion>
```

### Responsive Layout Pattern

```svelte
<div class="container mx-auto px-4 tablet:px-6 desktop:px-8">
	<!-- 1 column mobile, 2 tablet, 3 desktop -->
	<div class="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-6">
		<!-- Grid items -->
	</div>
</div>
```

### Typography Usage

```svelte
<!-- Hero heading -->
<h1 class="text-mobile-h0 tablet:text-pc-h0 text-primary">KHVD 2025</h1>

<!-- Section heading -->
<h2 class="text-mobile-h2 tablet:text-pc-h3 font-display">Exhibition</h2>

<!-- Body text -->
<p class="text-mobile-b1 tablet:text-pc-b1 max-w-prose">
	This is body text that automatically scales from 16px on mobile to 20px on PC screens.
</p>

<!-- Small caption -->
<span class="text-mobile-b3 tablet:text-pc-b3 text-gray-600"> Last updated: 2025-10-15 </span>
```

---

## 10. Quick Reference Checklists

### Before Implementing a Figma Design:

- [ ] Identify all typography sizes and map to CSS classes
- [ ] List all colors and check if primary brand color is used
- [ ] Note all breakpoints (mobile, tablet, desktop)
- [ ] Identify reusable components vs. page-specific elements
- [ ] Check for animations/transitions in Figma prototype
- [ ] Export all necessary assets (icons, images) with correct naming
- [ ] Review existing components for reusability

### Component Creation Checklist:

- [ ] File created in `src/lib/components/{Name}.svelte`
- [ ] TypeScript enabled with `<script lang="ts">`
- [ ] Props defined with proper types
- [ ] Mobile-first responsive classes used
- [ ] Custom typography classes applied
- [ ] Semantic HTML structure
- [ ] Accessibility attributes added (aria-labels, alt text)
- [ ] Component documented in CLAUDE.md
- [ ] Usage example provided

### Asset Import Checklist:

- [ ] Icons exported as SVG
- [ ] Icons follow naming convention
- [ ] Icons placed in `static/icons/`
- [ ] Images optimized for web
- [ ] Images placed in `static/` or `static/images/`
- [ ] Alt text planned for all images
- [ ] Responsive sizing considered

---

## 11. Common Patterns

### Clickable Card with Hover Effect

```svelte
<a href="/exhibition/works/example" class="block group">
	<div class="transition-transform group-hover:scale-105">
		<img src="/work-image.jpg" alt="Work Title" class="w-full" />
		<h3 class="text-mobile-h7 tablet:text-pc-h8 mt-4">Work Title</h3>
	</div>
</a>
```

### Icon Button

```svelte
<button class="flex items-center gap-2 transition-opacity hover:opacity-70" aria-label="Previous">
	<img src="/icons/arrow_before.svg" alt="" class="h-6 w-6" />
	<span class="text-mobile-b2">Previous</span>
</button>
```

### Responsive Container

```svelte
<div class="mx-auto max-w-[1920px] px-4 tablet:px-6 desktop:px-8">
	<!-- Content constrained to max width with responsive padding -->
</div>
```

### Grid Gallery

```svelte
<div class="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-4 tablet:gap-6">
	{#each works as work}
		<div class="aspect-square bg-gray-200">
			<img src={work.image} alt={work.title} class="w-full h-full object-cover" />
		</div>
	{/each}
</div>
```

---

## 12. Troubleshooting

### Typography Not Scaling Correctly

**Issue**: Text doesn't resize at breakpoints
**Solution**: Ensure using `.text-mobile-{level}` and `.text-pc-{level}` classes, or use responsive utilities like `text-mobile-h1 tablet:text-pc-h0`

### Custom Cursor Not Appearing

**Issue**: Default cursor still visible
**Solution**: Verify `app.css` import in `+layout.svelte` and check `* { cursor: none !important; }` is present

### Icon Not Displaying

**Issue**: Icon path returns 404
**Solution**: Check file exists in `static/icons/` and path starts with `/` (e.g., `/icons/name.svg`)

### Responsive Classes Not Working

**Issue**: `xs:`, `tablet:` or `desktop:` prefixes don't apply
**Solution**: Verify breakpoint tokens in `@theme` are correct (421px, 960px, 1351px) and PostCSS is processing Tailwind

### Animation Jank/Stuttering

**Issue**: Animations not smooth
**Solution**: Use `transform` and `opacity` for animations, add `will-change` if needed, check for layout thrashing

---

## 13. Version Control

**Last Updated**: 2025-10-15
**Project Version**: 0.0.1
**TailwindCSS Version**: v4.1.14 (Beta)
**SvelteKit Version**: 2.0
**Svelte Version**: 5.0

### Changelog

- **2025-10-15**: Initial design system rules documentation created
- Typography system documented (mobile + PC separation)
- Component library documented (CustomCursor, FlipClock, Footer)
- Asset management guidelines established
- Icon system catalogued
- Responsive design patterns documented

---

## 14. Additional Resources

- **Project Documentation**: [CLAUDE.md](../CLAUDE.md)
- **SvelteKit Docs**: https://kit.svelte.dev/docs
- **Svelte 5 Docs**: https://svelte-5-preview.vercel.app/docs
- **TailwindCSS v4**: https://tailwindcss.com/blog/tailwindcss-v4-beta
- **svelte-motion**: https://www.npmjs.com/package/svelte-motion

---

**End of Design System Rules**
