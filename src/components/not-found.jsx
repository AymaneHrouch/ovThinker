import React from "react";

const NotFound = props => {
  return <div className="container">
      <h1>Page Not Found</h1>
      <button className="btn btn-primary" onClick={() => props.history.push('/')}>Home</button>
  </div>;
};

export default NotFound;