'use client';

import React, { useState, useEffect } from 'react';
import Search from '../../../../components/search';
import Sidebar from '../../../../components/sideBar';

// Icons
import {
  FaFileWord,
  FaFileExcel,
  FaFilePdf,
  FaFileImage,
  FaFile,
  FaCog,
  FaTrash,
  FaShare,
  FaPaperPlane,
  FaTimes,
} from 'react-icons/fa';

// Utilities
import { getFilesByType } from '@/app/utils/getFilesByType';
import { shareWithDepatement } from '@/app/utils/shareWithDepartement';
import { shareWithUser } from '@/app/utils/shareWithUser';
import { addFileToCategory } from '@/app/utils/addFileToCategory';
import { deleteFile } from '@/app/utils/deleteFile';


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

export default function CategoryFilesPage({ params }: { params: Promise<{ fileType: string }> }) {
  const resolvedParams = React.use(params);
  const [searchQuery, setSearchQuery] = useState('');
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isConfig, setIsConfig] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [sendTo, setSendTo] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [fileId, setFileId] = useState<number>(0);

  // Fetch files on mount
  useEffect(() => {
    const fetchFiles = async () => {
      const result = await getFilesByType(resolvedParams.fileType);
      if (result?.files) {
        setFiles(result.files);
      }
    };

    fetchFiles();
  }, [resolvedParams.fileType]);

  const handleSettings = (id: number) => {
    setIsConfig(!isConfig);
    setFileId(id);
  };

  const handleDelete = (fileId: number) => {
    console.log('Deleting file:', fileId);
    deleteFile(fileId);
    setIsConfig(false);
  };

  const handleShare = (id: number) => {
    setIsSend(!isSend);
    setFileId(id);
  };

  const handleSendToDepartment = (fileId: number) => {
    shareWithDepatement(fileId);
    setIsSend(false);
  };

  const handleSendToUser = (fileId: number) => {
    shareWithUser(fileId, sendTo);
    setIsSend(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New category:', newCategoryName);
    addFileToCategory(newCategoryName, fileId);
    setNewCategoryName('');
    setIsModalOpen(false);
  };

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#0A192F]">
      <Sidebar />

      <div className="flex-1 p-6 ml-52">
        {/* Search Bar */}
        <div className="mb-6">
          <Search onSearch={setSearchQuery} />
        </div>

        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-[#40A9FF] mb-6">Category Files</h1>

        {/* File Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFiles.map((file) => {
            const { icon: Icon, color } = getFileIconAndColor(file.type);
            return (
              <div
                key={file.id}
                className="bg-[#111827] rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer relative"
              >
                {/* Settings Button */}
                <button
                  className="text-gray-500 hover:text-indigo-500 transition-colors cursor-pointer absolute top-4 right-4"
                  onClick={() => handleSettings(file.id)}
                >
                  <FaCog className="text-lg" />
                </button>

                {/* Config Menu */}
                {isConfig && file.id === fileId && (
                  <div className="absolute right-0 top-12 mt-2 bg-white rounded-lg shadow-xl p-4 z-50">
                    <button
                      onClick={() => handleDelete(file.id)}
                      className="mb-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center gap-2 w-full cursor-pointer"
                    >
                      <FaTrash />
                      Delete File
                    </button>
                    <button
                      onClick={() => {
                        setIsModalOpen(true);
                        setFileId(file.id);
                      }}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-2 w-full cursor-pointer"
                    >
                      <FaFile />
                      Add To Category
                    </button>
                  </div>
                )}

                {/* Share Button */}
                <button
                  className="text-gray-500 hover:text-indigo-500 transition-colors cursor-pointer absolute bottom-4 right-4"
                  onClick={() => handleShare(file.id)}
                >
                  <FaShare className="text-lg" />
                </button>

                {/* Send Menu */}
                {isSend && file.id === fileId && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl p-4 z-50">
                    <div className="space-y-4">
                      <button
                        onClick={() => handleSendToDepartment(file.id)}
                        className="px-4 py-2 bg-[#06367A] text-white rounded-md hover:bg-[#052b5f] transition-colors flex items-center gap-2"
                      >
                        <FaPaperPlane />
                        Send to Department
                      </button>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={sendTo}
                          onChange={(e) => setSendTo(e.target.value)}
                          placeholder="Send to"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#06367A] focus:border-transparent"
                        />
                        <button
                          onClick={() => handleSendToUser(file.id)}
                          className="px-4 py-2 bg-[#06367A] text-white rounded-md hover:bg-[#052b5f] transition-colors flex items-center gap-2"
                        >
                          <FaPaperPlane />
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                

                {/* File Info */}
                <div className="flex items-center gap-4">
                  
                    <Icon className={`text-2xl text-[#13C2C2]`} />
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-[#40A9FF]">{file.name.split('-')[1]}</h3>
                    <p className="text-sm text-white">
                      {file.type.includes('word')
                        ? 'Word'
                        : file.type.includes('excel')
                        ? 'Excel'
                        : file.type.includes('pdf')
                        ? 'PDF'
                        : 'Other'}{' '}
                      file
                    </p>
                    <p className="text-sm text-white mt-1">
                      {(file.size / (1024 * 1024)).toFixed(1)} MB
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for Adding to Category */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"
              onClick={() => {
                setIsModalOpen(false);
                setIsConfig(false);
              }}
            />

            {/* Modal Content */}
            <div className="relative bg-white rounded-lg p-6 w-96 shadow-xl">
              {/* Close Button */}
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setIsConfig(false);
                }}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="text-xl" />
              </button>

              <h2 className="text-xl font-semibold text-gray-900 mb-4">Add To Category</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="categoryName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Category Name
                  </label>
                  <input
                    type="text"
                    id="categoryName"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#06367A] focus:border-transparent"
                    placeholder="Enter category name"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#06367A] text-white py-2 px-4 rounded-md hover:bg-[#052b5f] transition-colors"
                  onClick={() => addFileToCategory(newCategoryName, fileId)}
                >
                  Add To Category
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}