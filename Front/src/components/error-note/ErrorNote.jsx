import { notification } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAuthError } from "../../redux/auth/selectors";

const ErrorNote = () => {
  const { status, message } = useSelector(selectAuthError);
  useEffect(() => {
    if (status) {
      notification.error({ message });
    }
  }, [status, message]);
  return null;
};

export default ErrorNote;
