import React from "react";
import { FaUser, FaEnvelope, FaStar } from "react-icons/fa";

type CustomUser = {
  name?: string;
  email?: string;
  loyaltyPoints?: number;
};

interface UserProfileProps {
  user: CustomUser;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  if (!user) {
    return <p className="text-center text-gray-600">No user logged in</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center mb-6">
        <div className="bg-blue-100 rounded-full p-4">
          <FaUser className="text-4xl text-blue-600" />
        </div>
      </div>
      {user.name && (
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
          <FaUser className="text-gray-400" />
          <span className="text-gray-800">{user.name}</span>
        </div>
      )}
      {user.email && (
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
          <FaEnvelope className="text-gray-400" />
          <span className="text-gray-800">{user.email}</span>
        </div>
      )}
      {user.loyaltyPoints !== undefined && (
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
          <FaStar className="text-gray-400" />
          <span className="text-gray-800">
            Loyalty Points: {user.loyaltyPoints}
          </span>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
