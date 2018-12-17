import React, { Component } from "react";
import illustrations from "../../assets/data/illustration-list-array";
import IllustrationListItem from "./IllustratinListItem/IllustratinListItem";
import { connect } from "react-redux";
import {
  selectPicture,
  eraceAppData
} from "../../store/actions/pictureBuilder";
import RoutesContent from "../../components/routesContent/routesContent";

class IllustrationList extends Component {
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
    this.props.onSelectPicture(data);
  };

  render() {
    let list = illustrations.map((illustration, index) => {
      return (
        <IllustrationListItem
          click={this.selectItem}
          activeElement={this.state.activeElement}
          index={index}
          key={illustration.id}
          item={illustration}
          img={require("../../assets/img/pics/" + illustration.picture)}
        />
      );
    });
    const header = "Выберите изображение";
    const paragrahp = `для начала выберите основу, саму картину, на которую вы и гости вашего
    праздника будете наносить отпечатки пальцев с пожеланиями`;
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
    onSelectPicture: data => dispatch(selectPicture(data)),
    onEraceData: () => dispatch(eraceAppData())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IllustrationList);
