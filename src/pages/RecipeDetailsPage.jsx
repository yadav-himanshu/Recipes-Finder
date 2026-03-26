import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Users, Flame, ExternalLink, Heart, CheckCircle2, Youtube, ShoppingCart, Share2, Printer } from "lucide-react";
import { fetchRecipeById } from "../services/edamamApi";
import { useFavorites } from "../hooks/useFavorites";
import { useShoppingList } from "../context/ShoppingContext";
import NutritionStats from "../components/recipe/NutritionStats";
import toast from "react-hot-toast";

const RecipeDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { toggleFavorite, isFavorite } = useFavorites();
    const { addToShoppingList } = useShoppingList();
    const favorite = recipe ? isFavorite(recipe.label) : false;

    useEffect(() => {
        const getRecipe = async () => {
            setLoading(true);
            try {
                const data = await fetchRecipeById(id);
                if (data && data.recipe) {
                    setRecipe(data.recipe);
                } else {
                    setError("Recipe not found.");
                }
            } catch (error) {
                console.error(error);
                setError("Failed to load recipe details.");
            } finally {
                setLoading(false);
            }
        };
        if (id) getRecipe();
    }, [id]);

    if (loading) {
        return (
            <div className="p-6 md:p-10 max-w-5xl mx-auto min-h-screen animate-pulse">
                <div className="h-10 w-32 bg-slate-200 rounded-lg mb-8" />
                <div className="h-[400px] bg-slate-200 rounded-[32px] mb-8" />
                <div className="h-12 w-3/4 bg-slate-200 rounded-xl mb-4" />
                <div className="h-6 w-1/4 bg-slate-200 rounded-lg" />
            </div>
        );
    }

    if (error || !recipe) {
        return (
            <div className="flex flex-col items-center justify-center p-10 min-h-screen text-center">
                <h2 className="text-3xl font-black text-slate-800 mb-4">Recipe Not Found</h2>
                <p className="text-slate-500 mb-8">{error}</p>
                <button onClick={() => navigate(-1)} className="px-6 py-3 bg-primary text-white rounded-xl font-bold">Go Back</button>
            </div>
        );
    }

    const handleFavorite = () => {
        toggleFavorite(recipe);
        toast.success(favorite ? "Removed from favorites" : "Added to favorites", { id: "fav" });
    };

    const handleAddToShopping = (ingredient) => {
        addToShoppingList(ingredient);
        toast.success("Added to shopping list", { id: "shop" });
    };

    const handleAddAllToShopping = () => {
        addToShoppingList(recipe.ingredients.map(i => i.text));
        toast.success("All ingredients added to list", { id: "shop-all" });
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!", { id: "share" });
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="p-6 md:p-10 max-w-5xl mx-auto min-h-screen pb-24 animate-in fade-in duration-300 print:p-0">
            <div className="flex justify-between items-center mb-8 print:hidden">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-500 font-bold hover:text-primary transition-colors group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to recipes
                </button>
                <div className="flex gap-3">
                    <button
                        onClick={handleShare}
                        className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-primary hover:border-orange-100 shadow-sm transition-all"
                        title="Share Recipe"
                    >
                        <Share2 size={20} />
                    </button>
                    <button
                        onClick={handlePrint}
                        className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-primary hover:border-orange-100 shadow-sm transition-all"
                        title="Print Recipe"
                    >
                        <Printer size={20} />
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-[32px] overflow-hidden shadow-card border border-slate-100 print:shadow-none print:border-none">
                {/* Banner */}
                <div className="relative h-[300px] md:h-[450px] print:h-[200px]">
                    <img
                        src={recipe.image}
                        alt={recipe.label}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent print:hidden" />

                    <div className="absolute top-6 right-6 flex gap-3 print:hidden">
                        <button
                            onClick={handleFavorite}
                            className="rounded-2xl p-4 bg-white/20 backdrop-blur-md border border-white/20 hover:bg-white/40 transition-all active:scale-95 z-10"
                        >
                            <Heart size={28} className={favorite ? "fill-red-500 text-red-500" : "text-white"} />
                        </button>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white print:text-slate-800 print:relative print:p-4">
                        <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
                            {recipe.label}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-sm md:text-base font-medium opacity-90 print:text-black">
                            {recipe.cuisineType && (
                                <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl capitalize print:border print:border-slate-200">
                                    {recipe.cuisineType[0]}
                                </span>
                            )}
                            <span className="flex items-center gap-2">
                                <Clock size={18} />
                                {recipe.totalTime > 0 ? `${recipe.totalTime} mins` : 'Quick'}
                            </span>
                            <span className="flex items-center gap-2">
                                <Users size={18} />
                                {recipe.yield || 1} Servings
                            </span>
                            <span className="flex items-center gap-2 text-orange-400 font-bold">
                                <Flame size={18} />
                                {Math.round(recipe.calories)} kcal
                            </span>
                        </div>
                    </div>
                </div>

                <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Ingredients */}
                    <div className="md:col-span-2 space-y-8">
                        <div className="flex items-center justify-between gap-4 mb-6 print:mb-2">
                            <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                                Ingredients
                                <span className="bg-orange-100 text-primary text-sm px-3 py-1 rounded-full">{recipe.ingredients.length}</span>
                            </h2>
                            <button
                                onClick={handleAddAllToShopping}
                                className="text-sm font-bold text-primary hover:bg-orange-50 px-4 py-2 rounded-xl transition-colors flex items-center gap-2 print:hidden"
                            >
                                <ShoppingCart size={16} /> Add All to List
                            </button>
                        </div>
                        <ul className="space-y-4 print:space-y-2">
                            {recipe.ingredients.map((ing, idx) => (
                                <li key={idx} className="flex gap-4 items-center p-4 bg-slate-50 rounded-2xl group transition-all hover:bg-slate-100/50 print:bg-white print:p-1 print:border-b">
                                    <CheckCircle2 className="text-primary shrink-0" size={20} />
                                    <span className="text-slate-700 font-medium leading-relaxed flex-1">{ing.text}</span>
                                    <button
                                        onClick={() => handleAddToShopping(ing.text)}
                                        className="p-2 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-primary transition-all rounded-lg print:hidden"
                                        title="Add to shopping list"
                                    >
                                        <ShoppingCart size={18} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Sidebar Info & YouTube */}
                    <div className="space-y-8">
                        {/* Nutrition Dashboard */}
                        <NutritionStats nutrients={recipe.totalNutrients} />

                        <div className="space-y-4 print:hidden">
                            <h3 className="font-black text-slate-800 text-lg uppercase tracking-wider">Watch & Learn</h3>
                            <a
                                href={`https://www.youtube.com/results?search_query=${recipe.label} recipe`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 bg-[#FF0000] text-white font-black py-4 px-6 rounded-[20px] shadow-lg shadow-red-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all group"
                            >
                                <Youtube size={24} className="group-hover:animate-pulse" />
                                Find on YouTube
                            </a>
                        </div>

                        <div className="pt-8 border-t border-slate-100 print:hidden">
                            <h3 className="font-black text-slate-800 mb-4 uppercase tracking-wider">Instructions</h3>
                            <p className="text-slate-500 font-medium mb-6">
                                Full steps by {recipe.source}
                            </p>
                            <a
                                href={recipe.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 bg-slate-900 text-white font-bold w-full py-4 rounded-[20px] hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
                            >
                                Go to Source <ExternalLink size={20} />
                            </a>
                        </div>
                        {recipe.dietLabels && recipe.dietLabels.length > 0 && (
                            <div className="bg-orange-50/50 p-6 rounded-3xl border border-orange-100/50">
                                <h3 className="font-black text-slate-800 mb-4">Dietary Info</h3>
                                <div className="flex flex-wrap gap-2">
                                    {recipe.dietLabels.map(label => (
                                        <span key={label} className="bg-white text-orange-600 border border-orange-200 text-sm font-bold px-4 py-2 rounded-xl">
                                            {label}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetailsPage;
