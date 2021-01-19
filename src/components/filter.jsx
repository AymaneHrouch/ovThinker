import React, { Component } from "react";
import DatePicker from "react-date-picker";

class Filter extends Component {
  render() {
    const { filter, pickedDate, onChange } = this.props;

    if (filter === "month") {
      return (
        <React.Fragment>
          <span
            className="p-2 clickable"
            onClick={() => onChange("prev-month")}
          >
            <i className="fa fa-angle-left" aria-hidden="true"></i>
          </span>
          <DatePicker
            showLeadingZeros
            clearIcon={null}
            className="mb-2"
            maxDetail="year"
            minDetail="decade"
            value={pickedDate}
            onChange={value => onChange(value)}
          />
          <span
            className="p-2 clickable"
            onClick={() => onChange("next-month")}
          >
            <i className="fa fa-angle-right" aria-hidden="true"></i>
          </span>
        </React.Fragment>
      );
    } else if (filter === "day")
      return (
        <React.Fragment>
          <span className="p-2 clickable" onClick={() => onChange("prev-day")}>
            <i className="fa fa-angle-left" aria-hidden="true"></i>
          </span>
          <DatePicker
            showLeadingZeros
            clearIcon={null}
            className="mb-2"
            value={pickedDate}
            onChange={value => onChange(value)}
          />
          <span className="p-2 clickable" onClick={() => onChange("next-day")}>
            <i className="fa fa-angle-right" aria-hidden="true"></i>
          </span>
        </React.Fragment>
      );
    else if (filter === "starred") return null;
  }
}

export default Filter;
