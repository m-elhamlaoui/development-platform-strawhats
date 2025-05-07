import React from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';

const StorageInfo: React.FC = () => {
  return (
    <div>
      <div className='flex flex-col items-center justify-center p-4 bg-[#F5F9FD] cursor-pointer'>
      <FaCloudUploadAlt className="text-7xl text-[#377dff] mb-4" />
        <div>
          Add New File
        </div>
      </div>
      <div className="mt-6 p-4 bg-[#F5F9FD] rounded-md shadow-md">
      <p className="text-lg font-bold mb-2">Your Storage</p>
      <p className="text-sm mb-2">
        <span className="font-bold text-green-500">25% left</span>
      </p>
      <p className="text-sm mb-2">
        75 GB used of 100 GB
      </p>
      <div className="w-full h-4 bg-gray-200 rounded-full">
        <div className="w-[75%] h-4 bg-blue-500 rounded-full"></div>
      </div>
    </div>
    </div>

  );
};

export default StorageInfo;