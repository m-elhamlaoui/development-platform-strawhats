import React, {useEffect, useState} from 'react';
import { getRecentSharedFiles } from '../utils/getRecentSharedFiles';
import { FaImage, FaFilePdf, FaFileExcel, FaFileWord, FaFile } from 'react-icons/fa';



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

const sharedFiles = [
  { id: 1, name: "Img_1", color: "bg-indigo-500" },
  { id: 2, name: "Img_1", color: "bg-teal-500" },
  { id: 3, name: "Img_1", color: "bg-pink-500" },
];


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

const SharedFiles: React.FC = () => {

  const [Files, setFiles] = useState<UploadedFile[]>([])
  
    useEffect(() => {
        const fetchFiles = async () => {
          const {message, sharedFiles} = await getRecentSharedFiles();
          console.log(message, sharedFiles)
          setFiles(sharedFiles);
        };
    
        fetchFiles();
    }, []);

    const handleDownload = (filePath: string, fileName: string) => {
      const link = document.createElement('a');
      link.href = filePath;
      link.download = fileName; // forces download instead of navigating
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };


  return (
    <div className="mt-6 p-4 bg-[#111827] rounded-md shadow-md cursor-pointer">
      <h2 className="text-lg font-bold mb-4 text-[#377dff]">Shared Files</h2>
      {Files.toReversed().map((file) => {
      const { icon: FileIcon, color } = getFileIconAndColor(file.type);

      return (
        <div
          key={file.id}
          className={`flex items-center justify-between px-4 py-2 mb-2 rounded-md shadow-inner bg-[#0d1423]`}
          onClick={() => handleDownload(file.path, file.name)}
        >
          <p className="text-lg font-bold text-white">{file.name.split('-')[1].length >= 10 ? file.name.split('-')[1].slice(0, 9)+'..' : file.name.split('-')[1]}</p>
          <FileIcon className="text-xl text-white" />
        </div>
      );
    })}
    </div>
  );
};

export default SharedFiles;