import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Menu from "../../pages/admin/menu/Menu";
import { useDispatch, useSelector } from "react-redux";
import { getSupplier } from "../../redux/actions/supplier.action";

export const NavBarMobile = ({
  listTypePhuTung,
  listTypeCombo,
  renderQuantity,
  user,
  handlelogout,
  refreshPage,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSupplier());
  }, []);
  const navigate = useNavigate();

  const listSupplier = useSelector(
    (state) => state.defaultReducer.listSupplier
  );

  return (
    <div id="sm-navbar-mobile">
      <div style={{ marginTop: "6.1rem" }}></div>
      <nav className="navbar bg-body-tertiary fixed-top sm-navbar-container">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand" href="#!" onClick={refreshPage}>
            Lam Anh
          </Link>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
            id="btn-menu-sm"
          >
            <i className="fa fa-align-justify navbar-toggler-icon navbar-toggler"></i>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <Link
                to="/"
                className="offcanvas-title"
                id="offcanvasNavbarLabel"
                onClick={refreshPage}
              >
                Máy Photocopy Lam Anh
              </Link>
              <i
                className=" btn-close navbar-toggler-icon navbar-toggler"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></i>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item dropdown">
                  <p
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ color: "black" }}
                  >
                    Máy Photocopy
                  </p>
                  <ul className="dropdown-menu">
                    {listTypePhuTung?.map((item, index) => (
                      <li>
                        <Link
                          to={`/shop/${item.name}`}
                          className="dropdown-item"
                          onClick={refreshPage}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <p
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ color: "black" }}
                  >
                    ComBo Máy Photocopy
                  </p>
                  <ul className="dropdown-menu">
                    {listTypeCombo?.map((item, index) => (
                      <li>
                        <Link
                          to={`/shopcombo/${item._id}`}
                          className="dropdown-item"
                          onClick={refreshPage}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="nav-item">
                  <Link
                    to="/contact"
                    className="nav-link active"
                    aria-current="page"
                    style={{ color: "black" }}
                    onClick={refreshPage}
                  >
                    Liên Hệ
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/maintenance"
                    className="nav-link active"
                    aria-current="page"
                    style={{ color: "black" }}
                    onClick={refreshPage}
                  >
                    Dịch Vụ Bảo Trì
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/shop/product-dt/cart"
                    className="nav-link active"
                    aria-current="page"
                    style={{ color: "black" }}
                    onClick={refreshPage}
                  >
                    Giỏ Hàng ({renderQuantity})
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <p
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ color: "black" }}
                  >
                    Người Dùng
                  </p>
                  <ul className="dropdown-menu">
                    {user === null ? (
                      "Vui Lòng Đặt Nhập Để Xem Thêm!"
                    ) : (
                      <>
                        <Link
                          to="/history"
                          className="dropdown-item"
                          onClick={refreshPage}
                        >
                          Đơn Hàng Của Bạn
                        </Link>
                        <Link
                          to="/maintenance-list-customer"
                          className="dropdown-item"
                          onClick={refreshPage}
                        >
                          Đơn Hàng Bảo Trì
                        </Link>
                      </>
                    )}
                  </ul>
                </li>

                {user?.role === "1" ? (
                  <li className="nav-item">
                    <Link
                      to="/staff-maintenance-list"
                      className="nav-link active"
                      aria-current="page"
                      style={{ color: "black" }}
                      onClick={refreshPage}
                    >
                      Nhân Viên
                    </Link>
                  </li>
                ) : (
                  ""
                )}

                {user !== null ? (
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      style={{ color: "black" }}
                      onClick={handlelogout}
                    >
                      Đăng xuất
                    </Link>
                  </li>
                ) : (
                  <Link
                    to="/login"
                    className="dropdown-item"
                    onClick={refreshPage}
                  >
                    Đăng Nhập
                  </Link>
                )}

                {user?.role === "0" ? (
                  <>
                    <Link
                      to="/admin"
                      style={{ margin: "1rem 0", fontWeight: "bold" }}
                    >
                      Quản lý Admin
                    </Link>
                    <li className="nav-item dropdown">
                      <p
                        className="nav-link dropdown-toggle"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ color: "black" }}
                      >
                        Quản Lý Máy PhoToCopy
                      </p>
                      <ul className="dropdown-menu">
                        <li>
                          <Link
                            to="/list-types"
                            className="dropdown-item"
                            onClick={refreshPage}
                          >
                            Loại Máy PhoToCopy
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/list-products-admin"
                            className="dropdown-item"
                            onClick={refreshPage}
                          >
                            Sản Phẩm Máy PhoToCopy
                          </Link>
                        </li>
                      </ul>
                    </li>

                    <li className="nav-item dropdown">
                      <p
                        className="nav-link dropdown-toggle"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ color: "black" }}
                      >
                        Quản Lý ComBo
                      </p>
                      <ul className="dropdown-menu">
                        <li>
                          <Link
                            to="/list-combos"
                            className="dropdown-item"
                            onClick={refreshPage}
                          >
                            Loại Combo
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/list-products-combos-admin"
                            className="dropdown-item"
                            onClick={refreshPage}
                          >
                            Sản Phẩm Combo
                          </Link>
                        </li>
                      </ul>
                    </li>

                    <li className="nav-item dropdown">
                      <p
                        className="nav-link dropdown-toggle"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ color: "black" }}
                      >
                        Quản Lý Đơn Hàng
                      </p>
                      <ul className="dropdown-menu">
                        <li>
                          <Link
                            to="/order-customer"
                            className="dropdown-item"
                            onClick={refreshPage}
                          >
                            Đơn Hàng Của Máy PhoToCopy & Combo
                          </Link>
                        </li>
                      </ul>
                    </li>

                    <li className="nav-item dropdown">
                      <p
                        className="nav-link dropdown-toggle"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ color: "black" }}
                      >
                        Quản Lý Nhà Cung Cấp
                      </p>
                      <ul className="dropdown-menu">
                        <li>
                          <Link
                            to="/delivery"
                            className="dropdown-item"
                            onClick={refreshPage}
                          >
                            Đơn Hàng Của Khách
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/types-supplier"
                            className="dropdown-item"
                            onClick={refreshPage}
                          >
                            Nhà Cung Cấp
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/prducts-supplier"
                            className="dropdown-item"
                            onClick={refreshPage}
                          >
                            Sản Phẩm Nhà Cung Cấp
                          </Link>
                        </li>
                      </ul>
                    </li>

                    <li className="nav-item dropdown">
                      <p
                        className="nav-link dropdown-toggle"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ color: "black" }}
                      >
                        Mua Hàng Từ Nhà Cung Cấp
                      </p>
                      <ul className="dropdown-menu">
                        {listSupplier?.map((item, index) => (
                          <li>
                            <Link
                              to={`/shopsupplier/${item._id}`}
                              className="dropdown-item"
                              onClick={refreshPage}
                            >
                              {item?.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>

                    <li className="nav-item dropdown">
                      <p
                        className="nav-link dropdown-toggle"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ color: "black" }}
                      >
                        Quản Lý Đơn Hàng Cung Cấp Của Tôi
                      </p>
                      <ul className="dropdown-menu">
                        <li>
                          <Link
                            to="/orderpage"
                            className="dropdown-item"
                            onClick={refreshPage}
                          >
                            Đơn Hàng Đã Đặt
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/cart-supplier"
                            className="dropdown-item"
                            onClick={refreshPage}
                          >
                            Lên Đơn
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/statistics"
                            className="dropdown-item"
                            onClick={refreshPage}
                          >
                            Thống Kê
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item dropdown">
                      <p
                        className="nav-link dropdown-toggle"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ color: "black" }}
                      >
                        Dịch Vụ Bảo Trì
                      </p>
                      <ul className="dropdown-menu">
                        <li>
                          <Link
                            to="/admin-maintenance-list"
                            className="dropdown-item"
                            onClick={refreshPage}
                          >
                            Bảo Trì
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin-create-staff"
                            className="dropdown-item"
                            onClick={refreshPage}
                          >
                            Tạo Nhân Viên
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin-list-maintenanceSupplies"
                            className="dropdown-item"
                            onClick={refreshPage}
                          >
                            Quản Lý Linh Kiện Máy
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin-list-machinecode"
                            className="dropdown-item"
                            onClick={refreshPage}
                          >
                            Quản Lý Mã Máy
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin-list-machinelocation"
                            className="dropdown-item"
                            onClick={refreshPage}
                          >
                            Quản Lý Vị Trí Máy
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </>
                ) : (
                  ""
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
