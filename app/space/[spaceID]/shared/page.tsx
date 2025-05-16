'use client'

import React, {useEffect, useState} from 'react';
import Search from '../../../components/search';
import FileTypeFilter from '../../../components/FileTypeFilter';
import SharedFilesGrid from '../../../components/SharedFilesGrid';
import Sidebar from '../../../components/sideBar';
import { FaFileWord, FaFileExcel, FaFilePdf, FaFileImage, FaFile } from 'react-icons/fa';
import { getSharedFiles } from '@/app/utils/getSharedFiles';

const mockFiles = [
  { id: '1', name: 'Picture_1', type: 'image', size: '5 mb', sharedBy: 'marwan' },
  { id: '2', name: 'Word_1', type: 'word', size: '6 mb', sharedBy: 'zakaria' },
  { id: '3', name: 'Excel_1', type: 'excel', size: '10 mb', sharedBy: 'yassin' },
  { id: '4', name: 'PDF_1', type: 'pdf', size: '3 mb', sharedBy: 'khalid' },
  { id: '5', name: 'Picture_2', type: 'image', size: '4 mb', sharedBy: 'ayman' },
  { id: '6', name: 'Word_2', type: 'word', size: '5 mb', sharedBy: 'zakaria' },
];

const getFileIconAndColor = (type: string): { icon: React.ElementType; color: string } => {
  switch (type.toLowerCase()) {
    case 'application/msword':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return { icon: FaFileWord, color: 'text-indigo-500' };
    case 'application/vnd.ms-excel':
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      return { icon: FaFileExcel, color: 'text-teal-500' };
    case 'application/pdf':
      return { icon: FaFilePdf, color: 'text-pink-500' };
    case 'image/png':
    case 'image/jpg':
    case 'image/gif':
      return { icon: FaFileImage, color: 'text-blue-500' };
    default:
      return { icon: FaFile, color: 'text-gray-500' };
  }
};

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

interface SharedFiles {
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


export default function SharedPage() {
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [Files, setFiles] = useState<SharedFiles[]>([])

  useEffect(() => {
    const fetchUser = async () => {
      const sharedFiles = await getSharedFiles();
      console.log(sharedFiles);
      setFiles(sharedFiles.sharedFiles);
    };

    fetchUser();
  }, []);

  const filteredFiles = Files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || getFilterByType(file.type).filter === selectedType.toLowerCase();
    return matchesSearch && matchesType;
  });

  const handleDownload = (filePath: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName; // forces download instead of navigating
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex h-screen bg-[#EBF2FC]">
      <Sidebar />
      
      <div className="flex-1 p-6 ml-52">
        <div className="mb-6">
          <Search onSearch={setSearchQuery} />
        </div>

        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Your Shared Files</h1>
        
        <FileTypeFilter
          selectedType={selectedType}
          onTypeSelect={setSelectedType}
        />

        <SharedFilesGrid
          files={filteredFiles}
        />

        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Shared Recently</h2>
          <div className="space-y-4">
            {filteredFiles.slice(0, 4).map((file) => {
              const { icon: Icon, color } = getFileIconAndColor(file.type);
              return (
                <div key={file.id} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleDownload(file.path, file.name)}>
                  <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                    <Icon className={`text-xl ${color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{file.name.split('-')[1]}</h3>
                    <p className="text-sm text-gray-500">{file.type === "application/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? "word" : file.type === "application/vnd.ms-excel" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ? "excel" : file.type} file</p>
                  </div>
                  <div className="text-sm text-gray-500">{(file.size/(1024*1024)).toFixed(1)} mb</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}