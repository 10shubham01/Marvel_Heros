import React, { Component } from "react";
import Card from "./card";
import * as Marvel from "./API/api";
import { Plus } from "react-feather";
import { Modal } from "react-responsive-modal";
import { Form, Button } from "react-bootstrap";
import { Trash2 } from "react-feather";

import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

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
      dataLoad: false,
    };
  }
  /* ---------------------------- */
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSearch = (e) => {
    this.setState({ searchValue: e.target.value.toLowerCase() });
  };
  onClickButton = (e) => {
    e.preventDefault();
    this.setState({ openModal: true });
  };

  onCloseModal = () => this.setState({ openModal: false });
  notify = (msg) => toast(msg);
  /* --------------------------- */

  getCards = async () => {
    const Cards = await Marvel.getAllCards();
    this.setState({ Cards });
    setTimeout(() => {
      this.setState({ dataLoad: true });
    }, 3000);
  };
  addCard = async (body) => {
    const newCard = await Marvel.createCard(body);
    if (newCard) {
      this.notify("A new card added!!!");
    }
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
    this.notify("Card deleted !!!");

    this.setState({
      Cards: this.state.Cards.filter((f) => f.id !== cardId),
    });
  };
  componentDidMount() {
    this.getCards();
  }
  render() {
    const { Cards, dataLoad } = this.state;
    if (!dataLoad) {
      return (
        <div className="loader">
          <img
            src="https://i2.wp.com/boingboing.net/wp-content/uploads/2015/10/pJReN4H1.gif?w=970"
            alt=""
          />
        </div>
      );
    } else {
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
            {Cards.filter((card) => {
              if (this.state.searchValue === "") {
                return card;
              } else if (
                card.Character_name.toLowerCase().includes(
                  this.state.searchValue
                )
              ) {
                return card;
              }
            }).map((card, index) => (
              <div className="card-parent">
                <Link to={`/${card.id}`}>
                  <Card
                    bkImage={card.img_Url}
                    card={card}
                    //   deleteCard={this.deleteCard}
                    key={index}
                  />
                </Link>
                <div className="deletebutton">
                  <Trash2
                    size={28}
                    color="white"
                    onClick={() => this.deleteCard(card.id)}
                  />
                </div>
              </div>
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
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="text"
                  placeholder="Character Name"
                  value={this.Character_name}
                  name="Character_name"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="text"
                  placeholder="Super Powers"
                  value={this.Superpowers}
                  name="Superpowers"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
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
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="text"
                  placeholder="How he got his Power"
                  value={this.How_he_got_his_Power}
                  name="How_he_got_his_Power"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="text"
                  placeholder="Did You Know"
                  value={this.Did_You_Know}
                  name="Did_You_Know"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="text"
                  placeholder="Img Url"
                  value={this.img_Url}
                  name="img_Url"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button
                style={{
                  backgroundColor: "#EC1D24",
                  border: "none",
                  boxShadow: "inset 0 0 5px black",
                }}
                onClick={this.onAddCard}
              >
                Add Character
              </Button>
            </Form>
          </Modal>
          <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      );
    }
  }
}

export default CardContainer;
