# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project summary
- Monorepo with frontend (React + CRA) and backend (Node.js + Express + MongoDB). Frontend is more complete; backend currently includes models and an auth route but is missing the entry server file.

Core workflows
- Backend
  - Install deps: cd backend && npm install
  - Run dev: cd backend && npm run dev
  - Run prod: cd backend && npm start
  - Test: cd backend && npm test
  - Lint: cd backend && npm run lint
  - Format: cd backend && npm run format
  - Single test: cd backend && npx jest path/to/test.spec.js -t "<test name>"
- Frontend
  - Install deps: cd frontend && npm install
  - Start dev server: cd frontend && npm start
  - Build: cd frontend && npm run build
  - Test (watch): cd frontend && npm test
  - Run a single test: cd frontend && npm test -- SomeTestFile.test.tsx
  - Lint: cd frontend && npm run lint
  - Format: cd frontend && npm run format

Environment
- Copy env templates: backend/.env.example -> backend/.env; frontend/.env.example -> frontend/.env. Ensure MONGODB_URI and JWT_SECRET are set for backend.

High-level architecture
- Backend (Node/Express + Mongoose)
  - Models (backend/models): User.js, Product.js, Order.js define schema, indexes, and domain logic.
    - User: auth fields, addresses, wishlist, cart; pre-save password hashing; comparePassword; reset token helpers.
    - Product: catalog details, images, stock, ratings/reviews; text indexes; virtuals for discountPercentage and isLowStock; rating recalculation on save.
    - Order: order items, addresses, paymentInfo, orderStatus lifecycle, shipping, pricing; generated orderNumber; status history; helpers like canBeCancelled.
  - Routes (backend/routes): auth.js wires auth flows (register, login, email verification, password reset, profile, admin user management) and composes middleware protect/restrictTo.
  - Missing/expected pieces: server bootstrap (e.g., server.js/app.js), controllers (e.g., authController), middleware implementations (e.g., auth), config (DB connection, env loading), utilities (logger, email, upload). Scripts in backend/package.json imply server.js as entry.
  - API base path (per README): /api/v1.
- Frontend (React 18 + React Router v6 + Redux Toolkit + MUI)
  - App composition (frontend/src/App.js):
    - Providers: Redux store + redux-persist, MUI ThemeProvider, Toaster.
    - Routing: public routes (/ , /products, /products/:id, /cart, /login, /register); protected user routes (/checkout, /profile, /orders, /orders/track/:orderNumber) via ProtectedRoute; admin routes (/admin, /admin/products, /admin/orders, /admin/users) via AdminRoute.
  - Directory conventions (from README and tree): components/{common,user,admin}, pages/{auth, admin, ...}, services (API clients), contexts, hooks, utils, theme and store (referenced by App.js).

Conventions and notes for agents
- Prefer running commands from repo root and cd into the target app before executing npm scripts.
- On Windows with PowerShell, prefix npx invocations explicitly (e.g., npx jest ...) when needed.
- When adding backend features, first ensure a server entry (server.js) exists that loads env, connects to MongoDB, registers middleware, and mounts routes (e.g., /api/v1/auth from backend/routes/auth.js).
- When creating React components/pages, follow the existing routing and role-guard patterns (ProtectedRoute, AdminRoute) wired in App.js.

Common tasks
- Create missing backend server entry quickly:
  - File: backend/server.js
  - Responsibilities: dotenv config, Mongo connect, app setup (express.json, cors, helmet, morgan, rate-limit), route mounting for /api/v1 (import auth routes and any new ones), error handling, start listener on PORT.
- Wire DB connection:
  - File: backend/config/db.js exporting async connect() using mongoose.connect(process.env.MONGODB_URI).

References from README
- Dev servers: Frontend http://localhost:3000, Backend http://localhost:5000, Admin at /admin.
- Testing commands as above per package.json scripts.

Missing files to unblock
- backend/server.js
- backend/controllers/* (e.g., authController.js)
- backend/middleware/* (e.g., auth.js)
- backend/config/* (e.g., db.js)
If implementing, align names with imports already used (routes/auth.js expects ../controllers/authController and ../middleware/auth).
