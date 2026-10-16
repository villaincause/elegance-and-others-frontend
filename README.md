# Elegance & Others – Frontend

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

This repository contains the **frontend** of the *Elegance & Others* e‑commerce store, built with **React**, **TypeScript**, and **Vite**. It consumes the backend API, displays products, handles authentication, shopping cart, checkout, and fetches all images from **Cloudinary**.

🔗 **Live site:** <https://elegance-and-others.onrender.com>

## Features
- Product listing, detail pages, recommendations, and search.
- User authentication (login / register) with JWT.
- Shopping cart persisted in local storage.
- Checkout flow with address management.
- Images served directly from Cloudinary via a small helper (`getImageUrl`).
- Responsive design using Tailwind CSS.

## Quick Start (local development)

```bash
# 1️⃣ Clone the repo
git clone https://github.com/villaincause/elegance-and-others-frontend.git
cd elegance-and-others-frontend

# 2️⃣ Install dependencies
npm install

# 3️⃣ Set environment variables
# Create a .env file in the root (Vite uses the VITE_ prefix)
cat > .env <<EOF
VITE_API_URL=http://localhost:5000   # local backend for dev
# When deploying, Render will replace this automatically
EOF

# 4️⃣ Run the dev server
npm run dev   # Vite starts on http://localhost:5173
```

The app will automatically proxy API calls to the URL defined in `VITE_API_URL`.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Starts Vite development server (hot‑reload). |
| `npm run build` | Builds the production assets into `dist/`. |
| `npm run preview` | Serves the built app locally for testing. |
| `npm test` | Placeholder – add your test suite here. |

## Project Structure (high‑level)
```
src/
├─ components/            # Reusable UI components (ProductCard, SearchOverlay, etc.)
├─ pages/                 # Page‑level components (Shop, ProductDetail, Cart, Profile)
├─ utils/                 # Helper functions (imageUrl.ts, …)
├─ config/api.ts          # Centralised API base URL (uses VITE_API_URL)
├─ App.tsx                # Router and global layout
└─ main.tsx               # Vite entry point
```

All fetch calls now go through `API_BASE_URL` (from `config/api.ts`) and image URLs are resolved with `getImageUrl`, which points to Cloudinary when deployed.

## Deployment (Render – Static Site)

1. **Create a Static Site** in Render and link this repository.
2. **Build command**: `npm install && npm run build`
3. **Publish directory**: `dist`
4. **Environment Variable**: `VITE_API_URL=https://elegance-and-others-backend.onrender.com`
5. After the initial deployment, add a **Redirect/Rewrites** rule (Rewrite `/*` → `/index.html`) so React Router works on page refresh.

The static site will be available at the URL shown at the top of this file.

---

© 2024‑2026 Elegance & Others – Open‑source under the MIT License.