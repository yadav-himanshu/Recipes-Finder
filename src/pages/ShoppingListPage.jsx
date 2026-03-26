import { useShoppingList } from "../context/ShoppingContext";
import { Trash2, ShoppingBag, CheckCircle2, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const ShoppingListPage = () => {
    const { shoppingList, removeFromShoppingList, clearShoppingList } = useShoppingList();

    return (
        <div className="p-6 md:p-10 max-w-4xl mx-auto min-h-screen pb-24">
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-end">
                    <div className="flex flex-col gap-3">
                        <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight">
                            Shopping List
                        </h1>
                        <p className="text-slate-500 text-lg font-medium">
                            Ingredients you need for your next meal.
                        </p>
                    </div>
                    {shoppingList.length > 0 && (
                        <button
                            onClick={clearShoppingList}
                            className="text-sm font-bold text-red-500 hover:text-red-600 pb-2 flex items-center gap-1 transition-colors"
                        >
                            <Trash2 size={16} /> Clear All
                        </button>
                    )}
                </div>

                {shoppingList.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                        <div className="bg-orange-50 w-28 h-28 rounded-[32px] flex items-center justify-center mb-8">
                            <ShoppingBag className="text-primary w-12 h-12" />
                        </div>
                        <h3 className="text-3xl font-black text-slate-800 mb-3 tracking-tight">Your list is empty</h3>
                        <p className="text-slate-500 max-w-md text-lg font-medium">
                            Save ingredients from any recipe to see them here and make your grocery shopping easier.
                        </p>
                        <Link
                            to="/"
                            className="mt-10 px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primaryHover transition-all shadow-xl shadow-orange-500/20 active:scale-95"
                        >
                            Browse Recipes
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white rounded-[32px] shadow-card border border-slate-100 overflow-hidden">
                        <div className="divide-y divide-slate-50">
                            {shoppingList.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between p-6 group hover:bg-slate-50/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-orange-50 text-primary p-2 rounded-xl group-hover:bg-primary group-hover:text-white transition-all">
                                            <CheckCircle2 size={18} />
                                        </div>
                                        <span className="text-slate-700 font-bold text-lg">{item}</span>
                                    </div>
                                    <button
                                        onClick={() => removeFromShoppingList(item)}
                                        className="text-slate-300 hover:text-red-500 transition-colors p-2"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {shoppingList.length > 0 && (
                    <div className="bg-blue-50/50 p-8 rounded-[32px] border border-blue-100/50 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h4 className="text-xl font-black text-slate-800 mb-1">Ready to cook?</h4>
                            <p className="text-slate-500 font-medium italic">Make sure you have everything before starting.</p>
                        </div>
                        <Link to="/" className="flex items-center gap-2 bg-slate-900 text-white font-bold px-6 py-3 rounded-xl hover:bg-slate-800 transition-colors">
                            Discover More <ChevronRight size={18} />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShoppingListPage;
