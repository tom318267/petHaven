import React from "react";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { setUser } from "../store/authSlice";
import { FaSignOutAlt } from "react-icons/fa"; // Import the icon

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(setUser(null));
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center px-4 py-2 border rounded-lg text-blue-600 border-blue-600 hover:bg-blue-100 transition"
    >
      <FaSignOutAlt className="mr-2" />
      Logout
    </button>
  );
};

export default LogoutButton;
