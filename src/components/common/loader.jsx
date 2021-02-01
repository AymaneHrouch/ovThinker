import React from "react";
import propTypes from "react-bootstrap/esm/Image";
import styled from "styled-components";

const Loader = props => {
  const StyledDiv = styled.div`
    text-align: center;
    font-size: ${props.fontSize};
    color: #007bff;
  `;

  return (
    <StyledDiv>
      <i className="fa fa-spinner fa-spin" />
    </StyledDiv>
  );
};

Loader.propTypes = {
  fontSize: propTypes.string,
};

export default Loader;
