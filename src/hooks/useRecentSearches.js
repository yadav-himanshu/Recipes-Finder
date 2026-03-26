import { useState, useEffect } from "react";

export const useRecentSearches = (maxItems = 5) => {
    const [recentSearches, setRecentSearches] = useState(() => {
        try {
            const item = window.localStorage.getItem("recentSearches");
            return item ? JSON.parse(item) : [];
        } catch (error) {
            console.error(error);
            return [];
        }
    });

    const addSearch = (term) => {
        if (!term || typeof term !== "string") return;
        const cleanTerm = term.trim();
        if (!cleanTerm) return;

        setRecentSearches((prev) => {
            const filtered = prev.filter((s) => s.toLowerCase() !== cleanTerm.toLowerCase());
            return [cleanTerm, ...filtered].slice(0, maxItems);
        });
    };

    useEffect(() => {
        try {
            window.localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
        } catch (error) {
            console.error(error);
        }
    }, [recentSearches]);

    return { recentSearches, addSearch };
};
