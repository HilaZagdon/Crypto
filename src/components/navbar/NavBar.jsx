import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar({ user }) {
  const auth = getAuth();
  return (
    <nav className="NavBarDiv">
      <Link to="/home">Home</Link>
      {user ? (
        <Link to="/myCrypto">My Crypto</Link>
      ) : (
        <Link to="/authentication">Authentication</Link>
      )}

      {user ? (
        <div className="DivForSignOutBtn">
          <button onClick={() => signOut(auth)} className="SignOutBtn">
            Sign Out
          </button>
          <p>{user.email}</p>
        </div>
      ) : null}
    </nav>
  );
}

export default NavBar;
