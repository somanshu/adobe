import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./styles.css";

export default class PriceTable extends React.Component {
  renderRow = (st) => {
    const { stockPrices } = this.props;

    return (
      <TableRow key={st}>
        <TableCell component="th" scope="row">
          {st}
        </TableCell>
        <TableCell align="right">{stockPrices[st]}</TableCell>
      </TableRow>
    );
  };

  renderRows = () => {
    const { stocks } = this.props;
    return stocks.map((st) => {
      return this.renderRow(st);
    });
  };

  render() {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Symbol</TableCell>
              <TableCell align="right">Current Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{this.renderRows()}</TableBody>
        </Table>
      </TableContainer>
    );
  }
}
