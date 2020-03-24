import React, { useEffect, useContext, useState } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";

import { FirebaseContext } from "../../firebase/firebase";

// const initialCharacterList = [
//   // { value: "blank", label: "blank", color: "none", id: Date.now() - 1 },
//   // { value: "DCPA", label: "DCPA", color: "#ffffff", id: Date.now() }
// ];

function AddSlide(props) {
  const { firebase } = useContext(FirebaseContext);
  const [showTitle, setShowTitle] = useState("");
  const [showTitleError, setShowTitleError] = useState("");
  const [clickedSlide, setClickedSlide] = props.slideClickedToEdit;
  const [slideNumber, setSlideNumber] = useState(0);
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [line3, setLine3] = useState("");
  const [characterList, setCharacterList] = useState();
  const [line1Character, setLine1Character] = useState();
  const [line2Character, setLine2Character] = useState();
  const [line3Character, setLine3Character] = useState();
  const [reDraw, setReDraw] = props.reDraw;
  const [resetSelect, setResetSelect] = useState(false);

  const docRef = firebase.db.collection("shows").doc(props.showID);

  useEffect(() => {
    getCharacterList();
  }, []);

  useEffect(() => {
    getShowTitle(props.showID);
    getNumberOfSlides();
  });

  const getShowTitle = () => {
    docRef.get().then(function(doc) {
      if (doc.exists) {
        let showTitle = doc.data().showTitle;
        setShowTitle(showTitle);
      } else {
        setShowTitleError("Error getting show title");
      }
    });
    // console.log("AddSlide.js - getShowTitle");
  };

  const getNumberOfSlides = () => {
    docRef.get().then(doc => {
      setSlideNumber(doc.data().showSlides.length);
    });

    // console.log("AddSlide.js - getNumberOfSlides");
  };

  const handleAddSlide = e => {
    e.preventDefault();
    docRef.get().then(doc => {
      const previousSlides = doc.data().showSlides;
      const slide = {
        slide: { slideNumber, line1, line2, line3 }
      };
      const updatedSlides = [...previousSlides, slide];
      docRef.update({ showSlides: updatedSlides });
      setReDraw(!reDraw);
    });
    cleanUpInput();
    // console.log("AddSlide.js - handleAddSlide");
  };

  const handleDeleteSlide = e => {
    e.preventDefault();
    docRef.get().then(doc => {
      let previousSlides = doc.data().showSlides;
      let newSlides = previousSlides.filter(x => {
        return x.slide.slideNumber !== clickedSlide - 1;
      });
      for (let i = 0; i < newSlides.length; i++) {
        newSlides[i].slide.slideNumber = i;
      }
      docRef.update({ showSlides: newSlides });
      setReDraw(!reDraw);
    });
    cleanUpInput();
    // console.log("AddSlide.js - handleDeleteSlide");
  };

  const handleEditSlide = e => {
    e.preventDefault();
    docRef.get().then(doc => {
      const previousSlides = doc.data().showSlides;
      const slideEdit = {
        slide: { slideNumber, line1, line2, line3 }
      };
      previousSlides[clickedSlide - 1] = slideEdit;
      for (let i = 0; i < previousSlides.length; i++) {
        previousSlides[i].slide.slideNumber = i;
      }
      docRef.update({ showSlides: previousSlides });
      setReDraw(!reDraw);
    });
    cleanUpInput();
    // console.log("AddSlide.js - handleEditSlide");
  };

  const handleInsertSlide = e => {
    e.preventDefault();
    docRef.get().then(doc => {
      const previousSlides = doc.data().showSlides;
      const newSlide = {
        slide: { slideNumber, line1, line2, line3 }
      };
      const insertHere = clickedSlide;
      previousSlides.splice(insertHere, 0, newSlide);
      for (let i = 0; i < previousSlides.length; i++) {
        previousSlides[i].slide.slideNumber = i;
      }
      docRef.update({ showSlides: previousSlides });
      setReDraw(!reDraw);
    });
    cleanUpInput();
    // console.log("AddSlide.js - handleInsertSlide");
  };

  const getCharacterList = () => {
    docRef.get().then(doc => {
      const previousCharacterList = doc.data().characters;
      setCharacterList(previousCharacterList);
    });
    // console.log("AddSlide.js - getCharacterList");
  };

  const handleCharacterChangeLine1 = selectedOption => {
    setResetSelect(false);
    setLine1Character(selectedOption);
  };

  const handleCharacterChangeLine2 = selectedOption => {
    setResetSelect(false);
    setLine2Character(selectedOption);
  };

  const handleCharacterChangeLine3 = selectedOption => {
    setResetSelect(false);
    setLine3Character(selectedOption);
  };

  const cleanUpInput = () => {
    setSlideNumber(slideNumber + 1);
    setResetSelect(true);
    setLine1Character(null);
    setLine2Character(null);
    setLine3Character(null);
    setLine1("");
    setLine2("");
    setLine3("");
    document.getElementById("add-slide-form").reset();
    // console.log("AddSlide.js - cleanUpInput");
  };

  return (
    <>
      {showTitleError ? (
        <p>{showTitleError}</p>
      ) : (
        <div className="card addSlide text-white mb-3">
          <div
            className="card-header addSlide col align-self-start"
            onClick={() => setClickedSlide(null)}
            style={{ color: "orange" }}
          >
            {/* {JSON.stringify(props.showID)} */}
            {/* {console.log("characterList", characterList)} */}
            <p className="float-left mr-2">{showTitle} </p>
            <p>
              <Link to={{
                pathname: "/print",
                state: {
                  showID: props.showID
                }
              }}>
                <span role="img" aria-label="print">
                  🖨
                </span>
              </Link>
            </p>
            <p className="float-right">
              slide# {clickedSlide ? clickedSlide : slideNumber + 1}
            </p>
          </div>
          <div className="card-body addSlide">
            <form onSubmit={handleAddSlide} id="add-slide-form">
              <div className="input-group input-group-sm mb-3">
                <Select
                  options={characterList}
                  className="input-group-prepend name-picker"
                  onFocus={getCharacterList}
                  onChange={handleCharacterChangeLine1}
                  value={resetSelect ? "" : line1Character}
                />
                <input
                  type="text"
                  className="form-control"
                  autoComplete="off"
                  name="slideNumber1"
                  onChange={e =>
                    setLine1({
                      line: e.target.value,
                      characterId: line1Character.id
                    })
                  }
                />
              </div>
              <div className="input-group input-group-sm mb-3">
                <Select
                  options={characterList}
                  className="input-group-prepend name-picker"
                  onFocus={getCharacterList}
                  onChange={handleCharacterChangeLine2}
                  value={resetSelect ? "" : line2Character}
                />
                <input
                  type="text"
                  className="form-control"
                  autoComplete="off"
                  name="slideNumber2"
                  onChange={e =>
                    setLine2({
                      line: e.target.value,
                      characterId: line2Character.id
                    })
                  }
                />
              </div>
              <div className="input-group input-group-sm mb-3">
                <Select
                  options={characterList}
                  className="input-group-prepend name-picker"
                  onFocus={getCharacterList}
                  onChange={handleCharacterChangeLine3}
                  value={resetSelect ? "" : line3Character}
                />
                <input
                  type="text"
                  className="form-control"
                  autoComplete="off"
                  name="slideNumber3"
                  onChange={e =>
                    setLine3({
                      line: e.target.value,
                      characterId: line3Character.id
                    })
                  }
                />
              </div>
              <button
                type="submit"
                className="btn btn-outline-light btn-sm float-right ml-1"
              >
                Add Slide
              </button>
              <button
                onClick={handleInsertSlide}
                className="btn btn-outline-light btn-sm float-right ml-1"
              >
                Insert slide below
              </button>
              <button
                onClick={handleEditSlide}
                className="btn btn-outline-light btn-sm float-right ml-1"
              >
                Edit
              </button>
              <button
                onClick={handleDeleteSlide}
                className="btn btn-outline-light btn-sm float-right ml-1"
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AddSlide;
