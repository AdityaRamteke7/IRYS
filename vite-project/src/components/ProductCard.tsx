import React, { useState } from "react";
import { Product } from "../types/productTypes";
import { FiEdit, FiEye, FiEyeOff, FiSave, FiX } from "react-icons/fi";

interface ProductCardProps {
  product: Product;
  onUpdate: (updatedData: Partial<Product>) => Promise<void>;
  onToggleVisibility: () => Promise<void>;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onUpdate,
  onToggleVisibility,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<Partial<Product>>({
    name: product.name,
    price: product.price,
    stock: product.stock,
    category: product.category,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]:
        name === "price"
          ? parseFloat(value) || 0
          : name === "stock"
          ? parseInt(value) || 0
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdate(editedData);
    setIsEditing(false);
  };

  const getStockStatus = () => {
    if (product.stock === 0) return "Out of Stock";
    if (product.stock < 10) return "Low Stock";
    if (product.stock <= 20) return "Medium Stock";
    return "High Stock";
  };

  const getStockColor = () => {
    if (product.stock === 0) return "bg-red-100 text-red-800";
    if (product.stock < 10) return "bg-yellow-100 text-yellow-800";
    if (product.stock <= 20) return "bg-orange-100 text-orange-800";
    return "bg-green-100 text-green-800";
  };

  if (!product.isVisible) {
    return (
      <div className="border rounded p-4 mb-4 bg-gray-100 opacity-75 transition-all duration-200">
        <div className="flex justify-between items-center">
          <span className="font-semibold line-through">{product.name}</span>
          <button
            onClick={onToggleVisibility}
            className="flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            <FiEye className="mr-1" /> Show
          </button>
        </div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="border rounded p-4 mb-4 bg-white shadow-md transition-all duration-200">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={editedData.name || ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                min="0"
                step="0.01"
                value={editedData.price || 0}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                min="0"
                value={editedData.stock || 0}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={editedData.category || ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FiX className="mr-1" /> Cancel
            </button>
            <button
              type="submit"
              className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FiSave className="mr-1" /> Save
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="border rounded p-4 mb-4 bg-white shadow-md hover:shadow-lg transition-all duration-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600">${product.price.toFixed(2)}</p>
          <p className="text-gray-600">Category: {product.category}</p>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStockColor()}`}
          >
            {getStockStatus()}
          </span>
          {product.stock === 0 && (
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Out of Stock
            </span>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-blue-500 hover:text-blue-700 transition-colors"
            title="Edit"
          >
            <FiEdit size={20} />
          </button>
          <button
            onClick={onToggleVisibility}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            title="Hide"
          >
            <FiEyeOff size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
