import React from "react";
import PropTypes from "prop-types";

const Loader = props => {
  const divStyle = {
    textAlign: "center",
    fontSize: props.fontSize,
    color: "#007bff",
  };
  return (
    <div style={divStyle}>
      <i className="fa fa-spinner fa-pulse" />
    </div>
  );
};

Loader.propTypes = {
  fontSize: PropTypes.string,
};

export default Loader;
