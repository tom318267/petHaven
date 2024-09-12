import React, { useState } from "react";

const SubscriptionService = () => {
  const [subscriptionType, setSubscriptionType] = useState("");
  const [frequency, setFrequency] = useState("");

  const handleSubscribe = () => {
    // Implement subscription logic
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-display text-blue-600 mb-4">
        Subscribe for Regular Deliveries
      </h2>
      <select
        className="w-full mb-4 p-2 border border-gray-300 rounded"
        value={subscriptionType}
        onChange={(e) => setSubscriptionType(e.target.value)}
      >
        <option value="">Select subscription type</option>
        <option value="food">Pet Food</option>
        <option value="toys">Pet Toys</option>
        <option value="grooming">Grooming Supplies</option>
      </select>
      <select
        className="w-full mb-4 p-2 border border-gray-300 rounded"
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
      >
        <option value="">Select frequency</option>
        <option value="weekly">Weekly</option>
        <option value="biweekly">Bi-weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      <button
        onClick={handleSubscribe}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-opacity-90 transition-colors"
      >
        Subscribe
      </button>
    </div>
  );
};

export default SubscriptionService;
