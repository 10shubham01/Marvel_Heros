import React, { Component } from "react";
import "./App.css";
import NavBar from "./navbar";
import CardContainer from "./cardContainer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Popup from "./Popup";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="app">
        <NavBar />
        <Router>
          <CardContainer />
          <Route path="/:id" exact component={Popup} />
        </Router>
      </div>
    );
  }
}

export default App;
