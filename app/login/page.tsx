'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Access the user data from the response
      const { user } = data;
      console.log('Login successful:', user);

      // Redirect to user's space using their name
      const userId = user.id
      router.push(`/space/${userId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#EBF2FC]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-[#2B548E]">Login</h1>

        {error && (
          <div className="p-3 text-red-600 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="EMAIL..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border-2 border-[#2B548E] rounded-md focus:outline-none focus:border-blue-800 text-lg"
            required
          />

          <input
            type="password"
            placeholder="PASSWORD..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border-2 border-[#2B548E] rounded-md focus:outline-none focus:border-blue-800 text-lg"
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-4 py-2 text-lg font-semibold text-[#2B548E] border-2 border-[#2B548E] rounded-md transition duration-300 ${
              isLoading
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-blue-600 hover:text-white cursor-pointer'
            }`}
          >
            {isLoading ? 'LOGGING IN...' : 'SUBMIT'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;