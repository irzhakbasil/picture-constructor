import React, { Component } from "react";
import fingerprints from "../../assets/data/fingerprint-list-array";
import FingerprintListItem from "./FingerprintListItem/FingerprintListItem";
import RoutesContent from "../../components/routesContent/routesContent";
import { connect } from "react-redux";
import {
  selectFingerprint,
  eraceAppData
} from "../../store/actions/pictureBuilder";

class FingerprintList extends Component {
  componentWillMount() {
    if (this.props.purchasedCheck) {
      this.props.onEraceData();
    }
  }
  render() {
    let list = fingerprints.map(fingerprint => {
      return (
        <FingerprintListItem
          selectedFingerprints={this.props.selectedFingerprints}
          id={fingerprint.id}
          key={fingerprint.id}
          img={require("../../assets/img/fingerPrints/" + fingerprint.name)}
          click={this.props.onSelectFingerprint}
        />
      );
    });
    const header = "Цвет отпечатков";
    const paragrahp = `наконец, подберите самые подходящие цвета красок, с помощью которых вы
    и оставите на картине свой след на память`;
    const warning = "Обратите внимание: более 2-х цветов увеличивают стоимость";
    return (
      <RoutesContent
        header={header}
        paragrahp={paragrahp}
        warning={warning}
        list={list}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedFingerprints: state.pictureBuilder.fingerprints,
    purchasedCheck: state.pictureBuilder.successButton
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSelectFingerprint: id => dispatch(selectFingerprint(id)),
    onEraceData: () => dispatch(eraceAppData())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FingerprintList);
