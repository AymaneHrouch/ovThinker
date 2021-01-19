import http from "./httpService";
const config = require("../config.json");

const apiEndpoint = `/auth`;

http.setJwt(getJwt());

export function login(email, password) {
  return http.post(apiEndpoint, { email, password });
}

export function getJwt() {
  return localStorage.getItem("token");
}

export default {
  getJwt,
};
