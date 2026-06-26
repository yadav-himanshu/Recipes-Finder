import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, Home, ShoppingCart, Info } from "lucide-react";
import { useFavorites } from "../../context/FavoritesContext";
import { useShoppingList } from "../../context/ShoppingContext";

const MobileNav = () => {
    const { pathname } = useLocation();
    const { favorites } = useFavorites();
    const { shoppingList } = useShoppingList();

    const navItems = [
        { icon: <Home size={20} />, label: "Discover", path: "/" },
        { icon: <Heart size={20} />, label: "Favorites", path: "/favorites", count: favorites.length },
        { icon: <ShoppingCart size={20} />, label: "Shopping", path: "/shopping-list", count: shoppingList.length },
        { icon: <Info size={20} />, label: "About", path: "/about" },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-100 px-6 py-2 flex justify-between items-center z-50 md:hidden pb-safe shadow-lg">
            {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                    <Link
                        key={item.label}
                        to={item.path}
                        className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-colors relative flex-1 ${
                            isActive ? "text-primary font-bold" : "text-slate-400 hover:text-primary/70"
                        }`}
                    >
                        <div className="relative">
                            {React.cloneElement(item.icon, {
                                className: isActive && item.label === "Favorites" ? "fill-primary text-primary" : ""
                            })}
                            {item.count > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white shadow-sm">
                                    {item.count}
                                </span>
                            )}
                        </div>
                        <span className="text-[10px] font-bold tracking-tight uppercase">{item.label}</span>
                        {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-0.5 animate-pulse" />
                        )}
                    </Link>
                );
            })}
        </nav>
    );
};

export default MobileNav;

