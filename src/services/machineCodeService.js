import Axios from "axios";
const API = "https://photocopy.onrender.com/v1/machinecode";

export class MachineCodeService {
  getAllCode() {
    return Axios.get(`${API}`);
  }
  addCode(code, accessToken) {
    return Axios.post(API, code, {
      headers: { token: `vanson ${accessToken}` },
    });
  }
  deleteCode(id, accessToken) {
    return Axios.delete(`${API}/${id}`, {
      headers: { token: `vanson ${accessToken}` },
    });
  }
}
