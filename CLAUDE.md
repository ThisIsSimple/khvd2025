# KHVD 2025 Exhibition - Project Documentation

## Overview

Online exhibition platform for university showcase built with modern web technologies.

## Tech Stack

### Core Framework

- **SvelteKit** - Full-stack framework with TypeScript support
- **Svelte 5** - Latest version with modern reactivity system
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server

### Styling & Design

- **TailwindCSS v4** - Utility-first CSS framework (CSS-based configuration)
- **PostCSS** - CSS processing with Autoprefixer
- **Brand Colors**:
  - **Primary Color**: `#FC451E` (Orange-red, used with `text-primary` or `bg-primary`)
- **Custom Responsive Breakpoints**:
  - **Extra Small Mobile**: 0px - 420px (default, no prefix)
  - **Mobile**: 421px - 959px (prefix: `xs:`)
  - **Tablet**: 960px - 1350px (prefix: `tablet:`)
  - **Desktop**: 1351px+ (prefix: `desktop:`)
- **Custom Fonts**:
  - **Pretendard Variable** - Primary Korean/Latin font with variable weight support
  - **Bebas Neue** - Display font for headlines and emphasis

### Animation

- **svelte-motion** - Framer Motion for Svelte
  - Declarative animations
  - Spring physics
  - Gesture support
  - Layout animations

### Image Optimization

- **@sveltejs/enhanced-img** - Automatic image optimization
  - Responsive images
  - Format conversion (WebP, AVIF)
  - Lazy loading
  - Blur placeholder

### Code Quality

- **ESLint** - Linting with TypeScript and Svelte support
- **Prettier** - Code formatting with Svelte plugin
- **TypeScript ESLint** - TypeScript-specific linting rules

## Project Structure

```
khvd-2025/
├── src/
│   ├── routes/          # SvelteKit routes (file-based routing)
│   │   ├── +page.svelte           # Home page
│   │   ├── +layout.svelte         # Root layout
│   │   ├── admin/                 # Admin area (protected)
│   │   │   ├── +page.svelte       # Admin dashboard
│   │   │   ├── login/             # Admin login
│   │   │   └── logout/            # Admin logout
│   │   ├── exhibition/            # Exhibition pages
│   │   │   ├── +page.svelte       # Exhibition main page
│   │   │   └── works/             # Exhibition works
│   │   │       ├── +page.svelte   # Works listing
│   │   │       └── [slug]/        # Individual work detail
│   │   └── teaser/                # Teaser page (date-restricted)
│   │       └── +page.svelte
│   ├── lib/             # Shared components and utilities
│   │   ├── auth.ts      # Authentication utilities
│   │   └── config.ts    # Exhibition configuration
│   ├── hooks.server.ts  # Server hooks for authentication
│   ├── app.d.ts         # TypeScript app types
│   ├── app.html         # HTML template
│   └── app.css          # Global styles with Tailwind
├── static/              # Static assets (fonts, images, etc.)
├── .svelte-kit/         # SvelteKit build output (gitignored)
└── node_modules/        # Dependencies (gitignored)
```

## Route System

### Public Routes

#### Home Page (`/`)

- Landing page with hero section
- Links to exhibition and teaser
- Overview of exhibition features

#### Exhibition Routes (`/exhibition`)

- **`/exhibition`** - Main exhibition page with availability check
- **`/exhibition/works`** - Grid view of all exhibition works
- **`/exhibition/works/[slug]`** - Individual work detail page

#### Teaser Page (`/teaser`)

- **Date-restricted access** based on configuration
- Animated landing page with exhibition countdown
- Available only during teaser period (configured in `$lib/config.ts`)

### Protected Routes

#### Admin Area (`/admin`)

- **Authentication Required**: Username/password: `khvd2025` / `khvd2025`
- **`/admin/login`** - Login page with form authentication
- **`/admin`** - Dashboard with management links
- **`/admin/logout`** - Logout endpoint (POST only)

### Authentication System

**Implementation**: Cookie-based session management
**Protection**: Server-side hooks in `hooks.server.ts`
**Credentials**: Defined in `$lib/auth.ts`

```typescript
// Default credentials (change in production!)
Username: khvd2025;
Password: khvd2025;
```

### Date-Based Access Control

**Configuration** in `src/lib/config.ts`:

