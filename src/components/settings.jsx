import React from "react";
import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import ChangeName from "./changeName";
import ChangePassword from "./changePassword";

const Settings = () => {
  return (
    <Container className="pt-4">
      <h1 className="text-center mb-4">Settings</h1>
      <Row className="d-flex justify-content-around">
        <Col md={4}>
          <ChangePassword />
        </Col>
        <Col md={4}>
          <ChangeName />
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
