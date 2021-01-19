import React from "react";
import { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import auth from "../services/authService";

const ProtectedRoute = ({ component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!auth.getCurrentUser()) return <Redirect to="/login" />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
