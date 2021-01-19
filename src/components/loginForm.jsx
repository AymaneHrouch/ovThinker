import React, { Component } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Input from "./input";
import Joi from "joi-browser";
import auth from "./../services/authService";

class LoginForm extends Component {
  state = {
    account: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.account, this.schema, options);
    if (!error) return null; // if there's no error

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProprety = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  doSubmit = async () => {
    try {
      const { account } = this.state;
      await auth.login(account.email, account.password);
      window.location = "/";
    } catch (ex) {
      const errors = { ...this.state.errors };
      console.log(ex.response);
      errors.email = ex.response.data;
      this.setState({ errors });
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProprety(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;

    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;
    return (
      <Container>
        <Form
          className="col-md-3 mt-4 ml-auto mr-auto"
          onSubmit={this.handleSubmit}
        >
          <Input
            name="email"
            label="Email"
            value={account.email}
            onChange={this.handleChange}
            error={errors.email}
          />
          <Input
            name="password"
            label="Password"
            value={account.password}
            onChange={this.handleChange}
            error={errors.password}
          />
          <Button disabled={this.validate()} variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Container>
    );
  }
}

export default LoginForm;
