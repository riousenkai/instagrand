import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { useModal } from "../../context/UseModal";
import { login } from "../../store/session";
import { icon1 } from "./authicons";
import "./Login.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const { setNum } = useModal();
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    setNum(0);
    return <Redirect to="/" />;
  }

  const demo = async () => {
    await dispatch(login("demo@aa.io", "password"));
  };

  return (
    <div className="login-main">
      <div className="login-img-wrapper">
        <img className="login-img" src="https://i.imgur.com/ptJQSQ4.jpg" />
      </div>
      <div className="login-right">
        <div className="login-top">
          <img
            className="login-logo"
            src="https://fontmeme.com/permalink/211117/be912bd83fb2b6a44d50d0b7b4562822.png"
          />
          <form onSubmit={onLogin} className="login-form">
            <input
              className="login-email"
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
            <input
              className="login-email"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
            <button
              className="login-submit"
              type="submit"
              disabled={email.length < 1 || password.length < 1}
            >
              Login
            </button>
          </form>
          <div className="login-or">
            <div className="login-line"></div>
            <div className="l-or">OR</div>
            <div className="login-line"></div>
          </div>
          <div className="demo-login">
            <span className="demo-span" onClick={demo}>
              {icon1}
            </span>
            <div className="demo-link" onClick={demo}>
              Login as Demo User
            </div>
          </div>
          <div className="login-errors">
            {errors.map((error, ind) => (
              <div className="l-err-msg" key={ind}>
                {error}
              </div>
            ))}
          </div>
        </div>
        <div className="login-signup">
          <div className="login-signup-word">Don't have an account? <span className="l-s-link">Sign up</span></div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
