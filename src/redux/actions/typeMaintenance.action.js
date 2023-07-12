import { createAction } from ".";
import { typeMaintenanceService } from "../../services";
import {
  ADD_TYPES_MAINTENANCE,
  DELETE_TYPES_MAINTENANCE,
  FETCH_TYPE_MAINTENANCE,
  START_LOADING,
  STOP_LOADING,
} from "../type/types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
export const startLoading = () => {
  return {
    type: START_LOADING,
  };
};

export const stopLoading = () => {
  return {
    type: STOP_LOADING,
  };
};

export const gettypeMaintenances = () => {
  return (dispatch) => {
    dispatch(startLoading());
    typeMaintenanceService
      .getAllTypeMaintenance()
      .then((res) => {
        dispatch(createAction(FETCH_TYPE_MAINTENANCE, res.data));
        dispatch(stopLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopLoading());
      });
  };
};

export const addTypeMaintenances = (type, accessToken) => {
  return (dispatch) => {
    typeMaintenanceService
      .addTypeMaintenance(type, accessToken)
      .then((res) => {
        console.log(res.data);
        dispatch(createAction(ADD_TYPES_MAINTENANCE, res.data));
        toast.success("Thêm Thành Công!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteTypeMaintenances = (id, accessToken) => {
  return (dispatch) => {
    Swal.fire({
      title: "Bạn chắc chưa?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK !",
    })
      .then((result) => {
        if (result.isConfirmed) {
          typeMaintenanceService
            .deleteTypeMaintenance(id, accessToken)
            .then((res) => {
              dispatch(createAction(DELETE_TYPES_MAINTENANCE, res.data));
              dispatch(gettypeMaintenances());
              dispatch(stopLoading());
            });
          toast.success("Xóa Thành Công!", {
            position: toast.POSITION.TOP_CENTER,
          });
          dispatch(stopLoading());
        }
      })
      .catch((err) => console.log(err));
  };
};
