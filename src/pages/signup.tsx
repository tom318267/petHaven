import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setUser } from "../store/authSlice";
import { auth } from "../firebase/config";
import Login from "../components/Login";
import Signup from "../components/Signup";
import UserProfile from "../components/UserProfile";

const SignupPage = () => {
  const [showSignup, setShowSignup] = useState(true);
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
              {showSignup ? "Sign Up" : "Log In"}
            </h1>
            {showSignup ? <Signup /> : <Login />}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                {showSignup
                  ? "Already have an account?"
                  : "Don't have an account?"}
              </p>
              <button
                onClick={() => setShowSignup(!showSignup)}
                className="mt-2 text-blue-600 hover:text-blue-800 transition duration-300"
              >
                {showSignup ? "Log In" : "Sign Up"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
