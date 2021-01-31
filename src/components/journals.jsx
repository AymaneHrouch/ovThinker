import React, { Component } from "react";
import {
  getJournal,
  getJournals,
  getStarredJournals,
  saveJournal,
  deleteJournal,
} from "../services/journalService";
import { Col, Container, Row } from "react-bootstrap";
import Filter from "./filter";
import ListRadio from "./listRadio";
import MyPagination from "./common/myPagination";
import { toast } from "react-toastify";
import Box from "./box";
import styled from "styled-components";

const StyledPagination = styled.div`
  display: none;
  padding: 8px;
  @media only screen and (max-width: 600px) {
    display: block;
  }
`;

const StyledContainer = styled(Container)`
  @media only screen and (max-width: 600px) {
    padding: 0;
  }
`;

class Journals extends Component {
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
    let start;
    let end;
    if (pickedFilter === "starred") {
      const { data: journals } = await getStarredJournals(
        currentPage,
        pageSize
      );
      return this.setState({ journals });
    }

    if (pickedFilter === "day") {
      start = new Date(
        pickedDate.getFullYear(),
        pickedDate.getMonth(),
        pickedDate.getDate()
      );
      end = new Date(
        pickedDate.getFullYear(),
        pickedDate.getMonth(),
        pickedDate.getDate() + 1
      );
    } else {
      start = new Date(pickedDate.getFullYear(), pickedDate.getMonth());
      end = new Date(pickedDate.getFullYear(), pickedDate.getMonth() + 1);
    }

    const { data: journals } = await getJournals(
      currentPage,
      pageSize,
      start.getTime(),
      end.getTime()
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
  };

  handleDelete = async journalId => {
    if (
      window.confirm("Are you sure you want to permanently delete this diary?")
    ) {
      await deleteJournal(journalId);
      await this.getRequiredJournals();
      toast.info("deleted");
    }
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
    const { journals, currentPage, pickedFilter, pickedDate } = this.state;
    return (
      <React.Fragment>
        <StyledContainer className="mt-2">
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
                        key={journal._id}
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
          <Row>
            <Col>
              <StyledPagination>
                <MyPagination
                  journalsLength={journals.length}
                  currentPage={currentPage}
                  onChange={this.handlePagination}
                />
              </StyledPagination>
            </Col>
          </Row>
        </StyledContainer>
      </React.Fragment>
    );
  }
}

export default Journals;
