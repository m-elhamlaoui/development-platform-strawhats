import Link from 'next/link';
import React from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';

interface SharedFileProps {
  id: number | undefined;
}

const StorageInfo = ({ id }: SharedFileProps) => {
  return (
    <div>
      <Link href={`/space/${id}/upload`} className='flex flex-col items-center justify-center rounded-md p-4 bg-[#111827] cursor-pointer'>
        <FaCloudUploadAlt className="text-7xl text-[#377dff] mb-4" />
        <div className='text-white'>
          Add New File
        </div>
      </Link>
      
    </div>

  );
};

export default StorageInfo;