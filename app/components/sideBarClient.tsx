'use client';

import React, { useEffect, useState } from 'react';
import { FaHome, FaShareAlt, FaUpload, FaUserPlus, FaUsers, FaUserEdit } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getCurrentUserClient } from '@/app/utils/auth-client';
import Image from 'next/image';
import { getUserData } from '../utils/getUserData';
import { logout } from '../utils/logout';

interface User {
  userId: number;
  email: string;
  role: string;
  departement: string;
}

interface Data {
  id: number;
  name: string;
  passwordHash: string;
  email: string;
  profileImage: string | null;
  departement: string;
  role: string;
  storageLimit: number;
  storageUsed: number;
  createdAt: string | null;
}

const SideBarClient: React.FC = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUserClient();
      setUser(currentUser);
      const { user } = await getUserData();
      setData(user);

    };

    fetchUser();
  }, []);

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-50 bg-[#06367A] text-white p-4 flex flex-col justify-between items-center">
      <div>
        {/* Profile Picture */}
        <div className="flex items-center mb-4 justify-center">
          <div className="relative w-16 h-16 rounded-full overflow-hidden">
            <Image
              src={data?.profileImage ? data.profileImage : '/images/avatar.png'}
              alt={data?.name ? data.name : 'profile image'}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul>
            <li className="mb-4">
              <Link href={`/space/${user?.userId}`} className={`flex items-center text-lg p-2 rounded-md transition-colors ${isActive('/space') ? 'bg-white text-[#06367A]' : 'hover:bg-white hover:text-[#06367A]'}`}>
                <FaHome className="mr-3" />
                <span className="font-bold">my space</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link href={`/space/${user?.userId}/shared`} className={`flex items-center text-lg p-2 rounded-md transition-colors ${isActive('/files') ? 'bg-white text-[#06367A]' : 'hover:bg-white hover:text-[#06367A]'}`}>
                <FaShareAlt className="mr-3" />
                <span>Shared files</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link href={`/space/${user?.userId}/upload`} className={`flex items-center text-lg p-2 rounded-md transition-colors ${isActive('/categories') ? 'bg-white text-[#06367A]' : 'hover:bg-white hover:text-[#06367A]'}`}>
                <FaUpload className="mr-3" />
                <span>Upload file</span>
              </Link>
            </li>

            {/* Department Admin Links */}
            {user?.role === 'departement_admin' && (
              <>
                <li className="mb-4">
                  <Link href={`/space/${user?.userId}/addUser`} className={`flex items-center text-lg p-2 rounded-md transition-colors ${isActive('/users/add') ? 'bg-white text-[#06367A]' : 'hover:bg-white hover:text-[#06367A]'}`}>
                    <FaUserPlus className="mr-3" />
                    <span>Add users</span>
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href={`/space/${user?.userId}/users`} className={`flex items-center text-lg p-2 rounded-md transition-colors ${isActive('/users') ? 'bg-white text-[#06367A]' : 'hover:bg-white hover:text-[#06367A]'}`}>
                    <FaUsers className="mr-3" />
                    <span>Users</span>
                  </Link>
                </li>
              </>
            )}
            {/* platform Admin Links */}
            {user?.role === 'platform_admin' && (
              <>
                <li className="mb-4">
                  <Link href={`/space/${user?.userId}/addDepartement`} className={`flex items-center text-lg p-2 rounded-md transition-colors ${isActive('/users/add') ? 'bg-white text-[#06367A]' : 'hover:bg-white hover:text-[#06367A]'}`}>
                    <FaUserPlus className="mr-3" />
                    <span>Add departement</span>
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href={`/space/${user?.userId}/departement`} className={`flex items-center text-lg p-2 rounded-md transition-colors ${isActive('/users') ? 'bg-white text-[#06367A]' : 'hover:bg-white hover:text-[#06367A]'}`}>
                    <FaUsers className="mr-3" />
                    <span>departements</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>

      <div>
        {/* Profile Edit Button */}
        <button className="mb-2 w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 flex items-center justify-center cursor-pointer">
          <FaUserEdit className="mr-2" />
          Edit Profile
        </button>

        {/* Logout Button */}
        <button className="mt-2 w-full px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 cursor-pointer" onClick={() => logout()}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default SideBarClient; 