const APP_ID = import.meta.env.VITE_APP_ID;
const APP_KEY = import.meta.env.VITE_APP_KEY;
const BASE_URL = import.meta.env.VITE_EDAMAM_API_URL;

/**
 * Fetches recipes based on search query
 * @param {string} query Search term
 * @returns {Promise<any>} Formatted data
 */
export const fetchRecipes = async (query = "", filter = null) => {
    if (!query) return [];

    try {
        let url = `${BASE_URL}/?app_id=${APP_ID}&app_key=${APP_KEY}&q=${encodeURIComponent(query)}&type=public`;

        if (filter && filter !== "all") {
            // Edamam distinguishes between diet and health labels
            const dietLabels = ["balanced", "high-protein", "high-fiber", "low-fat", "low-carb", "low-sodium"];
            const paramName = dietLabels.includes(filter.toLowerCase()) ? "diet" : "health";
            url += `&${paramName}=${encodeURIComponent(filter)}`;
        }

        const res = await fetch(url);

        if (!res.ok) throw new Error("Failed to fetch recipes");

        const data = await res.json();
        return {
            hits: data.hits,
            nextPageUrl: data._links?.next?.href || null
        };
    } catch (error) {
        console.error("Error fetching recipes:", error);
        throw error;
    }
};

/**
 * Fetches the next page of recipes from a specific URL
 * @param {string} url The next page URL from Edamam
 */
export const fetchNextPage = async (url) => {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch next page");
        const data = await res.json();
        return {
            hits: data.hits,
            nextPageUrl: data._links?.next?.href || null
        };
    } catch (error) {
        console.error("Error fetching next page:", error);
        throw error;
    }
};

/**
 * Fetches a single recipe by its URI/ID (Edamam returns ID inside `recipe.uri` usually, but we can query by ID)
 * format: https://api.edamam.com/api/recipes/v2/{id}?type=public&app_id={app_id}&app_key={app_key}
 * @param {string} id Recipe ID
 * @returns {Promise<any>}
 */
export const fetchRecipeById = async (id) => {
    try {
        const res = await fetch(
            `${BASE_URL}/${id}?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`,
        );

        if (!res.ok) throw new Error("Failed to fetch recipe details");

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching recipe:", error);
        throw error;
    }
};
