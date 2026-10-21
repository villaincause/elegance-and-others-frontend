# Elegance & Others Frontend

[Live Site](https://elegance-and-others.onrender.com)

## Overview
This repository contains the React + Vite frontend for the **Elegance & Others** e‑commerce platform. It provides a responsive UI built with Tailwind CSS, featuring:
- Home page with editorial luxury serif typography.
- Product listing, product detail, cart, checkout flows.
- Reusable CSS classes (`font-editorial`, `font-product-title`, etc.) to keep typography consistent across pages.
- Scrollable QuickView component for quick product previews.

## Tech Stack
- **React** (functional components, hooks)
- **Vite** for fast development and builds
- **Tailwind CSS** for utility‑first styling
- **TypeScript** for type safety

## Local Development
```bash
# install dependencies
yarn install   # or npm install

# start dev server
yarn dev       # or npm run dev
```
The app runs at `http://localhost:5173`.

## Build
```bash
npm run build
```
The production build is output to the `dist/` folder.

## Deployment on Render
1. Create a **Static Site** on Render.
2. Connect the repository and set the **Build Command** to `npm run build`.
3. Set the **Publish Directory** to `dist`.
4. Enable **Auto‑Deploy** for automatic updates on push.
5. Add the custom domain (if any) and click **Save**.

## Environment Variables
| Variable | Description |
|----------|-------------|
| `VITE_BACKEND_URL` | URL of the backend API (e.g., `https://elegance-and-others-backend.onrender.com`). |

## License
MIT © Elegance & Others