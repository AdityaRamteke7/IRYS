export interface Product {
    _id: string;
    name: string;
    price: number;
    stock: number;
    category: string;
    isVisible: boolean;
    isEnabled: boolean;
}

export interface ProductFilters {
    minPrice?: number;
    maxPrice?: number;
    minStock?: number;
    maxStock?: number;
    lowStock?: boolean;
    outOfStock?: boolean;
    categories?: string[];
    page?: number;
    limit?: number;
}

export interface ProductsResponse {
    products: Product[];
    totalPages: number;
    currentPage: number;
}

export interface CategoryOption {
    value: string;
    label: string;
}