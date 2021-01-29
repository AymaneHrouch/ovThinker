import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledUl = styled.ul`
  cursor: pointer;
  & li {
    background: ${({ theme }) => theme.card};
    border: ${({ theme }) => theme.cardBorder};
  }

  & li:first-child {
    border-radius: 15px 0 0 15px;
  }

  & li:last-child {
    border-radius: 0 15px 15px 0;
  }
`;

class MyPagination extends Component {
  render() {
    const { currentPage, journalsLength, onChange } = this.props;
    return (
      <StyledUl className="pagination">
        <li
          className="page-link"
          disabled={currentPage <= 1}
          onClick={() => onChange("prev")}
        >
          <i className="fa fa-chevron-left pr-1" aria-hidden="true"></i>
          Previous
        </li>
        <li
          className="page-link"
          disabled={journalsLength === 0}
          onClick={() => onChange("next")}
        >
          Next <i className="fa fa-chevron-right pl-1" aria-hidden="true"></i>
        </li>
      </StyledUl>
    );
  }
}

MyPagination.propTypes = {
  journalpagsLength: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MyPagination;
