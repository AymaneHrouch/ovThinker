import React, { Component } from "react";
import { Table, Container } from "react-bootstrap";
import { getLockedJournals, saveJournal } from "./../services/journalService";
import format from "./utils/formatDate";
import MyPagination from "./myPagination";
import { Link } from "react-router-dom";

class Locked extends Component {
  state = {
    journals: [],
    currentPage: 1,
    pageSize: 20,
    bool: false,
  };

  async componentDidMount() {
    this.getRequiredJournals();
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentPage } = this.state;
    if (currentPage !== prevState.currentPage) this.getRequiredJournals();
  }

  getRequiredJournals = async () => {
    const { currentPage, pageSize } = this.state;
    const { data: journals } = await getLockedJournals(currentPage, pageSize);
    return this.setState({ journals });
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
    this.setState({ bool: true });
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
    if (page === "next") {
      currentPage = journals.length !== 0 ? currentPage + 1 : currentPage;
    } else {
      currentPage = currentPage - 1;
    }
    if (currentPage < 1) return;
    this.setState({ currentPage });

    // Init the journals array because the twik in handleSave make the unlocked item stick
    const journalsInit = [];
    this.setState({ journals: journalsInit });
    console.log(this.state.currentPage);
  };

  render() {
    const { journals, currentPage, pageSize } = this.state;
    return (
      <React.Fragment>
        <Container>
          <h1>Locked Diaries</h1>
          <MyPagination
            journalsLength={journals.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onChange={this.handlePagination}
          />
          <Table size="sm">
            <thead>
              <tr className="d-flex">
                <th className="col-md-3">Diary</th>
                <th className="col-md-3">Status</th>
                <th className="col-md-0"></th>
              </tr>
            </thead>

            <tbody>
              {journals.length !== 0 ? (
                journals.map(journal => (
                  <tr className="d-flex">
                    <td className="col-md-3">
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
                    </td>
                    <td className="col-md-3">
                      {new Date() > new Date(journal.unlockDate) ? (
                        <span className="font-weight-bold text-success">
                          [Unlockable]
                        </span>
                      ) : (
                        `Locked until ${format(new Date(journal.unlockDate))}`
                      )}
                    </td>
                    <td className="col-md-0">
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
                    </td>
                  </tr>
                ))
              ) : (
                <span className="text-align-center">
                  “A moment lasts all of a second, but the memory lives on
                  forever.”
                </span>
              )}
              {/*
              <tr>
                <td>2020 - 25 - 02</td>
                <td>Unlockable</td>
                <td className="position-absolute">
                  <button
                    onClick={this.handleClick}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                    className="btn btn-primary btn-sm"
                  >
                    <i className="fa fa-lock"></i>
                  </button>
                </td>
              </tr>
             
              <tr>
                <td>25-02-2020</td>
                <td>Locked (until 18 December 2020, 20:55)</td>
                <td>
                  <button
                    disabled
                    onClick={this.handleClick}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                    className="btn btn-dark btn-sm"
                  >
                    <i className="fa fa-lock"></i>
                  </button>
                </td>
              </tr>
              <tr>
                <td>2020 - 25 - 02</td>
                <td>Unlockable</td>
                <td>
                  <button
                    onClick={this.handleClick}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                    className="btn btn-primary btn-sm"
                  >
                    <i className="fa fa-lock"></i>
                  </button>
                </td>
              </tr> */}
            </tbody>
          </Table>
        </Container>
      </React.Fragment>
    );
  }
}

export default Locked;