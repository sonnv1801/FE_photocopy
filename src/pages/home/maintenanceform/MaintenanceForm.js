import React, { useState, useEffect } from "react";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
const MaintenanceForm = () => {
  const [nameProduct, setNameProduct] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [machineCode, setMachineCode] = useState("");
  const [machineLocation, setMachineLocation] = useState("");
  const [note, setNote] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    const customerData = JSON.parse(localStorage.getItem("token"));

    if (customerData) {
      setCustomerId(customerData._id);
      setFullname(customerData.fullname);
      setPhone(customerData.phone);
      setAddress(customerData.address);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra các trường bắt buộc
    if (
      nameProduct === "" ||
      machineCode === "" ||
      machineLocation === "" ||
      fullname === "" ||
      phone === "" ||
      address === ""
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const maintenanceData = {
      nameProduct,
      customerId,
      fullname,
      phone,
      address,
      machineCode,
      machineLocation,
      note,
    };

    try {
      // Tiếp tục xử lý khi các trường đều đã được nhập
      const response = await fetch(
        "https://photocopy.onrender.com/v1/maintenance",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(maintenanceData),
        }
      );

      const data = await response.json();

      console.log("Saved Maintenance:", data);
      // Hiển thị thông báo thành công
      toast.success("Tạo Đơn Thành Công!");
      navigate("/maintenance-list-customer");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <section class="container-maintence-customer">
        <header>Dịch Vụ Bảo Trì</header>
        <form action="#" class="form" onSubmit={handleSubmit}>
          <div class="column">
            <div class="input-box">
              <label htmlFor="nameProduct">Tên Máy</label>
              <input
                type="text"
                placeholder="Nhập Tên Máy Của Bạn..."
                required
                value={nameProduct}
                onChange={(e) => setNameProduct(e.target.value)}
              />
            </div>
            <div class="input-box">
              <label htmlFor="machineCode">Mã Máy</label>
              <input
                type="text"
                placeholder="Nhập Mã Máy Của Bạn..."
                required
                onChange={(e) => setMachineCode(e.target.value)}
              />
            </div>
          </div>

          <div class="column">
            {/* <div class="input-box">
              <label htmlFor="machineLocation">Vị Trí Máy</label>
              <div class="select-box">
                <select
                  value={machineLocation}
                  onChange={(e) => setMachineLocation(e.target.value)}
                >
                  <option hidden>Country</option>
                  <option>America</option>
                  <option>Japan</option>
                  <option>India</option>
                  <option>Nepal</option>
                </select>
              </div>
            </div> */}
            <div class="input-box">
              <label htmlFor="machineLocation"> Vị Trí Máy</label>
              <input
                type="text"
                placeholder="Vị Trí Chỗ Để Máy..."
                value={machineLocation}
                onChange={(e) => setMachineLocation(e.target.value)}
              />
            </div>
            <div class="input-box">
              <label htmlFor="fullname">Tên Khách Hàng</label>
              <input
                type="text"
                placeholder="Tên Khách Hàng..."
                value={fullname}
                required
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
          </div>

          <div class="column">
            <div class="input-box">
              <label htmlFor="phone"> Số Điện Thoại</label>
              <input
                type="number"
                placeholder="Số Điện Thoại Khách Hàng..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div class="input-box">
              <label htmlFor="address">Địa Chỉ</label>
              <input
                type="text"
                placeholder="Địa Chỉ Khách Hàng..."
                id="address"
                className="maintenance-form-input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
          </div>

          <div class="input-box address">
            <label htmlFor="note">Ghi Chú Sửa Chữa</label>
            <input
              placeholder="Ghi Chú Máy Hư Gì.."
              className="maintenance-form-textarea"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              required
            />
          </div>
          {user === null ? (
            <div class="row">
              <div
                class="col-xl-6 col-sm-12"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p>Bạn Đã Đăng Nhập Chưa?</p>
              </div>
              <div class="col-xl-6 col-sm-12">
                <Link to="/login">
                  <button>Đăng Nhập Ngay</button>
                </Link>
              </div>
            </div>
          ) : (
            <button>Tạo Đơn Bảo Trì</button>
          )}
        </form>
      </section>
    </>
  );
};

export default MaintenanceForm;
