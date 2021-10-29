import React, { Component } from "react";
import { Trash2 } from "react-feather";

class Weapon extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="weapon-card">
        <div className="weapon-image">
          <img src={this.props.weapon.img_Url} alt="" />
        </div>
        <div className="weapon-content">
          <h6>{this.props.weapon.Weapon_name}</h6>
          <p>{this.props.weapon.description}</p>
          <div className="deleteWeapon">
            <Trash2 onClick={() => this.props.delete(this.props.weapon.id)} />
          </div>
        </div>
      </div>
    );
  }
}

export default Weapon;
