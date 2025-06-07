import React from 'react';
import CategoryCard from './categoryCard';
import { FaImage, FaFilePdf, FaFileExcel, FaFileWord } from 'react-icons/fa';

const categories = [
  { id: 1, name: "Pictures", count: 480, color: "bg-indigo-500", iconColor: "text-indigo-500", icon: FaImage },
  { id: 2, name: "PDFs", count: 480, color: "bg-teal-500", iconColor: "text-teal-500", icon: FaFilePdf },
  { id: 3, name: "Exels", count: 480, color: "bg-pink-500", iconColor: "text-pink-500", icon: FaFileExcel },
  { id: 4, name: "Words", count: 480, color: "bg-indigo-500", iconColor: "text-indigo-500", icon: FaFileWord },
];

const CategorySection: React.FC = () => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-4 text-[#40A9FF]">categories</h2>
      <div className="flex space-x-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} {...category} />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;