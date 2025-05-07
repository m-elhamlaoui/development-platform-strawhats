'use client'

import React, { useState } from 'react';
import Sidebar from '../../components/sideBar';
import SearchBar from '../../components/search';
import CategorySection from '../../components/categorySection';
import FilesSection from '../../components/fileSection';
import RecentFilesSection from '../../components/recentFileSection';
import CollaborateSection from '../../components/colaborateSection';
import StorageInfo from '../../components/StorageInfo';
import SharedFiles from '../../components/sharedFiles';
import InvitationCard from '../../components/InvitationCard';

const UserSpace: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex h-screen bg-[#EBF2FC]">
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
        <CollaborateSection />
      </div>
      {/* Right Sidebar */}
      <div className="w-80 p-4 ml-6 bg-white rounded-lg shadow-md h-fit">
          {/* Storage Info */}
          <StorageInfo />

          {/* Shared Files */}
          <SharedFiles />

          {/* Invitation Cards */}
          <div className="mt-6 p-4 bg-[#F5F9FD] rounded-md shadow-md">
          <h2 className="text-lg font-bold mb-4">Invitation</h2>
          <InvitationCard title="Dev" color="bg-indigo-500" />
          <InvitationCard title="Marketing" color="bg-teal-500" />
          <InvitationCard title="djjs" color="bg-pink-500" />
          <InvitationCard title="slwlj" color="bg-indigo-500" />
          <InvitationCard title="dkes" color="bg-pink-500" />
          </div>
        </div>
    </div>
  );
};

export default UserSpace;