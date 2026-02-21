# Syncnode - Crypto Wallet Connection Platform

## Overview

Syncnode (branded as "Vaultlink") is a crypto wallet connection dApp landing page built with React and Vite. It presents itself as a decentralized protocol for syncing wallets to dApps. The application has three main pages: a landing/home page, a wallet selection page, and a connection page.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend (Client-Only)
- **Framework**: React 18 with JSX, bundled by Vite 5
- **Routing**: Wouter (lightweight client-side router) with three routes: `/`, `/select-wallet`, `/connect`
- **Styling**: Tailwind CSS with CSS variables for theming (dark space theme with cyan/purple accents), using shadcn/ui component library
- **State Management**: TanStack React Query for server state, React Hook Form with Zod validation for forms
- **Animations**: Framer Motion for page transitions and UI animations
- **UI Components**: Full shadcn/ui component set in `src/components/ui/`
- **Path aliases**: `@/` maps to `src/`
- **Firebase**: Client-side integration for wallet data storage (config in `src/lib/firebase.ts`)

### Project Structure
```
src/
  App.jsx              - Main app with routing
  main.jsx             - Entry point
  index.css            - Global styles and Tailwind
  components/
    Navbar.jsx         - Navigation bar
    Footer.jsx         - Footer component
    FeatureCard.jsx    - Feature card component
    ui/                - shadcn/ui components
  hooks/               - Custom React hooks
  lib/                 - Utility libraries (queryClient, firebase, utils)
  pages/
    Home.jsx           - Landing page
    SelectWallet.jsx   - Wallet selection page
    Connect.jsx        - Wallet connection page
    not-found.jsx      - 404 page
```

### Build & Dev
- **Dev**: `npm run dev` runs Vite dev server on port 5000
- **Build**: `vite build` outputs to `dist/`

### Key NPM Packages
- `firebase`: Client-side Firestore integration
- `@tanstack/react-query`: Async state management
- `react-hook-form` + `@hookform/resolvers`: Form handling with Zod validation
- `framer-motion`: Animations
- `wouter`: Client-side routing
- `shadcn/ui` components (Radix UI primitives + Tailwind)
- `qrcode.react`: QR code generation
- `recharts`: Charts library

## Recent Changes
- Fixed missing lucide-react icon imports in Home.jsx (ShoppingBag, Fuel, Store, RefreshCw, Key, Bug, Repeat, Share2, UserCheck)
- Updated vite.config.js to use `allowedHosts: true` for Replit compatibility