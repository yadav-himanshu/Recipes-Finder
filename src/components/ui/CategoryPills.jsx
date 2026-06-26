const CategoryPills = ({ categories, selectedCategory, onSelect, defaultLabel = "All" }) => {
    if (!categories || categories.length === 0) return null;

    // Filter out any "all" values from the input categories array to prevent duplicate buttons
    const filteredCategories = categories.filter(
        (c) => c && c.toLowerCase() !== "all"
    );

    return (
        <div className="flex gap-2.5 overflow-x-auto pb-4 pt-2 -mx-4 px-4 md:-mx-0 md:px-0 hide-scrollbar scroll-smooth">
            <button
                onClick={() => onSelect("all")}
                className={`whitespace-nowrap px-6 py-2.5 rounded-xl font-bold transition-all duration-300 ${
                    selectedCategory === "all"
                        ? "bg-primary text-white shadow-lg shadow-orange-500/30 scale-105"
                        : "bg-white text-slate-500 hover:bg-orange-50 hover:text-primary shadow-sm border border-slate-100"
                }`}
            >
                {defaultLabel}
            </button>
            {filteredCategories.map((c) => (
                <button
                    key={c}
                    onClick={() => onSelect(c)}
                    className={`whitespace-nowrap px-6 py-2.5 rounded-xl font-bold transition-all duration-300 capitalize ${
                        selectedCategory === c
                            ? "bg-primary text-white shadow-lg shadow-orange-500/30 scale-105"
                            : "bg-white text-slate-500 hover:bg-orange-50 hover:text-primary shadow-sm border border-slate-100"
                    }`}
                >
                    {c}
                </button>
            ))}
        </div>
    );
};

export default CategoryPills;
