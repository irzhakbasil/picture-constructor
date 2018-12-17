import React, { Component } from "react";
import "./PictureBuilderPreview.css";
import PictureBuilderPreviewInfo from "../../components/PictureBuilderPreviewInfo/PictureBuilderPreviewInfo";
import PictureBuilderPreviewConstructor from "../../components/PictureBuilderPreviewConstructor/PictureBuilderPreviewConstructor";
import { connect } from "react-redux";

class PictureBuilderPreview extends Component {
  render() {
    return (
      <div className="picture-builder-previev__container">
        <PictureBuilderPreviewInfo
          frame={this.props.frame}
          picture={this.props.picture}
          selectedFingerprints={this.props.selectedFingerprints}
        />
        <div className="construction-result">
          <PictureBuilderPreviewConstructor
            frame={this.props.frame}
            picture={this.props.picture}
            text={this.props.text}
            font={this.props.font}
          />
        </div>
        <div />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    picture: state.pictureBuilder.picture,
    frame: state.pictureBuilder.frame,
    text: state.pictureBuilder.text,
    font: state.pictureBuilder.font,
    selectedFingerprints: state.pictureBuilder.fingerprints
  };
};

export default connect(mapStateToProps)(PictureBuilderPreview);
