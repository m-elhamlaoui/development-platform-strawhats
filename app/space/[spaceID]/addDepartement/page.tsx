'use client'

import React, { useState } from 'react';
import { addNewDepartement } from '@/app/utils/addNewDepartement';

const Login: React.FC = () => {
  
  const [departement, setDepartement] = useState<string>('');
  const [admin, setAdmin] = useState<string>('');
  const [adminmail, setAdminMail] = useState<string>('');

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //console.log('Username:', departement);
    //console.log('Password:', admin);
    //console.log('email:', adminmail);
    const result = await addNewDepartement(departement, admin, adminmail);
    console.log(result);
    
    
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0A192F]">
      <div className="w-full max-w-md p-8 space-y-6 bg-[#111827] rounded-lg shadow-md">
        
        <h1 className="text-2xl font-bold text-center text-[#40A9FF]">Add Class</h1>

      
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <input
            type="text"
            placeholder="Class..."
            value={departement}
            onChange={(e) => setDepartement(e.target.value)}
            className="w-full px-4 py-2 border-2 border-[#40A9FF] rounded-md focus:outline-none focus:border-blue-800 text-lg text-white"
          />

          
          <input
            type="text"
            placeholder="ADMIN..."
            value={admin}
            onChange={(e) => setAdmin(e.target.value)}
            className="w-full px-4 py-2 border-2 border-[#40A9FF] rounded-md focus:outline-none focus:border-blue-800 text-lg text-white"
          />

          <input
            type="mail"
            placeholder="ADMIN MAIL..."
            value={adminmail}
            onChange={(e) => setAdminMail(e.target.value)}
            className="w-full px-4 py-2 border-2 border-[#40A9FF] rounded-md focus:outline-none focus:border-blue-800 text-lg text-white"
          />

          
          <button
            type="submit"
            className="w-full px-4 py-2 text-lg font-semibold text-[#40A9FF] border-2 border-[#40A9FF] rounded-md hover:bg-blue-600 hover:text-white transition duration-300 cursor-pointer"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;