'use client'

import { addNewUser } from '@/app/utils/addNewUser';
import React, { useState } from 'react';

const Login: React.FC = () => {
  
  const [username, setUsername] = useState<string>('');
  const [mail, setMail] = useState<string>('');

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', mail);
    const result = await addNewUser(username, mail);
    console.log(result);
    
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0A192F]">
      <div className="w-full max-w-md p-8 space-y-6 bg-[#111827] rounded-lg shadow-md">
        
        <h1 className="text-2xl font-bold text-center text-[#40A9FF]">Add Student</h1>

      
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <input
            type="text"
            placeholder="USERNAME..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border-2 border-[#40A9FF] rounded-md focus:outline-none focus:border-blue-800 text-lg text-white"
          />

          
          <input
            type="mail"
            placeholder="MAIL..."
            value={mail}
            onChange={(e) => setMail(e.target.value)}
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