import React, { Component } from "react";
import { Badge, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import MyFormTest from "./myFormTest";
import { saveJournal, deleteJournal } from "./../services/journalService";
import OptionsDropdown from "./optionsDropdown";
import { DateTimePicker } from "react-datetime-picker";
import LockModal from "./lockModal";

class Card extends Component {
  state = {
    updatedItem: {
      _id: "",
      comment: "",
      date: null,
      starred: false,
      locked: false,
    },
    isEdit: false,
  };

  handleEdit = () => {
    this.setState({ isEdit: true });
  };

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

  handleSwitch = item => {
    if (item) this.setState({ updatedItem: item, isEdit: false });
    else this.setState({ isEdit: false });
  };

  item = () => {
    return this.state.updatedItem["_id"] !== ""
      ? this.state.updatedItem
      : this.props.item;
  };

  handleStar = async () => {
    const item = this.item();

    item["starred"] = !item["starred"];
    let journal = await saveJournal(item);
    this.setState({ updatedItem: item });
  };

  render() {
    const { onDelete, onShowModal } = this.props;
    const item = this.item();

    if (this.state.isEdit) {
      return (
        <MyFormTest
          onSave={this.handleSwitch}
          comment={item.comment}
          date={item.date}
          _id={item._id}
        />
      );
    } else
      return (
        <React.Fragment>
          <LockModal
            unlockDate={this.props.unlockDate}
            showModal={this.props.showModal}
            onDateChange={this.props.onDateChange}
            onShowModal={onShowModal}
            onHide={this.props.onHideModal}
            onLock={() => this.props.onLock(item._id)}
          />
          <div className="journalCard container my-2 p-3 border rounded">
            <p>
              <Badge className="float-right">
                <i
                  onClick={this.handleStar}
                  className={item.starred ? "fa fa-star" : "fa fa-star-o"}
                  aria-hidden="true"
                ></i>
              </Badge>
              {item.comment}
            </p>

            <div>
              <Badge>
                <Link to={`/journals/${item._id}`}>
                  {this.formatDate(new Date(item.date))}
                </Link>
              </Badge>
              <OptionsDropdown
                onEdit={this.handleEdit}
                onDelete={() => onDelete(item)}
                onShowLockModal={onShowModal}
              />
            </div>
          </div>
        </React.Fragment>
      );
  }
}

export default Card;
