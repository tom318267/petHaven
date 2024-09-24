import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { RootState } from "../store";
import { setUser } from "../store/authSlice";
import { auth } from "../firebase/config";
import Login from "../components/Login";
import UserProfile from "../components/UserProfile";
import { toast, Toaster } from "react-hot-toast";

const LoginPage = () => {
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
      const funMessages = [
        "Welcome back, dog lover!",
        "Woof woof! You're in!",
        "Tail-wagging good to see you!",
        "Paw-some login success!",
      ];
      const randomMessage =
        funMessages[Math.floor(Math.random() * funMessages.length)];

      // Show the toast immediately
      toast.success(randomMessage, {
        duration: 3000,
        position: "bottom-right", // Changed from 'top-right' to 'bottom-right'
      });

      // Delay the redirection
      setTimeout(() => {
        router.push("/");
      }, 2000); // Wait for 2 seconds before redirecting
    }
  }, [user, router]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Column - Image Background (hidden on mobile) */}
      <div
        className="hidden md:block w-full md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/dogbeach.jpg')" }}
      ></div>

      {/* Right Column - Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 mt-20 md:mt-0">
        <div className="w-full max-w-md">
          <h1 className="text-3xl md:text-4xl font-semibold mb-6 text-gray-800 text-center md:text-left">
            Log In
          </h1>

          {/* Login Component */}
          {user ? (
            <UserProfile user={user} />
          ) : (
            <>
              <Login />
              <div className="mt-4 text-center md:text-left">
                <p className="text-sm text-gray-600">Don't have an account?</p>
                <Link
                  href="/signup"
                  className="mt-2 text-blue-600 hover:text-blue-800 transition duration-300"
                >
                  Sign Up
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Add the Toaster component */}
      <Toaster
        position="bottom-right" // Changed from 'top-right' to 'bottom-right'
        toastOptions={{
          duration: 3000,
          style: {
            background: "#4CB944", // Green background
            color: "#ffffff", // White text
          },
        }}
      />
    </div>
  );
};

export default LoginPage;
