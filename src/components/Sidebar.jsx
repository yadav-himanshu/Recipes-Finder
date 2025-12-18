import { Heart, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";

const Sidebar = () => {
  const { pathname } = useLocation();
  const { favorites } = useFavorites();

  const linkClasses = (path) =>
    `flex items-center gap-2 px-3 py-2 rounded-md font-semibold transition
     ${
       pathname === path
         ? "bg-gray-100 text-black"
         : "text-gray-600 hover:bg-gray-100 hover:text-black"
     }`;

  return (
    <nav className="w-full md:w-64 md:min-h-screen border-b md:border-r bg-white sticky top-0 z-20">
      <div className="flex md:flex-col justify-between md:justify-start gap-6 p-4 md:p-6">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.svg" className="h-8 hidden md:block" />
          <img src="/mobile-logo.svg" className="h-8 md:hidden" />
        </Link>

        <ul className="flex md:flex-col gap-4">
          <li>
            <Link to="/" className={linkClasses("/")}>
              <Home size={22} />
              <span className="hidden md:inline">Home</span>
            </Link>
          </li>

          <li>
            <Link to="/favorites" className={linkClasses("/favorites")}>
              <Heart size={22} />
              <span className="hidden md:inline">
                Favorites
                {favorites.length > 0 && (
                  <span className="ml-2 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                    {favorites.length}
                  </span>
                )}
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
