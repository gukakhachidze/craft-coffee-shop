import { createContext, useContext, useState, useEffect } from 'react';
import { useIngredients } from './IngredientsContext';

const CoffeesContext = createContext();

const channel =
  typeof BroadcastChannel !== 'undefined'
    ? new BroadcastChannel('craft-coffee-sync')
    : null;

export const useCoffees = () => {
  const context = useContext(CoffeesContext);
  if (!context) {
    throw new Error('useCoffees must be used within CoffeesProvider');
  }
  return context;
};

export const CoffeesProvider = ({ children }) => {
  const { ingredients } = useIngredients();

  const [coffees, setCoffees] = useState(() => {
    const stored = localStorage.getItem('coffees');
    return stored ? JSON.parse(stored) : [];
  });

  const [nextId, setNextId] = useState(() => {
    const stored = localStorage.getItem('coffees');
    if (stored) {
      const data = JSON.parse(stored);
      return data.length > 0 ? Math.max(...data.map((c) => c.id)) + 1 : 1;
    }
    return 1;
  });

  useEffect(() => {
    localStorage.setItem('coffees', JSON.stringify(coffees));
    if (channel) {
      channel.postMessage({
        type: 'COFFEES_UPDATE',
        data: coffees
      });
    }
  }, [coffees]);

  useEffect(() => {
    if (!channel) return;

    const handleMessage = (event) => {
      if (event.data.type === 'COFFEES_UPDATE') {
        setCoffees(event.data.data);
      }
    };

    channel.addEventListener('message', handleMessage);
    return () => channel.removeEventListener('message', handleMessage);
  }, []);

  const calculateTotalPrice = (ingredientIds) => {
    const ingredientsSum = ingredientIds.reduce((sum, id) => {
      const ingredient = ingredients.find((ing) => ing.id === parseInt(id));
      return sum + (ingredient ? ingredient.price : 0);
    }, 0);
    return 2 + ingredientsSum;
  };

  const addCoffee = (coffee) => {
    const totalPrice = calculateTotalPrice(coffee.ingredients);
    const newCoffee = {
      ...coffee,
      id: nextId,
      totalPrice
    };
    setCoffees((prev) => [...prev, newCoffee]);
    setNextId((prev) => prev + 1);
    return newCoffee;
  };

  const updateCoffee = (id, updates) => {
    setCoffees((prev) =>
      prev.map((coffee) => {
        if (coffee.id === id) {
          const updatedIngredients = updates.ingredients || coffee.ingredients;
          const totalPrice = calculateTotalPrice(updatedIngredients);
          return { ...coffee, ...updates, totalPrice };
        }
        return coffee;
      })
    );
  };

  const deleteCoffee = (id) => {
    setCoffees((prev) => prev.filter((coffee) => coffee.id !== id));
  };

  const getCoffeeById = (id) => {
    return coffees.find((coffee) => coffee.id === id);
  };

  useEffect(() => {
    if (coffees.length > 0) {
      setCoffees((prev) =>
        prev.map((coffee) => ({
          ...coffee,
          totalPrice: calculateTotalPrice(coffee.ingredients)
        }))
      );
    }
  }, [ingredients]);

  const value = {
    coffees,
    addCoffee,
    updateCoffee,
    deleteCoffee,
    getCoffeeById,
    calculateTotalPrice
  };

  return (
    <CoffeesContext.Provider value={value}>{children}</CoffeesContext.Provider>
  );
};
