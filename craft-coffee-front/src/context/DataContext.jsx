import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState(() => {
    const stored = localStorage.getItem('ingredients');
    return stored ? JSON.parse(stored) : [];
  });

  const [coffees, setCoffees] = useState(() => {
    const stored = localStorage.getItem('coffees');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const storedIngredients = localStorage.getItem('ingredients');
      const storedCoffees = localStorage.getItem('coffees');

      if (storedIngredients) {
        setIngredients(JSON.parse(storedIngredients));
      }
      if (storedCoffees) {
        setCoffees(JSON.parse(storedCoffees));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    const interval = setInterval(() => {
      handleStorageChange();
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const getIngredientById = (id) => {
    return ingredients.find((ingredient) => ingredient.id === parseInt(id));
  };

  const getCoffeeById = (id) => {
    return coffees.find((coffee) => coffee.id === parseInt(id));
  };

  const getCoffeeIngredients = (coffee) => {
    return coffee.ingredients
      .map((id) => getIngredientById(id))
      .filter(Boolean);
  };

  const value = {
    ingredients,
    coffees,
    getIngredientById,
    getCoffeeById,
    getCoffeeIngredients
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
