import React from "react";
import styled from "styled-components";

const StyledSorting = styled.div`
  justify-content: center;
  cursor: pointer;
  padding: 0.5rem;
  text-aling: center;
  & span {
    margin-right: 0.5rem;
  }
`;

const Sort = ({ sort, onSort }) => {
  return (
    <StyledSorting onClick={onSort}>
      <span>Date</span>
      <i className={`fa fa-sort-${sort}`} aria-hidden="true"></i>
    </StyledSorting>
  );
};

export default Sort;
