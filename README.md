# CookMom 🍳

CookMom is a professional-grade, high-performance Recipe Finding application built with React.js and the Edamam API. It features a modern "Soft UI" design system, global state management for favorites and shopping lists, and advanced nutritional analytics.

## ✨ Features

- **🔍 Smart Search**: High-performance debounced search with persistent recent history.
- **📊 Nutrition Dashboard**: Visual macro breakdown (Protein, Carbs, Fat) for every recipe.
- **🥗 Advanced Filters**: Filter by cuisine or dietary needs (Vegan, Gluten-Free, Low-Carb, etc.).
- **🛒 Shopping List**: Save ingredients directly into a persistent, manageable shopping list.
- **❤️ Favorites**: Curate your own collection of recipes with local persistence.
- **📱 Mobile-First**: Dedicated bottom navigation bar for a native app feel on small screens.
- **🎥 YouTube Integration**: Quick access to video tutorials for every dish.
- **🖨️ Pro-Mode**: Shareable links and a dedicated print layout for cooking in the kitchen.

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS (Custom Soft UI Theme)
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **API**: Edamam Recipe Search API
- **State Management**: React Context API & Custom Hooks
- **Persistence**: LocalStorage API

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

## 📂 Project Structure

- `/src/components`: Modular UI components and layout systems.
- `/src/context`: Global state providers (Shopping List, etc.).
- `/src/hooks`: Custom logic for debouncing, favorites, and storage.
- `/src/pages`: Page-level components.
- `/src/services`: API integration layers.
- `/src/utils`: Helper functions and constants.

---
Built with ❤️ for a modern cooking experience.
