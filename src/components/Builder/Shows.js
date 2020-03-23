import React, { useContext, useState, useEffect } from "react";
import FirebaseContext from "../../firebase/context";

function Shows(props) {
  const { firebase } = useContext(FirebaseContext);
  const [shows, setShows] = useState([]);

  const unsubscribe = firebase.db.collection("shows").onSnapshot(function() {});

  useEffect(() => {
    getShows();
    // console.log("Shows.js - useEffect");
  }, []);

  const getShows = () => {
    firebase.db.collection("shows").onSnapshot(handleSnapshot);
    // unsubscribe();
    // console.log("Shows.js - getShows");
  };

  const handleSnapshot = snapshot => {
    const shows = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });
    setShows(shows);
    // console.log("Shows.js - handleSnapshot");
  };

  return (
    <div className="text-light">
      <p>Shows</p>
      {/* <p>{JSON.stringify(props)}</p> */}
      {shows.map(show => (
        <div key={show.id}>
          <button
            value={show.id}
            onClick={() => {
              props.clicked(show.id);
            }}
            className="btn btn-outline-warning mb-1"
          >
            {show.showTitle}
          </button>
          <br />
        </div>
      ))}
    </div>
  );
}

export default Shows;
