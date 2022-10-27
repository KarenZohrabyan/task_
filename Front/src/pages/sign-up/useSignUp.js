/* eslint-disable react-hooks/exhaustive-deps */
import { Form } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../redux/auth/requests";
import { selectAuthSuccess } from "../../redux/auth/selectors";

const useSignUp = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const success = useSelector(selectAuthSuccess);
  const onFinish = (values) => {
    dispatch(signUp(values));
  };
  const onSubmit = () => form.submit();
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [success]);
  const goToSignUp = () => navigate("/sign-in");
  return { form, onFinish, onSubmit, goToSignUp };
};

export default useSignUp;
