import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const LoyaltyProgram = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="bg-gradient-to-br from-primary to-secondary text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-display font-bold text-center mb-8">
          Pet Haven Loyalty Program
        </h1>
        <div className="bg-white text-gray-800 rounded-xl shadow-2xl overflow-hidden">
          {user ? (
            <div className="p-6 space-y-6">
              <div className="text-center">
                <p className="text-2xl font-semibold">
                  Welcome, <span className="text-primary">{user.name}</span>!
                </p>
                <div className="mt-4 bg-gray-100 rounded-lg p-6 inline-block">
                  <p className="text-sm text-gray-600">Your current points</p>
                  <p className="text-5xl font-bold text-primary">
                    {user.loyaltyPoints}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Program Benefits</h2>
                <ul className="space-y-3">
                  {[
                    "Earn 1 point for every $1 spent",
                    "Redeem points for discounts on future purchases",
                    "Exclusive offers for loyalty members",
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-6 h-6 bg-primary text-white rounded-full mr-3 flex items-center justify-center">
                        {index + 1}
                      </span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors font-semibold text-lg">
                View Rewards Catalog
              </button>
            </div>
          ) : (
            <div className="p-6 space-y-6">
              <h2 className="text-2xl font-semibold text-center">
                Join our Loyalty Program today!
              </h2>
              <div className="space-y-4">
                <ul className="space-y-3">
                  {[
                    "Earn points on every purchase",
                    "Redeem points for exclusive discounts",
                    "Access to members-only offers and events",
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-6 h-6 bg-secondary text-white rounded-full mr-3 flex items-center justify-center">
                        {index + 1}
                      </span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="w-full bg-secondary text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors font-semibold text-lg">
                Sign Up Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoyaltyProgram;
