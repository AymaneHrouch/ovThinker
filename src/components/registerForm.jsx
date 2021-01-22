import React, { Component } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Joi from "joi-browser";
import auth from "./../services/authService";
import StandardForm from "./common/standardForm";
import { toast } from "react-toastify";

class LoginForm extends StandardForm {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    errors: {},
  };

  schema = {
    name: Joi.string().required().max(30).min(3).label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
    confirm_password: Joi.string().required().min(5).label("Password"),
  };

  doSubmit = async () => {
    if(!this.confirmPassword()) return

    try {
      const { data } = this.state;
      await auth.register(data.name, data.email, data.password);
      toast.info("User registred with success!!");
      toast.info("You can now login");
      this.props.history.push("/login");
    } catch (ex) {
      const errors = { ...this.state.errors };
      console.log(ex.response);
      errors.email = ex.response.data;
      this.setState({ errors });
    }
  };

  render() {
    return (
      <Container>
        <Form
          className="col-md-3 mt-4 ml-auto mr-auto"
          onSubmit={this.handleSubmit}
        >
          {this.renderInput("name", "Name", "text")}
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput(
            "confirmPassword",
            "Re-type password",
            "password"
          )}
          {this.renderButton("Register")}
        </Form>
      </Container>
    );
  }
}

export default LoginForm;
