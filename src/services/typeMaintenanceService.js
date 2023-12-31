import Axios from "axios";
const API = "https://photocopy.onrender.com/v1/maintenancesupplies";

export class TypeMaintenanceService {
  getAllTypeMaintenance() {
    return Axios.get(`${API}`);
  }
  addTypeMaintenance(type, accessToken) {
    return Axios.post(API, type, {
      headers: { token: `vanson ${accessToken}` },
    });
  }
  deleteTypeMaintenance(id, accessToken) {
    return Axios.delete(`${API}/${id}`, {
      headers: { token: `vanson ${accessToken}` },
    });
  }
}
