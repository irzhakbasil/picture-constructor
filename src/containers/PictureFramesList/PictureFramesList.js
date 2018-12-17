import React, { Component } from "react";
import framesList from "../../assets/data/frames-list-array";
import PictureFramesListItem from "./PictureFramesListItem/PictureFramesListItem";
import RoutesContent from "../../components/routesContent/routesContent";
import { selectFrame, eraceAppData } from "../../store/actions/pictureBuilder";
import { connect } from "react-redux";

class PictureFramesList extends Component {
  state = {
    activeElement: null
  };

  componentWillMount() {
    if (this.props.purchasedCheck) {
      this.props.onEraceData();
    }
  }
  selectItem = (index, data) => {
    this.setState({
      activeElement: index
    });
    this.props.onSelectFrame(data);
  };

  render() {
    let list = framesList.map((frame, index) => {
      return (
        <PictureFramesListItem
          key={frame.id}
          activeElement={this.state.activeElement}
          click={this.selectItem}
          index={index}
          img={require("../../assets/img/borders/" + frame.border)}
          frame={frame}
        />
      );
    });
    const header = "Рама";
    const paragrahp = `подберите раму, которая подойдет случаю и впишется в интерьер, ведь вы
    же не просто оставляете "пальчики", а создаете предмет декора для дома
    и офиса:`;
    return <RoutesContent header={header} paragrahp={paragrahp} list={list} />;
  }
}

const mapStateToProps = state => {
  return {
    purchasedCheck: state.pictureBuilder.successButton
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSelectFrame: data => dispatch(selectFrame(data)),
    onEraceData: () => dispatch(eraceAppData())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PictureFramesList);
