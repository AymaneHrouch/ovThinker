import React, { Component } from "react";
import DateTimePicker from "react-datetime-picker";

class MyForm extends Component {
  state = {
    value: new Date(),
  };

  render() {
    return (
      <div className="container">
        <div className="form-group d-flex flex-column align-items-center m-2">
          <label htmlFor="exampleFormControlTextarea1">How was your day?</label>
          <textarea
            className="form-control mb-3"
            id="exampleFormControlTextarea1"
            rows="10"
          ></textarea>
          <div className="w-100 mb-2">
            <DateTimePicker
              onChange={value => this.setState({ value })}
              clearAriaLabel="Clear value"
              value={this.state.value}
            />
          </div>
          <div className="w-100">
            <button className="btn btn-primary m-2">Save</button>
            <button className="btn btn-danger m-2">Cancel</button>
          </div>
          <div className="w-100">
            <button className="float-right btn btn-danger m-2">
              Save and Lock
              <i className="ml-2 fa fa-lock" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default MyForm;
