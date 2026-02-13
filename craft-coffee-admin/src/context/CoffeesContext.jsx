import { createContext, useContext, useState, useEffect } from 'react';
import { useIngredients } from './IngredientsContext';

const CoffeesContext = createContext();
const API_URL = 'http://localhost:3001/coffees';

export const useCoffees = () => {
  const context = useContext(CoffeesContext);
  if (!context) {
    throw new Error('useCoffees must be used within CoffeesProvider');
  }
  return context;
};

export const CoffeesProvider = ({ children }) => {
  const { ingredients } = useIngredients();
  const [coffees, setCoffees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCoffees = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch coffees');
      const data = await response.json();
      setCoffees(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching coffees:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoffees();
  }, []);

  const calculateTotalPrice = (ingredientIds) => {
    const ingredientsSum = ingredientIds.reduce((sum, id) => {
      const ingredient = ingredients.find((ing) => ing.id === parseInt(id));
      return sum + (ingredient ? ingredient.price : 0);
    }, 0);
    return 2 + ingredientsSum;
  };

  const addCoffee = async (coffee) => {
    try {
      const totalPrice = calculateTotalPrice(coffee.ingredients);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...coffee,
          totalPrice
        })
      });
      if (!response.ok) throw new Error('Failed to add coffee');
      const newCoffee = await response.json();
      setCoffees((prev) => [...prev, newCoffee]);
      return newCoffee;
    } catch (err) {
      console.error('Error adding coffee:', err);
      alert('შეცდომა: ყავის დამატება ვერ მოხერხდა');
      throw err;
    }
  };

  const updateCoffee = async (id, updates) => {
    try {
      const updatedIngredients = updates.ingredients;
      const totalPrice = calculateTotalPrice(updatedIngredients);
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...updates,
          totalPrice
        })
      });
      if (!response.ok) throw new Error('Failed to update coffee');
      const updatedCoffee = await response.json();
      setCoffees((prev) =>
        prev.map((coffee) => (coffee.id === id ? updatedCoffee : coffee))
      );
    } catch (err) {
      console.error('Error updating coffee:', err);
      alert('შეცდომა: ყავის განახლება ვერ მოხერხდა');
      throw err;
    }
  };

  const deleteCoffee = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete coffee');
      setCoffees((prev) => prev.filter((coffee) => coffee.id !== id));
    } catch (err) {
      console.error('Error deleting coffee:', err);
      alert('შეცდომა: ყავის წაშლა ვერ მოხერხდა');
      throw err;
    }
  };

  const getCoffeeById = (id) => {
    return coffees.find((coffee) => coffee.id === parseInt(id));
  };

  // ინგრედიენტების ცვლილებისას ყავის ფასების განახლება
  useEffect(() => {
    const updateAllCoffeePrices = async () => {
      if (coffees.length === 0 || ingredients.length === 0) return;

      try {
        const updates = coffees.map(async (coffee) => {
          const newTotalPrice = calculateTotalPrice(coffee.ingredients);
          if (newTotalPrice !== coffee.totalPrice) {
            const response = await fetch(`${API_URL}/${coffee.id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ totalPrice: newTotalPrice })
            });
            return response.json();
          }
          return coffee;
        });

        const updatedCoffees = await Promise.all(updates);
        setCoffees(updatedCoffees);
      } catch (err) {
        console.error('Error updating coffee prices:', err);
      }
    };

    updateAllCoffeePrices();
  }, [ingredients]);

  const value = {
    coffees,
    loading,
    error,
    addCoffee,
    updateCoffee,
    deleteCoffee,
    getCoffeeById,
    calculateTotalPrice,
    refresh: fetchCoffees
  };

  return (
    <CoffeesContext.Provider value={value}>{children}</CoffeesContext.Provider>
  );
};