```typescript
export const EXHIBITION_CONFIG = {
	// Teaser availability
	teaserStart: new Date('2025-01-01T00:00:00'),
	teaserEnd: new Date('2025-02-01T00:00:00'),

	// Exhibition dates
	exhibitionStart: new Date('2025-02-01T00:00:00'),
	exhibitionEnd: new Date('2025-03-31T23:59:59')
};
```

**Helper Functions**:

- `isTeaserAvailable()` - Check if teaser page should be accessible
- `isExhibitionAvailable()` - Check if exhibition content should be shown

## Configuration Files

### `svelte.config.js`

- SvelteKit configuration
- Vite preprocessing
- Enhanced image optimization
- Adapter configuration

### `vite.config.ts`

- Vite build configuration
- Plugin setup

### `tsconfig.json`

- TypeScript compiler options
- Path aliases
- Type checking settings

### `postcss.config.js`

- TailwindCSS processing
- Autoprefixer

### `eslint.config.js`

- ESLint flat config (ESLint 9+)
- TypeScript rules
- Svelte-specific rules
- Prettier integration

### `.prettierrc`

- Code formatting rules
- Tabs for indentation
- Single quotes
- 100 character line width

## Font Configuration

### Pretendard Variable

- **CDN**: jsDelivr
- **Usage**: Default sans-serif font (class: `font-sans`)
- **Features**: Variable weight, optimized for Korean and Latin
- **Fallbacks**: System fonts for reliability

### Bebas Neue

- **CDN**: Google Fonts
- **Usage**: Display font for headlines (class: `font-display`)
- **Features**: Bold, impactful typography
- **Fallbacks**: Impact, sans-serif

Custom configuration in `src/app.css`:

```css
@theme {
	/* Responsive Breakpoints */
	--breakpoint-xs: 421px; /* Mobile: 421px - 959px */
	--breakpoint-tablet: 960px; /* Tablet: 960px - 1350px */
	--breakpoint-desktop: 1351px; /* Desktop: 1351px+ */

	/* Brand Colors */
	--color-primary: #fc451e; /* Primary brand color (orange-red) */

	/* Font Families */
	--font-sans:
		'Pretendard Variable', Pretendard, ... --font-display: 'Bebas Neue', Impact, sans-serif;
}
```

## Brand Colors

### Primary Color

**`#FC451E`** - Vibrant orange-red used for primary branding elements

**Usage:**

- `text-primary` - Apply primary color to text
- `bg-primary` - Apply primary color to backgrounds
- `border-primary` - Apply primary color to borders

**Example:**

```svelte
<button class="bg-primary text-white">Call to Action</button>
<h2 class="text-primary">Featured Section</h2>
```

## Typography System

The project uses a comprehensive, responsive typography system with **automatic mobile-to-PC scaling**. All typography classes automatically adjust based on screen size without additional responsive prefixes.

### Font Hierarchy

#### Header Levels (H0-H10)

| Level | Font         | Mobile Size | PC Size | Line Height | Weight  | Usage                       |
| ----- | ------------ | ----------- | ------- | ----------- | ------- | --------------------------- |
| **H0** | Bebas Neue   | 120px       | 300px   | 120%        | Regular | Hero titles, main headlines |
| **H1** | Bebas Neue   | 56px        | 210px   | 120%        | Regular | Page titles                 |
| **H2** | Bebas Neue   | 48px        | 132px   | 120%        | Regular | Section headers             |
| **H3** | Bebas Neue   | 40px        | 120px   | 100%        | Regular | Subsection headers          |
| **H4** | Bebas Neue   | 32px        | 100px   | 100%        | Regular | Component headers           |
| **H5** | Bebas Neue   | 28px        | 60px    | 120-130%    | Regular | Small headers               |
| **H6** | Pretendard   | 24px        | 52px    | 100-110%    | Bold    | Card titles                 |
| **H7** | Pretendard   | 20px        | 40px    | 140-160%    | Bold    | Subheadings                 |
| **H8** | Mixed        | 18px        | 32px    | 120-140%    | Regular | Small subheadings           |
| **H9** | Pretendard   | -           | 28px    | 140%        | Regular | PC-only headers             |
| **H10** | Pretendard   | -           | 24px    | 150%        | Regular | PC-only small headers       |

#### Body Text Levels (B1-B3)

