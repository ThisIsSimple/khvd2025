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
│   │   ├── +page.svelte      # Home page
│   │   └── +layout.svelte    # Root layout
│   ├── lib/             # Shared components and utilities
│   ├── app.html         # HTML template
│   └── app.css          # Global styles with Tailwind
├── static/              # Static assets (fonts, images, etc.)
├── .svelte-kit/         # SvelteKit build output (gitignored)
└── node_modules/        # Dependencies (gitignored)
```

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

Custom font configuration in `src/app.css`:

```css
@theme {
	--font-sans: Pretendard Variable, ... --font-display: Bebas Neue, Impact, sans-serif;
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
