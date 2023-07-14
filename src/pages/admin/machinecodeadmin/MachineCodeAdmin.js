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
  addCodes,
  deleteCodes,
  getAllCodes,
} from "../../../redux/actions/machineCode.action";
function MachineCodeAdmin() {
  const [showadd, setShowadd] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("token"));
  const [name, setName] = useState("");

  const isLoading = useSelector((state) => state.defaultReducer.isLoading);

  const dispatch = useDispatch();

  const handleCloseAdd = () => {
    setShowadd(false);
  };

  const listCodes = useSelector((state) => state.defaultReducer.listCode);
  useEffect(() => {
    dispatch(getAllCodes());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCode = {
      name: name,
    };
    dispatch(addCodes(newCode, currentUser?.accessToken));
    setShowadd(false);
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
                <p>Thêm Mã Máy</p>
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
                  <span>Thêm Mã Máy</span>
                </button>
              </div>
            </div>
          </div>
          <div class="table_responsive">
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Mã Máy</th>
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
                    {listCodes?.map((item, index) => (
                      <>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                dispatch(
                                  deleteCodes(
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
          <ModalTitle>Thêm Mới Mã Máy</ModalTitle>
        </ModalHeader>
        <ModalBody className="modal-body">
          <Form.Group className="formgroup-body">
            <Form.Label>Mã Máy</Form.Label>
            <Form.Control
              type="text"
              // onChange={handleChange('name')}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập Mã Máy..."
            />
          </Form.Group>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{ background: "#198754" }}
            variant="success"
            onClick={handleSubmit}
          >
            Tạo Mã Máy
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default MachineCodeAdmin;
