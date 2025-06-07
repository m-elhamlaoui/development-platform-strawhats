import React from 'react';

interface FileType {
  id: string;
  name: string;
  icon: string;
}

interface FileTypeFilterProps {
  selectedType: string;
  onTypeSelect: (type: string) => void;
}

const fileTypes: FileType[] = [
  { id: 'all', name: 'All Files', icon: '📄' },
  { id: 'word', name: 'Word', icon: '📝' },
  { id: 'excel', name: 'Excel', icon: '📊' },
  { id: 'pdf', name: 'PDF', icon: '📰' },
  { id: 'image', name: 'Images', icon: '🖼️' },
];

export default function FileTypeFilter({ selectedType, onTypeSelect }: FileTypeFilterProps) {
  return (
    <div className="flex gap-4 mb-6 p-4 bg-[#111827] rounded-lg shadow-sm">
      {fileTypes.map((type) => (
        <button
          key={type.id}
          onClick={() => onTypeSelect(type.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
            ${selectedType === type.id 
              ? 'bg-blue-100 text-blue-600' 
              : 'hover:bg-gray-100 hover:text-blue-600 text-white'
            }`}
        >
          <span>{type.icon}</span>
          <span>{type.name}</span>
        </button>
      ))}
    </div>
  );
} 