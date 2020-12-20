import React, { Component } from "react";
import { Pagination } from "react-bootstrap";

class MyPagination extends Component {
  render() {
    const { currentPage, journalsLength, onChange } = this.props;
    return (
      <Pagination>
        <Pagination.Prev
          disabled={currentPage <= 1}
          onClick={() => onChange("prev")}
        >
          <i className="fa fa-chevron-left pr-1" aria-hidden="true"></i>
          Previous
        </Pagination.Prev>
        <Pagination.Next
          disabled={journalsLength === 0}
          onClick={() => onChange("next")}
        >
          Next <i className="fa fa-chevron-right pl-1" aria-hidden="true"></i>
        </Pagination.Next>
      </Pagination>
    );
  }
}

export default MyPagination;
