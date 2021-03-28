import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

export default class DateSelector extends React.Component {
  renderOptions = () => {
    const { options } = this.props;

    return options.map((val) => {
      return (
        <MenuItem key={val} value={val}>
          {val}
        </MenuItem>
      );
    });
  };

  render() {
    const { value, onChange } = this.props;
    return (
      <Select value={value} onChange={onChange}>
        {this.renderOptions()}
      </Select>
    );
  }
}
