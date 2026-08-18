# Gram Panchayat Bhairpur — Digital Village Platform (Demo)

A premium, modern demo website for a fictional Indian Gram Panchayat, built with React, Vite and Tailwind CSS.

This is a **demo/informational website only** — no forms submit to any real government system.

## Getting Started

```bash
npm install
npm run dev
```

Then open the URL shown in your terminal (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Tech Stack

- React 19 + Vite
- Tailwind CSS v4
- React Router DOM
- Lucide React icons

## Project Structure

```
src/
├── assets/
├── components/
│   ├── layout/   (Navbar, TopBar, Footer)
│   └── ui/       (Button, cards, modal, form pieces, etc.)
├── data/         (realistic demo content for schemes, notices, projects, etc.)
├── layouts/      (MainLayout wraps every route)
├── pages/        (Home + 10 internal pages)
├── utils/
├── App.jsx
├── main.jsx
└── index.css     (design tokens: colors, fonts, animations)
```

## Notes

- All images are sourced from Unsplash at runtime — an internet connection is needed to see them load.
- The Grievance form and Contact form are demo-only; submissions are simulated client-side and generate a fake reference number (e.g. `GP-2026-00124`).
- The map sections use styled placeholders rather than a live Maps embed.

## Dark Mode & Language

- A theme toggle (sun/moon icon) switches between light and dark mode. Preference is saved to `localStorage` and respected on reload; the site also checks the system preference on first visit.
- A language toggle (हिंदी / English) switches all site chrome, navigation, buttons, section headings, page headers, and form text between English and Hindi. Preference is saved to `localStorage`.
- Translation strings live in `src/data/translations.js`. Dynamic dataset content (scheme names/descriptions, notice text, development project details, service descriptions, document/gallery titles, member names) remains in English — only the surrounding site chrome and category/status labels are bilingual.
