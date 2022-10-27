/* eslint-disable react-hooks/exhaustive-deps */
import { Form } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../redux/auth/requests";
import { selectAuthSuccess } from "../../redux/auth/selectors";

const useSignIn = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const success = useSelector(selectAuthSuccess);
  const onFinish = (values) => {
    dispatch(signIn(values));
  };
  const onSubmit = () => form.submit();
  const navigate = useNavigate();
  const goToSignUp = () => navigate("/sign-up");
  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [success]);
  return { form, onFinish, onSubmit, goToSignUp };
};

export default useSignIn;
