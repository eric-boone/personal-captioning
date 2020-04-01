import React, { useState, useContext, useEffect, Fragment } from "react";
import { FirebaseContext } from "../../firebase/firebase";

function PresenterSlides(props) {
  const { firebase } = useContext(FirebaseContext);
  const [showID, setShowID] = useState(props.showID.toString());
  // const [showTitle, setShowTitle] = useState("");
  const [slideNumber, setSlideNumber] = useState();
  const [theWholeShebang, setTheWholeShebang] = useState();
  const [characters, setCharacters] = useState([]);

  const docRef = firebase.db.collection("shows").doc(props.showID);

  useEffect(() => {
    getShow();
    console.log("PresenterSlides.js - useEffect");
  }, [props]);

  const getShow = () => {
    docRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          setSlideNumber(doc.data().showSlides.length);
          setTheWholeShebang({ ...doc.data() });
          setCharacters([...doc.data().characters]);
        } else {
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });

    console.log("Print.js - getShow");
  };

  const showTitle = () => {
    console.log("Print.js - showTitle");
    if (theWholeShebang) {
      return theWholeShebang.showTitle;
    }
  };

  const theShow = () => {
    let theShowContainer = [];
    if (theWholeShebang) {
      for (let x = 0; x < theWholeShebang.showSlides.length; x++) {
        const element = theWholeShebang.showSlides[x];
        console.log("element.slide " + x, element.slide);
        theShowContainer.push(
          <Fragment key={x}>
            <div className="container">
              <div className="row">
                <div className="col-m-4">
                  <p className="text-white-50">
                    Slide#{element.slide.slideNumber + 1}
                  </p>
                  <p>
                    <small className="text-white-50">Line 1</small>
                    <br />
                    {theCharacterName(element.slide.line1.characterId)}:{" "}
                    {element.slide.line1.line}
                  </p>
                  <p>
                    <small className="text-white-50">Line 2</small>
                    <br />
                    {theCharacterName(element.slide.line2.characterId)}:{" "}
                    {element.slide.line2.line}
                  </p>
                  <p>
                    <small className="text-white-50">Line 3</small>
                    <br />
                    {theCharacterName(element.slide.line3.characterId)}:{" "}
                    {element.slide.line3.line}
                  </p>
                </div>
              </div>
            </div>
          </Fragment>
        );
      }
      console.log("Print.js - theShow");
    }
    return theShowContainer;
  };

  const theCharacterName = x => {
    for (let y = 0; y < characters.length; y++) {
      if (characters[y].id === x) {
        return characters[y].value;
      }
    }
  };

  return (
    <div>
      <p>{JSON.stringify(props)}</p>
      {showID ? (
        <>
          <p>{showTitle()}</p>
          <div>{theShow()}</div>
        </>
      ) : null}
    </div>
  );
}

export default PresenterSlides;
