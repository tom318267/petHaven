import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "../store";
import { setUser } from "../store/authSlice";
import { auth } from "../firebase/config";
import Login from "../components/Login";
import UserProfile from "../components/UserProfile";

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

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {user ? (
          <>
            <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">
              Welcome
            </h1>
            <UserProfile user={user} />
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">
              Log In
            </h1>
            <Login />
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">Don't have an account?</p>
              <button
                onClick={() => router.push("/signup")}
                className="mt-2 text-blue-600 hover:text-blue-800 transition duration-300"
              >
                Sign Up
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
