import React, { useState, useEffect, useContext } from "react";

import { FirebaseContext } from "../../firebase/firebase";
import ColorPicker from "./ColorPicker";
import EditCharacter from "./EditCharacter";

function CharacterCreator(props) {
  const { firebase } = useContext(FirebaseContext);
  const [showTitleError] = useState("");
  const [character, setCharacter] = useState("");
  const [characterColor, setCharacterColor] = useState("");
  const [characters, setCharacters] = useState([]);
  const [editModal, setEditModal] = props.showEditModal;
  const [clickedCharacter, setClickedCharacter] = useState({});

  const docRef = firebase.db.collection("shows").doc(props.showID);

  useEffect(() => {
    getCharacters();
    // console.log("CharacterCreator.js - useEffect");
  }, [props.showEditModal]);

  const getCharacters = () => {
    docRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          setCharacters([...doc.data().characters]);
        } else {
          console.log(
            "No such document! - CharacterCreator.js - getCharacters"
          );
        }
      })
      .catch(function(error) {
        console.log("Error getting document: getCharacters", error);
      });
    // console.log("CharacterCreator.js - getCharacters");
  };

  const handleAddCharacter = e => {
    e.preventDefault();
    docRef
      .get()
      .then(doc => {
        let allCharacters = doc.data().characters;
        let newCharacter = {
          color: characterColor,
          id: Date.now(),
          value: character,
          label: character
        };
        let updateCharacters = [...allCharacters, newCharacter];
        docRef.update({ characters: updateCharacters });
        setCharacters(updateCharacters);
      })
      .catch(function(error) {
        console.log("Error getting document: handleAddCharacter", error);
      });
    // console.log("CharacterCreator.js - handleAddCharacter");
  };

  const handleDeleteCharacter = index => {
    docRef
      .get()
      .then(doc => {
        const allCharacters = doc.data().characters;
        const newCharacters = allCharacters.filter(function(x, y) {
          return y !== index;
        });
        docRef.update({ characters: newCharacters });
        setCharacters(newCharacters);
      })
      .catch(function(error) {
        console.log("Error getting document: handleDeleteCharacter", error);
      });
    // console.log("CharacterCreator.js - handleDeleteCharacter");
  };

  const handleEditCharacter = index => {
    setClickedCharacter(index);
    setEditModal(!editModal);
    // console.log("CharacterCreator.js - handleEditCharacter");
  };

  return (
    <>
      {showTitleError ? (
        <p>{showTitleError}</p>
      ) : (
        <div className="card characterCreator text-white">
          <div className="card-header characterCreator col align-self-start">
            <div className="container">
              <div className="row">
                <div className="col-sm-2" style={{ color: "orange" }}>
                  Character
                  <br />
                  Creator
                </div>
                <div className="col-sm-8">
                  <form onSubmit={handleAddCharacter}>
                    <div className="input-group input-group-sm">
                      <button
                        className="input-group-prepend pointer"
                        type="submit"
                      >
                        <span
                          className="input-group-text"
                          id="inputGroup-sizing-sm"
                        >
                          +
                        </span>
                      </button>
                      <input
                        type="text"
                        className="form-control"
                        aria-label="Add Character"
                        aria-describedby="inputGroup-sizing-sm"
                        placeholder="Add Character"
                        autoComplete="off"
                        name="characterCreator"
                        onChange={e => setCharacter(e.target.value)}
                      />
                      <ColorPicker
                        characterColor={[characterColor, setCharacterColor]}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body characterCreator">
            {editModal ? (
              <EditCharacter
                clickedCharacter={clickedCharacter}
                characters={characters}
                showID={props.showID}
                {...props}
              />
            ) : null}
            <table className="table characterCreator">
              <thead style={{ color: "orange" }}>
                <tr>
                  <th>Name</th>
                  <th>Text Color</th>
                </tr>
              </thead>
              <tbody>
                {characters
                  ? characters.map((characters, index) => (
                      <tr key={index}>
                        <td>{characters.value}</td>
                        <td>
                          <span style={{ color: characters.color }}>
                            {characters.color}
                          </span>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-outline-light"
                            onClick={() => handleEditCharacter(index)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-light ml-1"
                            onClick={() => handleDeleteCharacter(index)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default CharacterCreator;
