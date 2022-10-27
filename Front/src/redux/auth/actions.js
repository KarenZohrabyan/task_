export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const REG = "REG";
export const REG_SUCCESS = "REG_SUCCESS";
export const REG_ERROR = "REG_ERROR";

export const signInPending = () => {
  return { type: LOGIN };
};
export const signInSuccess = (payload) => {
  return { type: LOGIN_SUCCESS, payload };
};
export const signInError = (payload) => {
  return { type: LOGIN_ERROR, payload };
};

export const signUpPending = () => {
  return { type: REG };
};
export const signUpSuccess = (payload) => {
  return { type: REG_SUCCESS, payload };
};
export const signUpError = (payload) => {
  return { type: REG_ERROR, payload };
};
