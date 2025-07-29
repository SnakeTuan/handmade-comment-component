# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.4.4 project focused on building a modern comment component implementation based on the design patterns from Ahmad Shadeed's article (https://ishadeed.com/article/comment-component/). The project uses React 19, TypeScript, and Tailwind CSS 4.

## Development Commands

```bash
# Start development server with Turbopack
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## Architecture & Implementation Approach

### Comment Component Design Patterns
The comment component should follow these key architectural principles from the reference implementation:

- **Semantic HTML Structure**: Use nested `<ul>` and `<li>` elements for comment hierarchy
- **Modern CSS Techniques**: Leverage CSS custom properties, `:has()` selector, and logical properties
- **Depth-based Styling**: Use CSS variables like `--depth` to control nested comment appearance
- **Connecting Lines**: Implement visual connection lines using pseudo-elements
- **Responsive Design**: Support RTL/LTR languages with CSS logical properties

### Technology Stack
- **Framework**: Next.js 15.4.4 with App Router
- **UI**: Tailwind CSS 4 (using `@import "tailwindcss"` syntax)
- **Components**: Plan to integrate shadcn/ui components
- **Data**: Mock data for demonstration purposes
- **Styling**: CSS custom properties for theming (light/dark mode support)

### Project Structure
```
src/
├── app/
│   ├── layout.tsx    # Root layout with Geist fonts
│   ├── page.tsx      # Main page (currently Next.js default)
│   └── globals.css   # Tailwind import + CSS variables
```

### CSS Architecture
- Uses Tailwind CSS 4 with `@theme inline` configuration
- Custom CSS variables for background/foreground colors
- Dark mode support via `prefers-color-scheme`
- Geist Sans and Geist Mono fonts loaded via Next.js font optimization

### Key Implementation Notes
- The comment component should use flexbox layouts
- Implement dynamic avatar sizing based on comment depth
- Support emoji-only comment detection
- Use mock data to demonstrate nested comment functionality
- Ensure accessibility with proper ARIA attributes and semantic HTML

### Development Workflow
1. Create reusable comment components in `src/components/`
2. Implement mock data structure for nested comments
3. Use shadcn/ui for base UI components (buttons, avatars, etc.)
4. Test responsive behavior across different screen sizes
5. Validate accessibility with screen readers

When working on this project, prioritize semantic HTML structure and modern CSS techniques over complex JavaScript logic. The goal is to create a robust, accessible comment system that showcases advanced CSS capabilities.