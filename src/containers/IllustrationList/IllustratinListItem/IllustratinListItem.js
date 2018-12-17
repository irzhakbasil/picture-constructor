import React from "react";
import "./IllustratinListItem.css";

const IllustratinListItem = props => {
  let baseClass = "illustration-img-container";
  let activeClass = " active";
  if (props.activeElement === props.index)
    baseClass = baseClass.concat(activeClass);
  let data = {
    picture: props.item.picture,
    name: props.item.name,
    price: props.item.price
  };
  return (
    <div onClick={() => props.click(props.index, data)} className={baseClass}>
      <img src={props.img} alt="" />
    </div>
  );
};

export default IllustratinListItem;
