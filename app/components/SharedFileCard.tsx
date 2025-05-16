import React from 'react';
import { FaFileWord, FaFileExcel, FaFilePdf, FaFileImage, FaFile } from 'react-icons/fa';

interface SharedFileProps {
  name: string;
  type: string;
  size: number;
  sharedBy: number;
  path: string;
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

export default function SharedFileCard({ name, type, size, sharedBy, path }: SharedFileProps) {
  const { icon: Icon, color } = getFileIconAndColor(type);
  const handleDownload = (filePath: string, fileName: string) => {
  const link = document.createElement('a');
  link.href = filePath;
  link.download = fileName; // forces download instead of navigating
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleDownload(path, name)}>
      <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-3">
        <Icon className={`text-2xl ${color}`} />
      </div>
      <h3 className="font-bold text-gray-900 mb-1 truncate">{name.split('-')[1]}</h3>
      <div className="text-sm text-gray-500">
        <p className="mb-1">{type === "application/msword" || type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? "word" : type === "application/vnd.ms-excel" || type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ? "excel" : type} file</p>
        <p className="mb-1">{(size/(1024*1024)).toFixed(1)} mb</p>
        <p className="text-xs">By {sharedBy}</p>
      </div>
    </div>
  );
} 