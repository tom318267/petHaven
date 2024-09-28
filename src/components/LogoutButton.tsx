import React from "react";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { setUser } from "../store/authSlice";
import { FaSignOutAlt } from "react-icons/fa"; // Import the icon
import { toast } from "react-hot-toast";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(setUser(null));

      const funMessages = [
        "See you later, alligator!",
        "Until next time, pup!",
        "Catch you on the flip side, furry friend!",
        "Toodle-oo, kangaroo!",
      ];
      const randomMessage =
        funMessages[Math.floor(Math.random() * funMessages.length)];

      toast.success(randomMessage, {
        duration: 3000,
        position: "bottom-right",
        style: {
          background: "#4CB944",
          color: "#ffffff",
        },
      });
    } catch (error) {
      console.error("Error signing out: ", error);
      toast.error("Oops! Logout failed. Please try again.", {
        duration: 3000,
        position: "bottom-right",
        style: {
          background: "#FF4B4B",
          color: "#ffffff",
        },
      });
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
