import { Button, Form, Input } from "antd";
import React from "react";
import { rules } from "../../services/costants";
import styles from "./signIn.module.scss";
import useSignIn from "./useSignIn";
const Login = () => {
  const { form, onFinish, onSubmit, goToSignUp } = useSignIn();
  const { required, email } = rules;
  return (
    <div className={styles.background}>
      <div className={styles.form}>
        <h2>sign in</h2>
        <Form form={form} onFinish={onFinish}>
          <Form.Item name="email" rules={[required, email]}>
            <Input placeholder="email" />
          </Form.Item>
          <Form.Item name="password" rules={[required]}>
            <Input.Password placeholder="password" />
          </Form.Item>
          <div className={styles.buttons}>
            <Button onClick={onSubmit} type="primary">
              sign in
            </Button>
            <Button onClick={goToSignUp}>sign up</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
