import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { User } from "firebase/auth";
import { RootState } from "../store";
import { setUser } from "../store/authSlice";
import { auth } from "../firebase";
import Login from "../components/Login";
import Signup from "../components/Signup";
import UserProfile from "../components/UserProfile";

const LoginPage = () => {
  const [showLogin, setShowLogin] = useState(true);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

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
              {showLogin ? "Log In" : "Sign Up"}
            </h1>
            {showLogin ? <Login /> : <Signup />}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                {showLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </p>
              <button
                onClick={() => setShowLogin(!showLogin)}
                className="mt-2 text-blue-600 hover:text-blue-800 transition duration-300"
              >
                {showLogin ? "Sign Up" : "Log In"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
