import React, { Component } from "react";
import DateTimePicker from "react-datetime-picker";
import { toast } from "react-toastify";
import { saveJournal } from "../services/journalService";

class MyFormm extends Component {
  state = {
    journal: {
      comment: "",
      date: new Date(),
      starred: false,
      locked: false,
    },
  };

  componentDidMount() {
    if (this.props.journal) {
      this.setState({ journal: this.props.journal });
    } else console.log("not populated");
  }

  handleChange = e => {
    const journal = { ...this.state.journal };
    journal["comment"] = e.currentTarget.value;
    this.setState({ journal });
  };

  handleDateChange = value => {
    const journal = { ...this.state.journal };
    journal["date"] = value;
    this.setState({ journal });
  };

  handleSave = async () => {
    const { journal } = this.state;
    const { comment, date } = journal;

    if (comment === "") return toast.error("Field can't be empty");
    if (!date) return toast.error("Invalide date.");

    if (journal._id) console.log("goooothem, you modified");
    else console.log("ooh it's new");

    if (journal._id) {
      this.props.onToggleEdit();
      this.props.onSave(this.state.journal);
      return await saveJournal({
        _id: journal._id,
        ...journal,
      });
    }

    const { data: newJournal } = await saveJournal(this.state.journal);
    this.props.history.push(`/journals/${newJournal._id}`);
  };

  render() {
    return (
      <div className="container">
        <div className="form-group d-flex flex-column align-items-center m-2">
          <label htmlFor="form">How was your day?</label>
          <textarea
            autoFocus
            value={this.state.journal["comment"]}
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
              value={new Date(this.state.journal["date"])}
            />
          </div>
          <div className="w-100">
            <button className="btn btn-primary m-2" onClick={this.handleSave}>
              Save
            </button>
            <button
              className="btn btn-danger m-2"
              onClick={this.props.onToggleEdit}
              hidden={!this.state.journal._id}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default MyFormm;
