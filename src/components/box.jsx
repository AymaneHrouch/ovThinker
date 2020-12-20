import React, { Component } from "react";
import MyFormm from "./myForm";
import Card from "./card";

class Box extends Component {
  state = { isEdit: false };

  handleToggleEdit = () => {
    this.setState({ isEdit: !this.state.isEdit });
  };

  render() {
    if (this.state.isEdit)
      return <MyFormm {...this.props} onToggleEdit={this.handleToggleEdit} />;
    else return <Card {...this.props} onToggleEdit={this.handleToggleEdit} />;
  }
}

export default Box;
