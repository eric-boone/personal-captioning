import React, { useState, useContext } from "react";

import { FirebaseContext } from "../../firebase/firebase";
import ColorPicker from "./ColorPicker";

const EditCharacter = props => {
  const [editModal, setEditModal] = props.showEditModal;
  const { firebase } = useContext(FirebaseContext);
  const [character, setCharacter] = useState("");
  const [characters, setCharacters] = useState(props.characters);
  const [characterColor, setCharacterColor] = useState("");

  const docRef = firebase.db.collection("shows").doc(props.showID);

  const handleEditCharacter = e => {
    e.preventDefault();
    docRef.get().then(doc => {
      let editCharacter = doc.data().characters[props.clickedCharacter];
      let editedCharacter = {
        color: characterColor,
        id: editCharacter.id,
        value: character,
        label: character
      };
      characters[props.clickedCharacter] = editedCharacter;
      docRef.update({ characters: characters });
      setCharacters(characters);
      setEditModal(false);
    });
    // console.log("EditCharacter.js - handleEditCharacter");
  };

  return (
    <div>
      {editModal ? (
        <div className="card edit-character-modal">
          <div className="card-body">
            {/* {JSON.stringify(props)} */}
            <p>This is some text within a card body.</p>
            <form onSubmit={handleEditCharacter}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  aria-label="Edit Character Name"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="Edit Character Name"
                  autoComplete="off"
                  name="characterCreator"
                  onChange={e => setCharacter(e.target.value)}
                />
                <ColorPicker
                  characterColor={[characterColor, setCharacterColor]}
                />
              </div>
              <button type="submit" className="btn btn-outline-light">
                Save
              </button>
              <button className="btn btn-outline-light ml-1" onClick={() => setEditModal(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EditCharacter;
