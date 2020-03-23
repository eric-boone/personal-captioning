import React, { useState } from "react";
import { GithubPicker } from "react-color";

function ColorPicker(props) {
  // const [selectedColor, setSelectedColor] = props.characterColor;
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  // const [color, setColor] = useState("");
  const [color, setColor] = props.characterColor;

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleChange = color => {
    setColor(color.hex);
    handleClick();
  };

  const selectedColorStyle = {
    backgroundColor: color
  };

  return (
    <>
      <div className="btn btn-link color-picker" onClick={handleClick}>
        <div className="row">
          <div className="color-picker-icon">
            <p>
              <span role="img" aria-label="palate">
                🎨
              </span>
            </p>
          </div>
          <div
            className="col-sm selected-color-box"
            style={selectedColorStyle}
          ></div>
        </div>
      </div>
      {displayColorPicker ? (
        <div>
          <GithubPicker
            color={color}
            onChange={handleChange}
            colors={[
              "#ffffff",
              "#ffccff",
              "#ffcccc",
              "#ffffcc",
              "#ccffcc",
              "#ccffff",
              "#ccccff",
              "#ff99ff",
              "#ff99cc",
              "#ff9999",
              "#ffcc99",
              "#ffff99",
              "#ccff99",
              "#99ff99",
              "#99ffcc",
              "#66ffff",
              "#66ccff",
              "#99ccff",
              "#cc99ff",
              "#ff66ff",
              "#ff66cc",
              "#ff6699",
              "#ff6666",
              "#ff9966",
              "#ffcc66",
              "#ffff66",
              "#ccff66",
              "#99ff66",
              "#66ff66",
              "#66ff99",
              "#66ffcc",
              "#00ffff",
              "#33ccff",
              "#3399ff",
              "#6699ff",
              "#9999ff",
              "#cc66ff",
              "#ff00ff",
              "#ff33cc",
              "#ff3399",
              "#ff0066",
              "#ff5050",
              "#ff6600",
              "#ff9933",
              "#ffcc00",
              "#ffff00",
              "#ccff33",
              "#99ff33",
              "#66ff33",
              "#33cc33",
              "#00ff00",
              "#00ff99",
              "#00ffcc",
              "#33cccc",
              "#00ccff",
              "#0099ff",
              "#0066ff",
              "#3366ff",
              "#6666ff",
              "#9966ff",
              "#cc33ff"
            ]}
          />
        </div>
      ) : null}
    </>
  );
}

export default ColorPicker;
