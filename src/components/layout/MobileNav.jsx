import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, Home, ShoppingCart, Info, Search } from "lucide-react";
import { useFavorites } from "../../hooks/useFavorites";
import { useShoppingList } from "../../context/ShoppingContext";

const MobileNav = () => {
    const { pathname } = useLocation();
    const { favorites } = useFavorites();
    const { shoppingList } = useShoppingList();

    const navItems = [
        { icon: <Home size={20} />, label: "Home", path: "/" },
        { icon: <Search size={20} />, label: "Search", path: "/", active: pathname === "/" },
        { icon: <Heart size={20} />, label: "Favs", path: "/favorites", count: favorites.length },
        { icon: <ShoppingCart size={20} />, label: "List", path: "/shopping-list", count: shoppingList.length },
        { icon: <Info size={20} />, label: "About", path: "/about" },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-100 px-4 py-2 flex justify-between items-center z-50 md:hidden pb-safe">
            {navItems.map((item) => {
                const isActive = pathname === item.path || item.active;
                return (
                    <Link
                        key={item.label}
                        to={item.path}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all relative ${isActive ? "text-primary scale-110" : "text-slate-400"
                            }`}
                    >
                        <div className={`${isActive ? "text-primary" : "text-slate-400"}`}>
                            {React.cloneElement(item.icon, {
                                className: isActive && item.label === "Favs" ? "fill-primary" : ""
                            })}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-tight">{item.label}</span>

                        {item.count > 0 && (
                            <span className="absolute top-1 right-1 bg-primary text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-sm transition-all transform animate-in zoom-in duration-300">
                                {item.count}
                            </span>
                        )}
                    </Link>
                );
            })}
        </nav>
    );
};

export default MobileNav;
