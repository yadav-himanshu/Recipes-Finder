import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem("favorites");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to load favorites", error);
      return [];
    }
  });

  // Persist favorites when state changes
  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Failed to persist favorites", error);
    }
  }, [favorites]);

  const isFavorite = (label) => favorites.some((fav) => fav.label === label);

  const toggleFavorite = (recipe) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.label === recipe.label)) {
        return prev.filter((fav) => fav.label !== recipe.label);
      }
      return [...prev, recipe];
    });
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used inside FavoritesProvider");
  }
  return ctx;
};

