import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import SignIn from "./pages/sign-in";
import Home from "./pages/home";

import "antd/dist/antd.min.css";
import SignUp from "./pages/sign-up";
import Loading from "./components/loading";
import ErrorNote from "./components/error-note";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Loading />
    <ErrorNote />
    <RouterProvider router={router} />
  </Provider>
);
