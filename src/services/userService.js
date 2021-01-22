import http from "./httpService";

export function changePassword(oldPassword, newPassword) {
  const body = { oldPassword, newPassword };
  return http.put(`users/changepassword`, body);
}

export function changeName(name) {
  const body = { name };
  return http.put(`users/changename`, body);
}
