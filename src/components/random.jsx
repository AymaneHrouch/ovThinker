import React, { Component } from "react";
import { getRandomJournal } from "../services/journalService";

class Random extends Component {
  async componentDidMount() {
      let { data: journalId } = await getRandomJournal();
      this.props.history.replace(`/journals/${journalId}`);
  }

  render() {
    return (
      <div className="container mt-4">
        <h3>
          You have no diaries yet! Go
          <button
            className="mx-2 btn btn-primary"
            onClick={() => this.props.history.push("/")}
          >
            Home
          </button>
          and start your journey now!
        </h3>
      </div>
    );
  }
}

export default Random;
