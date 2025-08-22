'use client';

import { registerUser } from '@/app/actions/auth/registerUser';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

export default function RegisterForm() {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.value;
    registerUser({name,email,password,image})

    
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Full Name
        </label>
        <input
          name="name"
          type="text"
          placeholder="Enter your full name"
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Email Address
        </label>
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Password
        </label>
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Image URL */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Profile Image URL
        </label>
        <input
          name="image"
          type="url"
          placeholder="Enter image URL"
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-[#d02fc8] text-white font-medium py-2 rounded-lg transition duration-300"
      >
        Register
      </button>
    </form>
  );
}
