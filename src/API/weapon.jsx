import React, { Component } from "react";
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
        </div>
      </div>
    );
  }
}

export default Weapon;
