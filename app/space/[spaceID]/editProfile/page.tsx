'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Sidebar from '../../../components/sideBar';
import { FaCamera } from 'react-icons/fa';
import { getUserData } from '@/app/utils/getUserData';




const EditProfilePage: React.FC = () => {
  const [profileImage, setProfileImage] = useState('/images/avatar.png');
const [previewImage, setPreviewImage] = useState<string | null>(null);
const [img, setImg] = useState<File>();

 useEffect(() => {
    const fetchUser = async () => {
      const { userData } = await getUserData();
      setProfileImage(userData.profileImage)
      //setData(userData);

    };

    fetchUser();
  }, []);


const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    setImg(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!img) {
    console.warn('No file selected');
    return;
  }

  const formData = new FormData();
  formData.append('file', img);

  try {
    const res = await fetch('/api/updateProfile', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      console.log('Upload successful:', data);
      // Optionally reset form
      setPreviewImage(null);
      setImg(undefined);
    } else {
      console.error('Upload failed:', data.error);
    }
  } catch (error) {
    console.error('Upload error:', error);
  }
};



  return (
    <div className="flex h-screen bg-[#0A192F]">
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
              <p className="text-sm text-white">Click on the image to change your profile picture</p>
            </div>

            

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-[#06367A] text-white rounded-md hover:bg-[#052b5f] transition-colors cursor-pointer"
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
