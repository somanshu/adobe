import React from "react";
import DateSelector from "../DateSelector";
import SymbolSuggestion from "../SymbolSuggestion";
import PriceTable from "../PriceTable";
import {
  getAllStockSymbols,
  getStockPrices,
  getLabelsByDate,
  getTitleByDate
} from "../../utils";
import "./styles.css";
import LineGraph from "../LineGraph";

export default class StockView extends React.Component {
  constructor(props) {
    super(props);

    this.suggestions = getAllStockSymbols();
    this.options = ["current", "1 day", "1 month", "1 year"];

    this.state = {
      date: "current",
      selectedStocks: [],
      stockPriceTimeMap: {
        current: getStockPrices("current"),
        "1 day": null,
        "1 month": null,
        "1 year": null
      }
    };
  }

  updateDate = (evt) => {
    const val = getStockPrices(evt.target.value);
    this.setState((prevState) => {
      return {
        date: evt.target.value,
        stockPriceTimeMap: {
          ...prevState.stockPriceTimeMap,
          [evt.target.value]: val
        }
      };
    });
  };

  handleStockAdd = (val) => {
    this.setState((prevState) => {
      return {
        selectedStocks: [...prevState.selectedStocks, val]
      };
    });
  };

  handleStockRemove = (val) => {
    this.setState((prevState) => {
      return {
        selectedStocks: prevState.selectedStocks.filter((v) => v !== val)
      };
    });
  };

  renderDateSelector = () => {
    const { date } = this.state;
    return (
      <DateSelector
        options={this.options}
        value={date}
        onChange={this.updateDate}
      />
    );
  };

  renderStockSelector = () => {
    const { selectedStocks } = this.state;
    return (
      <SymbolSuggestion
        suggestions={this.suggestions}
        selectedOptions={selectedStocks}
        onAdd={this.handleStockAdd}
        onRemove={this.handleStockRemove}
      />
    );
  };

  renderStockGraph = () => {
    const { selectedStocks, stockPriceTimeMap, date } = this.state;
    const labels = getLabelsByDate(date);
    return (
      <LineGraph
        title={getTitleByDate(date)}
        selectedStocks={selectedStocks}
        stockPrices={stockPriceTimeMap[date]}
        labels={labels}
      />
    );
  };

  renderCurrentPriceTable = () => {
    const { selectedStocks, stockPriceTimeMap } = this.state;

    if (!selectedStocks.length) return <p>No Stocks selected</p>;

    return (
      <PriceTable
        stocks={selectedStocks}
        stockPrices={
          stockPriceTimeMap.current[stockPriceTimeMap.current.length - 1]
        }
      />
    );
  };

  render() {
    return (
      <div className="stock-view">
        <div>
          {this.renderDateSelector()}
          {this.renderStockSelector()}
        </div>
        <h3>Stock Graph</h3>
        {this.renderStockGraph()}
        <h3>Latest Stock Prices</h3>
        {this.renderCurrentPriceTable()}
      </div>
    );
  }
}
