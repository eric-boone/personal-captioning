import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Login from "./Login";
import { FirebaseContext } from "../firebase/firebase";

function Home() {
  const { user, firebase } = useContext(FirebaseContext);

  return (
    <div className="text-light">
      <p>Home</p>

      {user ? (
        <>
          <Link to="/builder" className="btn btn-outline-light">
            Build show
          </Link>
          <br />
          <Link to="/presenter" className="btn btn-outline-light mt-1">
            Present show
          </Link>
          <br />
          <div
            className="btn btn-outline-light mt-1"
            onClick={() => {
              firebase.logout();
            }}
          >
            logout
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Home;
