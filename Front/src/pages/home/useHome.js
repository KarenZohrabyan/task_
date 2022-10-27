/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuth } from "../../services/helpers";

const useHome = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth()) {
      navigate("/sign-in");
    }
  }, []);
  return {};
};

export default useHome;
