import React, { Component } from "react";
import DateTimePicker from "react-datetime-picker";
import { Redirect } from "react-router-dom";
import { saveJournal } from "./../services/journalService";
import { toast } from "react-toastify";

class MyFormTest extends Component {
  state = {
    data: {
      date: new Date(),
      comment: "",
      locked: false,
      starred: false,
    },
  };

  componentDidMount() {
    if (this.props.comment) {
      const { comment, date } = this.props;

      const data = { ...this.state.data };
      data["comment"] = comment;
      data["date"] = new Date(date);
      this.setState({ data });
    }
  }

  handleChange = e => {
    const data = { ...this.state.data };
    data["comment"] = e.currentTarget.value;
    this.setState({ data });
  };

  handleDateChange = value => {
    const data = { ...this.state.data };
    data["date"] = value;
    this.setState({ data });
  };

  handleSave = async () => {
    const { comment, date } = this.state.data;
    if (comment === "") return toast.error("Field can't be empty");
    if (!date) return toast.error("Invalide date.");
    console.log(date);

    let { data: journal } = this.props._id // this means we are using it from the journals page
      ? await saveJournal({ _id: this.props._id, ...this.state.data })
      : await saveJournal(this.state.data); // means it's a new entry

    console.log(journal);
    if (this.props.onSave) this.props.onSave(this.state.data);
    // after Editing... props from card
    else this.props.history.push(`/journals/${journal._id}`);
  };

  handleCancel = () => {
    if (this.props.onSave) this.props.onSave(null);
  };

  render() {
    return (
      <div className="container">
        <div className="form-group d-flex flex-column align-items-center m-2">
          <label htmlFor="form">How was your day?</label>
          <textarea
            autoFocus
            value={this.state.data["comment"]}
            onChange={this.handleChange}
            className="form-control mb-3"
            id="form"
            rows="10"
          ></textarea>
          <div className="w-100 mb-2">
            <DateTimePicker
              minDate={new Date("1900")}
              maxDate={new Date("2100")}
              required={true}
              onChange={this.handleDateChange}
              value={this.state.data["date"]}
            />
          </div>
          <div className="w-100">
            <button className="btn btn-primary m-2" onClick={this.handleSave}>
              Save
            </button>
            <button className="btn btn-danger m-2" onClick={this.handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default MyFormTest;
