import React, { Component } from "react";

class ListRadio extends Component {

  renderInput(name, label) {
    const { onFilter, pickedFilter } = this.props;
    return (
      <React.Fragment>
        <input
          className="mr-1"
          type="radio"
          name="sorting"
          id={name}
          onChange={e => onFilter(e)}
          checked={pickedFilter === name}
        />
        <label className="pr-3" htmlFor={name}>
          {label} 
        </label>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div>
        <p>Filter By</p>
        {this.renderInput("day", "Day", true)}
        {this.renderInput("month", "Month")}
        {this.renderInput("starred", "Starred")}
      </div>
    );
  }
}

export default ListRadio;