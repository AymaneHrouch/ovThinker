import React, { Component } from "react";
import DateTimePicker from "react-datetime-picker";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "./common/loader";
import { saveJournal } from "../services/journalService";

const TextArea = styled.textarea`
  background-color: ${({ theme }) => theme.card} !important;
  color: ${({ theme }) => theme.text} !important;
  letter-spacing: 1px;
  font-size: 1.1rem;
  width: 100%;
  resize: none;
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
    loading: false,
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

  wordCount = str => str.split(" ").filter(n => n != "").length;

  handleDateChange = value => {
    const journal = { ...this.state.journal };
    journal["date"] = value;
    this.setState({ journal });
  };

  handleSave = async () => {
    const { journal } = this.state;
    const { date } = journal;

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

    this.setState({ loading: true });
    const { data: newJournal } = await saveJournal(this.state.journal);
    this.setState({ loading: false });
    this.props.history.push(`/journals/${newJournal._id}`);
  };

  handleRowsChange = () => {
    const rows = this.state.rows === 10 ? 30 : 10;
    this.setState({ rows });
  };

  render() {
    const { onToggleEdit } = this.props;
    const { journal, rows, loading } = this.state;
    const rowChangerStyle = {
      cursor: "pointer",
      borderBottom: "solid 2px #007bff",
      padding: "5px",
      marginBottom: "10px",
    };

    return (
      <div className="container">
        <div className="form-group d-flex flex-column align-items-center m-2">
          {loading && <Loader fontSize="2rem" />}
          <span style={{ fontSize: "0.8rem", alignSelf: "flex-end" }}>
            {this.wordCount(journal.comment)} word{" "}
          </span>
          <TextArea
            placeholder="How was your day? ..."
            disabled={loading === true}
            autoFocus
            value={journal["comment"]}
            onChange={this.handleChange}
            className="form-control"
            id="form"
            rows={rows}
          ></TextArea>
          <div onClick={this.handleRowsChange} style={rowChangerStyle}>
            <i
              className={`fa fa-arrow-${rows === 10 ? "down" : "up"} p-1`}
              aria-hidden="true"
            ></i>
          </div>
          <div className="w-100 mb-2">
            <DateTimePicker
              maxDate={new Date("3000")}
              disabled={loading === true}
              onChange={this.handleDateChange}
              value={new Date(journal["date"])}
            />
            <span
              onClick={() => this.handleDateChange(new Date())}
              style={{ cursor: "pointer" }}
              className="p-1"
            >
              Now
            </span>
          </div>
          <div className="w-100">
            <button
              className="btn btn-primary m-2"
              onClick={this.handleSave}
              disabled={journal.comment === "" || loading}
            >
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
