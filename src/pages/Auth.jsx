import LogIn from "../components/logIn";
import SignUp from "../components/signUp";
import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { auth } from "../Config/firebaseConfig";

function Auth(props) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoginError(null);

    if (isLoginMode) {
      signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
          props.setUser(userCredential.user);
          setIsAuthenticated(true);
          setIsLoginMode(false);
        })
        .catch((error) => {

          console.log(error.code);
          if (
            error.code === "auth/invalid-credential" ||
            error.code === "auth/wrong-password"
          ) {
            setLoginError("Login failed. Email or password are wrong.");
          } else {
            setLoginError("An error occurred during login.");
          }
        });
    } else {
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {

          props.setUser(userCredential.user);
        })
        .catch((error) => {
          console.error("Signup error:", error);

        });
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setFormData({ email: "", password: "" });
    setLoginError(null); 

    setIsAuthenticated(false);
  };


  if (isAuthenticated) {
    return (
      <div>
        <p>You are logged in successfully</p>
      </div>
    );
  }

  return (
    <div>
      {isLoginMode ? (
        <LogIn
          setIsAuthenticated={setIsAuthenticated}
          submitHandler={submitHandler}
          changeHandler={changeHandler}
        />
      ) : (
        <SignUp submitHandler={submitHandler} changeHandler={changeHandler} />
      )}
      {loginError && <p id="tryTest">{loginError}</p>}
      <button type="button" onClick={toggleMode}>
        {isLoginMode ? "Sign Up" : "Already have an account?"}
      </button>
    </div>
  );
}

export default Auth;
