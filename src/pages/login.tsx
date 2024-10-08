import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { RootState } from "../store";
import { setUser } from "../store/authSlice";
import { auth } from "../firebase/config";
import Login from "../components/Login";
import { toast } from "react-hot-toast";
import { toastOptions } from "../components/GlobalToaster";

const LoginPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // Clear any existing toasts when the login page loads
    toast.dismiss();

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
      } else {
        dispatch(setUser(null)); // Clear user state if not logged in
      }
    });

    // Set up a route change start listener
    const handleRouteChangeStart = () => {
      toast.dismiss();
    };

    // Add the listener
    router.events.on("routeChangeStart", handleRouteChangeStart);

    // Clean up
    return () => {
      unsubscribe();
      router.events.off("routeChangeStart", handleRouteChangeStart);
    };
  }, [dispatch, router]);

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

      // Show the toast immediately with green background
      toast.success(randomMessage, toastOptions);

      // Delay the redirection
      setTimeout(() => {
        router.push("/");
      }, 2000); // Wait for 2 seconds before redirecting
    }
  }, [user, router]);

  return (
    <section className="min-h-screen flex flex-col md:flex-row">
      {/* Left Column - Image Background (hidden on mobile) */}
      <section
        className="hidden md:block w-full md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/dogbeach.jpg')" }}
      ></section>

      {/* Right Column - Form Section */}
      <section className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 mt-12 md:mt-0">
        <div className="w-full max-w-md">
          <h1 className="text-3xl md:text-4xl font-semibold mb-6 text-gray-800 text-center md:text-left">
            Log In
          </h1>

          {/* Login Component */}
          <Login />
          <div className="mt-4 text-center md:text-left">
            <p>
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="mt-2 text-blue-600 hover:text-blue-800 transition duration-300 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default LoginPage;
