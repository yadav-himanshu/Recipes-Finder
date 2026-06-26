# CookMom 🍳

CookMom is a professional-grade, high-performance Recipe Finding application built with React.js and the Edamam API. It features a modern "Soft UI" design system, global state management for favorites and shopping lists, and advanced nutritional analytics.

It has been optimized to achieve a **90+ Lighthouse Performance score** and a seamless, mobile-first native-app feel.

---

## ✨ Features

* **🔍 Smart Search**: High-performance debounced search with persistent recent history dropdown.
* **📊 Nutrition Dashboard**: Visual macro breakdown (Protein, Carbs, Fat) with progress bars for every recipe.
* **🥗 Advanced Filters**: Filter by cuisine type or dietary needs (Vegan, Gluten-Free, Low-Carb, Paleo, etc.) with clean, responsive pills.
* **🛒 Shopping List**: Save ingredients directly into a persistent shopping list with trash deletion and check confirmations.
* **❤️ Favorites**: Curate your collection of recipes with instant local persistence and zero-layout-flash lazy state initialization.
* **📱 Mobile-First Design**: Dedicated native-feel bottom navigation with active page dot indicators, count badges, and stable tap targets (no layout shifts).
* **🎥 YouTube Integration**: Quick access to video tutorials for every dish.
* **🖨️ Pro-Mode**: Shareable links and a dedicated print layout for cooking in the kitchen.

---

## ⚡ Performance & SEO Optimizations (Lighthouse 90+)

* **Route Lazy Loading**: Implemented code splitting using `React.lazy` and `React.Suspense` to load pages dynamically, reducing the initial bundle load to under **10 KB**.
* **Rollup Chunk Splitting**: Custom manual boundaries in `vite.config.js` split major packages (React, React DOM, React Router DOM, Lucide Icons) into separate vendor assets to maximize caching.
* **Stable Layout (CLS & LCP)**: Added `fetchPriority="high"` on page-banner images to speed up Largest Contentful Paint, and established rigid container dimensions for all images to prevent layout shifts.
* **Dynamic SEO Tags**: Programmed automated title tags and meta descriptions updating reactively based on searches, page loads, and active recipes.
* **React Development Health**: Cleaned up React DOM warnings (such as spreading custom attributes like `fetchPriority` to satisfy JSX schema checks).

---

## 🛠️ Tech Stack

* **Core**: React 18, Vite
* **Styling**: Tailwind CSS, DaisyUI (Custom Soft UI Theme)
* **Icons**: Lucide React
* **Notifications**: React Hot Toast
* **API**: Edamam Recipe Search API
* **State Management**: React Context API & Custom Hooks
* **Persistence**: LocalStorage API

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root:
   ```env
   VITE_EDAMAM_API_URL=https://api.edamam.com/api/recipes/v2
   VITE_APP_ID=your_id_here
   VITE_APP_KEY=your_key_here
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```text
src/
  ├── components/       # Reusable UI, layout & recipe components
  │    ├── layout/      # Sidebar navigation, MobileNav, and Page Layout
  │    ├── recipe/      # Nutrition snapshots and Recipe Card items
  │    └── ui/          # Category filter pills and Search inputs
  ├── context/          # State management (Favorites, Shopping List)
  ├── hooks/            # Custom React hooks (useDebounce, useRecentSearches)
  ├── pages/            # Page layouts (Discover, Details, List, About)
  ├── services/         # Edamam API service endpoints
  ├── App.jsx           # Main router & lazy suspense entrypoint
  ├── index.css         # Global styling system & tailwind configuration
  └── main.jsx          # React app DOM bootstrap
```
