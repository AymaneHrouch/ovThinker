import React, { Component } from "react";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import OptionsDropdown from "./optionsDropdown";
import LockModal from "./lockModal";
import formatDate from './utils/formatDate';
import PropTypes from 'prop-types';

class Card extends Component {

  handleClose = () => {
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
              {formatDate(new Date(journal.date))}
            </Link>
          </Badge>
          <OptionsDropdown {...rest} />
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  journal: PropTypes.object,
  onStar: PropTypes.func,
}

export default Card;
