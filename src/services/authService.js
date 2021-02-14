import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = `/auth`;

http.setJwt(getJwt());

export async function register(name, email, password) {
  await http.post("/users", { name, email, password });
}

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  sessionStorage.setItem("token", jwt);
}

export function logout() {
  sessionStorage.removeItem("token");
}

export function getJwt() {
  return sessionStorage.getItem("token");
}

export function getCurrentUser() {
  try {
    const jwt = sessionStorage.getItem("token");
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
