import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { RootState } from "../store";
import { setUser } from "../store/authSlice";
import { auth } from "../firebase/config";
import { toast, Toaster } from "react-hot-toast";
import SignUp from "../components/Signup";

const SignUpPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      dispatch(setUser(authUser));
    });
    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      const welcomeMessages = [
        "Welcome to the pack!",
        "Pawsome! You're all set!",
        "Fur-tastic! Your account is ready!",
        "Tail-wagging welcome to you!",
      ];
      const randomMessage =
        welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

      // Show the toast immediately
      toast.success(randomMessage, {
        duration: 3000,
        position: "bottom-right",
      });

      // Delay the redirection
      setTimeout(() => {
        router.push("/");
      }, 2000); // Wait for 2 seconds before redirecting
    }
  }, [user, router]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#4CB944", // Green background
            color: "#ffffff", // White text
          },
        }}
      />

      {/* Left Column - Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 mt-20 md:mt-0">
        <div className="w-full max-w-md">
          <h1 className="text-3xl md:text-4xl font-semibold mb-6 text-gray-800 text-center md:text-left">
            Sign Up
          </h1>

          {/* Signup Component */}
          <SignUp />
          <div className="mt-4 text-center md:text-left">
            <p className="text-sm text-gray-600">Already have an account?</p>
            <Link
              href="/login"
              className="mt-2 text-blue-600 hover:text-blue-800 transition duration-300"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>

      {/* Right Column - Image Background (hidden on mobile) */}
      <div
        className="hidden md:block w-full md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/signupcat.jpg')" }}
      ></div>
    </div>
  );
};

export default SignUpPage;
