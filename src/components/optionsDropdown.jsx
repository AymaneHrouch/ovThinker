import React from "react";
import { Dropdown } from "react-bootstrap";
import PropTypes from "prop-types";

const OptionsDropdown = props => {
  const { onToggleEdit, onDelete, onToggleModal } = props;
  return (
    <Dropdown className="float-right">
      <Dropdown.Toggle
        className="btn btn-sm"
        id="dropdown-basic"
      ></Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={onToggleEdit}>
          <i className="col-1 fa fa-pencil" aria-hidden="true"></i>
          <span className="col-1">Edit</span>
        </Dropdown.Item>
        <Dropdown.Item onClick={onDelete}>
          <i className="col-1 fa fa-trash" aria-hidden="true"></i>
          <span className="col-1">Delete</span>
        </Dropdown.Item>
        <Dropdown.Item onClick={onToggleModal}>
          <i className="col-1 fa fa-lock" aria-hidden="true"></i>
          <span className="col-1">Lock</span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

OptionsDropdown.propTypes = {
  onToggleEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onToggleModal: PropTypes.func,
};

export default OptionsDropdown;