| Level | Font         | Mobile Size | PC Size | Line Height | Weight  | Usage                       |
| ----- | ------------ | ----------- | ------- | ----------- | ------- | --------------------------- |
| **B1** | Pretendard   | 16px        | 20px    | 140-150%    | Regular | Main body text, paragraphs  |
| **B2** | Pretendard   | 15px        | 18px    | 150-140%    | Regular | Secondary text, descriptions|
| **B3** | Pretendard   | 14px        | 15px    | 120%        | Regular | Small text, captions        |

### Font Weight Reference

- **`font-regular`** - 400 (normal text)
- **`font-medium`** - 500 (slightly emphasized)
- **`font-semibold`** - 600 (emphasized)
- **`font-bold`** - 700 (strong emphasis)

### Usage Examples

#### Headers with Auto-Responsive Sizing

```svelte
<!-- Automatically responsive: 120px mobile → 300px PC -->
<h1 class="text-h0">KHVD 2025</h1>

<!-- Automatically responsive: 56px mobile → 210px PC -->
<h1 class="text-h1">Exhibition Title</h1>

<!-- Automatically responsive: 48px mobile → 132px PC -->
<h2 class="text-h2">Section Header</h2>

<!-- Mixed fonts with automatic sizing -->
<h6 class="text-h6">Card Title</h6> <!-- Pretendard Bold -->
<h7 class="text-h7">Subheading</h7> <!-- Pretendard Bold -->
```

#### Body Text with Auto-Responsive Sizing

```svelte
<!-- Main body text: 16px mobile → 20px PC -->
<p class="text-b1">
	This is the main body text. It automatically adjusts from 16px on mobile to 20px on PC screens.
</p>

<!-- Secondary text: 15px mobile → 18px PC -->
<p class="text-b2">
	Secondary description text with automatic responsive sizing.
</p>

<!-- Small text/captions: 14px mobile → 15px PC -->
<p class="text-b3">
	Caption or metadata text.
</p>
```

#### Font Weight Combinations

```svelte
<!-- Default weight (regular) -->
<h1 class="text-h1">Regular Weight</h1>

<!-- Override with custom weight -->
<h1 class="text-h1 font-bold">Bold Weight</h1>

<!-- Body text with different weights -->
<p class="text-b1 font-medium">Medium weight paragraph</p>
<p class="text-b1 font-semibold">Semibold emphasis</p>
```

#### Font Family Overrides

```svelte
<!-- Force display font (Bebas Neue) -->
<div class="text-b1 font-display">Display Font Body Text</div>

<!-- Force sans font (Pretendard) -->
<h1 class="text-h1 font-sans">Sans Font Header</h1>
```

### Typography Best Practices

#### 1. Semantic HTML + Typography Classes

```svelte
<!-- Correct: Semantic markup with typography classes -->
<h1 class="text-h0">Main Title</h1>
<h2 class="text-h2">Section Header</h2>
<p class="text-b1">Body paragraph</p>

<!-- Avoid: Wrong semantic tags -->
<div class="text-h1">Title</div> <!-- Use <h1> instead -->
```

#### 2. Consistent Hierarchy

```svelte
<!-- Good: Proper hierarchy -->
<h1 class="text-h1">Page Title</h1>
<h2 class="text-h2">Section 1</h2>
<h3 class="text-h3">Subsection 1.1</h3>
<p class="text-b1">Content</p>

<!-- Avoid: Skipping levels -->
<h1 class="text-h1">Title</h1>
<h4 class="text-h4">Section</h4> <!-- Skipped h2 and h3 -->
```

#### 3. Responsive Considerations

```svelte
<!-- Typography classes are auto-responsive -->
<h1 class="text-h0">Automatic Sizing</h1>

<!-- No need for manual breakpoint overrides -->
<!-- ❌ Don't do this: -->
<h1 class="text-6xl tablet:text-8xl">Manual Sizing</h1>

<!-- ✅ Do this instead: -->
<h1 class="text-h0">Automatic Sizing</h1>
```

#### 4. Accessibility

```svelte
<!-- Maintain proper contrast -->
<h1 class="text-h1 text-primary">Good contrast with white bg</h1>

<!-- Ensure readable line lengths -->
<p class="text-b1 max-w-prose">
	Body text with optimal line length for readability (max-w-prose = ~65 characters)
</p>
```

### Font Pairing Guidelines

#### Display + Body Combinations

