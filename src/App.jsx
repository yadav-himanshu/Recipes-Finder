import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";

const HomePage = lazy(() => import("./pages/HomePage"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"));
const RecipeDetailsPage = lazy(() => import("./pages/RecipeDetailsPage"));
const ShoppingListPage = lazy(() => import("./pages/ShoppingListPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-[#fbfaf8]">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="recipe/:id" element={<RecipeDetailsPage />} />
          <Route path="shopping-list" element={<ShoppingListPage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
