import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { IngredientsProvider } from './context/IngredientsContext';
import { CoffeesProvider } from './context/CoffeesContext';
import IngredientsPage from './pages/IngredientsPage';
import CoffeesPage from './pages/CoffeesPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <IngredientsProvider>
        <CoffeesProvider>
          <div className="app">
            <nav className="navbar">
              <div className="navbar-container">
                <h1 className="logo">☕ Craft Coffee Admin</h1>
                <div className="nav-links">
                  <Link to="/ingredients" className="nav-link">
                    ინგრედიენტები
                  </Link>
                  <Link to="/coffees" className="nav-link">
                    ყავის კატალოგი
                  </Link>
                </div>
              </div>
            </nav>

            <main className="main-content">
              <Routes>
                <Route path="/" element={<Navigate to="/ingredients" />} />
                <Route path="/ingredients" element={<IngredientsPage />} />
                <Route path="/coffees" element={<CoffeesPage />} />
              </Routes>
            </main>
          </div>
        </CoffeesProvider>
      </IngredientsProvider>
    </BrowserRouter>
  );
}

export default App;
