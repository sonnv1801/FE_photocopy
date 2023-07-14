import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { createAction } from ".";
import { machineCodeService } from "../../services";
import {
  ADD_CODES,
  DELETE_CODES,
  FETCH_CODE,
  START_LOADING,
  STOP_LOADING,
} from "../type/types";
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

export const getAllCodes = () => {
  return (dispatch) => {
    dispatch(startLoading());
    machineCodeService
      .getAllCode()
      .then((res) => {
        dispatch(createAction(FETCH_CODE, res.data));
        dispatch(stopLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopLoading());
      });
  };
};

export const addCodes = (type, accessToken) => {
  return (dispatch) => {
    machineCodeService
      .addCode(type, accessToken)
      .then((res) => {
        console.log(res.data);
        dispatch(createAction(ADD_CODES, res.data));
        toast.success("Thêm Thành Công!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteCodes = (id, accessToken) => {
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
          machineCodeService.deleteCode(id, accessToken).then((res) => {
            dispatch(createAction(DELETE_CODES, res.data));
            dispatch(getAllCodes());
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
