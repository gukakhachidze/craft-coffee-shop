import { createContext, useContext, useState, useEffect } from 'react';

const IngredientsContext = createContext();

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

  useEffect(() => {
    localStorage.setItem('ingredients', JSON.stringify(ingredients));
  }, [ingredients]);

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
