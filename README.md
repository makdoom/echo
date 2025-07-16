# Echo - Full Stack Application

This is a modern full-stack application built with Turborepo, featuring a React frontend and Node.js backend.

## Project Structure

This monorepo contains the following apps and packages:

### Apps

- `frontend`: A React application built with Vite and TypeScript
- `backend`: A Node.js API server built with Express and TypeScript

### Packages

- `@repo/eslint-config`: Shared ESLint configurations
- `@repo/typescript-config`: Shared TypeScript configurations

## Getting Started

### Prerequisites

- Node.js (>= 18)
- pnpm

### Installation

```bash
pnpm install
```

### Development

To run both frontend and backend in development mode:

```bash
pnpm dev
```

To run individual apps:

```bash
# Frontend only
pnpm --filter run frontend dev

# Backend only
pnpm --filter run backend dev
```

### Building

To build all apps:

```bash
pnpm build
```

To build individual apps:

```bash
# Frontend only
pnpm --filter run frontend build

# Backend only
pnpm --filter run backend build
```

### Linting

To lint all packages:

```bash
pnpm lint
```

### Type Checking

To check TypeScript types:

```bash
pnpm check-types
```

## Development Workflow

### Frontend (React + Vite)

- Location: `apps/frontend`
- Framework: React 19 with Vite
- Language: TypeScript
- Dev server: `http://localhost:5173`

### Backend (Node.js + Express)

- Location: `apps/backend`
- Framework: Express.js
- Language: TypeScript
- Dev server: `http://localhost:5000`
- API endpoints:
  - `GET /` - Welcome message
  - `GET /api/health` - Health check

### Shared Configuration

Both frontend and backend projects use shared configurations:

- **ESLint**: Consistent code linting rules
- **TypeScript**: Common TypeScript configuration

## Scripts

- `pnpm dev` - Start development servers
- `pnpm build` - Build all apps
- `pnpm lint` - Lint all packages
- `pnpm check-types` - Type check all packages
- `pnpm format` - Format code with Prettier

## Tech Stack

- **Frontend**: React, Vite, TypeScript
- **Backend**: Node.js, Express, TypeScript
- **Tooling**: Turborepo, ESLint, Prettier
- **Package Manager**: pnpm
