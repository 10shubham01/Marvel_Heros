import axios from "axios";
export function getAllCards() {
  return axios
    .get("https://peaceful-sea-07051.herokuapp.com/api/marvel/cards")
    .then((resp) => resp.data);
}

export function createCard(body) {
  return axios
    .post("https://peaceful-sea-07051.herokuapp.com/api/marvel/card", body)
    .then((resp) => resp.data);
}
export function getOneCard(cardId) {
  return axios
    .get(
      `https://peaceful-sea-07051.herokuapp.com/api/marvel/card/weapon/${cardId}`
    )
    .then((resp) => resp.data);
}
export function updateCard(cardId, body) {
  return axios
    .put(
      `https://peaceful-sea-07051.herokuapp.com/api/marvel/card/${cardId}`,
      body
    )
    .then((resp) => resp.data);
}
export function deleteCard(cardId) {
  return axios
    .delete(
      `https://peaceful-sea-07051.herokuapp.com/api/marvel/card/${cardId}`
    )
    .then((resp) => resp.data);
}
