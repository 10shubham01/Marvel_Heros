import React, { Component } from "react";
import Card from "./card";
import * as Marvel from "./API/api";

class CardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Cards: [],
    };
  }
  getCards = async () => {
    const Cards = await Marvel.getAllCards();
    this.setState({ Cards });
  };
  componentDidMount() {
    this.getCards();
  }
  render() {
    const { Cards } = this.state;
    return (
      <div className="card-container">
        {Cards.map((card) => (
          <Card bkImage={card.img_Url} card={card} />
        ))}
      </div>
    );
  }
}

export default CardContainer;
