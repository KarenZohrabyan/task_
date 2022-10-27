import {
  signInError,
  signInPending,
  signInSuccess,
  signUpError,
  signUpPending,
  signUpSuccess,
} from "./actions";

const signInConfigs = {
  method: "POST",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
};

export const signIn = (values) => {
  return (dispatch) => {
    dispatch(signInPending());
    fetch(`${process.env.REACT_APP_API}`, {
      ...signInConfigs,
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then(({ token }) => {
        if (token) {
          localStorage.setItem("auth", token);
          dispatch(signInSuccess());
        } else {
          throw new Error("somthing wrong");
        }
      })
      .catch((error) => dispatch(signInError(error.message)));
  };
};

const signUpConfigs = {
  method: "POST",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
};

export const signUp = (values) => {
  return (dispatch) => {
    dispatch(signUpPending());
    fetch(`${process.env.REACT_APP_API}`, {
      ...signUpConfigs,
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then(({ token }) => {
        if (token) {
          localStorage.setItem("auth", token);
          dispatch(signUpSuccess());
        } else {
          throw new Error("somthing wrong");
        }
      })
      .catch((error) => dispatch(signUpError(error.message)));
  };
};
