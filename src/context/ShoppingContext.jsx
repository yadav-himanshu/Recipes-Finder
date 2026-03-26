import { createContext, useContext, useEffect, useState } from "react";

/* eslint-disable react-refresh/only-export-components */

const ShoppingContext = createContext(null);

export const ShoppingProvider = ({ children }) => {
    const [shoppingList, setShoppingList] = useState(() => {
        const stored = localStorage.getItem("shoppingList");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
    }, [shoppingList]);

    const addToShoppingList = (items) => {
        const newItems = Array.isArray(items) ? items : [items];
        setShoppingList((prev) => {
            const filtered = newItems.filter(item => !prev.includes(item));
            return [...prev, ...filtered];
        });
    };

    const removeFromShoppingList = (item) => {
        setShoppingList((prev) => prev.filter((i) => i !== item));
    };

    const clearShoppingList = () => setShoppingList([]);

    return (
        <ShoppingContext.Provider value={{ shoppingList, addToShoppingList, removeFromShoppingList, clearShoppingList }}>
            {children}
        </ShoppingContext.Provider>
    );
};

export const useShoppingList = () => {
    const context = useContext(ShoppingContext);
    if (!context) {
        throw new Error("useShoppingList must be used within a ShoppingProvider");
    }
    return context;
};
