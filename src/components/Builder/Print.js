import React, { useEffect, useContext, useState, Fragment } from "react";
import { FirebaseContext } from "../../firebase/firebase";
import { Link } from "react-router-dom";

function Print(props) {
  const { firebase } = useContext(FirebaseContext);
  const [show, setShow] = useState(props.history.location.state.showID);
  const [slideNumber, setSlideNumber] = useState();
  const [theWholeShebang, setTheWholeShebang] = useState();
  const [characters, setCharacters] = useState([]);

  const docRef = firebase.db.collection("shows").doc(show);

  useEffect(() => {
    getShow();
    console.log("Print.js - useEffect");
  }, []);

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
            <tr>
              <td rowSpan="3">#{element.slide.slideNumber + 1}</td>
              <td>
                <small className="text-white-50">Line 1</small>
                <br />
                {theCharacterName(element.slide.line1.characterId)}:{" "}
                {element.slide.line1.line}
              </td>
            </tr>
            <tr>
              <td>
                <small className="text-white-50">Line 2</small>
                <br />
                {theCharacterName(element.slide.line2.characterId)}:{" "}
                {element.slide.line2.line}
              </td>
            </tr>
            <tr>
              <td>
                <small className="text-white-50">Line 3</small>
                <br />
                {theCharacterName(element.slide.line3.characterId)}:{" "}
                {element.slide.line3.line}
              </td>
            </tr>
          </Fragment>
        );
      }
      console.log("Print.js - theShow");
    }
    return theShowContainer;
  };

  const theCharacterName = (x) => {
    for(let y = 0; y < characters.length; y++) {
      if (characters[y].id === x) {
        return characters[y].value
      }
    }
  }

  return (
    <div className="text-light print-show">
      <p>
        <Link
          to={{
            pathname: "/",
            state: {
              showID: props.showID
            }
          }}
        >
          <span role="img" aria-label="home">
            🏡
          </span>
        </Link>
        <Link
          to={{
            pathname: "/builder",
            state: {
              showID: props.showID
            }
          }}
        >
          <span role="img" aria-label="home">
            🏗
          </span>
        </Link>
      </p>
      <p className="print-show-title">print {showTitle()}</p>
      <table className="table text-light print-show-table">
        <thead>
          <tr>
            <th>slide#</th>
            <th>Slide Content</th>
          </tr>
        </thead>
        <tbody>{theShow()}</tbody>
      </table>
    </div>
  );
}

export default Print;
