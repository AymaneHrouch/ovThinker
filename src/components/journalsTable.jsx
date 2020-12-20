import React, { Component } from "react";
import { getJournals } from "../services/journalService";
import Card from "./card";
import { Col, Container, Row } from "react-bootstrap";
import Search from "./search";
import MyForm from "./myForm";
import Filter from "./filter";

class JournalTable extends Component {
  state = {
    data: "",
    filter: "day",
    pickedMonth: new Date(),
    journals: [],
  };

  async componentDidMount() {
    const {data: journals} = await getJournals();
    this.setState({journals})
    console.log(journals)
  }

  handleClick = () => {
    console.log("clicked :)) ");
  };

  handleChange = data => {
    console.log(data);
    this.setState({ data });
  };

  handleFilter = ({ currentTarget }) => {
    this.setState({ filter: currentTarget.id });
  };

  handlePick = value => {
    this.setState({ pickedMonth: value });
    console.log(value.getMonth());
  };

  render() {
    const { journals } = this.state;
    return (
      <React.Fragment>
        <Container className="mt-2">
          <Row>
            <Col>
              <div className="sticky-top p-2">
                <div>
                  <p>Filter By</p>
                  <input
                    className="mr-1"
                    type="radio"
                    name="sorting"
                    id="day"
                    onChange={e => this.handleFilter(e)}
                    checked={this.state.filter === "day"}
                  />
                  <label className="pr-3" htmlFor="day">
                    Day
                  </label>
                  <input
                    className="mr-1"
                    type="radio"
                    name="sorting"
                    id="month"
                    onChange={e => this.handleFilter(e)}
                    checked={this.state.filter === "month"}
                  />
                  <label className="pr-3" htmlFor="month">
                    Month
                  </label>
                  <input
                    className="mr-1"
                    type="radio"
                    name="sorting"
                    id="search"
                    onChange={e => this.handleFilter(e)}
                    checked={this.state.filter === "search"}
                  />
                  <label htmlFor="search">Search</label>
                </div>
                <Filter
                  pickedMonth={this.state.pickedMonth}
                  onChange={this.handlePick}
                  filter={this.state.filter}
                />
              </div>
            </Col>
            <Col sm={8}>
              {journals
                // .filter(
                //   journal =>
                //     journal.date.getMonth() ===
                //     this.state.pickedMonth.getMonth()
                // )
                .map(journal => (
                  <Card item={journal} />
                ))}
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default JournalTable;
