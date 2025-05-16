import React, {useEffect, useState} from 'react';
import RecentFileCard from './recentFileCard';
import { FaImage, FaFilePdf, FaFileExcel, FaFileWord, FaFile } from 'react-icons/fa';
import { getRecentFiles } from '../utils/getRencetFiles';


const recentFiles = [
  { id: 1, name: "Img_1", type: "PNG file", size: "5 mb", color: "bg-indigo-500", iconColor: "text-indigo-500", icon: FaImage},
  { id: 2, name: "PDF_1", type: "PDF file", size: "3 mb", color: "bg-teal-500", iconColor: "text-teal-500", icon: FaFilePdf },
  { id: 3, name: "Word_1", type: "Word file", size: "10 mb", color: "bg-pink-500", iconColor: "text-pink-500", icon: FaFileExcel },
  { id: 4, name: "Exel_1", type: "Exel file", size: "7 mb", color: "bg-indigo-500", iconColor: "text-indigo-500", icon: FaFileWord },
];

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
      return { icon: FaFileWord, color: 'bg-pink-500' };
    case 'application/vnd.ms-excel':
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      return { icon: FaFileExcel, color: 'bg-indigo-500' };
    case 'application/pdf':
      return { icon: FaFilePdf, color: 'bg-teal-500' };
    case 'image/png':
    case 'image/jpg':
    case 'image/gif':
      return { icon: FaImage, color: 'bg-indigo-500' };
    default:
      return { icon: FaFile, color: 'bg-gray-500' };
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

const RecentFilesSection: React.FC = () => {

  const [Files, setFiles] = useState<UploadedFile[]>([])

  useEffect(() => {
      const fetchFiles = async () => {
        const {message, files} = await getRecentFiles();
        console.log(message, files)
        setFiles(files);
      };
  
      fetchFiles();
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-4">Recent files</h2>
      <div>
        {Files.toReversed().map((file) => (
          <RecentFileCard key={file.id} name={file.name} size={String(file.size)} type={getFilterByType(file.type).filter} color={getFileIconAndColor(file.type).color} icon={getFileIconAndColor(file.type).icon} iconColor='' id={file.id}/>
        ))}
      </div>
    </div>
  );
};

export default RecentFilesSection;