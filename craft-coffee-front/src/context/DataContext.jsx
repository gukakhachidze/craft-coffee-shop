import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();
const API_BASE = 'http://localhost:3001';

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState([]);
  const [coffees, setCoffees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [ingredientsRes, coffeesRes] = await Promise.all([
        fetch(`${API_BASE}/ingredients`),
        fetch(`${API_BASE}/coffees`)
      ]);

      if (!ingredientsRes.ok || !coffeesRes.ok) {
        throw new Error('Failed to fetch data from server');
      }

      const [ingredientsData, coffeesData] = await Promise.all([
        ingredientsRes.json(),
        coffeesRes.json()
      ]);

      setIngredients(ingredientsData);
      setCoffees(coffeesData);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  // თავიდან ჩატვირთვა
  useEffect(() => {
    fetchData();
  }, []);

  // ავტომატური განახლება ყოველ 3 წამში
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getIngredientById = (id) => {
    // ID შეიძლება იყოს როგორც number ისე string
    return ingredients.find(
      (ingredient) =>
        ingredient.id === id ||
        ingredient.id === parseInt(id) ||
        String(ingredient.id) === String(id)
    );
  };

  const getCoffeeById = (id) => {
    // ID შეიძლება იყოს როგორც number ისე string
    return coffees.find(
      (coffee) =>
        coffee.id === id ||
        coffee.id === parseInt(id) ||
        String(coffee.id) === String(id)
    );
  };

  const getCoffeeIngredients = (coffee) => {
    return coffee.ingredients
      .map((id) => getIngredientById(id))
      .filter(Boolean);
  };

  const value = {
    ingredients,
    coffees,
    loading,
    error,
    getIngredientById,
    getCoffeeById,
    getCoffeeIngredients,
    refresh: fetchData
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
