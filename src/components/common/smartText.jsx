import React from "react";
import styled from "styled-components";

const StyledB = styled.b`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const SmartText = ({ text, length = 200, url }) => {
  const [showLess, setShowLess] = React.useState(true);

  if (text.length < length || url !== "/journals") {
    return <React.Fragment>{text}</React.Fragment>;
  }

  return (
    <React.Fragment>
      {showLess ? `${text.slice(0, length)}…` : text}
      &nbsp;
      <StyledB onClick={() => setShowLess(!showLess)}>
        See {showLess ? "More" : "Less"}
      </StyledB>
    </React.Fragment>
  );
};

export default SmartText;
