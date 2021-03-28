import React from "react";
import "./styles.css";

export default class Suggestion extends React.Component {
  handleClick = () => {
    const { suggestion, onClick } = this.props;
    onClick(suggestion);
  };

  render() {
    const { suggestion } = this.props;

    return (
      <p
        key={suggestion}
        className="suggestion-item"
        onClick={this.handleClick}
      >
        {suggestion.toUpperCase()}
      </p>
    );
  }
}
