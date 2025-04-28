import React, { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductList from "../components/ProductList";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { uploadProducts } from "../api/productApi";

const ProductsPage: React.FC = () => {
  const [showHidden, setShowHidden] = useState(false);
  const {
    products,
    totalPages,
    currentPage,
    categories,
    loading,
    error,
    filters,
    updateFilters,
    changePage,
  } = useProducts();

  const handleUpdateProduct = async (id: string, updatedData: any) => {
    try {
      await updateProduct(id, updatedData);
    } catch (err) {
      console.error("Failed to update product:", err);
    }
  };

  const handleToggleVisibility = async (id: string) => {
    try {
      await toggleProductVisibility(id);
    } catch (err) {
      console.error("Failed to toggle visibility:", err);
    }
  };

  const handleUpload = async (file: File) => {
    try {
      await uploadProducts(file);
      // Filters will trigger a refetch automatically
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onUpload={handleUpload} />
      <div className="flex flex-1">
        <Sidebar
          categories={categories}
          filters={filters}
          onFilterChange={updateFilters}
          showHidden={showHidden}
          onToggleShowHidden={() => setShowHidden(!showHidden)}
        />
        <main className="flex-1 p-4 overflow-auto">
          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          {!loading && !error && (
            <ProductList
              products={
                showHidden ? products : products.filter((p) => p.isVisible)
              }
              onUpdateProduct={handleUpdateProduct}
              onToggleVisibility={handleToggleVisibility}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={changePage}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;
