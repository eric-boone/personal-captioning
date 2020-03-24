import React, { useState } from "react";
import { Link } from "react-router-dom";

import useFormValidation from "./useFormValidation";
import firebase from "../firebase/firebase";
import validateLogin from "./validateLogin";

const INITIAL_STATE = {
  username: "",
  email: "",
  password: ""
};

function Admin() {
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    isSubmitting
  } = useFormValidation(INITIAL_STATE, validateLogin, registerUser);

  const [firebaseError, setFirebaseError] = useState(null);

  async function registerUser() {
    const { username, email, password } = values;
    try {
      const response = await firebase.register(username, email, password);
      // console.log({ response });
    } catch (error) {
      console.error("Authentication Error", error);
      setFirebaseError(error.message);
    }
    // console.log("Admin.js - registerUser");
  }

  return (
    <div className="text-light">
      <p>
        <Link
          to={{
            pathname: "/"
          }}
        >
          <span role="img" aria-label="home">
            🏡
          </span>
        </Link>
        <span role="img" aria-label="home">
          | Create User ＋
        </span>
      </p>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          placeholder="username"
          name="username"
          value={values.name}
          autoComplete="off"
        />
        <br />
        <br />
        <input
          className={errors.email && "border border-danger"}
          onChange={handleChange}
          type="email"
          placeholder="email"
          name="email"
          value={values.email}
          autoComplete="off"
        />
        <br />
        <br />
        <input
          className={errors.email && "border border-danger"}
          type="password"
          placeholder="password"
          name="password"
          value={values.password}
          autoComplete="off"
          onChange={handleChange}
        />
        <br />
        <br />
        <button type="submit" disabled={isSubmitting}>
          Add
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

export default Admin;
