import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { GlobalStyles } from './styles/GlobalStyles';
import Header from './components/common/Header';
import IngredientsPage from './pages/IngredientsPage';
import IngredientDetailPage from './pages/IngredientDetailPage';
import CoffeesPage from './pages/CoffeesPage';
import CoffeeDetailPage from './pages/CoffeeDetailPage';

function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <GlobalStyles />
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/coffees" />} />
          <Route path="/ingredients" element={<IngredientsPage />} />
          <Route path="/ingredients/:id" element={<IngredientDetailPage />} />
          <Route path="/coffees" element={<CoffeesPage />} />
          <Route path="/coffees/:id" element={<CoffeeDetailPage />} />
        </Routes>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
