import React from "react";
import "./Square.css";

function Square({ text, onClick }) {
    console.log(text)
    return <div onClick={onClick} className="square">{text}</div>;
}

export default Square;
