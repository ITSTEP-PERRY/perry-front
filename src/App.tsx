import { Route, Routes } from 'react-router';

import { CartPage } from './pages/CartPage/CartPage';
import { CategoryPage } from './pages/CategoryPage/CategoryPage';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { ProductPage } from './pages/ProductPage/ProductPage'; 
import { SearchPage } from './pages/SearchPage/SearchPage';

import './App.css';

const App = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={<HomePage />}
            />

            <Route
                path="/cart"
                element={<CartPage />}
            />

            <Route
                path="/search"
                element={<SearchPage />}
            />

            <Route
                path="/category/:categotyId"
                element={<CategoryPage />}
            />

            <Route
                path="/product/:productId"
                element={<ProductPage />}
            />

            <Route
                path="*"
                element={<NotFoundPage />}
            />
        </Routes>
    );
};

export default App;