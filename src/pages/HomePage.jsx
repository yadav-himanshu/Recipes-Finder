import React, { useEffect, useMemo, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { getRandomColor } from "../lib/utils";

const APP_ID = import.meta.env.VITE_APP_ID;
const APP_KEY = import.meta.env.VITE_APP_KEY;
const PAGE_SIZE = 6;

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("Icecream");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [cuisineFilter, setCuisineFilter] = useState("all");

  /* ------------------ Debounce Search ------------------ */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 600);

    return () => clearTimeout(timer);
  }, [search]);

  /* ------------------ Fetch Recipes ------------------ */
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      setVisibleCount(PAGE_SIZE);

      try {
        const res = await fetch(
          `https://api.edamam.com/api/recipes/v2/?app_id=${APP_ID}&app_key=${APP_KEY}&q=${debouncedSearch}&type=public`,
        );

        if (!res.ok) throw new Error("Failed to fetch recipes");

        const data = await res.json();
        setRecipes(data.hits);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [debouncedSearch]);

  /* ------------------ Derived Data ------------------ */
  const cuisines = useMemo(() => {
    const set = new Set();
    recipes.forEach(({ recipe }) =>
      recipe.cuisineType?.forEach((c) => set.add(c)),
    );
    return Array.from(set);
  }, [recipes]);

  const filteredRecipes = useMemo(() => {
    if (cuisineFilter === "all") return recipes;
    return recipes.filter(({ recipe }) =>
      recipe.cuisineType?.includes(cuisineFilter),
    );
  }, [recipes, cuisineFilter]);

  const visibleRecipes = filteredRecipes.slice(0, visibleCount);

  /* ------------------ UI ------------------ */
  return (
    <div className="bg-[#faf9fb] p-4 md:p-7 lg:p-10 flex-1 min-h-screen">
      <div className="max-w-screen-lg mx-auto space-y-4">
        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search recipes..."
          className="input shadow-md w-full"
        />

        {/* Filters */}
        {cuisines.length > 0 && (
          <select
            className="select select-bordered w-full max-w-xs"
            value={cuisineFilter}
            onChange={(e) => setCuisineFilter(e.target.value)}
          >
            <option value="all">All Cuisines</option>
            {cuisines.map((c) => (
              <option key={c} value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
        )}

        <h1 className="font-bold text-3xl mt-4">Recommended Recipes</h1>
        <p className="text-slate-500 text-sm">
          Popular choices based on your search
        </p>

        {/* Error */}
        {error && <div className="text-red-500 font-semibold">{error}</div>}

        {/* Grid */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {loading
            ? [...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col gap-4">
                  <div className="skeleton h-32 w-full" />
                  <div className="skeleton h-4 w-2/3" />
                  <div className="skeleton h-4 w-full" />
                </div>
              ))
            : visibleRecipes.map(({ recipe }, index) => (
                <RecipeCard key={index} recipe={recipe} {...getRandomColor()} />
              ))}
        </div>

        {/* Empty State */}
        {!loading && visibleRecipes.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            No recipes found 🍽️
          </div>
        )}

        {/* Load More */}
        {visibleCount < filteredRecipes.length && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
              className="btn btn-outline"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
