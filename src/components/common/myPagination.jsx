import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

class MyPagination extends Component {
  render() {
    const { currentPage, journalsLength, onChange } = this.props;

    const StyledUl = styled.ul`
      cursor: pointer;
      & li {
        background: ${({ theme }) => theme.card};
        border: ${({ theme }) => theme.cardBorder};
      }

      & li:first-child {
        border-radius: 15px 0 0 15px;
        // display: ${currentPage <= 1 && "none"};
        color: ${currentPage <= 1 && "#333"};
        cursor: ${currentPage <= 1 && "auto"};
      }

      & li:last-child {
        border-radius: 0 15px 15px 0;
        color: ${journalsLength === 0 && "#333"};
        cursor: ${journalsLength === 0 && "auto"};
      }
    `;

    return (
      <StyledUl className="pagination">
        <li className="page-link" onClick={() => onChange("prev")}>
          <i className="fa fa-chevron-left pr-1" aria-hidden="true"></i>
          Previous
        </li>
        <li className="page-link" onClick={() => onChange("next")}>
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
