import React, { useState, useContext, useEffect } from "react";
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

  return (
    <div>
      <p>{JSON.stringify(props)}</p>
      {showID ? 
      <p>{showTitle()}</p>
      // <p>{theWholeShebang}</p>
      : null}
    </div>
  );
}

export default PresenterSlides;
