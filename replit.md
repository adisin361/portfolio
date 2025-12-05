# Portfolio Website

## Overview

This is a personal portfolio website for Aditya Sinha, a Software Development Engineer. The application showcases professional experience, projects, technical skills, and includes interactive mini-games built with React. It features a modern, dark-themed design with smooth animations and custom cursor effects.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR and optimized builds
- Wouter for lightweight client-side routing (alternative to React Router)
- Single-page application (SPA) architecture with client-side routing

**UI Component System**
- Shadcn/ui component library (New York style) for consistent, accessible UI components
- Radix UI primitives for unstyled, accessible component foundations
- Custom UI components built on top of Radix primitives
- Tailwind CSS v4 (via `@tailwindcss/vite`) for utility-first styling with CSS variables for theming

**State Management & Data Fetching**
- TanStack Query (React Query) for server state management and caching
- React Hook Form with Zod resolvers for form validation
- Local component state using React hooks

**Animation & Interactions**
- Framer Motion for declarative animations and transitions
- Canvas Confetti for celebration effects in games
- Custom cursor implementation with smooth spring physics
- Particle effects system using HTML5 Canvas

**Styling Approach**
- Dark theme as default with custom color tokens
- CSS variables for dynamic theming (defined in `index.css`)
- Custom fonts: Plus Jakarta Sans (sans-serif) and JetBrains Mono (monospace)
- Responsive design with mobile-first approach
- Glass-morphism effects for modern UI aesthetic

### Backend Architecture

**Server Framework**
- Express.js for HTTP server and API routing
- Node.js runtime with ESM module system
- HTTP server created using Node's built-in `http` module for potential WebSocket support

**Development vs Production**
- Development: Vite dev server runs in middleware mode with HMR
- Production: Static files served from `dist/public` directory
- Build process uses both ESBuild (server) and Vite (client) for optimized bundling

**Code Organization**
- Monorepo structure with shared schema between client and server
- TypeScript throughout with path aliases (`@/`, `@shared/`, `@assets/`)
- Separation of concerns: routes, storage interface, and static file serving

**Storage Layer**
- Abstract storage interface (`IStorage`) for potential database swapping
- In-memory storage implementation (`MemStorage`) as default
- Ready for database integration (Drizzle ORM configured for PostgreSQL)

### Data Layer & Type Safety

**Database ORM**
- Drizzle ORM configured for PostgreSQL with schema in `shared/schema.ts`
- Drizzle-Zod for automatic Zod schema generation from database schema
- Migration support with Drizzle Kit (migrations output to `./migrations`)
- Currently using in-memory storage, but ready for PostgreSQL connection

**Type Safety**
- Shared types between frontend and backend via `@shared` path alias
- Zod schemas for runtime validation and type inference
- TypeScript strict mode enabled for maximum type safety
- Form validation using `@hookform/resolvers` with Zod integration

### Build System & Deployment

**Build Configuration**
- Custom build script (`script/build.ts`) that:
  - Bundles server code with ESBuild (outputs to `dist/index.cjs`)
  - Bundles client with Vite (outputs to `dist/public`)
  - Bundles specific server dependencies to reduce cold start times
  - External dependencies remain in `node_modules`

**Development Workflow**
- Separate dev scripts for client and server
- Vite plugin for runtime error overlay in development
- Replit-specific plugins for cartographer and dev banner
- Hot module replacement for instant feedback

**Asset Management**
- Custom Vite plugin (`vite-plugin-meta-images.ts`) for dynamic OpenGraph image meta tags
- Static assets served from `client/public`
- Image imports using Vite's asset handling
- Favicon and OpenGraph images configurable

### Special Features

**Interactive Games**
- Bug Squash Game: Click-based game with timer and scoring
- Typing Speed Game: WPM and accuracy measurement
- Memory Card Game: Card matching with move counting
- All games track high scores and include confetti celebrations

**Performance Optimizations**
- Component-level code splitting ready via React lazy loading
- Debouncing and memoization patterns mentioned in experience
- Query caching with TanStack Query
- Static asset optimization through Vite

**SEO & Meta Tags**
- Dynamic meta tag updates for social media sharing
- OpenGraph and Twitter Card support
- Custom plugin to update image URLs based on deployment domain

## External Dependencies

### UI & Component Libraries
- **Radix UI**: Complete suite of unstyled, accessible component primitives (accordion, dialog, dropdown, popover, tooltip, etc.)
- **Shadcn/ui**: Pre-built components using Radix UI and Tailwind CSS
- **Lucide React**: Icon library for consistent iconography
- **Framer Motion**: Animation library for smooth transitions and interactions
- **Canvas Confetti**: Celebration effects library

### Forms & Validation
- **React Hook Form**: Form state management and validation
- **Zod**: Schema validation library
- **@hookform/resolvers**: Resolvers for integrating Zod with React Hook Form
- **Drizzle-Zod**: Automatic Zod schema generation from Drizzle schemas

### Styling
- **Tailwind CSS v4**: Utility-first CSS framework (via Vite plugin)
- **Class Variance Authority (CVA)**: Component variant management
- **clsx & tailwind-merge**: Conditional class name utilities

### State Management
- **TanStack Query**: Server state management, caching, and synchronization
- **Wouter**: Lightweight routing library (< 2KB alternative to React Router)

### Backend & Database
- **Express**: Web application framework for Node.js
- **Drizzle ORM**: TypeScript ORM for SQL databases
- **PostgreSQL** (pg): Database driver (configured but not actively used with in-memory storage)
- **Connect-PG-Simple**: PostgreSQL session store for Express (configured for future use)

### Build Tools
- **Vite**: Frontend build tool and dev server
- **ESBuild**: Fast JavaScript bundler for server code
- **TypeScript**: Type-safe JavaScript compilation
- **PostCSS**: CSS processing with Autoprefixer

### Development Tools
- **@replit/vite-plugin-runtime-error-modal**: Error overlay for development
- **@replit/vite-plugin-cartographer**: Replit-specific development tooling
- **@replit/vite-plugin-dev-banner**: Development environment banner

### Date & Time
- **date-fns**: Modern date utility library for formatting and manipulation