import React, { Component } from "react";
import DateTimePicker from "react-datetime-picker";
import { toast } from "react-toastify";
import { saveJournal } from "../services/journalService";
import PropTypes from "prop-types";
import styled from "styled-components";

const TextArea = styled.textarea`
  background-color: ${({ theme }) => theme.card} !important;
  color: ${({ theme }) => theme.text} !important;
  letter-spacing: 1px;
  font-size: 1.1rem;
  width: 100%;
`;

class MyForm extends Component {
  state = {
    journal: {
      comment: "",
      date: new Date(),
      starred: false,
      locked: false,
    },
    rows: 10,
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

  handleRowsChange = () => {
    const rows = this.state.rows === 10 ? 30 : 10;
    this.setState({ rows });
  };

  render() {
    const { onToggleEdit } = this.props;
    const { journal, rows } = this.state;
    const rowChangerStyle = {
      cursor: "pointer",
      borderBottom: "solid 2px #007bff",
      padding: "5px",
      marginBottom: "10px"
    };

    return (
      <div className="container">
        <div className="form-group d-flex flex-column align-items-center m-2">
          <label htmlFor="form">How was your day?</label>
          <TextArea
            autoFocus
            value={journal["comment"]}
            onChange={this.handleChange}
            className="form-control"
            id="form"
            rows={rows}
          ></TextArea>
          <div
            onClick={this.handleRowsChange}
            style={rowChangerStyle}
          >
            <i
              className={`fa fa-arrow-${rows === 10 ? "down" : "up"} p-1`}
              aria-hidden="true"
            ></i>
          </div>
          <div className="w-100 mb-2">
            <DateTimePicker
              minDate={new Date("1900")}
              maxDate={new Date("2100")}
              required={true}
              onChange={this.handleDateChange}
              value={new Date(journal["date"])}
            />
          </div>
          <div className="w-100">
            <button className="btn btn-primary m-2" onClick={this.handleSave}>
              Save
            </button>
            <button
              className="btn btn-danger m-2"
              onClick={onToggleEdit}
              hidden={!journal._id}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

MyForm.propTypes = {
  journal: PropTypes.object,
  onToggleEdit: PropTypes.func,
  onSave: PropTypes.func,
  theme: PropTypes.string,
};

export default MyForm;
