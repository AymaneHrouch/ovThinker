import React, { Component } from "react";
import { Form, FormControl } from "react-bootstrap";

class Search extends Component {
  state = {};
  render() {
    return (
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mb-2" />
        </Form>
    );
  }
}

export default Search;
