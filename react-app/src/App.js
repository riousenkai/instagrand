import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import Navigation from "./components/Navigation/Navigation";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UserProfile from "./components/UserProfile/UserProfile";
import Home from "./components/Home/Home";
import Post from "./components/Post/Post";
import { authenticate } from "./store/session";
import Settings from "./components/Settings/Settings";
import About from "./components/About/About";
import AboutNav from "./components/About/AboutNav";
import Channels from "./components/Messages/Channels";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/signup" exact={true}>
          <SignUpForm />
        </Route>
        <Route path="/about" exact={true}>
          <AboutNav />
          <About />
        </Route>
        <ProtectedRoute path="/posts/:postId" exact={true}>
          <Navigation />
          <Post />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <Navigation />
          <UserProfile />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true}>
          <Navigation />
          <Home />
        </ProtectedRoute>
        <ProtectedRoute path="/settings" exact={true}>
          <Navigation />
          <Settings />
        </ProtectedRoute>
        <ProtectedRoute path="/messages" exact={true}>
          <Navigation />
          <Channels />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
