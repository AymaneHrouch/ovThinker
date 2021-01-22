import React from "react";
import StandardForm from "./common/standardForm";
import { Form } from "react-bootstrap";
import Joi from "joi-browser";
import { changeName } from "../services/userService";
import { toast } from "react-toastify";

class ChangeName extends StandardForm {
  state = {
    data: {
      name: "",
    },
    errors: {},
    saved: false,
  };

  schema = {
    name: Joi.string().min(3).required().label("New name"),
  };

  doSubmit = () => {
    const { name } = this.state.data;
    try {
      this.setState({ saved: true });
      changeName(name);
    } catch (ex) {
      console.log(ex);
    }
    toast.success("SAVED!");
  };
  render() {
    return (
      <React.Fragment>
        <h3 className="text-center mb-4">Change Name</h3>
        <Form className="ml-auto mr-auto" onSubmit={this.handleSubmit}>
          {this.renderInput("name", "New name")}
          {this.renderButton("Change")}
          <p className="pt-4">
            Please note: new name will appear next time you log in.
          </p>
        </Form>
      </React.Fragment>
    );
  }
}

export default ChangeName;
