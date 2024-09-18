import Login from "../components/Login";
import Signup from "../components/Signup";
import UserProfile from "../components/UserProfile";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { User } from "firebase/auth";

const LoginPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  if (user) {
    return (
      <div>
        <h1>Welcome</h1>
        <UserProfile user={user} />
      </div>
    );
  }

  return (
    <div>
      <h1>Authentication</h1>
      {showLogin ? (
        <>
          <Login />
          <p>
            Don't have an account?{" "}
            <button onClick={() => setShowLogin(false)}>Sign Up</button>
          </p>
        </>
      ) : (
        <>
          <Signup />
          <p>
            Already have an account?{" "}
            <button onClick={() => setShowLogin(true)}>Log In</button>
          </p>
        </>
      )}
    </div>
  );
};

export default LoginPage;
