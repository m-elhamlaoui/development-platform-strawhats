'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Sidebar from '../../../components/sideBar';
import { FaCamera } from 'react-icons/fa';

const EditProfilePage: React.FC = () => {
  const [name, setName] = useState('John Doe');
  const [profileImage, setProfileImage] = useState('/images/portrait.png');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Updating profile:', { name, profileImage });
  };

  return (
    <div className="flex h-screen bg-[#EBF2FC]">
      <Sidebar />

      <div className="flex-1 p-6 ml-52">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900 mb-8">Edit Profile</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Image Upload */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-32 h-32 rounded-full overflow-hidden">
                <Image
                  src={previewImage || profileImage}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
                <label 
                  htmlFor="profile-image"
                  className="absolute inset-0 bg-black flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <FaCamera className="text-white text-2xl" />
                </label>
                <input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <p className="text-sm text-gray-500">Click on the image to change your profile picture</p>
            </div>

            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#06367A] focus:border-transparent"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-[#06367A] text-white rounded-md hover:bg-[#052b5f] transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
