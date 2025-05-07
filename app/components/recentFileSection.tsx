import React from 'react';
import RecentFileCard from './recentFileCard';
import { FaImage, FaFilePdf, FaFileExcel, FaFileWord } from 'react-icons/fa';


const recentFiles = [
  { id: 1, name: "Img_1", type: "PNG file", size: "5 mb", color: "bg-indigo-500", iconColor: "text-indigo-500", icon: FaImage},
  { id: 2, name: "PDF_1", type: "PDF file", size: "3 mb", color: "bg-teal-500", iconColor: "text-teal-500", icon: FaFilePdf },
  { id: 3, name: "Word_1", type: "Word file", size: "10 mb", color: "bg-pink-500", iconColor: "text-pink-500", icon: FaFileExcel },
  { id: 4, name: "Exel_1", type: "Exel file", size: "7 mb", color: "bg-indigo-500", iconColor: "text-indigo-500", icon: FaFileWord },
];

const RecentFilesSection: React.FC = () => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-4">Recent files</h2>
      <div>
        {recentFiles.map((file) => (
          <RecentFileCard key={file.id} {...file} />
        ))}
      </div>
    </div>
  );
};

export default RecentFilesSection;