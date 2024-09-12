import React from "react";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <nav className="bg-white shadow-sm py-4 pt-6 text-black">
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <Image
            src="/images/doglogo.svg"
            alt="PetHaven Logo"
            width={40}
            height={40}
          />
          <span className="text-2xl font-bold text-black">PetHaven</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-12 text-lg font-medium text-gray-700">
          <Link href="/" className="hover:text-black relative group">
            Home
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </Link>
          <Link href="/products" className="hover:text-black relative group">
            Products
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </Link>
          <Link
            href="/loyalty-program"
            className="hover:text-black relative group"
          >
            Loyalty Program
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </Link>
          <Link href="/blogs" className="hover:text-black relative group">
            Blogs
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </Link>
          <Link href="/contact" className="hover:text-black relative group">
            Contact
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <button className="flex items-center px-4 py-2 border rounded-lg text-blue-600 border-blue-600 hover:bg-blue-100 transition">
            <FaUser className="mr-2" />
            Login
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <FaPhoneAlt className="mr-2" />
            555-555-5555
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
