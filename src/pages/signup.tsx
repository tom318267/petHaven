import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { RootState } from "../store";
import { setUser } from "../store/authSlice";
import { auth } from "../firebase/config";
import Signup from "../components/Signup";
import { toast } from "react-hot-toast";
import Image from "next/image";

const SignupPage = () => {
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
        "Welcome to the pack!",
        "Woof woof! You're in!",
        "Tail-wagging good to see you!",
        "Paw-some signup success!",
      ];
      const randomMessage =
        funMessages[Math.floor(Math.random() * funMessages.length)];

      // Show the toast immediately with green background
      toast.success(randomMessage, {
        duration: 3000,
        position: "bottom-right",
        style: {
          background: "#2463EB",
          color: "#ffffff",
        },
        iconTheme: {
          primary: "#ffffff",
          secondary: "#2463EB",
        },
      });

      // Delay the redirection
      setTimeout(() => {
        router.push("/");
      }, 2000); // Wait for 2 seconds before redirecting
    }
  }, [user, router]);

  return (
    <section className="min-h-screen flex flex-col md:flex-row">
      {/* Left Column - Form Section */}
      <section className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 mt-20 md:mt-0">
        <div className="w-full max-w-md">
          <h1 className="text-3xl md:text-4xl font-semibold mb-6 text-gray-800 text-center md:text-left">
            Sign Up
          </h1>

          {/* Signup Component */}
          <Signup />
          <div className="mt-4 text-center md:text-left">
            <p>
              Already have an account?{" "}
              <Link
                href="/login"
                className="mt-2 text-blue-600 hover:text-blue-800 transition duration-300 font-medium"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Right Column - Image Background (hidden on mobile) */}
      <section className="hidden md:block w-full md:w-1/2 relative">
        <Image
          src="/images/signupcat.jpg"
          alt="Signup cat background"
          layout="fill"
          objectFit="cover"
        />
      </section>
    </section>
  );
};

export default SignupPage;
