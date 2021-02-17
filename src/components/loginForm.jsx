import React from "react";
import { Container, Form } from "react-bootstrap";
import Joi from "joi-browser";
import auth from "./../services/authService";
import StandardForm from "./common/standardForm";
import Loader from "./common/loader";

class LoginForm extends StandardForm {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
    loading: false,
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.email, data.password);
      window.location = "/";
    } catch (ex) {
      const errors = { ...this.state.errors };
      errors.email = ex.response.data;
      this.setState({ errors, loading: false });
    }
  };

  inputSampleAccount = () => {
    this.setState({
      data: {
        email: "aymane@hrouch.me",
        password: "aymanehrouch",
      },
      errors: {},
    });
  };
  render() {
    const { loading } = this.state;
    return (
      <Container>
        {loading && <Loader fontSize="3rem" />}
        <Form
          className="col-md-3 mt-4 ml-auto mr-auto"
          onSubmit={this.handleSubmit}
        >
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
          <p style={{ marginTop: "2rem" }}>
            Just testing the app?
            <br />
            You don't have to create a new account then:{" "}
            <b onClick={this.inputSampleAccount} style={{ cursor: "pointer" }}>
              Click Here
            </b>{" "}
            to inject credentials of a sample account then press Login.
          </p>
        </Form>
      </Container>
    );
  }
}

export default LoginForm;