```svelte
<!-- Bebas Neue (display) for headers + Pretendard for body -->
<section>
	<h1 class="text-h1">EXHIBITION 2025</h1>
	<p class="text-b1">Explore innovative works from emerging artists.</p>
</section>

<!-- All Pretendard for content-heavy sections -->
<article>
	<h2 class="text-h6">Artist Statement</h2>
	<p class="text-b1">Detailed description...</p>
</article>
```

#### Weight Combinations

```svelte
<!-- Bold header + regular body -->
<div>
	<h3 class="text-h6">Project Title</h3> <!-- Pretendard Bold by default -->
	<p class="text-b1">Project description in regular weight.</p>
</div>

<!-- Create emphasis hierarchy -->
<div>
	<h4 class="text-h7">Section</h4> <!-- Bold -->
	<p class="text-b1 font-medium">Emphasized paragraph</p>
	<p class="text-b2">Supporting text</p>
</div>
```

### Technical Details

#### CSS Variables

All typography tokens are defined in [src/app.css](src/app.css) using CSS custom properties:

```css
/* Mobile-first sizing */
--font-size-h0: 7.5rem; /* 120px */
--font-size-b1: 1rem; /* 16px */

/* PC overrides (≥960px) */
--font-size-h0-tablet: 18.75rem; /* 300px */
--font-size-b1-tablet: 1.25rem; /* 20px */
```

#### Responsive Breakpoints

Typography scales automatically at **960px** (tablet/PC breakpoint):

```css
@media (min-width: 960px) {
	.text-h0 {
		font-size: var(--font-size-h0-tablet); /* 120px → 300px */
	}
	.text-b1 {
		font-size: var(--font-size-b1-tablet); /* 16px → 20px */
	}
}
```

#### Letter Spacing

Optimized letter spacing for better legibility:

- **Large headings** (H0-H4): -0.04em to -0.01em (tighter)
- **Small headings** (H5-H8): Default spacing
- **Body text**: Default spacing

### Quick Reference Table

| Class       | Mobile     | PC        | Font         | Weight  |
| ----------- | ---------- | --------- | ------------ | ------- |
| `text-h0`   | 120px      | 300px     | Bebas Neue   | Regular |
| `text-h1`   | 56px       | 210px     | Bebas Neue   | Regular |
| `text-h2`   | 48px       | 132px     | Bebas Neue   | Regular |
| `text-h3`   | 40px       | 120px     | Bebas Neue   | Regular |
| `text-h4`   | 32px       | 100px     | Bebas Neue   | Regular |
| `text-h5`   | 28px       | 60px      | Bebas Neue   | Regular |
| `text-h6`   | 24px       | 52px      | Pretendard   | Bold    |
| `text-h7`   | 20px       | 40px      | Pretendard   | Bold    |
| `text-h8`   | 18px       | 32px      | Mixed        | Regular |
| `text-h9`   | -          | 28px      | Pretendard   | Regular |
| `text-h10`  | -          | 24px      | Pretendard   | Regular |
| `text-b1`   | 16px       | 20px      | Pretendard   | Regular |
| `text-b2`   | 15px       | 18px      | Pretendard   | Regular |
| `text-b3`   | 14px       | 15px      | Pretendard   | Regular |

## Responsive Design

### Custom Breakpoints

The project uses custom breakpoints tailored for the exhibition platform:

| Breakpoint                       | Range          | Usage                   | Example           |
| -------------------------------- | -------------- | ----------------------- | ----------------- |
| **Extra Small Mobile** (default) | 0px - 420px    | Small mobile devices    | `text-4xl`        |
| **Mobile** (`xs:`)               | 421px - 959px  | Mobile devices          | `xs:text-5xl`     |
| **Tablet** (`tablet:`)           | 960px - 1350px | Tablets, small laptops  | `tablet:text-7xl` |
| **Desktop** (`desktop:`)         | 1351px+        | Large screens, desktops | `desktop:px-8`    |

### Responsive Breakpoint Reference

**Quick Reference:**

- **Extra Small Mobile**: No prefix needed (default, 0-420px)
- **Mobile**: Use `xs:` prefix (≥421px)
- **Tablet**: Use `tablet:` prefix (≥960px)
- **Desktop**: Use `desktop:` prefix (≥1351px)

### Usage Examples

```svelte
<!-- Text sizing across breakpoints -->
<h1 class="text-4xl xs:text-5xl tablet:text-7xl">KHVD 2025</h1>

<!-- Grid layouts -->
<div class="grid grid-cols-1 xs:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3">
	<!-- Content -->
</div>

<!-- Padding adjustments -->
<div class="px-3 xs:px-4 tablet:px-6 desktop:px-8">
	<!-- Content -->
</div>
```

