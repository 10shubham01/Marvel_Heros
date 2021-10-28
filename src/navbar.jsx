import React, { Component } from "react";
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="nav-bar">
        <div className="navbar-logo">
          <div className="text">MARVEL</div>
        </div>
      </div>
    );
  }
}

export default NavBar;
