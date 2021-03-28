import React from "react";
import { Line } from "react-chartjs-2";
import { getColorByIdx } from "../../utils";

export default class LineGraph extends React.Component {
  render() {
    const { labels, stockPrices, selectedStocks, title } = this.props;
    const datasets = selectedStocks.map((st, idx) => {
      return {
        label: st,
        fill: false,
        lineTension: 0.5,
        backgroundColor: getColorByIdx(idx),
        borderColor: getColorByIdx(idx),
        borderWidth: 2,
        data: stockPrices.map((val) => {
          return val[st];
        })
      };
    });
    return (
      <Line
        data={{
          labels,
          datasets
        }}
        options={{
          title: {
            display: true,
            text: title,
            fontSize: 20
          },
          legend: {
            display: true,
            position: "right"
          }
        }}
      />
    );
  }
}
