import axios from "axios";
export function getAllCards() {
  return axios
    .get("https://peaceful-sea-07051.herokuapp.com/api/marvel/cards")
    .then((resp) => resp.data);
}
