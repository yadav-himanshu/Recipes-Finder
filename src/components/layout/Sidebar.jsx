import { Heart, Home, ChefHat, ShoppingCart, Info } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";
import { useShoppingList } from "../../context/ShoppingContext";

const Sidebar = () => {
  const { pathname } = useLocation();
  const { favorites } = useFavorites();
  const { shoppingList } = useShoppingList();

  const linkClasses = (path) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300
     ${pathname === path
      ? "bg-primary text-white shadow-md shadow-orange-200"
      : "text-slate-500 hover:bg-orange-50 hover:text-primary"
    }`;

  return (
    <nav className="hidden md:flex w-72 min-h-screen border-r border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-20 flex-col items-stretch py-8 shadow-sm">
      <div className="flex w-full px-6 md:px-8 mb-2 md:mb-12 justify-center md:justify-start items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
            <ChefHat className="text-primary w-8 h-8" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-slate-800 hidden md:block">
            Cook<span className="text-primary">Mom</span>
          </span>
        </Link>
      </div>

      <div className="flex-1 w-full px-4 md:px-6 space-y-8 overflow-y-auto">
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-4 hidden md:block">
            Menu
          </h3>
          <ul className="flex md:flex-col gap-2 justify-center md:justify-start">
            <li>
              <Link to="/" className={linkClasses("/")}>
                <Home size={22} className={pathname === "/" ? "text-white" : "text-slate-400"} />
                <span className="hidden md:inline">Discover</span>
              </Link>
            </li>

            <li>
              <Link to="/favorites" className={linkClasses("/favorites")}>
                <Heart size={22} className={pathname === "/favorites" ? "text-white fill-white" : "text-slate-400"} />
                <span className="hidden md:inline flex-1">Favorites</span>
                {favorites.length > 0 && (
                  <span className={`hidden md:flex ml-2 text-xs items-center justify-center font-bold px-2 py-0.5 rounded-full ${pathname === "/favorites" ? "bg-white text-primary" : "bg-primary text-white"}`}>
                    {favorites.length}
                  </span>
                )}
              </Link>
            </li>

            <li>
              <Link to="/shopping-list" className={linkClasses("/shopping-list")}>
                <ShoppingCart size={22} className={pathname === "/shopping-list" ? "text-white" : "text-slate-400"} />
                <span className="hidden md:inline flex-1">Shopping List</span>
                {shoppingList.length > 0 && (
                  <span className={`hidden md:flex ml-2 text-xs items-center justify-center font-bold px-2 py-0.5 rounded-full ${pathname === "/shopping-list" ? "bg-white text-primary" : "bg-primary text-white"}`}>
                    {shoppingList.length}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-4 hidden md:block">
            Info
          </h3>
          <ul className="flex md:flex-col gap-2 justify-center md:justify-start">
            <li>
              <Link to="/about" className={linkClasses("/about")}>
                <Info size={22} className={pathname === "/about" ? "text-white" : "text-slate-400"} />
                <span className="hidden md:inline">About</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="px-8 mt-auto hidden md:block">
        <p className="text-xs text-slate-400 font-medium pb-4">
          © {new Date().getFullYear()} CookMom<br />
          Premium Recipe Finder.
        </p>
      </div>
    </nav>
  );
};

export default Sidebar;
