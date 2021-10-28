import React, { Component } from "react";
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="navbar">
        <div className="logo">
          <div className="text">MARVEL</div>
        </div>
      </div>
    );
  }
}

export default NavBar;
