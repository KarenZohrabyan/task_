export const initError = { status: false, message: "" };
export const rules = {
  email: { type: "email", message: "email wrong format" },
  required: { required: true, message: "required field" },
  min: { min: 8, message: "input 8 and more symbols" },
  confirm: ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") !== value) {
        return Promise.reject(new Error("passwords don't match"));
      }
      return Promise.resolve();
    },
  }),
};
