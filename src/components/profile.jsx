import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <Container>
      <Link to="/settings">GO TO SETTINGS!</Link>
    </Container>
  );
};

export default Profile;
