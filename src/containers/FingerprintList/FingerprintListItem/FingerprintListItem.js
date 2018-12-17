import React from "react";
import "./FingerprintListItem.css";

const FingerprintListItem = props => {
  let baseClass = "fingerprint-img-container";
  if (props.selectedFingerprints.indexOf(props.id) !== -1) {
    baseClass = baseClass + " fingerprint-active";
  }
  return (
    <div className={baseClass} onClick={() => props.click(props.id)}>
      <img src={props.img} alt="" />
    </div>
  );
};

export default FingerprintListItem;
