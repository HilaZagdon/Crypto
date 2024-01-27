import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar({ user }) {
  const auth = getAuth();
  return (
    <nav className="NavBarDiv">
      <div className="ImageDiv">
        <img
          className="ImageForNavbar"
          src="https://static.vecteezy.com/system/resources/previews/008/822/064/non_2x/3d-design-bitcoin-cryptocurrency-white-background-free-png.png"
          alt=""
        />
        <h3>CryptoCoins</h3>
      </div>
      <div className="linksDiv">
        <Link to="/home">Home</Link>
        {user ? (
          <Link to="/myCrypto">My Crypto</Link>
        ) : (
          <Link to="/authentication">Authentication</Link>
        )}
      </div>
      {user ? (
        <div className="DivForSignOutBtn">
          <i className="fa-regular fa-circle-user"></i>
          <p>{user.email}</p>
          <button onClick={() => signOut(auth)} className="SignOutBtn">
            Sign Out
          </button>
        </div>
      ) : null}
    </nav>
  );
}

export default NavBar;
