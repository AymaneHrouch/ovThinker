import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";

class LockModal extends Component {
  tomorrow = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  };

  render() {
    const { showModal } = this.props;
    return (
      <Modal
        show={showModal}
        onHide={this.props.onToggleModal}
        animation={true}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Specify unlock date</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DateTimePicker
            minDate={this.tomorrow()}
            maxDate={new Date("2200")}
            required={true}
            value={this.props.unlockDate}
            onChange={value => this.props.onDateChange(value)}
          />
          <p>
            You won't be able to unlock this diary before the specified date.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onToggleModal}>
            Close
          </Button>
          <Button variant="primary" onClick={this.props.onLock}>
            <i className="fa fa-lock mr-1" aria-hidden="true"></i>
            LOCK!
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default LockModal;
