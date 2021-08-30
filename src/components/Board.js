import React from "react";
import Square from "./Square";
import "../App";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(""),
      history: [{ squares: Array(9).fill("") }],
      nextStep: "X",
      isFinish: false
    };

    this.calculateWinner = this.calculateWinner.bind(this);
    this.clickSquare = this.clickSquare.bind(this);
    this.renderSquare = this.renderSquare.bind(this);
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return true;
      }
    }
    return false;
  }

  clickSquare(i) {
    // console.log("clickSquare", i, this.state.isFinish);
    let squaresCopy = [...this.state.squares];
    let isFinish;
    if (squaresCopy[i] === "" && !this.state.isFinish) {
      squaresCopy[i] = this.state.nextStep;
      isFinish = this.calculateWinner(squaresCopy);
      this.setState((state) => {
        const { history, nextStep } = state;
        return {
          squares: squaresCopy,
          history: history.concat(squaresCopy),
          nextStep: isFinish ? nextStep : nextStep === "X" ? "0" : "X",
          isFinish
        };
      });

      console.log("history", this.state.history);
    }  
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
    const { isFinish } = this.state;
    let status;
    if (isFinish) {
      status = "Игра закончилась Выиграли " + this.state.nextStep;
    } else {
      status = "Следующий ход за: " + this.state.nextStep;
    }

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
