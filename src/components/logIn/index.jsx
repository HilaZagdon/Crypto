import "./logIn.css";
import { useState, useEffect } from "react";

function LogIn(props) {
  // const checkUserOnMount = () => {
  //   const usersData = JSON.parse(localStorage.getItem("users"));
  //   if (usersData) {
  //     const foundUser = usersData.find(
  //       (u) => u.Email === props.user.Email && u.Password === props.user.Password
  //     );

  //     if (foundUser) {
  //       console.log("User found");
  //       props.setIsAuthenticated(true);
  //       localStorage.setItem("user", JSON.stringify(foundUser));
  //     } else {
  //       console.log("User not found");
  //     }
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.submitHandler(e);
  };

  // useEffect(() => {
  //   checkUserOnMount();
  // }, []); 

  return (
    <div className="ContainerForSignLog">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={props.changeHandler}
          name="email"
          type="text"
          placeholder="Email"
        />
        <input
          onChange={props.changeHandler}
          name="password"
          type="password"
          placeholder="Password"
        />
        <button>Log In</button>
      </form>
    </div>
  );
}

export default LogIn;