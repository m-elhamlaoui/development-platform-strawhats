'use client'

import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/sideBar';
import { FaCog } from 'react-icons/fa';
import Search from '../../../components/search';
import { fetchDepartementUsers } from '@/app/utils/fetchDepartemntUsers';
 

//const users = [
  //{ name: 'User_1', role: 'Role', date: '12/12/2022', color: 'bg-indigo-400', img: '' },
  //{ name: 'User_2', role: 'Role', date: '10/12/2021', color: 'bg-teal-500', img: '' },
  //{ name: 'User_3', role: 'Role', date: '08/07/2024', color: 'bg-pink-400', img: '' },
  //{ name: 'User_4', role: 'Role', date: '01/01/2025', color: 'bg-blue-500', img: '' },
//];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<{ 
    userName: string; 
    role: string;
    imgurl: string;
    createdAt: string;
    }[] | null>(null);

  useEffect(() => {
    const getDepartementUsers = async () => {
      const result = await fetchDepartementUsers();
      setUsers(result.departments);
      console.log(result.departments);
    };

    getDepartementUsers();
  }, []);

  const filteredUsers = users === null ? [] : users.filter(user => user.userName.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="flex h-screen bg-[#eaf2fc]">
      <Sidebar />
      <div className="flex-1 p-10 ml-52">
        {/* Search Bar */}
        <div className="w-full max-w-4xl mb-8">
          <Search onSearch={setSearchQuery} />
        </div>
        <div className="w-full max-w-4xl">
          <h2 className="text-xl font-bold text-[#205295] mb-6">Manage Users</h2>
          <div className="space-y-4">
            {filteredUsers.map((user, idx) => (
              <div
                key={user.userName}
                className="flex items-center bg-white rounded-xl px-6 py-4 shadow-sm"
              >
                {/* User image or colored circle */}
                {user.imgurl ? (
                  <img
                    src={user.imgurl}
                    alt={user.userName}
                    className="w-10 h-10 rounded-full object-cover mr-4"
                  />
                ) : (
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 bg-indigo-400`}>
                    <span className="text-white font-bold text-lg">{user.userName[5]}</span>
                  </div>
                )}
                <div className="flex-1 flex items-center">
                  <span className="font-semibold text-[#205295] text-lg">{user.userName}</span>
                  <span className="ml-6 text-gray-400">{user.role}</span>
                </div>
                <span className="text-gray-300 mr-6">{user.createdAt}</span>
                <FaCog className="text-[#205295] text-xl cursor-pointer hover:text-indigo-500 transition-color" title="Manage user" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}