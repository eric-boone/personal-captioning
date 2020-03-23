import React, { useState } from "react";

import useFormValidation from "./useFormValidation";
import firebase from "../firebase/firebase";
import validateLogin from "./validateLogin";

const INITIAL_STATE = {
  username: "",
  email: "",
  password: ""
};

function Login(props) {
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    isSubmitting
  } = useFormValidation(INITIAL_STATE, validateLogin, loginUser);
  const [firebaseError, setFirebaseError] = useState(null);

  async function loginUser() {
    const { email, password } = values;
    try {
      await firebase.login(email, password);
      // props.history.push("/addshow");
      // <Redirect to="/addshow" />
      // console.log({ response });
    } catch (error) {
      console.error("Authentication Error", error);
      setFirebaseError(error.message);
    }
    // console.log("Login.js - loginUser");
  }

  return (
    <div className="text-light">
      <p>Login</p>
      <form onSubmit={handleSubmit}>
        <input
          className={errors.email && "border border-danger"}
          onChange={handleChange}
          type="email"
          placeholder="email"
          name="email"
          value={values.email}
          autoComplete="off"
        />
        <input
          className={errors.email && "border border-danger"}
          type="password"
          placeholder="password"
          name="password"
          value={values.password}
          autoComplete="off"
          onChange={handleChange}
        />
        <button type="submit" disabled={isSubmitting}>
          Login
        </button>
      </form>
      <div>
        {errors.email && <p className="text-warning">{errors.email}</p>}
        {errors.password && <p className="text-warning">{errors.password}</p>}
        {firebaseError && <p className="text-danger">{firebaseError}</p>}
      </div>
    </div>
  );
}

export default Login;
