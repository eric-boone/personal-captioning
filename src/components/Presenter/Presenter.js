import React, { useState } from "react";
import { Link } from "react-router-dom";

import Shows from "../Builder/Shows";
import PresenterSlides from "./PresenterSlides";

export const Presenter = () => {
  const [showID, setShowID] = useState("");
  const [reDraw, setReDraw] = useState(false);

  const showToEditHandler = event => {
    setShowID(event);
    // console.log("Presenter - showToEditHandler", showID);
  };

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
          | Presenter 🎭
        </span>
      </p>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-1">
            <Shows clicked={showToEditHandler} reDraw={[reDraw, setReDraw]} />
          </div>
          <div className="col-md-5">
            <PresenterSlides />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presenter;
