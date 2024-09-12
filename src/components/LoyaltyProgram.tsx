import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const LoyaltyProgram = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
      <h2 className="text-2xl font-display text-blue-600 mb-4">
        Loyalty Program
      </h2>
      {user ? (
        <div className="space-y-4 flex-grow flex flex-col justify-between">
          <p className="text-lg">
            Welcome, <span className="font-semibold">{user.name}</span>!
          </p>
          <div className="bg-background rounded-lg p-4">
            <p className="text-sm text-gray-600">Your current points</p>
            <p className="text-3xl font-bold text-blue-600">
              {user.loyaltyPoints}
            </p>
          </div>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="w-4 h-4 bg-secondary rounded-full mr-2"></span>
              Earn 1 point for every $1 spent
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 bg-secondary rounded-full mr-2"></span>
              Redeem points for discounts on future purchases
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 bg-secondary rounded-full mr-2"></span>
              Exclusive offers for loyalty members
            </li>
          </ul>
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-opacity-90 transition-colors mt-auto">
            View Rewards Catalog
          </button>
        </div>
      ) : (
        <div className="space-y-4 flex-grow flex flex-col justify-between">
          <p className="text-lg">Join our Loyalty Program today!</p>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="w-4 h-4 bg-secondary rounded-full mr-2"></span>
              Earn points on every purchase
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 bg-secondary rounded-full mr-2"></span>
              Redeem points for exclusive discounts
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 bg-secondary rounded-full mr-2"></span>
              Access to members-only offers and events
            </li>
          </ul>
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-opacity-90 transition-colors mt-auto">
            Sign Up Now
          </button>
        </div>
      )}
    </div>
  );
};

export default LoyaltyProgram;
