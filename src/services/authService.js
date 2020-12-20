import http from "./httpService";
const config = require("../config.json");

const apiEndpoint = `${config.apiUrl}/auth`;

export function login(email, password) {
  return http.post(apiEndpoint, { email, password });
}

export function getJwt() {
  return localStorage.getItem("token");
}

export default {
  getJwt,
};
