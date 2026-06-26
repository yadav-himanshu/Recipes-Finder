import { useEffect, useMemo, useState } from "react";
import RecipeCard from "../components/recipe/RecipeCard";
import SearchInput from "../components/ui/SearchInput";
import CategoryPills from "../components/ui/CategoryPills";
import { fetchRecipes, fetchNextPage } from "../services/edamamApi";
import { Link } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import { Loader2 } from "lucide-react";

const defaultCategories = ["chicken", "beef", "salad", "dessert", "pasta", "vegan", "breakfast"];

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState(null);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const [cuisineFilter, setCuisineFilter] = useState("all");
  const [healthFilter, setHealthFilter] = useState("all");
  const [trendingRecipes, setTrendingRecipes] = useState([]);

  const queryToFetch = debouncedSearch || "popular";

  useEffect(() => {
    document.title = search
      ? `Search results for "${search}" - CookMom`
      : "CookMom - Discover Delicious Recipes";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        search
          ? `Browse and cook delicious recipes matching "${search}" on CookMom.`
          : "Discover CookMom: the ultimate modern recipe finder with dynamic filtering, shopping lists, and custom nutritional data."
      );
    }
  }, [search]);

  useEffect(() => {
    const getRecipes = async () => {
      setLoading(true);
      setError(null);
      setNextPageUrl(null);

      try {
        const { hits, nextPageUrl } = await fetchRecipes(queryToFetch, healthFilter);
        setRecipes(hits);
        setNextPageUrl(nextPageUrl);
      } catch (error) {
        console.error(error);
        setError("Unable to find recipes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getRecipes();
  }, [queryToFetch, healthFilter]);

  const handleLoadMore = async () => {
    if (!nextPageUrl || loadingMore) return;

    setLoadingMore(true);
    try {
      const { hits, nextPageUrl: next } = await fetchNextPage(nextPageUrl);
      setRecipes(prev => [...prev, ...hits]);
      setNextPageUrl(next);
    } catch (error) {
      console.error("Load more error:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  // Fetch trending recipes once for the bottom section
  useEffect(() => {
    const getTrending = async () => {
      try {
        const { hits } = await fetchRecipes("trending");
        setTrendingRecipes(hits.slice(0, 4));
      } catch (error) {
        console.error("Trending fetch error:", error);
      }
    };
    getTrending();
  }, []);

  const cuisines = useMemo(() => {
    // ... same as before
    const set = new Set();
    recipes.forEach(({ recipe }) =>
      recipe.cuisineType?.forEach((c) => set.add(c))
    );
    if (set.size < 5) {
      defaultCategories.forEach(c => set.add(c));
    }
    return Array.from(set).slice(0, 10);
  }, [recipes]);

  const filteredRecipes = useMemo(() => {
    if (cuisineFilter === "all") return recipes;
    return recipes.filter(({ recipe }) => {
      const cuisines = recipe.cuisineType || [];
      const dishTypes = recipe.dishType || [];
      return cuisines.includes(cuisineFilter) || dishTypes.includes(cuisineFilter);
    });
  }, [recipes, cuisineFilter]);

  const healthLabels = ["all", "vegan", "vegetarian", "gluten-free", "low-carb", "paleo", "dairy-free", "low-sodium"];

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-screen pb-24">
      {/* ... header and search/filters ... */}
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col gap-3">
          <h1 className="text-5xl md:text-7xl font-black text-slate-800 tracking-tighter leading-none">
            {search ? "Results" : "Discover."}
          </h1>
          <p className="text-slate-500 text-xl font-medium">
            {search ? `Searching for "${search}"` : "The best recipes from across the web, all in one place."}
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <SearchInput
            value={search}
            onChange={setSearch}
            onSearchConfirm={setSearch}
            isLoading={loading}
          />

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Cuisines</span>
              <div className="h-px flex-1 bg-slate-100" />
            </div>
            <CategoryPills
              categories={cuisines}
              selectedCategory={cuisineFilter}
              onSelect={setCuisineFilter}
              defaultLabel="All Cuisines"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Dietary</span>
              <div className="h-px flex-1 bg-slate-100" />
            </div>
            <CategoryPills
              categories={healthLabels}
              selectedCategory={healthFilter}
              onSelect={setHealthFilter}
              defaultLabel="All Diets"
            />
          </div>
        </div>

        {/* ... Grid ... */}
        <section className={loading && recipes.length > 0 ? "opacity-60 transition-opacity" : "opacity-100"}>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {loading && recipes.length === 0 ? (
              [...Array(8)].map((_, i) => (
                <div key={i} className="flex flex-col bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-sm animate-pulse">
                  <div className="h-56 bg-slate-100" />
                  <div className="p-5 flex flex-col gap-4">
                    <div className="h-6 bg-slate-100 rounded-lg w-3/4" />
                    <div className="mt-8 flex justify-between">
                      <div className="h-8 bg-slate-100 rounded-lg w-1/4" />
                      <div className="h-8 bg-slate-100 rounded-lg w-1/4" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              filteredRecipes.map(({ recipe }, index) => (
                <RecipeCard key={`${recipe.uri}-${index}`} recipe={recipe} />
              ))
            )}
          </div>

          {/* Pagination */}
          {nextPageUrl && !loading && (
            <div className="mt-16 flex justify-center">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="group flex items-center gap-3 bg-white border-2 border-slate-100 hover:border-primary px-8 py-4 rounded-2xl font-black text-slate-800 transition-all hover:shadow-xl hover:shadow-orange-900/5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingMore ? (
                  <>
                    <Loader2 className="animate-spin text-primary" size={24} />
                    Loading More...
                  </>
                ) : (
                  <>
                    Load More Recipes
                    <span className="text-lg group-hover:translate-y-1 transition-transform">✨</span>
                  </>
                )}
              </button>
            </div>
          )}
        </section>




        {/* Empty State */}
        {!loading && !error && filteredRecipes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
            <div className="bg-orange-50 w-28 h-28 rounded-[32px] flex items-center justify-center mb-8 transform -rotate-6">
              <span className="text-5xl">🍽️</span>
            </div>
            <h3 className="text-3xl font-black text-slate-800 mb-3 tracking-tight">No recipes found</h3>
            <p className="text-slate-500 max-w-md text-lg font-medium">
              We couldn&apos;t find any recipes matching your criteria. Try searching for something else!
            </p>
            <button
              onClick={() => { setSearch(""); setCuisineFilter("all"); }}
              className="mt-10 px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primaryHover transition-all shadow-xl shadow-orange-500/20 active:scale-95"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Trending Section */}
        {!search && trendingRecipes.length > 0 && (
          <section className="pt-20 border-t border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">Trending Now 🔥</h2>
              <Link to="/about" className="text-primary font-bold hover:underline">Learn more about us</Link>
            </div>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {trendingRecipes.map(({ recipe }, index) => (
                <RecipeCard key={`trending-${index}`} recipe={recipe} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default HomePage;
