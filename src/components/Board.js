import React from "react";
import Square from "./Square";
import "../App";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(""),
      nextStep: "X"
    };

    this.clickSquare = this.clickSquare.bind(this);
    this.renderSquare = this.renderSquare.bind(this);
  }

  clickSquare(i) {
    console.log("clickSquare", i);
    let squaresCopy = [...this.state.squares];
    squaresCopy[i] = this.state.nextStep;
    this.setState((state) => {
      return {
        squares: squaresCopy,
        nextStep: state.nextStep === "X" ? "0" : "X"
      };
      });
  }

  renderSquare(i) {
    return (
      <Square
        position={i}
        value={this.state.squares[i]}
        handleClickSquare={this.clickSquare}
      />
    );
  }

  render() {
    const status = "Next player: X";

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default Board;
