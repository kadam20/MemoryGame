import React from "react";

export default function Picture(props) {
  return (
    <div
      style={props.done ? { background: "#CCFFCC" } : {}}
      className="picture--card"
      onClick={props.reveal}
    >
      {props.isShown && props.letter}
    </div>
  );
}
