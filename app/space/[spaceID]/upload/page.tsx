'use client'

import React, { useRef, useState } from 'react';
import Sidebar from '../../../components/sideBar';
import { FaCloudUploadAlt } from 'react-icons/fa';

export default function UploadPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<
    { name: string; type: string; progress: number; size: string }[]
  >([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);

      // Add new files to upload progress list
      const newProgress = selectedFiles.map(file => ({
        name: file.name,
        type: file.type,
        progress: 0,
        size: formatFileSize(file.size),
      }));

      setUploadProgress((prev) => [...prev, ...newProgress]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setFiles((prev) => [...prev, ...droppedFiles]);

      const newProgress = droppedFiles.map(file => ({
        name: file.name,
        type: file.type,
        progress: 0,
        size: formatFileSize(file.size),
      }));

      setUploadProgress((prev) => [...prev, ...newProgress]);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append('file', file);
    });

    try {
      const res = await fetch('/api/uploadFile', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        console.log('Upload successful:', data);

        // Update progress bars to 100%
        setUploadProgress((prev) =>
          prev.map((file) => ({ ...file, progress: 100 }))
        );
      } else {
        console.error('Upload failed:', data.error);
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const formatFileSize = (bytes: number): string => {
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="flex h-screen bg-[#0A192F]">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center justify-center p-6 ml-52">
        <div className="w-full max-w-xl bg-[#111827] rounded-2xl shadow-md p-8 mb-8">
          <h1 className="text-3xl font-bold text-center text-[#40A9FF] mb-8">Upload File</h1>
          <div
            className="bg-[#0d1423] rounded-xl flex flex-col items-center justify-center py-12 px-4 mb-6 border-2 border-dashed border-[#162138] cursor-pointer"
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <FaCloudUploadAlt className="text-7xl text-[#377dff] mb-4" />
            <p className="text-xl font-semibold text-[#205295] mb-2">Drag & Drop Your Files Here</p>
            <button
              type="button"
              className="mt-2 px-6 py-2 border border-[#377dff] text-[#377dff] rounded-lg cursor-pointer font-medium hover:bg-[#eaf2fc] transition"
            >
              Choose files from your computer
            </button>
            <input
              type="file"
              multiple
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Upload Button */}
          {files.length > 0 && (
            <button
              type="button"
              className="w-full py-3 bg-[#377dff] text-white rounded-lg font-semibold hover:bg-[#2a63cc] transition"
              onClick={handleUpload}
            >
              Upload Files
            </button>
          )}
        </div>

        {/* Upload Progress Section */}
        <div className="w-full max-w-xl bg-[#111827] rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-[#377dff] mb-6 text-center">Upload Progress</h2>
          <div className="space-y-4">
            {uploadProgress.length === 0 ? (
              <p className="text-gray-500 text-center">No files selected</p>
            ) : (
              uploadProgress.map((file, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full bg-indigo-400"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-[#377dff]">{file.name}</span>
                      <span className="text-xs text-white">{file.size}</span>
                    </div>
                    <div className="w-full h-2 rounded bg-gray-200 overflow-hidden">
                      <div
                        className={`h-2 rounded bg-indigo-200 transition-all duration-300`}
                        style={{ width: `${file.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm text-[#205295] font-bold">{file.progress}%</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}