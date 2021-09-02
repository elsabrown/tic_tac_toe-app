import React from "react";
import Board from "./Board";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill("") }],
      nextStep: "X",
      isFinish: false,
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return true;
      }
    }
    return false;
  }

  clickSquare(i) {
    const {history} = this.state;
    const currentSquaresCopy = history[history.length -1].squares;

    let isFinish;
    if (currentSquaresCopy[i] === "" && !this.state.isFinish) {
      currentSquaresCopy[i] = this.state.nextStep;
      isFinish = this.calculateWinner(currentSquaresCopy);
      this.setState((state) => {
        const { history, nextStep } = state;
        return {
          squares: currentSquaresCopy,
          history: history.concat({ squares:currentSquaresCopy }),
          nextStep: isFinish ? nextStep : nextStep === "X" ? "0" : "X",
          isFinish
        };
      });

      console.log("history", this.state.history);
    }  
  }

  render() {
    const { history, nextStep, isFinish } = this.state;
    let status;

    if (isFinish) {
      status = "Игра закончилась Выиграли " + nextStep;
    } else {
      status = "Следующий ход за: " + nextStep;
    }

    const currentSquares = history[history.length -1].squares;

    return (
      <div className="game">
        <div className="game-board">
          <div className="status">{status}</div>
          <Board
            squares={currentSquares}
            history={history}
            nextStep={nextStep}
            isFinish={isFinish}
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
