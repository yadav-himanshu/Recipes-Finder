import { useState } from "react";
import { Heart, Clock, Utensils, Zap } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";

const RecipeCard = ({ recipe }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const favorite = isFavorite(recipe.label);

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(recipe);
    toast.success(
      favorite ? "Removed from favorites" : "Added to favorites ❤️",
      { id: "fav-toast" }
    );
  };

  // Extract recipe ID from URI for routing
  const recipeId = recipe.uri.split("_")[1];
  const cuisine = recipe.cuisineType?.[0] || "Mixed";

  return (
    <Link
      to={`/recipe/${recipeId}`}
      className="group flex flex-col bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-card 
      transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-orange-900/5 hover:border-orange-100"
    >
      <div className="relative h-56 sm:h-64 overflow-hidden p-2 pb-0">
        <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-slate-50">
          {!imageLoaded && (
            <div className="skeleton absolute inset-0 bg-slate-100 animate-pulse" />
          )}

          {imageError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 text-slate-300 gap-2">
              <Utensils size={48} className="opacity-20" />
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Recipe Image</span>
            </div>
          ) : (
            <img
              src={recipe.image}
              alt={recipe.label}
              loading="lazy"
              className={`w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105 ${imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
                }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
                setImageLoaded(true);
              }}
            />
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-70 transition-opacity group-hover:opacity-50" />

          {/* Favorite Button */}
          <button
            onClick={handleFavorite}
            className="absolute top-3 right-3 rounded-full p-2.5 bg-white/90 backdrop-blur-md shadow-sm
            transition-all duration-300 hover:scale-110 active:scale-95 group/btn z-10"
          >
            <Heart
              size={20}
              className={
                favorite
                  ? "fill-red-500 text-red-500"
                  : "text-slate-400 group-hover/btn:text-red-500 transition-colors"
              }
            />
          </button>

          {/* Cuisine Badge */}
          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl
             text-xs font-bold text-slate-800 shadow-sm flex items-center gap-1.5 z-10">
            <Utensils size={14} className="text-primary" />
            <span className="capitalize tracking-wide">{cuisine}</span>
          </div>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-extrabold text-xl text-slate-800 line-clamp-2 leading-snug mb-3 group-hover:text-primary transition-colors">
          {recipe.label}
        </h3>

        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between text-slate-500 text-sm font-bold">
          <div className="flex items-center gap-1.5 bg-orange-50/50 px-3 py-1.5 rounded-lg text-amber-600">
            <Zap size={16} />
            {Math.round(recipe.calories)} cal
          </div>
          <div className="flex items-center gap-1.5 bg-blue-50/50 px-3 py-1.5 rounded-lg text-blue-600">
            <Clock size={16} />
            {recipe.totalTime > 0 ? `${recipe.totalTime}m` : "Quick"}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
