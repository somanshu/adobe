import React from "react";
import "./styles.css";

export default class SubmittedSuggestion extends React.Component {
  removeSuggestion = () => {
    const { value, onRemove } = this.props;
    onRemove(value);
  };

  render() {
    const { value } = this.props;
    return (
      <div className="submitted-suggestion">
        <div className="ss-value">{value}</div>
        <button className="ss-remove" onClick={this.removeSuggestion}>
          X
        </button>
      </div>
    );
  }
}
