import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row md:justify-between md:items-start gap-8">
        {/* Left side */}
        <div className="max-w-md">
          <div className="flex items-center space-x-2">
            <Link href={"/"}>
              <img
                src="/assets/logo.png"
                alt="TechGadget Logo"
                className="h-10 w-10 object-contain"
              />
            </Link>
            <h2 className="text-2xl font-bold text-white">TechGadget</h2>
          </div>
          <p className="mt-4 text-sm">
            Your one-stop shop for the latest laptops, phones, and accessories.
            Upgrade your tech, upgrade your life.
          </p>
        </div>

        {/* Right side */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
          <p>Email: support@techgadget.com</p>
          <p>Phone: +880 123 456 789</p>

          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-[#d02fc8]">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="hover:text-[#d02fc8]">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-[#d02fc8]">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="border-t border-gray-700 py-4 text-center text-sm">
        © {new Date().getFullYear()} TechGadget. All rights reserved.
      </div>
    </footer>
  );
}
