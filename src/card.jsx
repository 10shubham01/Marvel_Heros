import React, { Component } from "react";
import { Trash2 } from "react-feather";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        className="carD"
        style={{
          backgroundImage: "url(" + this.props.bkImage + ")",
        }}
      >
        <div className="card-heading">
          <h1>{this.props.card.Character_name}</h1>
        </div>
        <div className="deletebutton">
          <Trash2
            size={28}
            color="white"
            onClick={() => this.props.deleteCard(this.props.card.id)}
          />
        </div>
      </div>
    );
  }
}

export default Card;
