import React, { useEffect, useState } from "react";
import axios from "axios";
import numeral from "numeral";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

const AdminMaintenanceList = () => {
  const [maintenanceList, setMaintenanceList] = useState([]);
  const [selectedStaffId, setSelectedStaffId] = useState("");
  const [selectedSuppliesId, setSelectedSuppliesId] = useState("");
  const [staffId, setStaffId] = useState("");
  const [staffName, setStaffName] = useState("");
  const [supplies, setSupplies] = useState("");
  const [staffOptions, setStaffOptions] = useState([]);
  const [suppliesOptions, setSuppliesOptions] = useState([]);
  const [selectedSuppliesInfo, setSelectedSuppliesInfo] = useState(null);
  const [selectedMaintenanceId, setSelectedMaintenanceId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log(suppliesOptions, "suppliesOptions");
  useEffect(() => {
    fetchMaintenanceList();
    fetchStaffOptions();
    fetchSuppliesOptions();
  }, []);

  const fetchMaintenanceList = async () => {
    try {
      const response = await axios.get(
        "https://photocopy.onrender.com/v1/maintenance"
      );
      setMaintenanceList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSuppliesInfo = async (suppliesId) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://photocopy.onrender.com/v1/maintenancesupplies/${suppliesId}`
      );
      setSelectedSuppliesInfo(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStaffOptions = async () => {
    try {
      const response = await axios.get(
        "https://photocopy.onrender.com/v1/user"
      );
      const filteredOptions = response.data.filter((user) => user.role === "1");
      setStaffOptions(filteredOptions);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSuppliesOptions = async () => {
    try {
      const response = await axios.get(
        "https://photocopy.onrender.com/v1/maintenanceSupplies"
      );
      setSuppliesOptions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateMaintenance = async (maintenanceId) => {
    try {
      if (!staffName || !supplies) {
        toast.warning("Vui lòng chọn đầy đủ thông tin.");
        return;
      }
      const maintenanceToUpdate = {
        staffId,
        staff: staffName,
        supplies,
      };

      const response = await axios.put(
        `https://photocopy.onrender.com/v1/maintenance/${maintenanceId}`,
        maintenanceToUpdate
      );
      console.log(response.data);
      toast.success("Đã Cập Nhập Thành Công!");
      fetchMaintenanceList();
    } catch (error) {
      console.error(error);
      toast.error("Thất bại");
    }
  };

  const handleStaffChange = (e) => {
    const selectedStaffId = e.target.value;
    setSelectedStaffId(selectedStaffId);

    const selectedStaff = staffOptions.find(
      (staff) => staff._id === selectedStaffId
    );
    if (selectedStaff) {
      setStaffId(selectedStaff._id);
      setStaffName(selectedStaff.fullname);
    } else {
      setStaffId("");
      setStaffName("");
    }
  };

  const handleSuppliesChange = (e) => {
    const selectedSuppliesId = e.target.value;
    setSelectedSuppliesId(selectedSuppliesId);
    const selectedSupplies = suppliesOptions.find(
      (supplies) => supplies._id === selectedSuppliesId
    );
    if (selectedSupplies) {
      setSupplies(selectedSupplies); // Lưu thông tin vật tư đã chọn
    } else {
      setSupplies(null);
    }
  };

  const handleDeleteMaintenance = async (maintenance) => {
    try {
      await axios.delete(
        `https://photocopy.onrender.com/v1/maintenance/${maintenance}`
      );

      fetchMaintenanceList();

      toast.success("Xóa Thành Công!");
    } catch (error) {
      console.error("Error deleting:", error);
      toast.error("Xóa Thất Bại!");
    }
  };

  return (
    <div className="admin-maintenance-list-container">
      <h1 className="admin-maintenance-list-title">
        Tất Cả Danh Sách Bảo Trì Của Khách
        <Link to="/admin">
          <Button
            variant="outlined"
            endIcon={<ArrowRightIcon />}
            style={{ margin: "0", marginLeft: "1rem" }}
          >
            Quay Lại Admin
          </Button>
        </Link>
      </h1>

      <div class="table_responsive">
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên Sản Phẩm</th>
              <th>Mã Máy</th>
              <th>Vị Trí Máy</th>
              <th>Tên Khách Hàng</th>
              <th>Số Điện Thoại</th>
              <th>Địa Chỉ</th>
              <th>Ghi Chú Của Khách</th>
              <th>Nhân Viên Tiếp Nhận</th>
              <th>Linh Kiện Cấp Cho Nhân Viên (Số seri)</th>
              <th>Trạng Thái Sửa Máy</th>
              <th>Lịch Sử Sửa Máy</th>
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
                  {maintenance.staff === undefined
                    ? "Chọn Nhân Viên..."
                    : maintenance.staff}
                </td>
                <td>
                  {maintenance.supplies === undefined ? (
                    "Chọn Vật Tư..."
                  ) : (
                    <>
                      <span>Mã Vật Tư: {maintenance.supplies}</span>
                      <button
                        className="btn btn-success"
                        disabled={isLoading}
                        onClick={() => {
                          setSelectedMaintenanceId(maintenance._id);
                          setSelectedSuppliesId(maintenance.supplies);
                          fetchSuppliesInfo(maintenance.supplies);
                        }}
                      >
                        {isLoading ? "Vui Lòng Đợi..." : "Xem Thông Tin"}
                      </button>
                    </>
                  )}

                  {selectedSuppliesInfo &&
                    selectedSuppliesId === maintenance.supplies && (
                      <ul style={{ listStyleType: "auto", padding: "0 1rem" }}>
                        <li>Tên Vật Tư: {selectedSuppliesInfo.name}</li>
                        <li>Mã Seri: {selectedSuppliesInfo.seri}</li>
                        <li>
                          Những Linh Kiện Gồm: {selectedSuppliesInfo.note}
                        </li>
                      </ul>
                    )}
                </td>

                <td>
                  {maintenance.repairStatus === "pending"
                    ? "Chờ xử lý..."
                    : "Hoàn Thành"}
                </td>
                <td>
                  <ul style={{ listStyleType: "auto", padding: "0 1rem" }}>
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
                <td>
                  <div className="admin-maintenance-action">
                    <label>
                      Nhân Viên Tiếp Nhận:
                      <select
                        value={selectedStaffId}
                        onChange={handleStaffChange}
                      >
                        <option value="">Chọn Nhân Viên</option>
                        {staffOptions.map((staff) => (
                          <option key={staff._id} value={staff._id}>
                            {staff.fullname}
                          </option>
                        ))}
                      </select>
                    </label>
                    {selectedStaffId !== "" && (
                      <>
                        <label>
                          Vật Tư Cấp Cho Nhân Viên:
                          <select
                            value={selectedSuppliesId}
                            onChange={handleSuppliesChange}
                          >
                            <option value="">Chọn Vật Tư</option>
                            {suppliesOptions.map((supplies) => (
                              <option key={supplies._id} value={supplies._id}>
                                {supplies.name}
                              </option>
                            ))}
                          </select>
                        </label>
                        <button
                          className="admin-maintenance-update-button"
                          onClick={() =>
                            handleUpdateMaintenance(maintenance._id)
                          }
                        >
                          Cập Nhập
                        </button>
                      </>
                    )}
                  </div>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteMaintenance(maintenance._id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMaintenanceList;
