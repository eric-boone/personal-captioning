import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

import { FirebaseContext } from "../firebase/firebase";

function Logout() {
  const { user, firebase } = useContext(FirebaseContext);

  return (
    <div className="text-light">
      <p>logout</p>
      {user ? (
        <>
          <p>user</p>
          <div
            className="btn btn-outline-light text-light"
            onClick={() => {
              firebase.logout();
            }}
          >
            logout
          </div>
        </>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
}

export default Logout;
