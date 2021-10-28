import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import * as Marvel from "./API/api";
import { X, Save } from "react-feather";

class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Character_name: "",
      img_Url: "",
      Description: "",
      How_he_got_his_Power: "",
      Did_You_Know: "",
      Superpowers: "",
      saveButton: false,
    };
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  getCard = async (cardId) => {
    const card = await Marvel.getOneCard(cardId);
    this.setState({ Character_name: card.Character_name });
    this.setState({ Description: card.Description });
    this.setState({ How_he_got_his_Power: card.How_he_got_his_Power });
    this.setState({ Did_You_Know: card.Did_You_Know });
    this.setState({ Superpowers: card.Superpowers });
    this.setState({ img_Url: card.img_Url });
  };
  updateCard = async (cardId, body) => {
    const newCard = await Marvel.updateCard(cardId, body);
    this.setState({ Character_name: newCard.Character_name });
    this.setState({ Description: newCard.Description });
    this.setState({ How_he_got_his_Power: newCard.How_he_got_his_Power });
    this.setState({ Did_You_Know: newCard.Did_You_Know });
  };
  onSaveCard = () => {
    const body = {
      Character_name: this.state.Character_name,
      Superpowers: this.state.Superpowers,
      Year_Created: this.state.Year_Created,
      Description: this.state.Description,
      How_he_got_his_Power: this.state.How_he_got_his_Power,
      Did_You_Know: this.state.Did_You_Know,
      img_Url: this.state.img_Url,
    };
    this.updateCard(this.props.match.params.id, body);
  };
  componentDidMount() {
    this.getCard(this.props.match.params.id);
  }
  render() {
    const { card } = this.state;
    return (
      <div className="popup-window">
        <div className="popup">
          <div className="popup-header">
            <input
              type="text"
              value={this.state.Character_name}
              name="Character_name"
              onChange={this.handleChange}
            />
            <button>
              <X size={48} onClick={this.props.history.goBack} />
            </button>
          </div>
          <div className="main-box">
            <div className="content">
              <div className="power">
                <h5>Super Powers</h5>
                <textarea
                  value={this.state.Superpowers}
                  name="Superpowers"
                  onChange={this.handleChange}
                  style={{ resize: "none" }}
                ></textarea>
              </div>
              <div className="desc">
                <h5>Description</h5>
                <textarea
                  value={this.state.Description}
                  name="Description"
                  onChange={this.handleChange}
                  style={{ resize: "none" }}
                ></textarea>
              </div>
              <div className="how">
                <h5>How he got his power</h5>
                <textarea
                  value={this.state.How_he_got_his_Power}
                  name="How_he_got_his_Power"
                  onChange={this.handleChange}
                  style={{ resize: "none" }}
                ></textarea>
              </div>
              <div className="did">
                <h5>Did you know ?</h5>
                <textarea
                  value={this.state.Did_You_Know}
                  style={{ resize: "none" }}
                  name="Did_You_Know"
                  onChange={this.handleChange}
                ></textarea>
              </div>
            </div>
            <div className="image">
              <img src={this.state.img_Url} alt="" />
            </div>
          </div>
          <button className="saveButton">
            <Save size={48} />
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Popup);
