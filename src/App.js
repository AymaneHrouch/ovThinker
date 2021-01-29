import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Locked from "./components/locked";
import { ThemeProvider } from "styled-components";
import NavigationBar from "./components/navBar";
import MyForm from "./components/myForm";
import NotFound from "./components/not-found";
import Journal from "./components/journal";
import Journals from "./components/journals";
import Random from "./components/random";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import ProtectedRoute from "./components/common/protectedRoute";
import Profile from "./components/profile";
import Settings from "./components/settings";
import auth from "./services/authService";
import { GlobalStyles } from "./components/styling/GlobalStyle";
import { lightTheme, darkTheme } from "./components/styling/Themes";
import { useDarkMode } from "./components/styling/useDarkMode";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [user, setUser] = useState();
  const [theme, themeToggler, mountedComponent] = useDarkMode();

  const themeMode = theme === "light" ? lightTheme : darkTheme;

  useEffect(() => {
    setUser(auth.getCurrentUser());
  }, []);

  if (!mountedComponent) return null;
  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <NavigationBar user={user} theme={theme} themeToggler={themeToggler} />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
      <Switch>
        <ProtectedRoute path="/journals/:id" component={Journal} />
        <ProtectedRoute path="/journals" component={Journals} />
        <ProtectedRoute path="/random" component={Random} />
        <ProtectedRoute path="/new" component={MyForm} />
        <ProtectedRoute path="/settings" component={Settings} />
        <ProtectedRoute path="/profile" component={Profile} />
        <Route
          path="/login"
          render={props => {
            if (user) return <Redirect to="/new" />;
            return <LoginForm />;
          }}
        />
        <Route path="/logout" component={Logout} />
        <Route
          path="/register"
          render={props => {
            if (user) return <Redirect to="/new" />;
            return <RegisterForm {...props} />;
          }}
        />
        <Route path="/not-found" component={NotFound} />
        <ProtectedRoute path="/locked" component={Locked} />
        <Redirect from="/" exact to="/new" />
        <Redirect to="/not-found" />
      </Switch>
    </ThemeProvider>
  );
};

export default App;
