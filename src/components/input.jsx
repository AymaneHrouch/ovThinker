import React from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";

const StyledFormControl = styled(Form.Control)`
  background-color: ${({ theme }) => theme.formControl};
  &:focus {
    background-color: ${({ theme }) => theme.formControl};
  }
`;

const Input = ({ name, label, value, error, onChange, type = "text" }) => {
  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>
      <StyledFormControl
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />
      {error && <div className="alert alert-danger alert-sm">{error}</div>}
    </Form.Group>
  );
};

export default Input;
