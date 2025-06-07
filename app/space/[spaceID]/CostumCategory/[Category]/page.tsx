'use client'

import React, {useEffect, use} from 'react';
import Search from '@/app/components/search';
import FileTypeFilter from '@/app/components/FileTypeFilter';
import SharedFilesGrid from '@/app/components/SharedFilesGrid';
import Sidebar from '@/app/components/sideBar';
import { getFilesInCategory } from '@/app/utils/getFilesInCategory';

const mockFiles = [
  { id: '1', name: 'Picture_1', type: 'image', size: '5 mb', sharedBy: 'marwan' },
  { id: '2', name: 'Word_1', type: 'word', size: '6 mb', sharedBy: 'zakaria' },
  { id: '3', name: 'Excel_1', type: 'excel', size: '10 mb', sharedBy: 'yassin' },
  { id: '4', name: 'PDF_1', type: 'pdf', size: '3 mb', sharedBy: 'khalid' },
  { id: '5', name: 'Picture_2', type: 'image', size: '4 mb', sharedBy: 'ayman' },
  { id: '6', name: 'Word_2', type: 'word', size: '5 mb', sharedBy: 'zakaria' },
];

const getFilterByType = (type: string): { filter: string } => {
  switch (type.toLowerCase()) {
    case 'application/msword':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return { filter: 'word' };
    case 'application/vnd.ms-excel':
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      return { filter: 'excel' };
    case 'application/pdf':
      return { filter: 'pdf' };
    case 'image/png':
    case 'image/jpg':
    case 'image/gif':
      return { filter: 'image' };
    default:
      return { filter: 'all' };
  }
};

interface UploadedFile {
  id: number;
  name: string;
  type: string;
  size: number;
  path: string;
  userId: number;
  categoryId: number;
  isShared: number;
  createdAt: string;
}



export default function SharedPage({ params }: { params: Promise<{ Category: string }> }) {
  const [selectedType, setSelectedType] = React.useState('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [Files, setFiles] = React.useState<UploadedFile[]>([]);
    const resolvedParams = use(params);

  useEffect(() => {
    const fetchFiles = async () => {
      const FetchedFiles = await getFilesInCategory(resolvedParams.Category);
      const {message, files} = FetchedFiles;
      console.log(files)
      setFiles(files);
    };

    fetchFiles();
  }, []);



  const filteredFiles = Files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || getFilterByType(file.type).filter === selectedType.toLowerCase();
    return matchesSearch && matchesType;
  });

  return (
    <div className="flex h-screen bg-[#0A192F]">
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
        />
      </div>
    </div>
  );
}