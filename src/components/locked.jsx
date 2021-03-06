import React, { Component } from "react";
import { Row, Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getLockedJournals, saveJournal } from "./../services/journalService";
import format from "./utils/formatDate";
import MyPagination from "./common/myPagination";
import Loader from "./common/loader";
import Sort from "./common/sort";

class Locked extends Component {
  state = {
    journals: [],
    currentPage: 1,
    pageSize: 20,
    sort: "desc",
    loading: true,
  };

  async componentDidMount() {
    this.getRequiredJournals();
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentPage, sort } = this.state;
    if (currentPage !== prevState.currentPage || sort !== prevState.sort)
      this.getRequiredJournals();
  }

  getRequiredJournals = async () => {
    this.setState({ loading: true });
    const { currentPage, pageSize, sort } = this.state;
    const { data: journals } = await getLockedJournals(
      currentPage,
      pageSize,
      sort
    );
    return this.setState({ journals, loading: false });
  };

  handleMouseEnter = ({ currentTarget: e }) => {
    const input = e.children[0].className;
    e.children[0].className =
      input === "fa fa-lock" ? "fa fa-unlock-alt" : e.children[0].className;
  };

  handleMouseLeave = ({ currentTarget: e }) => {
    const input = e.children[0].className;
    e.children[0].className =
      input === "fa fa-unlock-alt" ? "fa fa-lock" : input;
  };

  handleClick = e => {
    e.currentTarget.className = "btn btn-success btn-sm";
    e.currentTarget.children[0].className = "fa fa-unlock";
  };

  handleSave = async journal => {
    // Wrapping date within a <Link>
    const journals = [...this.state.journals];
    const index = journals.indexOf(journal);
    journals[index] = { ...journal };
    journals[index].unlockDate = null;
    this.setState({ journals });

    // Saving to database
    const unlockedJournal = journal;
    unlockedJournal.locked = false;
    unlockedJournal.unlockDate = null;
    await saveJournal(unlockedJournal);
  };

  handlePagination = page => {
    let { currentPage, journals } = this.state;
    if (page === "next")
      currentPage = journals.length !== 0 ? currentPage + 1 : currentPage;
    else currentPage = currentPage - 1;

    if (currentPage < 1) return;
    this.setState({ currentPage });

    // Init the journals array because the twik in handleSave make the unlocked item stick
    const journalsInit = [];
    this.setState({ journals: journalsInit });
  };

  handleSorting = () => {
    this.setState({ sort: this.state.sort === "asc" ? "desc" : "asc" });
  };

  render() {
    const { journals, currentPage, loading, sort } = this.state;
    return (
      <React.Fragment>
        <Container>
          <h1>Locked Diaries</h1>
          <MyPagination
            journalsLength={journals.length}
            currentPage={currentPage}
            onChange={this.handlePagination}
          />
          {loading && <Loader fontSize="4rem" />}
          {journals.length !== 0 && (
            <Sort sort={sort} onSort={this.handleSorting} />
          )}
          {journals.length !== 0 && (
            <Row className="p-2 border-bottom">
              <Col xs={5}>
                <strong>Diary</strong>
              </Col>
              <Col xs={5}>
                <strong>Status</strong>
              </Col>
              <Col xs={2}></Col>
            </Row>
          )}
          {journals.length !== 0 ? (
            journals.map(journal => (
              <Row key={journal._id} className="p-2">
                <Col xs={5}>
                  {journal.unlockDate ? (
                    format(new Date(journal.date))
                  ) : (
                    <Link
                      className="font-weight-bold"
                      to={`/journals/${journal._id}`}
                    >
                      {format(new Date(journal.date))}
                    </Link>
                  )}
                </Col>
                <Col xs={5}>
                  {new Date() > new Date(journal.unlockDate) ? (
                    <span
                      title={`since ${format(new Date(journal.unlockDate))}`}
                      className="font-weight-bold text-success"
                    >
                      [Unlockable]
                      <small></small>
                    </span>
                  ) : (
                    `Locked until ${format(new Date(journal.unlockDate))}`
                  )}
                </Col>
                <Col xs={2}>
                  <button
                    disabled={new Date() <= new Date(journal.unlockDate)}
                    onClick={event => {
                      this.handleClick(event);
                      this.handleSave(journal);
                    }}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                    className="btn btn-primary btn-sm"
                  >
                    <i className="fa fa-lock"></i>
                  </button>
                </Col>
              </Row>
            ))
          ) : (
            <div className="p-3">
              “A moment lasts all of a second, but the memory lives on forever.”
            </div>
          )}
        </Container>
      </React.Fragment>
    );
  }
}

export default Locked;
