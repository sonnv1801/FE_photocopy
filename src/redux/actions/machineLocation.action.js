import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { createAction } from ".";
import { machineLocationService } from "../../services";
import {
  ADD_LOCATIONS,
  DELETE_LOCATIONS,
  FETCH_LOCATION,
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

export const getAllLocations = () => {
  return (dispatch) => {
    dispatch(startLoading());
    machineLocationService
      .getAllLocation()
      .then((res) => {
        dispatch(createAction(FETCH_LOCATION, res.data));
        dispatch(stopLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopLoading());
      });
  };
};

export const addLocations = (type, accessToken) => {
  return (dispatch) => {
    machineLocationService
      .addLocation(type, accessToken)
      .then((res) => {
        console.log(res.data);
        dispatch(createAction(ADD_LOCATIONS, res.data));
        toast.success("Thêm Thành Công!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteLocations = (id, accessToken) => {
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
          machineLocationService.deleteLocation(id, accessToken).then((res) => {
            dispatch(createAction(DELETE_LOCATIONS, res.data));
            dispatch(getAllLocations());
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
