import { Button, Form, Input } from "antd";
import React from "react";
import { rules } from "../../services/costants";
import styles from "./signUp.module.scss";
import useSignUp from "./useSignUp";
const SignUp = () => {
  const { form, onFinish, onSubmit, goToSignUp } = useSignUp();
  const { required, min, confirm, email } = rules;
  return (
    <div className={styles.background}>
      <div className={styles.form}>
        <h2>sign up</h2>
        <Form form={form} onFinish={onFinish}>
          <Form.Item name="firstname">
            <Input placeholder="first name" />
          </Form.Item>
          <Form.Item name="lastname">
            <Input placeholder="last name" />
          </Form.Item>
          <Form.Item name="email" rules={[required, email]}>
            <Input placeholder="email" />
          </Form.Item>
          <Form.Item name="password" rules={[required, min]}>
            <Input.Password placeholder="password" />
          </Form.Item>
          <Form.Item name="passwordConfirmation" rules={[confirm]}>
            <Input.Password placeholder="confirm password" />
          </Form.Item>
          <div className={styles.buttons}>
            <Button onClick={onSubmit} type="primary">
              sign up
            </Button>
            <Button onClick={goToSignUp}>sign in</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
