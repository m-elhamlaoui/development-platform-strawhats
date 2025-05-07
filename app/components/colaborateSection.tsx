import React from 'react';
import CollaborateCard from './colaborateCard';

const departments = [
  { id: 1, name: "Dev Department", color: "bg-indigo-500", image: "/images/portrait.png" },
  { id: 2, name: "Marketing Department", color: "bg-teal-500", image: "/images/portrait2.png" },
  { id: 3, name: "djjs Department", color: "bg-pink-500", image: "/images/portrait3.png" },
  { id: 4, name: "slwlj Department", color: "bg-indigo-500", image: "/images/portrait4.png" },
];

const CollaborateSection: React.FC = () => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-4">Collaborate</h2>
      <div className="flex space-x-4">
        {departments.map((department) => (
          <CollaborateCard key={department.id} {...department} />
        ))}
      </div>
    </div>
  );
};

export default CollaborateSection;