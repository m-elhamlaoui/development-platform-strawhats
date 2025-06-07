'use client'

import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sideBar';
import SearchBar from '../../components/search';
import CategorySection from '../../components/categorySection';
import FilesSection from '../../components/fileSection';
import RecentFilesSection from '../../components/recentFileSection';
import CollaborateSection from '../../components/colaborateSection';
import StorageInfo from '../../components/StorageInfo';
import SharedFiles from '../../components/sharedFiles';
import InvitationCard from '../../components/InvitationCard';
import { getCurrentUserClient } from '@/app/utils/auth-client';
import { getColaborations } from '@/app/utils/getColaborations';

interface User {
  userId: number;
  email: string;
  role: string;
  departement: string;
}

interface Colabs {
  id: number;
  sourceDepartement: string;
  targetDepartement: string;
  isApproved: number;
  createdAt: string;
}



const UserSpace: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [colabs, setColabs] = useState<Colabs[]>([]);
  const colors = ["bg-indigo-500", "bg-teal-500", "bg-pink-500"]
  
  useEffect(() => {
      const fetchUser = async () => {
        const currentUser = await getCurrentUserClient();
        setUser(currentUser);
        const {colabs} = await getColaborations();
        setColabs(colabs);
      };
  
      fetchUser();
    }, []);

  return (
    <div className="flex h-screen bg-[#0A192F]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 ml-52">
        {/* Search Bar */}
        <SearchBar onSearch={setSearchQuery} />
        {/* Categories */}
        <CategorySection />
        {/* Files Section */}
        <FilesSection />
        {/* Recent Files */}
        <RecentFilesSection />
        {/* Collaborate Section */}
        {user?.role === 'departement_admin' && <CollaborateSection />}
      </div>
      {/* Right Sidebar */}
      <div className="w-80 p-4 ml-6 bg-[#0A192F] rounded-lg shadow-md h-fit">
          {/* Storage Info */}
          <StorageInfo id={user?.userId}/>

          {/* Shared Files */}
          <SharedFiles />

          {/* Invitation Cards */}
          {user?.role === 'departement_admin' && 
          <>
            <div className="mt-6 p-4 bg-[#111827] rounded-md shadow-md">
              <h2 className="text-lg font-bold mb-4 text-[#40A9FF]">Invitation</h2>
              {colabs.map((colab) => {
                return(
                  <InvitationCard key={colab.id} title={colab.sourceDepartement} color={colors[Math.floor(Math.random() * colors.length)]}/>
                )
              })}
            </div>
          </>
          }
        </div>
    </div>
  );
};

export default UserSpace;