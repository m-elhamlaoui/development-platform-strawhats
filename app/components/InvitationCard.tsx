import React from 'react';
import { approveCollaboration } from '../utils/approveColaboration';

interface InvitationCardProps {
  title: string;
  color: string;
}

const InvitationCard: React.FC<InvitationCardProps> = ({ title, color }) => {

    const handleInvitation = async (colab: string) => {
      const result = await approveCollaboration(colab);
      console.log(result);
    }

  return (
    <div
      className={`flex items-center justify-between px-4 py-2 mb-2 rounded-md shadow-md bg-[#0d1423] cursor-pointer`}
      onClick={() => handleInvitation(title)}
    >
      <div className="w-10 h-10 bg-white rounded-full"></div>
      <p className="text-lg font-bold text-white">{title}</p>
    </div>
    
  );
};

export default InvitationCard;