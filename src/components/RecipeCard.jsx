import { Heart, HeartPulse } from "lucide-react";
import toast from "react-hot-toast";
import { useFavorites } from "../hooks/useFavorites";

const getTwoValueFromArray = (arr) => [arr[0], arr[1]];

const RecipeCard = ({ recipe, bg, badge }) => {
  const healthLabels = getTwoValueFromArray(recipe.healthLabels);
  const { toggleFavorite, isFavorite } = useFavorites();

  const favorite = isFavorite(recipe.label);

  const handleFavorite = () => {
    toggleFavorite(recipe);
    toast.success(
      favorite ? "Removed from favorites 💔" : "Added to favorites ❤️",
    );
  };

  return (
    <div
      className={`group flex flex-col rounded-xl ${bg} overflow-hidden p-3 relative
      transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
    >
      <a
        href={`https://www.youtube.com/results?search_query=${recipe.label} recipe`}
        target="_blank"
        className="relative h-32"
      >
        <div className="skeleton absolute inset-0" />
        <img
          src={recipe.image}
          alt={recipe.label}
          className="w-full rounded-md h-full object-cover opacity-0 transition-all duration-500 group-hover:scale-105"
          onLoad={(e) => {
            e.currentTarget.style.opacity = 1;
            e.currentTarget.previousElementSibling.style.display = "none";
          }}
        />

        <div
          className="absolute top-1 right-2 rounded-full p-1 bg-white cursor-pointer
          transition-transform hover:scale-110 active:scale-95"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleFavorite();
          }}
        >
          <Heart
            size={20}
            className={
              favorite
                ? "fill-red-600 text-red-600 animate-pulse"
                : "hover:fill-red-600 hover:text-red-600"
            }
          />
        </div>
      </a>

      <p className="font-bold mt-2">{recipe.label}</p>
      <p className="my-2">
        {recipe.cuisineType[0][0].toUpperCase() +
          recipe.cuisineType[0].slice(1)}{" "}
        Kitchen
      </p>

      <div className="flex gap-2 mt-auto">
        {healthLabels.map((label, idx) => (
          <div
            key={idx}
            className={`flex gap-1 ${badge} items-center rounded-md p-1`}
          >
            <HeartPulse size={16} />
            <span className="text-sm font-semibold">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeCard;
