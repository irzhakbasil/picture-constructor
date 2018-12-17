import React from "react";
import "./routesContent.css";

const routesText = props => {
  return (
    <div className="routes-text-wraper">
      <p className="routes-text-title">{props.header}</p>
      <p className="routes-text-text">{props.paragrahp}</p>
      <p className="routes-text-title-two">{props.warning}</p>
      <div className="list-container">{props.list}</div>
    </div>
  );
};

export default routesText;
