import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Locked from "./components/locked";
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
import Settings from './components/settings';
import auth from "./services/authService";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  handleChangeName = name => this.setState({ name });

  render() {
    const { user } = this.state;
    
    return (
      <div>
        <NavigationBar user={user} />
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
              if (auth.getCurrentUser()) return <Redirect to="/new" />;
              return <LoginForm />;
            }}
          />
          <Route path="/logout" component={Logout} />
          <Route
            path="/register"
            render={props => {
              if (auth.getCurrentUser()) return <Redirect to="/new" />;
              return <RegisterForm {...props} />;
            }}
          />
          <Route path="/not-found" component={NotFound} />
          <ProtectedRoute path="/locked" component={Locked} />
          <Redirect from="/" exact to="/new" />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    );
  }
}

export default App;
