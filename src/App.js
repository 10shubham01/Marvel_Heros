import React, { Component } from "react";
import "./App.css";
import NavBar from "./navbar";
import CardContainer from "./cardContainer";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="app">
        <NavBar />
        <CardContainer />
      </div>
    );
  }
}

export default App;
