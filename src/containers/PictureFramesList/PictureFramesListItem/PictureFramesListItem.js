import React from "react";
import "./PictureframesListItem.css";

const PictureFramesListItem = props => {
  //
  let baseClass = "picture-img-container";
  let activeClass = " frame-active";

  if (props.activeElement === props.index)
    baseClass = baseClass.concat(activeClass);

  let data = {
    border: props.frame.border,
    name: props.frame.name,
    price: props.frame.price,
    preview: props.frame.preview
  };

  return (
    <div onClick={() => props.click(props.index, data)} className={baseClass}>
      <img src={props.img} alt="" />
    </div>
  );
};

export default PictureFramesListItem;
