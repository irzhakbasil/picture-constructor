import React from "react";
import "./PictureBuilderPreviewConstructor.css";

const PictureBuilderPreviewConstructor = props => {
  const fontStyle = {
    position: "absolute",
    left: "50%",
    color: "rgb(126,113,101)",
    textAlign: "center",
    fontFamily: props.font,
    lineHight: "21px",
    transform: "translateX(-50%)"
  };
  const topTextStyle = {
    ...fontStyle,
    fontSize: "16px",
    top: "18px"
  };
  const bottomPrimaryTextStyle = {
    ...fontStyle,
    bottom: "32px",
    width: "100%"
  };
  const bottomSecondaryTextStyle = {
    ...fontStyle,
    bottom: "21px",
    fontSize: "13px"
  };
  return (
    <>
      {props.picture ? (
        <img
          alt=""
          src={require("../../assets/img/pics/" + props.picture.picture)}
          className="picture-builder__picture "
          style={{ zIndex: 0 }}
        />
      ) : null}
      {props.frame ? (
        <img
          alt=""
          src={require("../../assets/img/borders/" + props.frame.border)}
          className="picture-builder__frame"
        />
      ) : null}
      <p style={topTextStyle}>{props.text.header}</p>
      <p style={bottomPrimaryTextStyle}>{props.text.signature}</p>
      <p style={bottomSecondaryTextStyle}>{props.text.date}</p>
    </>
  );
};

export default PictureBuilderPreviewConstructor;
