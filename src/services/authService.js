import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = `/auth`;

http.setJwt(getJwt());

export async function register(name, email, password) {
  await http.post("/users", { name, email, password });
}

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem("token", jwt);
}

export function logout() {
  localStorage.removeItem("token");
}

export function getJwt() {
  return localStorage.getItem("token");
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

const auth = {
  getJwt,
  register,
  login,
  logout,
  getCurrentUser,
};

export default auth;
