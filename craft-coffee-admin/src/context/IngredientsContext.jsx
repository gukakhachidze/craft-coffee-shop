import { createContext, useContext, useState, useEffect } from 'react';

const IngredientsContext = createContext();

// Broadcast Channel ყველა ტაბისთვის
const channel =
  typeof BroadcastChannel !== 'undefined'
    ? new BroadcastChannel('craft-coffee-sync')
    : null;

export const useIngredients = () => {
  const context = useContext(IngredientsContext);
  if (!context) {
    throw new Error('useIngredients must be used within IngredientsProvider');
  }
  return context;
};

export const IngredientsProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState(() => {
    const stored = localStorage.getItem('ingredients');
    return stored ? JSON.parse(stored) : [];
  });

  const [nextId, setNextId] = useState(() => {
    const stored = localStorage.getItem('ingredients');
    if (stored) {
      const data = JSON.parse(stored);
      return data.length > 0 ? Math.max(...data.map((i) => i.id)) + 1 : 1;
    }
    return 1;
  });

  // localStorage-ში შენახვა
  useEffect(() => {
    localStorage.setItem('ingredients', JSON.stringify(ingredients));
    // ყველა ტაბს აცნობებს ცვლილებების შესახებ
    if (channel) {
      channel.postMessage({
        type: 'INGREDIENTS_UPDATE',
        data: ingredients
      });
    }
  }, [ingredients]);

  // სხვა ტაბებიდან ცვლილებების მოსმენა
  useEffect(() => {
    if (!channel) return;

    const handleMessage = (event) => {
      if (event.data.type === 'INGREDIENTS_UPDATE') {
        setIngredients(event.data.data);
      }
    };

    channel.addEventListener('message', handleMessage);
    return () => channel.removeEventListener('message', handleMessage);
  }, []);

  const addIngredient = (ingredient) => {
    const newIngredient = {
      ...ingredient,
      id: nextId,
      price: parseFloat(ingredient.price)
    };
    setIngredients((prev) => [...prev, newIngredient]);
    setNextId((prev) => prev + 1);
    return newIngredient;
  };

  const updateIngredient = (id, updates) => {
    setIngredients((prev) =>
      prev.map((ingredient) =>
        ingredient.id === id
          ? { ...ingredient, ...updates, price: parseFloat(updates.price) }
          : ingredient
      )
    );
  };

  const deleteIngredient = (id) => {
    setIngredients((prev) => prev.filter((ingredient) => ingredient.id !== id));
  };

  const getIngredientById = (id) => {
    return ingredients.find((ingredient) => ingredient.id === id);
  };

  const value = {
    ingredients,
    addIngredient,
    updateIngredient,
    deleteIngredient,
    getIngredientById
  };

  return (
    <IngredientsContext.Provider value={value}>
      {children}
    </IngredientsContext.Provider>
  );
};
