import React from "react";

import ProductCard from "./ProductCard";
import { Product } from "../Types/productTypes";

interface ProductListProps {
  products: Product[];
  onUpdateProduct: (id: string, updatedData: Partial<Product>) => Promise<void>;
  onToggleVisibility: (id: string) => Promise<void>;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onUpdateProduct,
  onToggleVisibility,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        {products.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">No products found</p>
          </div>
        ) : (
          <ul className="divide-y">
            {products.map((product) => (
              <li key={product._id} className="py-2">
                <ProductCard
                  product={product}
                  onUpdate={(updatedData: Partial<Product>) =>
                    onUpdateProduct(product._id, updatedData)
                  }
                  onToggleVisibility={() => onToggleVisibility(product._id)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`mx-1 px-3 py-1 rounded transition-colors ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;

