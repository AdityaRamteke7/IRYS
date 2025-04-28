import React from "react";
import Filters from "./Filters";
import { ProductFilters } from "../types/productTypes";

interface SidebarProps {
  categories: string[];
  filters: ProductFilters;
  onFilterChange: (newFilters: Partial<ProductFilters>) => void;
  showHidden: boolean;
  onToggleShowHidden: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  categories,
  filters,
  onFilterChange,
  showHidden,
  onToggleShowHidden,
}) => {
  return (
    <aside className="w-64 bg-white shadow-md h-screen sticky top-0 overflow-y-auto">
      <Filters
        categories={categories}
        filters={filters}
        onFilterChange={onFilterChange}
        showHidden={showHidden}
        onToggleShowHidden={onToggleShowHidden}
      />
    </aside>
  );
};

export default Sidebar;
