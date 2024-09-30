import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { setUser } from "../store/authSlice";
import { auth } from "../firebase/config";
import Signup from "../components/Signup";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { toastOptions } from "../components/GlobalToaster";

const SignupPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // Dispatch only serializable user data
        dispatch(
          setUser({
            uid: authUser.uid,
            email: authUser.email,
            displayName: authUser.displayName,
            photoURL: authUser.photoURL,
          })
        );

        // Prevent access to the signup page if already logged in
        toast.error("You're already signed in!", toastOptions);
        router.push("/"); // Redirect to homepage
      } else {
        dispatch(setUser(null)); // Clear the user from state
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch, router]);

  useEffect(() => {
    // Clear any existing toasts when the signup page loads
    toast.dismiss();

    // Set up a route change start listener
    const handleRouteChangeStart = () => {
      toast.dismiss();
    };

    // Add the listener
    router.events.on("routeChangeStart", handleRouteChangeStart);

    // Clean up
    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
    };
  }, [router]);

  // ... rest of the component code ...

  if (loading) {
    return <div>Loading...</div>; // Or a more sophisticated loading component
  }

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
