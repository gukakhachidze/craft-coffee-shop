import { createContext, useContext, useState, useEffect } from 'react';

const IngredientsContext = createContext();
const API_URL = 'http://localhost:3001/ingredients';

export const useIngredients = () => {
  const context = useContext(IngredientsContext);
  if (!context) {
    throw new Error('useIngredients must be used within IngredientsProvider');
  }
  return context;
};

export const IngredientsProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchIngredients = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch ingredients');
      const data = await response.json();
      setIngredients(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching ingredients:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  const addIngredient = async (ingredient) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...ingredient,
          price: parseFloat(ingredient.price)
        })
      });
      if (!response.ok) throw new Error('Failed to add ingredient');
      const newIngredient = await response.json();
      setIngredients((prev) => [...prev, newIngredient]);
      return newIngredient;
    } catch (err) {
      console.error('Error adding ingredient:', err);
      alert('შეცდომა: ინგრედიენტის დამატება ვერ მოხერხდა');
      throw err;
    }
  };

  const updateIngredient = async (id, updates) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...updates,
          price: parseFloat(updates.price)
        })
      });
      if (!response.ok) throw new Error('Failed to update ingredient');
      const updatedIngredient = await response.json();
      setIngredients((prev) =>
        prev.map((ing) => (ing.id === id ? updatedIngredient : ing))
      );
    } catch (err) {
      console.error('Error updating ingredient:', err);
      alert('შეცდომა: ინგრედიენტის განახლება ვერ მოხერხდა');
      throw err;
    }
  };

  const deleteIngredient = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete ingredient');
      setIngredients((prev) => prev.filter((ing) => ing.id !== id));
    } catch (err) {
      console.error('Error deleting ingredient:', err);
      alert('შეცდომა: ინგრედიენტის წაშლა ვერ მოხერხდა');
      throw err;
    }
  };

  const getIngredientById = (id) => {
    return ingredients.find((ingredient) => ingredient.id === parseInt(id));
  };

  const value = {
    ingredients,
    loading,
    error,
    addIngredient,
    updateIngredient,
    deleteIngredient,
    getIngredientById,
    refresh: fetchIngredients
  };

  return (
    <IngredientsContext.Provider value={value}>
      {children}
    </IngredientsContext.Provider>
  );
};
