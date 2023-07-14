import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";

import "./style.css";

import Menu from "../menu/Menu";
import {
  deleteUsers,
  getAllStaffs,
  RegisterUsers,
} from "../../../redux/actions/user.action";
function CreateStaff() {
  const [showadd, setShowadd] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("token"));
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("1");
  const isLoading = useSelector((state) => state.defaultReducer.isLoading);

  const dispatch = useDispatch();

  const handleCloseAdd = () => {
    setShowadd(false);
  };

  const listAccounts = useSelector((state) => state.defaultReducer.listAccount);
  useEffect(() => {
    dispatch(getAllStaffs());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (fullname.length === 0 || username.length < 6 || password.length < 6) {
      if (fullname.length === 0) {
        toast.warning("Vui lòng nhập đầy đủ tên", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      if (username.length < 6) {
        toast.warning("Tên người dùng phải có ít nhất 6 ký tự", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      if (password.length < 6) {
        toast.warning("Mật khẩu phải có ít nhất 6 ký tự", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } else {
      const newAccount = {
        fullname: fullname,
        username: username,
        password: password,
        role: role,
      };
      dispatch(RegisterUsers(newAccount, currentUser?.accessToken));
      setShowadd(false);
    }
  };

  return (
    <div className="container-listtypeAd">
      <div className="row">
        <div className="col-3 menu-admin-dt">
          <Menu />
        </div>
        <div className="col-xl-9 col-sm-12">
          <div className="title-list">
            <div className="row">
              <div className="col-sm-5">
                <p>Thêm Nhân Viên</p>
              </div>
              <div className="col-sm-7">
                <button
                  href="#"
                  className="btn btn-outline-danger"
                  onClick={() => {
                    setShowadd(true);
                  }}
                >
                  <i className="bx bxs-folder-plus"></i>
                  <span>Thêm Nhân Viên</span>
                </button>
              </div>
            </div>
          </div>
          <div class="table_responsive">
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên Nhân Viên</th>
                  <th>Tài Khoản</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <div
                    className="spinner-border"
                    role="status"
                    style={{ margin: "0 auto" }}
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <>
                    {listAccounts?.map((item, index) => (
                      <>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.fullname}</td>
                          <td>{item.username}</td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                dispatch(
                                  deleteUsers(
                                    item._id,
                                    currentUser?.accessToken
                                  )
                                );
                              }}
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      </>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal show={showadd} onHide={handleCloseAdd} className="modal">
        <ModalHeader>
          <ModalTitle>Thêm Mới Nhân Viên</ModalTitle>
        </ModalHeader>
        <ModalBody className="modal-body">
          <Form.Group className="formgroup-body">
            <Form.Label>Tên Nhân Viên: </Form.Label>
            <Form.Control
              type="text"
              // onChange={handleChange('name')}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Nhập Tên Nhân Viên..."
            />
            <Form.Label>Tài Khoản: </Form.Label>
            <Form.Control
              type="text"
              // onChange={handleChange('name')}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập Tài Khoản Đăng Nhập..."
            />
            <Form.Label>Mật Khẩu: </Form.Label>
            <Form.Control
              type="text"
              // onChange={handleChange('name')}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập Mật Khẩu Đăng Nhập..."
            />
          </Form.Group>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{ background: "#198754" }}
            variant="success"
            onClick={handleSubmit}
          >
            Tạo Tài Khoản
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default CreateStaff;
