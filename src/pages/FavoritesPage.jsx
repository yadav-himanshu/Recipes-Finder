import RecipeCard from "../components/recipe/RecipeCard";
import { useFavorites } from "../context/FavoritesContext";
import { Link } from "react-router-dom";

import { useEffect } from "react";

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  useEffect(() => {
    document.title = "My Favorites - CookMom";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "View and organize your saved premium recipes on CookMom.");
    }
  }, []);

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-screen pb-24">
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight">
            My Favorites
          </h1>
          <p className="text-slate-500 text-lg font-medium">
            Your personal collection of saved recipes.
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="bg-red-50 w-28 h-28 rounded-[32px] flex items-center justify-center mb-8 transform rotate-6">
              <span className="text-5xl text-red-500">💔</span>
            </div>
            <h3 className="text-3xl font-black text-slate-800 mb-3 tracking-tight">No favorites yet</h3>
            <p className="text-slate-500 max-w-md text-lg font-medium">
              Start exploring and save the recipes you love to find them here later.
            </p>
            <Link
              to="/"
              className="mt-10 px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primaryHover transition-all shadow-xl shadow-orange-500/20 active:scale-95"
            >
              Discover Recipes
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-4">
            {favorites.map((recipe, index) => (
              <RecipeCard key={`${recipe.uri}-${index}`} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
