import React, { useEffect, useContext, useState } from "react";
import { FirebaseContext } from "../../firebase/firebase";

import Slide from "./Slide";

function Slides(props) {
  const { firebase } = useContext(FirebaseContext);
  const [slideNumber, setSlideNumber] = useState(0);
  const [allSlides, setAllSlides] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [showEditModal] = props.showEditModal;
  const[reDraw] = props.reDraw;

  const docRef = firebase.db.collection("shows").doc(props.showID);

  useEffect(() => {
    getShow();
    getCharacters();
    // console.log("Slides.js - useEffect");
  }, [showEditModal, reDraw, props.showID]);

  const getShow = () => {
    docRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          setSlideNumber(doc.data().showSlides.length);
          setAllSlides([...doc.data().showSlides]);
        } else {
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
    // console.log("Slides.js - getShow");
  };

  const getCharacters = () => {
    docRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          setCharacters([...doc.data().characters]);
        } else {
          console.log("No such document! - Slides.js - getCharacters");
        }
      })
      .catch(function(error) {
        console.log("Error getting document: getCharacters", error);
      });
    // console.log("CharacterCreator.js - getCharacters");
  };

  return (
    <div className="card slides text-white mb-3">
      <div className="card-header slides">
        {/* {JSON.stringify(props)} */}
        {/* {JSON.stringify(characters)} */}
        <p style={{ color: "orange" }}>{slideNumber} slides</p>
      </div>
      {allSlides
        ? allSlides.map((allSlides, index) => (
            <div className="card-body slide" key={index}>
              <Slide
                content={allSlides}
                index={index + 1}
                characters={characters}
                {...props}
              />
              {/* {JSON.stringify(props)} */}
            </div>
          ))
        : null}
    </div>
  );
}

export default Slides;
