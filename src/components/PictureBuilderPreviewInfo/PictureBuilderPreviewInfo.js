import React, { Component } from "react";
import "./PictureBuilderPreviewInfo.css";

const ColorBox = props => {
  let baseClass = "color-box color-class" + props.colorClass;
  return <div className={baseClass} />;
};

class PictureBuilderPreviewInfo extends Component {
  render() {
    let list = <p>Не выбрано</p>;
    if (this.props.selectedFingerprints.length > 0) {
      list = this.props.selectedFingerprints.map((print, index) => {
        return <ColorBox key={index} colorClass={print} />;
      });
    }
    return (
      <>
        <div className="info-wrapper">
          <span>Изображение:</span>
          <p>{this.props.picture ? this.props.picture.name : "Не выбрано"}</p>
        </div>
        <div className="info-wrapper">
          <span>Рама:</span>
          <p>{this.props.frame ? this.props.frame.name : "Не выбрано"}</p>
        </div>
        <div className="info-wrapper">
          <span>Отпечатки:</span>
          {list}
        </div>
      </>
    );
  }
}

export default PictureBuilderPreviewInfo;
