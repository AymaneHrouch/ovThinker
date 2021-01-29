import React, { Component } from "react";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import OptionsDropdown from "./optionsDropdown";
import LockModal from "./lockModal";
import formatDate from "./utils/formatDate";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledCard = styled.div`
  white-space: pre-line;
  overflow-wrap: break-word;
  background-color: ${({ theme }) => theme.card};
  border: ${({ theme }) => theme.cardBorder};
  border-radius: 15px;
`;

class Card extends Component {
  handleClose = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { journal, onStar, ...rest } = this.props;
    return (
      <StyledCard className="container my-3 p-3">
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
      </StyledCard>
    );
  }
}

Card.propTypes = {
  journal: PropTypes.object,
  onStar: PropTypes.func,
};

export default Card;
