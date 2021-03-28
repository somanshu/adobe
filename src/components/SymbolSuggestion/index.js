import React from "react";
import Suggestion from "./Suggestion";
import SubmittedSuggestion from "./SubmittedSuggestion";
import "./styles.css";

export default class SymbolSuggestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showOptions: false,
      input: "",
      suggestions: props.suggestions
    };
  }

  componentDidMount() {
    document.addEventListener("click", this.handleDocClick);
  }

  handleDocClick = (evt) => {
    const el = document.getElementsByClassName("input-suggestion")[0];
    if (evt.target.contains(el)) {
      this.hideSuggestions();
    }
  };

  componentWillUnmount() {
    document.removeEventListener("click", this.handleDocClick);
  }

  handleInputChange = (evt) => {
    this.setState({
      input: evt.target.value
    });
  };

  showSuggestions = () => {
    this.setState({ showOptions: true });
  };

  hideSuggestions = () => {
    this.setState({ showOptions: false });
  };

  submitSuggestion = (evt, val) => {
    const { onAdd } = this.props;
    this.hideSuggestions();
    onAdd(val);
  };

  renderInput = () => {
    const { input } = this.state;
    return (
      <input
        className="text-input"
        type="text"
        onFocus={this.showSuggestions}
        value={input}
        onChange={this.handleInputChange}
      />
    );
  };

  renderSuggestion = (val) => {
    return (
      <Suggestion
        key={val}
        suggestion={val}
        onClick={(evt) => this.submitSuggestion(evt, val)}
      />
    );
  };

  renderSuggestions = () => {
    const { input, showOptions } = this.state;
    const { suggestions, selectedOptions } = this.props;

    const filteredSug = suggestions.filter((sug) => {
      return selectedOptions.findIndex((s) => s === sug) < 0;
    });

    let className = "suggestion";

    if (showOptions) className = `${className} suggestion-show`;

    const suggestionsComp = filteredSug.map((sug) => {
      if (!sug.startsWith(input.toUpperCase())) return null;
      return this.renderSuggestion(sug);
    });
    return <div className={className}>{suggestionsComp}</div>;
  };

  renderSelected = () => {
    const { selectedOptions, onRemove } = this.props;

    if (!selectedOptions.length) return null;

    const options = selectedOptions.map((option) => {
      return (
        <SubmittedSuggestion key={option} value={option} onRemove={onRemove} />
      );
    });

    return <div className="submit-container">{options}</div>;
  };

  render() {
    return (
      <div className="symbol-suggestion">
        <div className="input-suggestion">
          {this.renderInput()}
          {this.renderSuggestions()}
        </div>
        {this.renderSelected()}
      </div>
    );
  }
}
