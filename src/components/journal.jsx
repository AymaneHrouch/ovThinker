import React, { Component } from "react";
import {
  getJournal,
  saveJournal,
  deleteJournal,
} from "../services/journalService";
import { toast } from "react-toastify";
import Box from "./box";

import Loader from "./common/loader";

class Journal extends Component {
  state = {
    unlockDate: null,
    journal: {},
    showModal: false,
    loading: true,
  };

  async componentDidMount() {
    try {
      let { data: journal } = await getJournal(this.props.match.params.id);
      this.setState({ journal, loading: false });
    } catch (ex) {
      this.setState({ journal: false });
    }
  }

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
    if (
      window.confirm("Are you sure you want to permanently delete this diary?")
    ) {
      toast.info("Deleted");

      this.props.history.replace("/new");
      await deleteJournal(journalId);
    }
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
    const { journal, loading } = this.state;
    if (loading) return <Loader fontSize="5rem" />;
    if (journal)
      return (
        <React.Fragment>
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
        </React.Fragment>
      );
    else {
      this.props.history.replace("/not-found");
      return null;
    }
  }
}

export default Journal;
