import { set } from "lodash";
import React, { Component } from "react";
import {
  getJournal,
  saveJournal,
  deleteJournal,
} from "../services/journalService";
import Card from "./card";
import { toast } from "react-toastify";
import Box from "./box";

class Journal extends Component {
  state = {
    unlockDate: null,
    journal: {},
    showModal: false,
  };

  async componentDidMount() {
    try {
      let { data: journal } = await getJournal(this.props.match.params.id);
      this.setState({ journal });
    } catch (ex) {
      this.setState({ journal: false });
    }
  }

  handleDelete = () => {
    deleteJournal(this.state.journal._id);
    toast.info("Deleted");
    this.props.history.replace("/testform");
  };

  handleStar = async () => {
    let journal = this.state.journal;

    journal["starred"] = !journal["starred"];

    this.setState({ journal });
    await saveJournal(journal);
  };

  handleSave = journal => {
    this.setState({ journal });
    console.log("saved");
  };

  handleDelete = async journalId => {
    toast.info("Deleted");

    this.props.history.replace("/new");
    await deleteJournal(journalId);
  };

  handleDateChange = unlockDate => {
    this.setState({ unlockDate });
  };

  handleLock = async itemId => {
    if (!this.state.unlockDate) return toast.error("Invalid Date");

    let { data: journal } = await getJournal(itemId);
    journal.locked = true;
    journal.unlockDate = this.state.unlockDate;
    await saveJournal(journal);

    this.props.history.replace("/new");

    toast.info("LOCKED");
    this.setState({ showModal: false });
  };

  handleToggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    const { journal } = this.state;
    if (journal)
      return (
        <Box
          onToggleModal={this.handleToggleModal}
          showModal={this.state.showModal}
          unlockDate={this.state.unlockDate}
          onLock={() => this.handleLock(journal._id)}
          onDateChange={this.handleDateChange}
          onDelete={() => this.handleDelete(journal._id)}
          onStar={() => this.handleStar(journal)}
          journal={journal}
          onSave={this.handleSave}
          url={this.props.match.url}
        />
      );
    else {
      this.props.history.replace("/not-found");
      return null;
    }
  }
}

export default Journal;
