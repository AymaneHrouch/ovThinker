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
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "./components/loginForm";
import "./App.css";
import auth from "./services/authService";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

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
          <Route path="/journals/:id" component={Journal} />
          <Route path="/journals" component={Journals} />
          <Route path="/random" component={Random} />
          <Route path="/new" component={MyForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          {/* <Route path="/register" component={RegisterForm} /> */}
          <Route path="/not-found" component={NotFound} />
          <Route path="/locked" component={Locked} />
          <Redirect from="/" exact to="/new" />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    );
  }
}

export default App;
