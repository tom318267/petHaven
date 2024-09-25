import React, { useEffect, useState } from "react";
import { FaUser, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import LogoutButton from "./LogoutButton";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const isHomePage = router.pathname === "/";

  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userState = useSelector((state: RootState) => state.auth.user);
  const cartItemCount = useSelector((state: RootState) =>
    state.cart.items
      ? state.cart.items.reduce((total, item) => total + item.quantity, 0)
      : 0
  );

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`bg-white py-4 pt-6 text-black relative ${
        isHomePage ? "" : "shadow-sm"
      }`}
    >
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

        {/* Hamburger Menu Button (visible on mobile) */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Navigation Links and Auth Buttons */}
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row absolute md:static left-0 right-0 top-full bg-white md:bg-transparent shadow-md md:shadow-none z-50 md:z-auto`}
        >
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-12 p-4 md:p-0">
            <Link
              href="/"
              className="hover:text-black relative group font-medium text-lg"
            >
              Home
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>
            <Link
              href="/products"
              className="hover:text-black relative group font-medium text-lg"
            >
              Products
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>
            <Link
              href="/blogs"
              className="hover:text-black relative group font-medium text-lg"
            >
              Blogs
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>
            <Link
              href="/contact"
              className="hover:text-black relative group font-medium text-lg"
            >
              Contact
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>

            {/* Auth Buttons - now part of the mobile menu */}
            {user ? (
              <div className="md:hidden">
                <span className="text-lg font-medium mr-4 text-gray-700">
                  Welcome,{" "}
                  {user.email
                    ? user.email.split("@")[0].charAt(0).toUpperCase() +
                      user.email.split("@")[0].slice(1)
                    : "Pet Lover"}
                </span>
                <LogoutButton />
              </div>
            ) : (
              <div className="md:hidden space-y-2">
                <Link
                  href="/login"
                  className="block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out text-lg font-medium"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="block px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-100 transition duration-300 ease-in-out text-lg font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons - visible on desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/cart"
            className="p-3 text-blue-600 hover:text-blue-800 transition-colors"
            aria-label="Shopping Cart"
          >
            <div className="relative">
              <FaShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemCount}
                </span>
              )}
            </div>
          </Link>

          {user ? (
            <>
              <span className="text-lg font-medium mr-4 text-gray-700">
                Welcome,{" "}
                {user.email
                  ? user.email.split("@")[0].charAt(0).toUpperCase() +
                    user.email.split("@")[0].slice(1)
                  : "Pet Lover"}
              </span>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out text-base font-medium"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-100 transition duration-300 ease-in-out text-base font-medium"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