### Migration from Default Tailwind Breakpoints

If you need to add back standard Tailwind breakpoints, you can define them in `app.css`:

```css
@theme {
	--breakpoint-sm: 640px;
	--breakpoint-md: 768px;
	--breakpoint-lg: 1024px;
	--breakpoint-xl: 1280px;
}
```

## Development Workflow

### Development Server

```bash
npm run dev
```

Starts Vite dev server with HMR at http://localhost:5173

### Build for Production

```bash
npm run build
```

Creates optimized production build in `/build`

### Preview Production Build

```bash
npm run preview
```

Preview production build locally

### Type Checking

```bash
npm run check         # One-time check
npm run check:watch   # Watch mode
```

### Code Quality

```bash
npm run format        # Format all files
npm run lint          # Check linting and formatting
npm run lint:fix      # Auto-fix linting issues
```

## Tailwind CSS v4 Usage

### Key Differences from v3

- CSS-based configuration using `@theme` directive
- No separate `tailwind.config.js` needed
- Import Tailwind directly in CSS: `@import 'tailwindcss'`
- Custom tokens defined in CSS custom properties

### Example Usage

```svelte
<h1 class="font-display text-6xl">Exhibition Title</h1>

<p class="font-sans text-lg">Body text in Pretendard</p>
```

## Image Optimization Usage

### Enhanced Image Component

```svelte
<script>
	import { Image } from '@sveltejs/enhanced-img';
	import myImage from '$lib/assets/image.jpg?enhanced';
</script>

<Image src={myImage} alt="Description" />
```

### Features

- Automatic responsive image generation
- Modern format conversion (WebP, AVIF)
- Lazy loading by default
- Blur-up placeholder

## Animation Examples

### Basic Animation

```svelte
<script>
	import { Motion } from 'svelte-motion';
</script>

<Motion
	initial={{ opacity: 0, y: 20 }}
	animate={{ opacity: 1, y: 0 }}
	transition={{ duration: 0.5 }}
>
	<div>Animated content</div>
</Motion>
```

### Hover Animation

```svelte
<Motion whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
	<button>Interactive Button</button>
</Motion>
```

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow Prettier formatting rules (enforced)
- Use ESLint recommended rules
- Component naming: PascalCase
- File naming: kebab-case

### Performance

- Use lazy loading for images
- Code split large routes
- Optimize font loading with preconnect
- Minimize JavaScript bundle size

### Accessibility

- Use semantic HTML
- Include alt text for images
- Maintain proper heading hierarchy
- Ensure keyboard navigation
- Test with screen readers

### Git Workflow

- Keep commits atomic and descriptive
- Test before committing
- Run `npm run lint` before pushing
- Format code before committing

## Known Issues & Solutions

### Enhanced Image Version Conflict

- **Issue**: Peer dependency conflict with @sveltejs/vite-plugin-svelte
- **Solution**: Installed with `--legacy-peer-deps` flag
- **Impact**: None - works as expected

### Tailwind v4 Beta

- **Note**: Using Tailwind CSS v4 (currently in beta)
- **Difference**: CSS-based configuration instead of JS config
- **Documentation**: [Tailwind CSS v4 Beta Docs](https://tailwindcss.com/blog/tailwindcss-v4-beta)

## Resources

### Documentation

- [SvelteKit Docs](https://kit.svelte.dev/docs)
- [Svelte 5 Docs](https://svelte-5-preview.vercel.app/docs)
- [TailwindCSS v4](https://tailwindcss.com/blog/tailwindcss-v4-beta)
- [svelte-motion](https://www.npmjs.com/package/svelte-motion)

### Fonts

- [Pretendard](https://github.com/orioncactus/pretendard)
- [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue)

## Project Setup Summary

This project was set up with the following steps:

1. ✅ SvelteKit initialization with TypeScript
2. ✅ TailwindCSS v4 configuration with PostCSS
3. ✅ ESLint and Prettier setup with Svelte support
4. ✅ svelte-motion installation for animations
5. ✅ Custom font configuration (Pretendard + Bebas Neue)
6. ✅ Enhanced image optimization setup

All configurations tested and working as of setup date.

---

**Last Updated**: October 2025
**Node Version**: Check `package.json` for engine requirements
**Package Manager**: npm
