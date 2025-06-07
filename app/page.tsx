'use client';

import Link from 'next/link';
import { FaFileUpload, FaUserPlus, FaShareAlt, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa6';

export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0A192F]">
      {/* Hero Section */}
      <div className="max-w-6xl px-4 py-8 sm:py-16 lg:px-8 flex flex-col justify-center items-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#40A9FF] sm:text-5xl md:text-6xl">
            Welcome to your favorite class manager
          </h1>
          <p className="mt-4 text-xl text-white">
            Simplify your class file management with secure storage, easy sharing with your fellow students, and seamless collaboration between classes.
          </p>
        </div>

        {/* Call-to-Action */}
        <div className="mt-8">
          <Link
            href="/login"
            className="inline-flex items-center px-5 py-3 text-base font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Get Started - Log In
          </Link>
        </div>
      </div>

      {/* Features Highlight */}
      <div className="max-w-6xl px-4 py-8 sm:py-16 lg:px-8">
        <h2 className="text-2xl font-bold text-[#40A9FF] mb-4">What You Can Do</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Feature Card 1 */}
          <div className="bg-[#111827] shadow-md hover:shadow-lg rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer">
            <FaFileUpload className="text-3xl text-[#13C2C2] mb-2" />
            <h3 className="text-lg font-semibold text-[#40A9FF]">classes File Storage</h3>
            <p className="text-sm text-white">Store files safely within the platform.</p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-[#111827] shadow-md hover:shadow-lg rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer">
            <FaUserPlus className="text-3xl text-[#13C2C2] mb-2" />
            <h3 className="text-lg font-semibold text-[#40A9FF]">Collaboration Made Easy</h3>
            <p className="text-sm text-white">Share files securely with your fellow students.</p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-[#111827] shadow-md hover:shadow-lg rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer">
            <FaShareAlt className="text-3xl text-[#13C2C2] mb-2" />
            <h3 className="text-lg font-semibold text-[#40A9FF]">Easy File Sharing</h3>
            <p className="text-sm text-white">Send files directly from your dashboard.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0A192F] py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-white hover:text-gray-600 text-2xl">
              <FaTwitter />
            </a>
            <a href="#" className="text-white hover:text-gray-600 text-2xl">
              <FaGithub />
            </a>
            <a href="#" className="text-white hover:text-gray-600 text-2xl">
              <FaLinkedin />
            </a>
          </div>
          <p className="mt-4 text-center text-sm text-white">
            &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}