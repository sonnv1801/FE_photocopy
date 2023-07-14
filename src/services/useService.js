import Axios from "axios";
const API = "http://localhost:8000/v1/auth";
const APISTAFF = "http://localhost:8000/v1/user";

export class UserService {
  Login(user) {
    return Axios.post(`${API}/login`, user);
  }
  Register(account, accessToken) {
    return Axios.post(`${API}/register`, account, {
      headers: { token: `vanson ${accessToken}` },
    });
  }
  GetAllStaff() {
    return Axios.get(`${APISTAFF}/staff`);
  }
  deleteUser(id, accessToken) {
    return Axios.delete(`${APISTAFF}/${id}`, {
      headers: { token: `vanson ${accessToken}` },
    });
  }
}
