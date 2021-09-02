import React from "react";
import Board from "./Board";

class Game extends React.Component {
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

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board 
          squares={this.state.squares}
          history={this.state.history}
          nextStep={this.state.nextStep}
          isFinish={this.state.isFinish}
          handleClickSquare={this.clickSquare}
          />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

export default Game;