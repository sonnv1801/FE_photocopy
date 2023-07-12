import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MaintenanceByStaffPage = () => {
  const [maintenanceList, setMaintenanceList] = useState([]);
  const staffId = JSON.parse(localStorage.getItem("token")); // ID của nhân viên
  const [repairNote, setRepairNote] = useState("");
  const [replacedSupplies, setReplacedSupplies] = useState("");
  const [totalCost, setTotalCost] = useState("");

  useEffect(() => {
    fetchMaintenanceListByStaff();
  }, []);

  const fetchMaintenanceListByStaff = async () => {
    try {
      const response = await axios.get(
        `https://photocopy.onrender.com/v1/maintenance/staff/${staffId?._id}`
      );
      setMaintenanceList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRepairFinished = async (maintenanceId) => {
    if (repairNote === "" || replacedSupplies === "" || totalCost === "") {
      toast.warning("Nhập Đầy Đủ Thông Tin Đã Sửa Máy");
      return;
    }

    try {
      const response = await axios.put(
        `https://photocopy.onrender.com/v1/maintenance/staff/repairfinished/${maintenanceId}`,
        {
          repairStatus: "completed",
          repairNote: repairNote,
          replacedSupplies: replacedSupplies,
          totalCost: totalCost,
        }
      );

      const updatedMaintenanceList = maintenanceList.map((maintenance) => {
        if (maintenance._id === maintenanceId) {
          return response.data;
        }
        return maintenance;
      });
      setMaintenanceList(updatedMaintenanceList);

      setRepairNote("");
      setReplacedSupplies("");
      setTotalCost("");
      toast.success("Đã Cập Nhập Thành Công!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="maintenance-page">
      <h1 className="maintenance-page-title">
        Danh Sách Bảo Trì Của Nhân Viên
      </h1>
      <div class="table_responsive">
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên Sản Phẩm</th>
              <th>Mã Máy</th>
              <th>Vị Trí Máy</th>
              <th>Khách Hàng</th>
              <th>Số Điện Thoại</th>
              <th>Địa Chỉ</th>
              <th>Ghi Chú Của Khách</th>
              <th>Trạng Thái Sửa Máy</th>
              <th>Vật Tư Được Cấp</th>
              <th>Ghi Chú Sửa Chữa</th>
              <th>Vật Tư Đã Thay</th>
              <th>Tổng Tiền</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {maintenanceList.map((maintenance, index) => (
              <tr key={maintenance._id}>
                <td>{index + 1}</td>
                <td>{maintenance.nameProduct}</td>
                <td>{maintenance.machineCode}</td>
                <td>{maintenance.machineLocation}</td>
                <td>{maintenance.fullname}</td>
                <td>{maintenance.phone}</td>
                <td>{maintenance.address}</td>
                <td>{maintenance.note}</td>
                <td>
                  {maintenance.repairStatus === "pending"
                    ? "Chưa giải quyết..."
                    : "Hoàn Thành!"}
                </td>
                <td>{maintenance.supplies}</td>
                <td>
                  {maintenance.repairStatus === "pending" ? (
                    <input
                      type="text"
                      placeholder="Nhập đã sửa những gì..."
                      value={repairNote}
                      onChange={(e) => setRepairNote(e.target.value)}
                      className="repair-input"
                    />
                  ) : (
                    "Đã Xong!"
                  )}
                </td>
                <td>
                  {maintenance.repairStatus === "pending" ? (
                    <input
                      type="text"
                      placeholder="Vật tư đã thay..."
                      value={replacedSupplies}
                      onChange={(e) => setReplacedSupplies(e.target.value)}
                      className="repair-input"
                    />
                  ) : (
                    "Đã Xong!"
                  )}
                </td>
                <td>
                  {maintenance.repairStatus === "pending" ? (
                    <input
                      type="number"
                      placeholder="Tổng Tiền..."
                      value={totalCost}
                      onChange={(e) => setTotalCost(e.target.value)}
                      className="repair-input"
                    />
                  ) : (
                    "Đã Xong!"
                  )}
                </td>
                <td>
                  {maintenance.repairStatus === "pending" ? (
                    <button
                      onClick={() => handleRepairFinished(maintenance._id)}
                      className="submit-button"
                    >
                      Hoàn Thành Công Việc
                    </button>
                  ) : (
                    <p>Đã Xử Lý Thành Công</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MaintenanceByStaffPage;
