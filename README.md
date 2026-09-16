# Digital Bloom landing page

Production-ready landing page for Digital Bloom built with React + Vite.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## GitHub Pages deployment notes

- `vite.config.js` sets `base` to `/digital-bloom/` for production builds.
- For custom domain usage later, replace placeholders in `public/` and add a `CNAME` file with `thedigitalbloom.co` when ready.
- Publish the `dist/` output with GitHub Pages (Actions or branch-based deployment).
