import React, { Component } from "react";
class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        className="card"
        style={{
          backgroundImage: "url(" + this.props.bkImage + ")",
        }}
      ></div>
    );
  }
}

export default Card;
