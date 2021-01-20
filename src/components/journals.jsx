import React, { Component } from "react";
import {
  getJournal,
  getJournals,
  getStarredJournals,
  saveJournal,
} from "../services/journalService";
import { Col, Container, Row } from "react-bootstrap";
import Filter from "./filter";
import ListRadio from "./listRadio";
import MyPagination from "./common/myPagination";
import { deleteJournal } from "./../services/journalService";
import { toast } from "react-toastify";
import Box from "./box";

class JournalTable extends Component {
  state = {
    journals: [],
    currentPage: 1,
    pageSize: 3,
    pickedFilter: "day",
    pickedDate: new Date(),
    unlockDate: null,
    journalShouldLockedId: "",
  };

  componentDidMount() {
    this.getRequiredJournals();
  }

  componentDidUpdate(prevProps, prevState) {
    const { pickedFilter, currentPage, pickedDate } = this.state;
    if (
      pickedFilter !== prevState.pickedFilter ||
      currentPage !== prevState.currentPage ||
      pickedDate !== prevState.pickedDate
    )
      this.getRequiredJournals();
  }

  getRequiredJournals = async () => {
    const { currentPage, pageSize, pickedDate, pickedFilter } = this.state;
    if (pickedFilter === "starred") {
      const { data: journals } = await getStarredJournals(
        currentPage,
        pageSize
      );
      return this.setState({ journals });
    }

    let day = pickedFilter === "day" ? pickedDate.getDate() : null;
    const { data: journals } = await getJournals(
      currentPage,
      pageSize,
      pickedDate.getFullYear(),
      pickedDate.getMonth(),
      day
    );
    this.setState({ journals });
  };

  handleFilter = ({ currentTarget }) => {
    this.setState({
      pickedFilter: currentTarget.id,
      currentPage: 1,
      pickedDate: new Date(),
    });
  };

  handlePick = value => {
    const { pickedDate } = this.state;
    let newDate = pickedDate;
    if (value === "prev-day") {
      newDate.setDate(newDate.getDate() - 1);
    } else if (value === "next-day") {
      newDate.setDate(newDate.getDate() + 1);
    } else if (value === "prev-month") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (value === "next-month") {
      newDate.setMonth(newDate.getMonth() + 1);
    } else newDate = value;

    this.setState({ pickedDate: new Date(newDate), currentPage: 1 });
  };

  handlePagination = page => {
    let { currentPage, journals } = this.state;
    if (page === "next") {
      currentPage = journals.length !== 0 ? currentPage + 1 : currentPage;
    } else {
      currentPage = currentPage - 1;
    }
    if (currentPage < 1) return;
    this.setState({ currentPage });
    console.log(this.state.currentPage);
  };

  handleDelete = async journalId => {
    await deleteJournal(journalId);
    await this.getRequiredJournals();
    toast.info("deleted");
  };

  handleDateChange = unlockDate => {
    this.setState({ unlockDate });
  };

  handleLock = async () => {
    const { journalShouldLockedId: journalId } = this.state;
    if (!this.state.unlockDate) return toast.error("Invalid Date");
    let { data: journal } = await getJournal(journalId);
    journal.locked = true;
    journal.unlockDate = this.state.unlockDate;
    await saveJournal(journal);

    await this.getRequiredJournals();

    toast.info("LOCKED");
    this.setState({ showModal: false });
  };

  handleSave = journal => {
    if (journal) {
      const journals = [...this.state.journals];
      let updatedJournal = journals.find(j => j._id === journal._id);
      const index = journals.indexOf(updatedJournal);
      journals[index] = { ...updatedJournal };
      journals[index] = journal;
      this.setState({ journals });
    }
  };

  handleStar = async journal => {
    const journals = [...this.state.journals];
    const index = journals.indexOf(journal);

    journals[index]["starred"] = !journals[index]["starred"];

    this.setState({ journals });
    await saveJournal(journal);
  };

  handleToggleModal = journalId => {
    this.setState({
      showModal: !this.state.showModal,
      journalShouldLockedId: journalId,
    });
  };

  handleHideModal = () =>
    this.setState({ showModal: false, journalShouldLockedId: "" });

  render() {
    const {
      journals,
      currentPage,
      pickedFilter,
      pickedDate,
    } = this.state;
    return (
      <React.Fragment>
        <Container className="mt-2">
          <Row>
            <Col>
              <div className="sticky-top p-2">
                <ListRadio
                  onFilter={this.handleFilter}
                  pickedFilter={pickedFilter}
                />
                <Filter
                  filter={pickedFilter}
                  pickedDate={pickedDate}
                  onChange={this.handlePick}
                />
                <MyPagination
                  journalsLength={journals.length}
                  currentPage={currentPage}
                  onChange={this.handlePagination}
                />
                <span className="sm-quote d-none d-md-block">
                  Worry less. Live more.
                </span>
              </div>
            </Col>
            <Col sm={8}>
              {journals.length !== 0
                ? journals.map(journal => {
                    return (
                      <Box
                        journal={journal}
                        showModal={this.state.showModal}
                        unlockDate={this.state.unlockDate}
                        url={this.props.match.url}
                        onToggleModal={() =>
                          this.handleToggleModal(journal._id)
                        }
                        onLock={() => this.handleLock(journal._id)}
                        onDateChange={this.handleDateChange}
                        onSave={this.handleSave}
                        onDelete={() => this.handleDelete(journal._id)}
                        onStar={() => this.handleStar(journal)}
                      />
                    );
                  })
                : `“Journaling helps you to remember how strong you truly are
              within yourself.”`}
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default JournalTable;
