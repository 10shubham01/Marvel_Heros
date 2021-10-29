import React, { Component } from "react";
import Card from "./card";
import * as Marvel from "./API/api";
import { Plus } from "react-feather";
import { Modal } from "react-responsive-modal";
import { Form, Button } from "react-bootstrap";
// import "react-responsive-modal/styles.css";
import { Link } from "react-router-dom";

class CardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Cards: [],
      openModal: false,
      Character_name: "",
      Superpowers: "",
      Year_Created: "",
      Description: "",
      How_he_got_his_Power: "",
      Did_You_Know: "",
      img_Url: "",
      searchValue: "",
    };
  }
  /* ---------------------------- */
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSearch = (e) => {
    this.setState({ searchValue: e.target.value });
    if (e.keyCode === 13) {
      const filtervalue = this.state.Cards.filter(
        (f) =>
          f.Character_name.toLowerCase() ===
          this.state.searchValue.toLowerCase()
      );
      this.setState({
        Cards: filtervalue,
      });
    }
  };
  onClickButton = (e) => {
    e.preventDefault();
    this.setState({ openModal: true });
  };

  onCloseModal = () => this.setState({ openModal: false });
  /* --------------------------- */

  getCards = async () => {
    const Cards = await Marvel.getAllCards();
    this.setState({ Cards });
  };
  addCard = async (body) => {
    const newCard = await Marvel.createCard(body);
    this.setState({ Cards: [...this.state.Cards, newCard] });
  };
  onAddCard = () => {
    const body = {
      Character_name: this.state.Character_name,
      Superpowers: this.state.Superpowers,
      Year_Created: this.state.Year_Created,
      Description: this.state.Description,
      How_he_got_his_Power: this.state.How_he_got_his_Power,
      Did_You_Know: this.state.Did_You_Know,
      img_Url: this.state.img_Url,
    };
    this.addCard(body);
    this.setState({ Character_name: "" });
    this.setState({ Superpowers: "" });
    this.setState({ Year_Created: "" });
    this.setState({ Description: "" });
    this.setState({ How_he_got_his_Power: "" });
    this.setState({ Did_You_Know: "" });
    this.setState({ img_Url: "" });
    this.onCloseModal();
  };
  deleteCard = async (cardId) => {
    await Marvel.deleteCard(cardId);
    this.setState({
      Cards: this.state.Cards.filter((f) => f.id !== cardId),
    });
  };
  componentDidMount() {
    this.getCards();
  }
  render() {
    const { Cards } = this.state;
    return (
      <div className="parent">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={this.searchValue}
            onKeyUp={this.handleSearch}
          />
        </div>
        <div className="card-container">
          {Cards.map((card) => (
            <Link to={`/${card.id}`}>
              <Card
                bkImage={card.img_Url}
                card={card}
                deleteCard={this.deleteCard}
                key={card.id}
              />
            </Link>
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
          <h3>Add Character</h3>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Character Name"
                value={this.Character_name}
                name="Character_name"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Super Powers"
                value={this.Superpowers}
                name="Superpowers"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Year_Created"
                value={this.Year_Created}
                name="Year_Created"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Description"
                value={this.Description}
                name="Description"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="How he got his Power"
                value={this.How_he_got_his_Power}
                name="How_he_got_his_Power"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Did You Know"
                value={this.Did_You_Know}
                name="Did_You_Know"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Img Url"
                value={this.img_Url}
                name="img_Url"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button
              style={{ backgroundColor: "#EC1D24", border: "none" }}
              onClick={this.onAddCard}
            >
              Add Character
            </Button>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default CardContainer;
