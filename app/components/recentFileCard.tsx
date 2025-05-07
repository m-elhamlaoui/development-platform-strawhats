import React, { useState } from 'react';
import { FaCog, FaShare, FaPaperPlane, FaTrash } from 'react-icons/fa';
import { IconType } from 'react-icons';

interface RecentFileCardProps {
  id: number;
  name: string;
  type: string;
  size: string;
  color: string;
  iconColor: string;
  icon: IconType;
}

const RecentFileCard: React.FC<RecentFileCardProps> = ({ id, name, type, size, color, iconColor, icon: Icon }) => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [sendTo, setSendTo] = useState('');

  const handleShare = () => {
    setIsShareOpen(!isShareOpen);
    setIsDeleteOpen(false);
  };

  const handleSettings = () => {
    setIsDeleteOpen(!isDeleteOpen);
    setIsShareOpen(false);
  };

  const handleSend = () => {
    // Handle sending logic here
    setIsShareOpen(false);
  };

  const handleDelete = () => {
    // Handle delete logic here
    console.log('Deleting file:', id);
    setIsDeleteOpen(false);
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 mb-2 bg-white rounded-md shadow-md cursor-pointer">
      <div className="flex items-center space-x-4">
        <div className={`w-10 h-10 ${color} rounded-full flex items-center justify-center`}>
            <Icon className={`text-xl text-white`} />
        </div>
        <div>
          <p className="text-lg font-bold">{name}</p>
          <p className="text-sm text-gray-500">{type}</p>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500">{size}</p>
      </div>
      <div className="relative">
        <button 
          className="p-2 text-gray-500 hover:text-indigo-500 transition-colors cursor-pointer"
          onClick={handleShare}
        >
          <FaShare className="text-lg" />
        </button>

        {isShareOpen && (
          <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl p-4 z-50">
            <div className="space-y-4">
              <button
                onClick={handleSend}
                className="px-4 py-2 bg-[#06367A] text-white rounded-md hover:bg-[#052b5f] transition-colors flex items-center gap-2"
              >
                <FaPaperPlane />
                Send to departemnt
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
                  onClick={handleSend}
                  className="px-4 py-2 bg-[#06367A] text-white rounded-md hover:bg-[#052b5f] transition-colors flex items-center gap-2"
                >
                  <FaPaperPlane />
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="relative">
        <button 
          className="p-2 text-gray-500 hover:text-indigo-500 transition-colors cursor-pointer"
          onClick={handleSettings}
        >
          <FaCog className="text-lg"/>
        </button>

        {isDeleteOpen && (
          <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-xl p-4 z-50">
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center gap-2"
            >
              <FaTrash />
              Delete File
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentFileCard;