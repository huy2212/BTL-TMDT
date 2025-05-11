import React from 'react';
import Header from '../components/Layout/Header/Header';
import SearchProducts from '../components/Route/SearchProducts/SearchProducts';
import Footer from '../components/Layout/Footer/Footer';
import { useLocation } from 'react-router-dom';

const SearchProductsPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query");
    return (
        <div>
            <Header />
            <SearchProducts query={query} />
            <Footer />
        </div>
    );
};

export default SearchProductsPage;