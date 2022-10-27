export const isAuth = () => {
  const token = localStorage.getItem("auth");
  return !!token;
};
