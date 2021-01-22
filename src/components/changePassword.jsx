import React from "react";
import StandardForm from "./common/standardForm";
import Joi from "joi-browser";
import { Container, Form } from "react-bootstrap";
import { changePassword } from "../services/userService";
import { toast } from "react-toastify";

class ChangePassword extends StandardForm {
  state = {
    data: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
    errors: {},
  };

  schema = {
    oldPassword: Joi.string().required().label("Current password"),
    password: Joi.string().required().min(8).label("New password"),
    confirmPassword: Joi.string().label("Password confirmation"),
  };

  doSubmit = async () => {
    const { data } = this.state;
    if (!this.confirmPassword()) return;

    try {
      await changePassword(data.oldPassword, data.password);
      toast.info("Password has changed successfully!");
      window.location = "/settings";
    } catch (ex) {
      const errors = { ...this.state.errors };
      errors.oldPassword = ex.response.data;
      this.setState({ errors });
    }
  };

  render() {
    return (
      <React.Fragment>
        <h3 className="text-center mb-4">Change Password</h3>
        <Form className="ml-auto mr-auto mb-4" onSubmit={this.handleSubmit}>
          {this.renderInput("oldPassword", "Current password", "password")}
          {this.renderInput("password", "New password", "password")}
          {this.renderInput(
            "confirmPassword",
            "Re-type new password",
            "password"
          )}
          {this.renderButton("Change")}
        </Form>
      </React.Fragment>
    );
  }
}

export default ChangePassword;
