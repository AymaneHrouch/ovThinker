import React from "react";
import { Form } from "react-bootstrap";

const Input = ({ name, label, value, error, onChange, type = "text" }) => {
  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control name={name} type={type} value={value} onChange={onChange} />
      {error && <div className="alert alert-danger alert-sm">{error}</div>}
    </Form.Group>
  );
};

export default Input;
