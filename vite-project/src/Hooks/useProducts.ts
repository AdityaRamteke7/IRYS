import { useState, useEffect } from 'react';
import { fetchProducts } from '../api/productApi';
import { Product, ProductFilters, ProductsResponse } from '../types/productTypes';

export const useProducts = (initialFilters: ProductFilters = {}) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<ProductFilters>({
        page: 1,
        limit: 20,
        ...initialFilters
    });

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchProducts(filters);
                setProducts(data.products);
                setTotalPages(data.totalPages);
                setCurrentPage(data.currentPage);

                // Extract unique categories
                const uniqueCategories = Array.from(
                    new Set(data.products.map(p => p.category))
                );
                setCategories(uniqueCategories);
            } catch (err) {
                setError('Failed to fetch products');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [filters]);

    const updateFilters = (newFilters: Partial<ProductFilters>) => {
        setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
    };

    const changePage = (page: number) => {
        setFilters(prev => ({ ...prev, page }));
    };

    return {
        products,
        totalPages,
        currentPage,
        categories,
        loading,
        error,
        filters,
        updateFilters,
        changePage,
    };
};