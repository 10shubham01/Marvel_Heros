import React, { Component } from "react";
import Card from "./card";
import * as Marvel from "./API/api";
import { Plus } from "react-feather";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

class CardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Cards: [],
      openModal: false,
    };
  }
  onClickButton = (e) => {
    e.preventDefault();
    this.setState({ openModal: true });
  };

  onCloseModal = () => this.setState({ openModal: false });
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
      <div className="parent">
        <div className="card-container">
          {Cards.map((card) => (
            <Card bkImage={card.img_Url} card={card} />
          ))}
        </div>
        <div className="add-button">
          <Plus size={48} onClick={this.onClickButton} />
        </div>
        <Modal
          classNames="modal"
          open={this.state.openModal}
          onClose={this.onCloseModal}
        >
          <h1>hello</h1>
        </Modal>
      </div>
    );
  }
}

export default CardContainer;
