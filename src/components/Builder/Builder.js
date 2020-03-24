import React, { useState } from "react";
import { Link } from "react-router-dom";

import AddShow from "./AddShow";
import Shows from "./Shows";
import AddSlide from "./AddSlide";
import Slides from "./Slides";
import CharacterCreator from "./CharacterCreator";

function Builder() {
  const [showID, setShowID] = useState("");
  const [slideClickedToEdit, setSlideClickedToEdit] = useState();
  const [showEditModal, setShowEditModal] = useState(false);
  const [reDraw, setReDraw] = useState(false);

  const showToEditHandler = event => {
    setShowID(event);
    // console.log("Builder - showToEditHandler");
  };

  return (
    <div className="text-light">
      <p>
        <p>
          <Link
            to={{
              pathname: "/",
            }}
          >
            <span role="img" aria-label="home">
              🏡
            </span>
          </Link>
            <span role="img" aria-label="home">
            |  ShowBuilder 🏗
            </span>
        </p>
      </p>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-1">
            <AddShow />
            <Shows clicked={showToEditHandler} reDraw={[reDraw, setReDraw]} />
          </div>
          {showID ? (
            <>
              <div className="col-md-6">
                <div className="container sticky-top">
                  <AddSlide
                    showID={showID}
                    slideClickedToEdit={[
                      slideClickedToEdit,
                      setSlideClickedToEdit
                    ]}
                    reDraw={[reDraw, setReDraw]}
                  />
                  <CharacterCreator
                    showID={showID}
                    showEditModal={[showEditModal, setShowEditModal]}
                  />
                </div>
              </div>
              <div className="col-md-5">
                <Slides
                  showID={showID}
                  slideClickedToEdit={[
                    slideClickedToEdit,
                    setSlideClickedToEdit
                  ]}
                  showEditModal={[showEditModal, setShowEditModal]}
                  reDraw={[reDraw, setReDraw]}
                />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Builder;
