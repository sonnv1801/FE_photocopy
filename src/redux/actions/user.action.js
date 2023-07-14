import { createAction } from ".";
import { userService } from "../../services";
import {
  ADD_ACCOUNT,
  DELETE_USER_STAFF,
  FETCH_ALL_STAFF,
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  START_LOADING,
  STOP_LOADING,
} from "../type/types";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

export const loginStart = () => {
  return {
    type: LOGIN_START,
  };
};

export const loginFailed = () => {
  return {
    type: LOGIN_FAILED,
  };
};

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

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  userService
    .Login(user)
    .then((res) => {
      dispatch(createAction(LOGIN_SUCCESS, res.data));
      localStorage.setItem("token", JSON.stringify(res.data));
      console.log("token", user);
      navigate("/");
      toast.success("Đăng nhập thành công!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch(loginFailed());
    });
};

export const RegisterUsers = (account, accessToken) => {
  return (dispatch) => {
    userService
      .Register(account, accessToken)
      .then((res) => {
        console.log(res.data);
        dispatch(createAction(ADD_ACCOUNT, res.data));
        toast.success("Thêm Thành Công!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const getAllStaffs = () => {
  return (dispatch) => {
    dispatch(startLoading());
    userService
      .GetAllStaff()
      .then((res) => {
        dispatch(createAction(FETCH_ALL_STAFF, res.data));
        dispatch(stopLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopLoading());
      });
  };
};

export const deleteUsers = (id, accessToken) => {
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
          userService.deleteUser(id, accessToken).then((res) => {
            dispatch(createAction(DELETE_USER_STAFF, res.data));
            dispatch(getAllStaffs());
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
