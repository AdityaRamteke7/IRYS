import React from "react";
import { ProductFilters } from "../types/productTypes";

interface FiltersProps {
  categories: string[];
  filters: ProductFilters;
  onFilterChange: (newFilters: Partial<ProductFilters>) => void;
  showHidden: boolean;
  onToggleShowHidden: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  categories,
  filters,
  onFilterChange,
  showHidden,
  onToggleShowHidden,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    onFilterChange({
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    let newCategories = filters.categories ? [...filters.categories] : [];

    if (checked) {
      newCategories.push(value);
    } else {
      newCategories = newCategories.filter((cat) => cat !== value);
    }

    onFilterChange({
      categories: newCategories.length > 0 ? newCategories : undefined,
    });
  };

  return (
    <div className="p-4 bg-gray-50 h-full overflow-y-auto sticky top-0">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price Range
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            name="minPrice"
            placeholder="Min"
            value={filters.minPrice || ""}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max"
            value={filters.maxPrice || ""}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Stock Range
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            name="minStock"
            placeholder="Min"
            min="0"
            value={filters.minStock || ""}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="maxStock"
            placeholder="Max"
            min="0"
            value={filters.maxStock || ""}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="lowStock"
            name="lowStock"
            checked={!!filters.lowStock}
            onChange={handleInputChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="lowStock"
            className="ml-2 block text-sm text-gray-700"
          >
            Only Low Stock (&lt;10)
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="outOfStock"
            name="outOfStock"
            checked={!!filters.outOfStock}
            onChange={handleInputChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="outOfStock"
            className="ml-2 block text-sm text-gray-700"
          >
            Only Out of Stock
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Categories
        </label>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {categories.map((category) => (
            <div key={category} className="flex items-center">
              <input
                type="checkbox"
                id={`cat-${category}`}
                value={category}
                checked={filters.categories?.includes(category) || false}
                onChange={handleCategoryChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor={`cat-${category}`}
                className="ml-2 block text-sm text-gray-700"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="showHidden"
          checked={showHidden}
          onChange={onToggleShowHidden}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label
          htmlFor="showHidden"
          className="ml-2 block text-sm text-gray-700"
        >
          Show Hidden Products
        </label>
      </div>
    </div>
  );
};

export default Filters;
                                                  