'use client';

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  const { data: session, status } = useSession();

  const navMenu = () => (
    <>
      <li>
        <Link href={'/'}>Home</Link>
      </li>
      <li>
        <Link href={'/about'}>About</Link>
      </li>

      {session && (
          <>
            <li><Link href="/addProduct">Add Product</Link></li>
            <li><Link href="/myProducts">My Products</Link></li>
          </>
        )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* Navbar start */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {navMenu()}
          </ul>
        </div>
        <Link href={'/'} className="text-xl">
          <Image src={'/assets/logo.png'} width={80} height={60} alt="tech" />
        </Link>
      </div>

      {/* Navbar center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navMenu()}</ul>
      </div>

      {/* Navbar end */}
      <div className="navbar-end gap-4">
        {status === 'authenticated' ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Image
                  src={session.user.image || '/assets/default-avatar.png'}
                  width={40}
                  height={40}
                  alt="User"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <span>{session.user.email}</span>
              </li>
              <li>
                <button
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  className="btn w-full bg-red-500 text-white"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link href={'/login'} className="btn bg-[#d02fc8] text-white">
              Login
            </Link>
            <Link
              href={'/register'}
              className="btn border border-[#d02fc8] bg-white text-[#d02fc8]"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
