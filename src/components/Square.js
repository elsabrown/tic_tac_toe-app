import React from "react";
import "../App";

class Square extends React.Component {
  constructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("Нажали на клетку", this.props.position);
    this.props.handleClickSquare(this.props.position);
    // this.props.onClick(this.props.position);
  }

  render() {
    return (
      <button className="square" onClick={this.handleClick}>
        {this.props.value}
      </button>
    ); 
  }
}

export default Square;