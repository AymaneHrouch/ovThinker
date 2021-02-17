import React from "react";
import styled from "styled-components";
import { Anchorme } from 'react-anchorme';

const StyledB = styled.b`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const SmartText = ({ text, length = 200, url }) => {
  const [showLess, setShowLess] = React.useState(true);

  if (text.length < length || url !== "/journals") {
    return <Anchorme target="_blank">{text}</Anchorme>;
  }

  return (
    <Anchorme target="_blank">
      {showLess ? `${text.slice(0, length)}…` : text}
      &nbsp;
      <StyledB onClick={() => setShowLess(!showLess)}>
        See {showLess ? "More" : "Less"}
      </StyledB>
    </Anchorme>
  );
};

export default SmartText;
