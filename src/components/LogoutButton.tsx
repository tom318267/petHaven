import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
