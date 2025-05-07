'use client'

import React from 'react';
import Search from '@/app/components/search';
import FileTypeFilter from '@/app/components/FileTypeFilter';
import SharedFilesGrid from '@/app/components/SharedFilesGrid';
import Sidebar from '@/app/components/sideBar';

const mockFiles = [
  { id: '1', name: 'Picture_1', type: 'image', size: '5 mb', sharedBy: 'marwan' },
  { id: '2', name: 'Word_1', type: 'word', size: '6 mb', sharedBy: 'zakaria' },
  { id: '3', name: 'Excel_1', type: 'excel', size: '10 mb', sharedBy: 'yassin' },
  { id: '4', name: 'PDF_1', type: 'pdf', size: '3 mb', sharedBy: 'khalid' },
  { id: '5', name: 'Picture_2', type: 'image', size: '4 mb', sharedBy: 'ayman' },
  { id: '6', name: 'Word_2', type: 'word', size: '5 mb', sharedBy: 'zakaria' },
];



export default function SharedPage() {
  const [selectedType, setSelectedType] = React.useState('all');
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredFiles = mockFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || file.type.toLowerCase() === selectedType.toLowerCase();
    return matchesSearch && matchesType;
  });

  return (
    <div className="flex h-screen bg-[#EBF2FC]">
      <Sidebar />
      
      <div className="flex-1 p-6 ml-52">
        <div className="mb-6">
          <Search onSearch={setSearchQuery} />
        </div>

        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Your Category Files</h1>
        
        <FileTypeFilter
          selectedType={selectedType}
          onTypeSelect={setSelectedType}
        />

        <SharedFilesGrid
          files={filteredFiles}
          selectedType={selectedType}
        />
      </div>
    </div>
  );
}