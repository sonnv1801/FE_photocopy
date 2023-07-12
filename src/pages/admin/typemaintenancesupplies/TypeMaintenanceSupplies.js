import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";

import "./style.css";

import Menu from "../menu/Menu";
import {
  addTypeMaintenances,
  deleteTypeMaintenances,
  gettypeMaintenances,
} from "../../../redux/actions/typeMaintenance.action";

function TypeMaintenanceSupplies() {
  const [showadd, setShowadd] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("token"));
  const [name, setName] = useState("");
  const [seri, setSeri] = useState("");
  const [note, setNote] = useState("");
  const isLoading = useSelector((state) => state.defaultReducer.isLoading);

  const dispatch = useDispatch();

  const handleCloseAdd = () => {
    setShowadd(false);
  };

  const listTypeMaintenances = useSelector(
    (state) => state.defaultReducer.listTypeMaintenance
  );

  console.log(listTypeMaintenances, "listTypeMaintenances");

  useEffect(() => {
    dispatch(gettypeMaintenances());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newType = {
      name: name,
      seri: seri,
      note: note,
    };
    dispatch(addTypeMaintenances(newType, currentUser?.accessToken));
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
                <p>Vật Tư Bảo Trì</p>
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
                  <span>Thêm Vật Tư</span>
                </button>
              </div>
            </div>
          </div>
          <div class="table_responsive">
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên Vật Tư</th>
                  <th>Mã Seri</th>
                  <th>Ghi Chú</th>
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
                    {listTypeMaintenances?.map((item, index) => (
                      <>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.seri}</td>
                          <td>{item.note}</td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                dispatch(
                                  deleteTypeMaintenances(
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
          <ModalTitle>Thêm Loại Phụ Tùng</ModalTitle>
        </ModalHeader>
        <ModalBody className="modal-body">
          <Form.Group className="formgroup-body">
            <Form.Label>Tên Vật Tư: </Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập Loại..."
            />
            <Form.Label>Mã Seri: </Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setSeri(e.target.value)}
              placeholder="Nhập mã seri..."
            />
            <Form.Label>Ghi Chú: </Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setNote(e.target.value)}
              placeholder="Nhập ghi chú..."
            />
          </Form.Group>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{ background: "#198754" }}
            variant="success"
            onClick={handleSubmit}
          >
            Thêm Loại
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default TypeMaintenanceSupplies;
