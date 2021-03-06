import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./../input";
import { Button } from "react-bootstrap";

class StandardForm extends Component {
  state = {
    data: {},
    errors: {},
    loading: false,
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
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
    this.setState({ errors: errors || {}, loading: true });

    if (errors) {
      this.setState({ loading: false });
      return;
    }

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProprety(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  confirmPassword = () => {
    const { password, confirmPassword } = this.state.data;

    if (password !== confirmPassword) {
      const errors = {};
      errors["confirmPassword"] = "Passwords don't match";
      this.setState({ errors, loading: false });
      return false;
    } else return true;
  };

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };

  renderButton = label => {
    return (
      <Button disabled={this.validate()} variant="primary" type="submit">
        {label}
      </Button>
    );
  };
}

export default StandardForm;
