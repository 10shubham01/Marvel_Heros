import React, { Component } from "react";
import * as Marvel from "./API/api";
import Weapon from "./API/weapon";
import { Plus } from "react-feather";

import { Modal } from "react-responsive-modal";
import { Form, Button } from "react-bootstrap";

class Weapons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Weapons: [],
      Weapon_name: "",
      description: "",
      img_Url: "",
      openModal: false,
    };
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onClickButton = (e) => {
    e.preventDefault();
    this.setState({ openModal: true });
  };

  onCloseModal = () => this.setState({ openModal: false });

  addWeapn = async (body) => {
    const newWeapon = await Marvel.addWeapon(this.props.cardId, body);
    this.setState({ Weapons: [...this.state.Weapons, newWeapon] });
  };
  onAddWeapon = () => {
    const body = {
      Weapon_name: this.state.Weapon_name,
      description: this.state.description,
      img_Url: this.state.img_Url,
    };
    this.addWeapn(body);
    this.setState({ Weapon_name: "" });
    this.setState({ description: "" });
    this.setState({ img_Url: "" });

    this.onCloseModal();
  };
  getWeapons = async (cardId) => {
    const Weapons = await Marvel.getWeapons(cardId);

    this.setState({ Weapons });
  };
  componentDidMount() {
    this.getWeapons(this.props.cardId);
  }
  render() {
    return (
      <div>
        {this.state.Weapons.map((weapon) => (
          <Weapon weapon={weapon} />
        ))}
        <div className="add-weapon-btn">
          <Plus size={48} onClick={this.onClickButton} />
        </div>
        <Modal
          classNames="modal"
          open={this.state.openModal}
          onClose={this.onCloseModal}
        >
          <h3>Add Weapon</h3>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Weapon Name"
                value={this.Weapon_name}
                name="Weapon_name"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Description"
                value={this.description}
                name="description"
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
              style={{
                backgroundColor: "#EC1D24",
                border: "none",
                boxShadow: "inset 0 0 5px black",
              }}
              onClick={this.onAddWeapon}
            >
              Add Weapon
            </Button>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Weapons;
