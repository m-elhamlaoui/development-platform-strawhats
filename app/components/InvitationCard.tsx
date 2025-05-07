import React from 'react';

interface InvitationCardProps {
  title: string;
  color: string;
}

const InvitationCard: React.FC<InvitationCardProps> = ({ title, color }) => {
  return (
    <div
      className={`flex items-center justify-between px-4 py-2 mb-2 rounded-md shadow-md ${color} cursor-pointer`}
    >
      <div className="w-10 h-10 bg-white rounded-full"></div>
      <p className="text-lg font-bold text-white">{title}</p>
    </div>
    
  );
};

export default InvitationCard;