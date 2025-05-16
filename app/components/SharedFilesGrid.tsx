import React from 'react';
import SharedFileCard from './SharedFileCard';

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

interface SharedFilesGridProps {
  files: SharedFiles[]
}

export default function SharedFilesGrid({ files }: SharedFilesGridProps) {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {files.map((file) => (
        <SharedFileCard
          key={file.id}
          name={file.name}
          type={file.type}
          size={file.size}
          sharedBy={file.userId}
          path={file.path}
        />
      ))}
    </div>
  );
} 