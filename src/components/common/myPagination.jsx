import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

class MyPagination extends Component {
  render() {
    const { currentPage, journalsLength, onChange } = this.props;

    const StyledUl = styled.ul`
      & li {
        background: ${({ theme }) => theme.card};
        border: ${({ theme }) => theme.cardBorder};
        color: ${({ theme }) => theme.paginationBtn};
        cursor: pointer;
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none;
      }

      & li:hover {
        border: ${({ theme }) => theme.cardBorder};
        background: ${({ theme }) => theme.hoverBtn};
        color: ${({ theme }) => theme.paginationBtn};
      }

      & li:first-child {
        border-radius: 15px 0 0 15px;
        background: ${({ theme }) => currentPage <= 1 && theme.body};
        color: ${({ theme }) => currentPage <= 1 && theme.disabledText};
        cursor: ${() => currentPage <= 1 && "default"};
      }

      & li:last-child {
        border-radius: 0 15px 15px 0;
        background: ${({ theme }) => journalsLength === 0 && theme.body};
        color: ${({ theme }) => journalsLength === 0 && theme.disabledText};
        cursor: ${() => journalsLength === 0 && "default"};
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
