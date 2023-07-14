import Axios from "axios";
const API = "http://localhost:8000/v1/machinelocation";

export class MachineLocationService {
  getAllLocation() {
    return Axios.get(`${API}`);
  }
  addLocation(loaction, accessToken) {
    return Axios.post(API, loaction, {
      headers: { token: `vanson ${accessToken}` },
    });
  }
  deleteLocation(id, accessToken) {
    return Axios.delete(`${API}/${id}`, {
      headers: { token: `vanson ${accessToken}` },
    });
  }
}
