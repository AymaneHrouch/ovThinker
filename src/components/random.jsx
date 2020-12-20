import React, { Component } from "react";
import { getRandomJournal } from "../services/journalService";

class Random extends Component {
  async componentDidMount() {
    let { data: journalId } = await getRandomJournal();
    this.props.history.replace(`/journals/${journalId}`);
  }

  render() {
    return null;
  }
}

export default Random;
