import React from "react";
import { useSelector } from "react-redux";
import { selectAuthLoading } from "../../redux/auth/selectors";
import styles from "./loading.module.scss"
const Loading = () => {
  const authLoading = useSelector(selectAuthLoading);

  return authLoading && <div className={styles.loading}>Loading...</div>;
};

export default Loading;
