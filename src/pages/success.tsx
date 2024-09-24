import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";
import dynamic from "next/dynamic";

const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

const SuccessPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Clear the cart after successful payment
    dispatch(clearCart());

    // Set window size for confetti
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // You can add additional logic here, like saving the order to your database
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Confetti width={windowSize.width} height={windowSize.height} />
      <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-xl mb-8">Thank you for your purchase.</p>
      <button
        onClick={() => router.push("/")}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out text-base font-medium"
      >
        Return to Home
      </button>
    </div>
  );
};

export default SuccessPage;
