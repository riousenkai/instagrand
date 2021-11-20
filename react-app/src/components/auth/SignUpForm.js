import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router";
import { signUp, login } from "../../store/session";
import { icon2 } from "./authicons";
import "./Signup.css";

const SignUpForm = () => {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [name, setName] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(
        signUp(username.toLowerCase(), email, password, name)
      );
      if (data) {
        setErrors(data);
      }
    } else {
      setErrors(['Passwords must match.'])
    }
  };

  const demo = async () => {
    await dispatch(login("demo@aa.io", "password"));
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateName = (e) => {
    setName(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="signup-main">
      <div className="signup-top">
        <img
          className="login-logo"
          src="https://fontmeme.com/permalink/211117/be912bd83fb2b6a44d50d0b7b4562822.png"
        />
        <div className="signup-hello">
          Sign up to see photos and videos from your friends.
        </div>
        <button onClick={demo} className="signup-demo">
          {icon2} Log in as Demo
        </button>
        <div className="login-or">
          <div className="login-line"></div>
          <div className="l-or">OR</div>
          <div className="login-line"></div>
        </div>
        <form onSubmit={onSignUp} className="signup-form">
          <input
            placeholder="Email"
            className="signup-input"
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
            required={true}
          ></input>
          <input
            placeholder="Full Name"
            className="signup-input"
            type="text"
            name="name"
            onChange={updateName}
            value={name}
            required={true}
          ></input>
          <input
            placeholder="Username"
            className="signup-input"
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
            required={true}
          ></input>
          <input
            placeholder="Password"
            className="signup-input"
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
            required={true}
          ></input>
          <input
            placeholder="Repeat Password"
            className="signup-input"
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
          <button
            className="signup-submit"
            type="submit"
            disabled={
              username.length < 1 ||
              email.length < 1 ||
              password.length < 1 ||
              repeatPassword.length < 1 ||
              name.length < 1
            }
          >
            Sign Up
          </button>
        </form>
        <div className="login-errors">
          {errors.map((error, ind) => (
            <div className="l-err-msg" key={ind}>{error}</div>
          ))}
        </div>
      </div>
      <div className="signup-bot">
        Have an account?{" "}
        <span onClick={() => history.push("/login")} className="signup-log">
          Log in
        </span>
      </div>
    </div>
  );
};

export default SignUpForm;
