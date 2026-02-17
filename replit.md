# Syncnode - Crypto Wallet Connection Platform

## Overview

Syncnode is a crypto wallet connection dApp built with a React frontend and Express backend. It presents itself as a decentralized protocol for syncing wallets to dApps. The application has three main pages: a landing/home page, a wallet selection page (listing 40+ popular crypto wallets), and a connection page where users can submit wallet details. Wallet data is saved to both a PostgreSQL database (via the Express API) and Firebase Firestore (directly from the client).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript, bundled by Vite
- **Routing**: Wouter (lightweight client-side router) with three routes: `/`, `/select-wallet`, `/connect`
- **Styling**: Tailwind CSS with CSS variables for theming (dark space theme with cyan/purple accents), using shadcn/ui component library (new-york style)
- **State Management**: TanStack React Query for server state, React Hook Form with Zod validation for forms
- **Animations**: Framer Motion for page transitions and UI animations
- **UI Components**: Full shadcn/ui component set in `client/src/components/ui/`
- **Path aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

### Backend
- **Framework**: Express 5 on Node.js, TypeScript executed via tsx
- **API Structure**: Single REST endpoint `POST /api/wallets` for creating wallet records
- **Route definitions**: Shared route contracts in `shared/routes.ts` using Zod schemas
- **Dev server**: Vite dev server integrated as Express middleware (HMR via `server/vite.ts`)
- **Production**: Static files served from `dist/public`, server bundled to `dist/index.cjs` via esbuild

### Data Storage
- **PostgreSQL**: Primary database via Drizzle ORM with `node-postgres` driver
  - Schema defined in `shared/schema.ts` with a single `wallets` table (id, walletName, phrase, createdAt)
  - Migrations managed via `drizzle-kit push` (schema push approach, not migration files)
  - Connection requires `DATABASE_URL` environment variable
- **Firebase Firestore**: Client-side direct writes to a `wallets` collection via the `useCreateWallet` hook in `client/src/hooks/use-wallets.ts`
  - Firebase config is hardcoded in `client/src/lib/firebase.ts`
  - The client hook writes to Firebase, while the server route writes to PostgreSQL

### Database Schema
Single table:
```
wallets:
  - id: serial primary key
  - wallet_name: text (not null)
  - phrase: text (not null)  
  - created_at: timestamp (default now)
```

### Build System
- **Dev**: `tsx server/index.ts` runs the server with Vite middleware for HMR
- **Build**: Custom `script/build.ts` runs Vite build for client, esbuild for server
- **Output**: Client assets to `dist/public/`, server bundle to `dist/index.cjs`

### Key Design Patterns
- Shared schema and route definitions between client and server in `shared/` directory
- Storage interface pattern (`IStorage` interface in `server/storage.ts`) for database abstraction
- Dual data persistence: Firebase from client, PostgreSQL from server API
- The Connect page has two modes: "auto" (designed to fail with an error toast) and "manual" (form submission that saves to Firebase)

## External Dependencies

### Database
- **PostgreSQL**: Required, connected via `DATABASE_URL` environment variable. Used with Drizzle ORM for server-side wallet storage.

### Firebase
- **Firebase Firestore**: Client-side integration for wallet data storage
  - Project: `mmnjj-6255d`
  - Used via `firebase` npm package (initializeApp, getFirestore, addDoc, collection)
  - Config hardcoded in `client/src/lib/firebase.ts`

### Key NPM Packages
- `drizzle-orm` + `drizzle-kit`: ORM and schema management for PostgreSQL
- `drizzle-zod`: Generate Zod schemas from Drizzle table definitions
- `express` v5: HTTP server
- `@tanstack/react-query`: Async state management
- `react-hook-form` + `@hookform/resolvers`: Form handling with Zod validation
- `framer-motion`: Animations
- `wouter`: Client-side routing
- `shadcn/ui` components (Radix UI primitives + Tailwind)
- `connect-pg-simple`: PostgreSQL session store (available but session auth not currently implemented)

### Fonts (External CDN)
- Google Fonts: Outfit, Inter, DM Sans, Fira Code, Geist Mono, Architects Daughter