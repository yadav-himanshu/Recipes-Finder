import RecipeCard from "../components/RecipeCard";
import { getRandomColor } from "../lib/utils";
import { useFavorites } from "../hooks/useFavorites";

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className="bg-[#faf9fb] flex-1 p-4 md:p-7 lg:p-10 min-h-screen">
      <div className="max-w-screen-lg mx-auto">
        <h1 className="font-bold text-3xl my-4">My Favorites</h1>

        {favorites.length === 0 && (
          <div className="h-[80vh] flex items-center justify-center">
            <img src="/404.svg" className="h-3/4" alt="No favorites" />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((recipe) => (
            <RecipeCard
              key={recipe.label}
              recipe={recipe}
              {...getRandomColor()}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
