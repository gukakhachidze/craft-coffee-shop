import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

const channel =
  typeof BroadcastChannel !== 'undefined'
    ? new BroadcastChannel('craft-coffee-sync')
    : null;

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

  // სხვა ტაბებიდან ცვლილებების მოსმენა
  useEffect(() => {
    if (!channel) return;

    const handleMessage = (event) => {
      if (event.data.type === 'INGREDIENTS_UPDATE') {
        setIngredients(event.data.data);
        localStorage.setItem('ingredients', JSON.stringify(event.data.data));
      } else if (event.data.type === 'COFFEES_UPDATE') {
        setCoffees(event.data.data);
        localStorage.setItem('coffees', JSON.stringify(event.data.data));
      }
    };

    channel.addEventListener('message', handleMessage);

    return () => {
      channel.removeEventListener('message', handleMessage);
    };
  }, []);

  // localStorage-დან პერიოდულად წაკითხვა (backup)
  useEffect(() => {
    const syncFromStorage = () => {
      const storedIngredients = localStorage.getItem('ingredients');
      const storedCoffees = localStorage.getItem('coffees');

      if (storedIngredients) {
        const parsed = JSON.parse(storedIngredients);
        setIngredients((prev) =>
          JSON.stringify(prev) !== storedIngredients ? parsed : prev
        );
      }
      if (storedCoffees) {
        const parsed = JSON.parse(storedCoffees);
        setCoffees((prev) =>
          JSON.stringify(prev) !== storedCoffees ? parsed : prev
        );
      }
    };

    const interval = setInterval(syncFromStorage, 2000);
    return () => clearInterval(interval);
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
