import { useFavoritesContext } from "../context/FavoritesContext";

export const useFavorites = () => {
  return useFavoritesContext();
};
