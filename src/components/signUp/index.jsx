import "./signUp.css";

function SignUp(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.submitHandler(e);
  };

  return (
    <div className="ContainerForSignLog">
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={props.changeHandler}
          name="email"
          type="text"
          placeholder="Email"
          required
        />
        <input
          onChange={props.changeHandler}
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;