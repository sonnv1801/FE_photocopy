import React, { useEffect, useState } from "react";
import axios from "axios";
import numeral from "numeral";
import "./style.css";
import moment from "moment";
const MaintenanceList = () => {
  const [maintenanceList, setMaintenanceList] = useState([]);

  useEffect(() => {
    fetchMaintenanceList();
  }, []);

  const fetchMaintenanceList = async () => {
    try {
      const customerData = JSON.parse(localStorage.getItem("token"));
      const response = await axios.get(
        `http://localhost:8000/v1/maintenance/${customerData?._id}`
      );
      setMaintenanceList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="maintenance-list-container">
      <h1 className="maintenance-list-title">Danh Sách Sửa Chữa Của Bạn</h1>

      <div class="table_responsive">
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên Máy</th>
              <th>Mã Máy</th>
              <th>Vị Trí Máy</th>
              <th>Tên Khách Hàng</th>
              <th>Số Điện Thoại</th>
              <th>Địa Chỉ</th>
              <th>Ghi Chú Sửa Máy</th>
              <th>Nhân Viên Tiếp Nhận</th>
              <th>Trạng Thái Sửa Máy</th>
              <th>Lịch Sử Sửa Máy</th>
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
                  {maintenance.staff ? (
                    maintenance.staff
                  ) : (
                    <span className="status-pending">Vui Lòng Chờ...</span>
                  )}
                </td>

                <td>
                  {maintenance.repairStatus === "pending"
                    ? "Vui Lòng Chờ..."
                    : "Đã Sửa Xong"}
                </td>
                <td>
                  <ul
                    style={{
                      listStyleType: "auto",
                      padding: "0 1rem",
                      letterSpacing: "1px",
                    }}
                  >
                    {maintenance.repairHistory.map((history, index) => (
                      <>
                        <li key={index}>Đã Sửa: {history.repairNote},</li>
                        <li>
                          Vật Tư Đã Thay:
                          {history.replacedSupplies},
                        </li>
                        <li>
                          Tổng Tiền:
                          {`${numeral(history.totalCost).format("0,0")}đ`}
                        </li>
                        <li>
                          Hoàn Thành Vào Lúc:
                          <br />
                          {moment(history.repairTime).format(
                            "HH:mm:ss DD-MM-YYYY"
                          )}
                        </li>
                      </>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MaintenanceList;
