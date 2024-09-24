import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";
import Lottie from "lottie-react";
import petAnimation from "../../public/animations/pet-success.json";

const SuccessPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear the cart after successful payment
    dispatch(clearCart());

    // You can add additional logic here, like saving the order to your database
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mb-8">
      <div className="flex flex-col items-center max-w-md text-center">
        <Lottie
          animationData={petAnimation}
          style={{ width: 250, height: 250 }}
        />
        <h1 className="text-3xl font-bold mb-3">Payment Successful!</h1>
        <p className="text-lg mb-6">Thank you for your purchase.</p>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out text-base font-medium"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
