import axios from 'axios';
import { Product, ProductFilters, ProductsResponse } from '../Types/productTypes';

const API_URL = 'http://localhost:5000/api/products';

export const fetchProducts = async (filters: ProductFilters): Promise<ProductsResponse> => {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      if (Array.isArray(value)) {
        params.append(key, value.join(','));
      } else {
        params.append(key, value.toString());
      }
    }
  });

  const response = await axios.get(`${API_URL}?${params.toString()}`);
  return response.data;
};

export const updateProduct = async (id: string, productData: Partial<Product>): Promise<Product> => {
  const response = await axios.put(`${API_URL}/${id}`, productData);
  return response.data;
};

export const toggleProductVisibility = async (id: string): Promise<Product> => {
  const response = await axios.put(`${API_URL}/${id}/toggle-visibility`);
  return response.data;
};

export const uploadProducts = async (file: File): Promise<void> => {
  const formData = new FormData();
  formData.append('file', file);
  
  await axios.post(`${API_URL}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};