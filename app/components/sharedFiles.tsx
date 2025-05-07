import React from 'react';

const SharedFiles: React.FC = () => {
  const sharedFiles = [
    { id: 1, name: "Img_1", color: "bg-indigo-500" },
    { id: 2, name: "Img_1", color: "bg-teal-500" },
    { id: 3, name: "Img_1", color: "bg-pink-500" },
  ];

  return (
    <div className="mt-6 p-4 bg-[#F5F9FD] rounded-md shadow-md cursor-pointer">
      <h2 className="text-lg font-bold mb-4">Shared Files</h2>
      {sharedFiles.map((file) => (
        <div
          key={file.id}
          className={`flex items-center justify-between px-4 py-2 mb-2 rounded-md shadow-inner ${file.color}`}
        >
          <p className="text-lg font-bold text-white">{file.name}</p>
          <div className="w-8 h-8 bg-white/20 rounded-full"></div>
        </div>
      ))}
    </div>
  );
};

export default SharedFiles;