import React from "react";
import FileUpload from "./FileUpload";

interface HeaderProps {
  onUpload: (file: File) => void;
}

const Header: React.FC<HeaderProps> = ({ onUpload }) => {
  return (
    <header className="bg-white shadow sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">Product Management</h1>
        <FileUpload onUpload={onUpload} />
      </div>
    </header>
  );
};

export default Header;
