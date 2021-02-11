import React, { Component } from "react";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import OptionsDropdown from "./optionsDropdown";
import LockModal from "./lockModal";
import formatDate from "./utils/formatDate";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Anchorme } from "react-anchorme";

const StyledCard = styled.div`
  white-space: pre-line;
  overflow-wrap: break-word;
  background-color: ${({ theme }) => theme.card};
  border: ${({ theme }) => theme.cardBorder};
  border-radius: 15px;
  @media only screen and (max-width: 600px) {
    border-radius: 0;
    border-left: 0;
    border-right: 0;
  }
`;

class Card extends Component {
  handleClose = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { journal, onStar, ...rest } = this.props;
    // detecting if text is in Arabic
    const pStyle = {
      textAlign: /[\u0600-\u06FF]/.test(journal.comment) ? "right" : "left",
    };
    return (
      <StyledCard className="container mb-3 p-3">
        <p style={pStyle}>
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
          <Anchorme target="_blank">{journal.comment}</Anchorme>
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
