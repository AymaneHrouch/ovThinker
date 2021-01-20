import React, { Component } from "react";
import MyForm from "./myForm";
import Card from "./card";
import PropTypes from 'prop-types';

class Box extends Component {
  state = { isEdit: false };

  handleToggleEdit = () => {
    this.setState({ isEdit: !this.state.isEdit });
  };

  render() {
    if (this.state.isEdit)
      return <MyForm {...this.props} onToggleEdit={this.handleToggleEdit} />;
    else return <Card {...this.props} onToggleEdit={this.handleToggleEdit} />;
  }
}

MyForm.propTypes = {
  // MyForm
  journal: PropTypes.object,
  onSave: PropTypes.func,
  
  // Card
  // journal: PropTypes.object,
  onStar: PropTypes.func,

  // Card/LockModal
  showModal: PropTypes.number,
  onToggleModal: PropTypes.func,
  onDateChange: PropTypes.func,
  onLock: PropTypes.func,

  // Card/OptionsDropdown
  onDelete: PropTypes.func,
  // onToggleModal: PropTypes.func,
}

export default Box;
