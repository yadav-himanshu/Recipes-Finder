# 🍽️ Recipe Explorer App

A modern, responsive **Recipe Explorer** built with **React**, focused on clean architecture, real-world UX patterns, and production-ready frontend practices. Users can search recipes, filter by cuisine, add/remove favorites, and persist data across sessions.

---

## 🔗 Live Demo

👉 *https://recipes-finder-mvec.vercel.app*

---

## ✨ Features

### 🔍 Recipe Discovery

- Search recipes using the **Edamam Recipes API**
- Debounced search to prevent excessive API calls
- Initial recommended recipes on load

### 🎛️ Filters & Pagination

- Filter recipes by **cuisine type** (client-side)
- "Load More" pagination for scalable UI
- Derived state using memoization for performance

### ❤️ Favorites Management

- Add / remove recipes from favorites
- Global state management using **React Context**
- Favorites persist using **localStorage**
- Live favorites count badge in sidebar
- Toast notifications for add/remove actions

### 🎨 UI & UX

- Responsive layout (sidebar on desktop, top navbar on mobile)
- Skeleton loaders for better perceived performance
- Hover effects and micro-interactions
- Empty & error states handled gracefully

---

## 🧠 Technical Highlights (What Recruiters Care About)

- **Global State Management** using React Context
- **Custom Hooks** for clean abstraction (`useFavorites`)
- **Debounced Search** for performance optimization
- **Client-side Filtering & Pagination**
- **Memoization (`useMemo`)** to avoid unnecessary re-renders
- **Reusable Components** with clear separation of concerns
- **Persistent State** via browser storage

---

## 🛠️ Tech Stack

- **React** (Hooks, Context API)
- **React Router DOM** – routing
- **Tailwind CSS** – styling
- **Lucide Icons** – icons
- **react-hot-toast** – notifications
- **Edamam Recipes API** – data source
- **Vite** – build tool

---

## 📁 Project Structure

```
src/
├── components/
│   ├── RecipeCard.jsx
│   └── Sidebar.jsx
├── context/
│   └── FavoritesContext.jsx
├── hooks/
│   └── useFavorites.js
├── pages/
│   ├── HomePage.jsx
│   └── FavoritesPage.jsx
├── lib/
│   └── utils.js
├── App.jsx
└── main.jsx
```

---

## ⚙️ Setup & Installation

1. Clone the repository

```bash
git clone https://github.com/your-username/recipe-explorer.git
cd recipe-explorer
```

2. Install dependencies

```bash
npm install
```

3. Add environment variables
   Create a `.env` file in the root:

```env
VITE_APP_ID=your_edamam_app_id
VITE_APP_KEY=your_edamam_app_key
```

4. Run the app

```bash
npm run dev
```

---

## 🌍 Environment Variables

| Variable       | Description       |
| -------------- | ----------------- |
| `VITE_APP_ID`  | Edamam API App ID |
| `VITE_APP_KEY` | Edamam API Key    |

---

## 📈 Future Improvements

- Infinite scroll instead of "Load More"
- URL-based search (`?q=pizza`)
- Sync favorites across browser tabs
- Accessibility improvements (ARIA, keyboard navigation)
- Unit tests with React Testing Library
- Dark mode support

---

## 👨‍💻 Author

**Himanshu Yadav**
Frontend Developer

- GitHub: *https://github.com/yadav-himanshu*
- LinkedIn: *https://www.linkedin.com/in/himanshu-yadav-0706a1137*

---

## ⭐ Why This Project?

This project was built to showcase **real-world frontend development skills**:

- Thoughtful state management
- Performance-aware design
- Scalable component architecture
- Clean, maintainable code

If you're a recruiter or developer reviewing this project — feedback is always welcome! 🙌
