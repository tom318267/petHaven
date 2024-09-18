import React from "react";
import { User } from "firebase/auth";
import LogoutButton from "./LogoutButton";

interface UserProfileProps {
  user: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div>
      <h2>User Profile</h2>
      <p>Email: {user.email}</p>
      <p>UID: {user.uid}</p>
      <p>Email verified: {user.emailVerified ? "Yes" : "No"}</p>
      <LogoutButton />
    </div>
  );
};

export default UserProfile;
