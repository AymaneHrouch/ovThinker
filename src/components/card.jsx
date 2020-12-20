import React, { Component } from "react";
import OptionsDropdown from "./optionsDropdown";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import LockModal from "./lockModal";

class Card extends Component {
  formatDate(date) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = months[date.getMonth()];
    const hours =
      date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minutes =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

    return `${date.getDate()} ${month} ${date.getFullYear()}, ${hours}:${minutes}`;
  }

  handleClose = () => {
    console.log("false ze3ma");
    this.setState({ showModal: false });
  };

  render() {
    const { journal, onStar, ...rest } = this.props;
    return (
      <div className="journalCard container my-2 p-3 border rounded">
        <p>
          <LockModal {...rest} />
          <Badge className="float-right">
            <i
              onClick={onStar}
              className={
                journal.starred
                  ? "clickable fa fa-star"
                  : "clickable fa fa-star-o"
              }
              aria-hidden="true"
            ></i>
          </Badge>
          {journal.comment}
        </p>

        <div>
          <Badge>
            <Link to={`/journals/${journal._id}`}>
              {this.formatDate(new Date(journal.date))}
            </Link>
          </Badge>
          <OptionsDropdown {...rest} />
        </div>
      </div>
    );
  }
}

export default Card;
