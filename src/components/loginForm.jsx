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
        </Form>
      </Container>
    );
  }
}

export default LoginForm;
