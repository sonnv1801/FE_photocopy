import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MaintenanceByStaffPage = () => {
  const [maintenanceList, setMaintenanceList] = useState([]);
  const staffId = JSON.parse(localStorage.getItem("token")); // ID của nhân viên

  const [selectedSuppliesInfo, setSelectedSuppliesInfo] = useState(null);
  const [selectedSuppliesId, setSelectedSuppliesId] = useState("");
  const [selectedMaintenanceId, setSelectedMaintenanceId] = useState("");
  const [inputValues, setInputValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchNotFound, setSearchNotFound] = useState(false);

  useEffect(() => {
    fetchMaintenanceListByStaff();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        "https://photocopy.onrender.com/v1/maintenance/search",
        { keyword: searchKeyword }
      );
      if (response.data.length === 0) {
        toast.info(
          "Không tìm thấy thông tin dựa trên từ khóa tìm kiếm đã nhập."
        );
        setSearchNotFound(true);
      } else {
        setSearchNotFound(false);
        setMaintenanceList(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
    const maintenanceInput = inputValues[maintenanceId];
    if (
      !maintenanceInput ||
      maintenanceInput.repairNote === "" ||
      maintenanceInput.replacedSupplies === "" ||
      maintenanceInput.totalCost === ""
    ) {
      toast.warning("Nhập Đầy Đủ Thông Tin Đã Sửa Máy");
      return;
    }

    try {
      await axios.put(
        `https://photocopy.onrender.com/v1/maintenance/staff/repairfinished/${maintenanceId}`,
        {
          repairStatus: "completed",
          repairNote: maintenanceInput.repairNote,
          replacedSupplies: maintenanceInput.replacedSupplies,
          totalCost: maintenanceInput.totalCost,
        }
      );

      const updatedMaintenanceList = maintenanceList.map((maintenance) => {
        if (maintenance._id === maintenanceId) {
          return {
            ...maintenance,
            repairStatus: "completed",
            repairNote: maintenanceInput.repairNote,
            replacedSupplies: maintenanceInput.replacedSupplies,
            totalCost: maintenanceInput.totalCost,
          };
        }
        return maintenance;
      });
      setMaintenanceList(updatedMaintenanceList);

      toast.success("Đã Cập Nhập Thành Công!");
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

  return (
    <div className="maintenance-page">
      <h1 className="maintenance-page-title">
        Danh Sách Bảo Trì Của Nhân Viên
      </h1>
      <div className="search-container">
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="Nhập từ khóa tìm kiếm (VD: Tên Sản Phẩm, Mã Máy, Vị Trí Máy & Tên Khách Hàng)"
        />
        <button className="btn btn-success" onClick={handleSearch}>
          Tìm kiếm
        </button>
      </div>
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
              <th>Linh Kiện Được Cấp</th>
              <th>Ghi Chú Sửa Chữa</th>
              <th>Đã Thay Những Gì</th>
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
                <td>
                  <button
                    className="btn btn-success"
                    disabled={isLoading}
                    onClick={() => {
                      setSelectedMaintenanceId(maintenance._id);
                      setSelectedSuppliesId(maintenance.supplies);
                      fetchSuppliesInfo(maintenance.supplies);
                    }}
                  >
                    {isLoading ? "Vui Lòng Đợi..." : "Thông Tin Linh Kiện"}
                  </button>
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
                  {maintenance.repairStatus === "pending" ? (
                    <input
                      type="text"
                      placeholder="Nhập đã sửa những gì..."
                      value={inputValues[maintenance._id]?.repairNote || ""}
                      onChange={(e) => {
                        setInputValues((prevValues) => ({
                          ...prevValues,
                          [maintenance._id]: {
                            ...prevValues[maintenance._id],
                            repairNote: e.target.value,
                          },
                        }));
                      }}
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
                      value={
                        inputValues[maintenance._id]?.replacedSupplies || ""
                      }
                      onChange={(e) => {
                        setInputValues((prevValues) => ({
                          ...prevValues,
                          [maintenance._id]: {
                            ...prevValues[maintenance._id],
                            replacedSupplies: e.target.value,
                          },
                        }));
                      }}
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
                      value={inputValues[maintenance._id]?.totalCost || ""}
                      onChange={(e) => {
                        setInputValues((prevValues) => ({
                          ...prevValues,
                          [maintenance._id]: {
                            ...prevValues[maintenance._id],
                            totalCost: e.target.value,
                          },
                        }));
                      }}
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
