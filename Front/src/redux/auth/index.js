import { initError } from "../../services/costants";
import {
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  REG,
  REG_ERROR,
  REG_SUCCESS,
} from "./actions";

const initialState = {
  loading: false,
  error: initError,
  success: false,
};

export default function loginReducer(state = initialState, { type, payload }) {
  switch (type) {
    case LOGIN:
      return { ...state, loading: true, error: initError };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, error: initError, success: true };
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: { status: true, message: payload },
      };
    case REG:
      return { ...state, loading: true, error: initError };
    case REG_SUCCESS:
      return { ...state, loading: false, error: initError, success: true };
    case REG_ERROR:
      return {
        ...state,
        loading: false,
        error: { status: true, message: payload },
      };
    default:
      return state;
  }
}
