import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

import { FirebaseContext } from "../../firebase/firebase";
import useFormValidation from "../useFormValidation";
import validateShowTitle from "../validateShowTitle";

const INITIAL_STATE = {
  showTitle: "",
  createdBy: {
    id: "",
    name: ""
  },
  showSlides: [],
  preShowSlides: []
};

function AddShow(props) {
  const { user, firebase } = useContext(FirebaseContext);
  const { handleSubmit, handleChange, values, errors } = useFormValidation(
    INITIAL_STATE,
    validateShowTitle,
    handleAddShow
  );

  function handleAddShow() {
    const { showTitle } = values;
    const newShow = {
      showTitle,
      createdBy: {
        id: user.uid,
        name: user.email
      },
      showSlides: [],
      preShowSlides: [],
      characters: [
        { value: "_blank", label: "_blank", color: "black", id: Date.now() - 1 },
        { value: "DCPA", label: "DCPA", color: "#ffffff", id: Date.now() }
      ]
    };
    firebase.db.collection("shows").add(newShow);
    // console.log("AddShow.js - handleAddShow");
  }

  return (
    <div className="text-light">
      {user ? (
        <>
          <form onSubmit={handleSubmit}>
            <div className="input-group input-group-sm mb-3">
              <button className="input-group-prepend pointer" type="submit">
                <span className="input-group-text" id="inputGroup-sizing-sm">
                  +
                </span>
              </button>
              <input
                type="text"
                className="form-control"
                aria-label="Add Show"
                aria-describedby="inputGroup-sizing-sm"
                placeholder="Add Show"
                autoComplete="off"
                name="showTitle"
                onChange={handleChange}
                values={values.showTitle}
              />
            </div>
          </form>
          <div>
            {errors.showTitle && (
              <p className="text-warning">{errors.showTitle}</p>
            )}
          </div>
        </>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
}

export default AddShow;
