import { Search, Clock, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRecentSearches } from "../../hooks/useRecentSearches";

const SearchInput = ({ value, onChange, onSearchConfirm, isLoading }) => {
    const { recentSearches, addSearch } = useRecentSearches(5);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropRef.current && !dropRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setShowDropdown(false);
            if (value.trim()) {
                addSearch(value);
                if (onSearchConfirm) onSearchConfirm(value);
            }
        }
    };

    const handleRecentClick = (term) => {
        onChange(term);
        setShowDropdown(false);
        addSearch(term);
        if (onSearchConfirm) onSearchConfirm(term);
    };

    return (
        <div className="relative w-full max-w-2xl" ref={dropRef}>
            <div className="relative flex items-center group">
                <Search className={`absolute left-5 transition-colors ${isLoading ? 'text-primary animate-pulse' : 'text-slate-400 group-focus-within:text-primary'}`} size={22} />
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setShowDropdown(true)}
                    placeholder="What are you craving today?"
                    className="w-full bg-white border-2 border-slate-100 text-slate-700 py-4 pl-14 pr-12 rounded-2xl shadow-sm focus:outline-none focus:ring-0 focus:border-primary/50 transition-all text-lg font-medium placeholder:text-slate-400"
                />
                <div className="absolute right-5 flex items-center gap-2">
                    {isLoading && (
                        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    )}
                    {value && !isLoading && (
                        <button
                            onClick={() => {
                                onChange("");
                                if (onSearchConfirm) onSearchConfirm("");
                            }}
                            className="text-slate-400 hover:text-slate-600 transition bg-slate-100 rounded-full p-1"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>
            </div>

            {showDropdown && recentSearches.length > 0 && (
                <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white border border-slate-100 rounded-2xl shadow-xl z-30 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-4 pt-5 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-50">
                        Recent Searches
                    </div>
                    <ul className="py-2">
                        {recentSearches.map((term, idx) => (
                            <li key={idx}>
                                <button
                                    onClick={() => handleRecentClick(term)}
                                    className="w-full text-left px-5 py-3 hover:bg-orange-50/70 flex items-center gap-4 transition-colors text-slate-600 font-medium group/item"
                                >
                                    <Clock size={18} className="text-slate-300 group-hover/item:text-primary transition-colors" />
                                    {term}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchInput;
