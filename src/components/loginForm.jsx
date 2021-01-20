import React, { Component } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Joi from "joi-browser";
import auth from "./../services/authService";
import StandardForm from "./common/standardForm";

class LoginForm extends StandardForm {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
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
      console.log(ex.response);
      errors.email = ex.response.data;
      this.setState({ errors });
    }
  };

  render() {
    const { data, errors } = this.state;
    return (
      <Container>
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
