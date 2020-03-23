import React, { useEffect } from "react";

const Slide = props => {
  const [clickedSlide, setClickedSlide] = props.slideClickedToEdit;

  useEffect(() => {
    classToggler();
    // console.log("Slide.js - useEffect");
  }, [clickedSlide]);

  const classToggler = () => {
    const slideToMessWith = document.getElementById(`slide${props.index}`);
    if (clickedSlide === props.index) {
      slideToMessWith.classList.add("active-slide");
    } else {
      slideToMessWith.classList.remove("active-slide");
    }
    // console.log("Slide.js - classToggler");
  };

  const characterName = characterId => {
    for (let i = 0; i < props.characters.length; i++) {
      if (props.characters[i].id === characterId) {
        return props.characters[i].value;
      }
    }
    // console.log("Slide.js - characterName");
  };

  const lineColor = characterId => {
    for (let i = 0; i < props.characters.length; i++) {
      if (props.characters[i].id === characterId) {
        // console.log("props.characters[i].color", props.characters[i].color);
        return props.characters[i].color;
      }
    }
    // console.log("Slide.js - lineColor");
  };

  return (
    <div
      id={`slide${props.index}`}
      onClick={() => {
        setClickedSlide(props.index);
        classToggler();
      }}
    >
      {/* {JSON.stringify(props)}
      <hr /> */}
      {/* {JSON.stringify(props.characters)} */}
      {/* {bacon(props.content.slide.line1.characterId)} */}
      <p className="card-text float-right">
        <span style={{ color: "orange" }}>
          #{props.content.slide.slideNumber + 1}
        </span>
      </p>
      <p className="card-text">
        <small className="text-white-50">Line 1</small>
        <br />
        {lineColor(props.content.slide.line1.characterId) === "black" ? (
          <>
            <span style={{ display: "none" }}>
              {characterName(props.content.slide.line1.characterId)}:{" "}
            </span>
            <span style={{ color: "white" }}>
              {props.content.slide.line1.line}
            </span>
          </>
        ) : (
          <span
            style={{ color: lineColor(props.content.slide.line1.characterId) }}
          >
            {characterName(props.content.slide.line1.characterId)}:{" "}
            {props.content.slide.line1.line}
          </span>
        )}

        {/* // <span
        //   style={{ color: lineColor(props.content.slide.line1.characterId) }}
        // >
        //   {characterName(props.content.slide.line1.characterId)}:{" "}
        //   {props.content.slide.line1.line}
        // </span> */}
      </p>
      <p className="card-text">
        <small className="text-white-50">Line 2</small>
        <br />
        {lineColor(props.content.slide.line2.characterId) === "black" ? (
          <>
            <span style={{ display: "none" }}>
              {characterName(props.content.slide.line2.characterId)}:{" "}
            </span>
            <span style={{ color: "white" }}>
              {props.content.slide.line2.line}
            </span>
          </>
        ) : (
          <span
            style={{ color: lineColor(props.content.slide.line2.characterId) }}
          >
            {characterName(props.content.slide.line2.characterId)}:{" "}
            {props.content.slide.line2.line}
          </span>
        )}
      </p>
      <p className="card-text">
        <small className="text-white-50">Line 3</small>
        <br />
        {lineColor(props.content.slide.line3.characterId) === "black" ? (
          <>
            <span style={{ display: "none" }}>
              {characterName(props.content.slide.line3.characterId)}:{" "}
            </span>
            <span style={{ color: "white" }}>
              {props.content.slide.line3.line}
            </span>
          </>
        ) : (
          <span
            style={{ color: lineColor(props.content.slide.line3.characterId) }}
          >
            {characterName(props.content.slide.line3.characterId)}:{" "}
            {props.content.slide.line3.line}
          </span>
        )}
      </p>
      {/* <hr /> */}
    </div>
  );
};

export default Slide;
