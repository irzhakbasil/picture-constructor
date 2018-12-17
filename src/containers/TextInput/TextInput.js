import React, { Component } from "react";
import "./TextInput.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

export class TextInput extends Component {
  state = {
    activeButton: 0
  };
  componentWillMount() {
    if (this.props.purchasedCheck) {
      this.props.onEraceData();
    }
  }
  componentDidMount() {
    let button = 0;
    if (this.props.font === "DaVinci") button = 1;
    if (this.props.font === "Brody") button = 2;
    this.setState({
      activeButton: button
    });
  }
  buttonUpdater = (font, index) => {
    this.setState({
      activeButton: index
    });
    this.props.onButtonClick(font);
  };

  render() {
    const fontNames = ["Ariston", "DaVinci", "Brody"];
    const buttonList = fontNames.map((font, index) => {
      let baseClass = "font-btn";
      if (this.state.activeButton === index)
        baseClass = baseClass + " btn-active";
      return (
        <span
          key={index}
          className={baseClass}
          onClick={() => this.buttonUpdater(font, index)}
        >
          {font}
        </span>
      );
    });
    return (
      <div>
        <div className="text-wraper">
          <p className="text-title">Заголовок</p>
          <p className="text-text">
            персонализируйте ваше "Дерево пожеланий"; вверху и внизу картины
            есть специальные поля, которые можно заполнить по вашему усмотрению:
            вписать имена виновников торжества, или особые пожелания, добавить
            дату, или логотип компании, если речь идет о корпоративном подарке.
          </p>
          <div className="input-container">
            <input
              onChange={e => this.props.onUpdateHeading(e.target.value)}
              placeholder="Наша Свадьба"
              maxLength="22"
              type="text"
              value={this.props.header}
            />
            <span>Заголовок картины</span>
          </div>
          <div className="input-container">
            <input
              onChange={e => this.props.onUpdateSignature(e.target.value)}
              placeholder="Анастасия и Константин"
              maxLength="36"
              type="text"
              value={this.props.signature}
            />
            <span>Подпись</span>
          </div>
          <div className="input-container">
            <input
              onChange={e => this.props.onUpdateDate(e.target.value)}
              placeholder="29 июля 2015"
              maxLength="26"
              type="text"
              value={this.props.date}
            />
            <span>Дата события</span>
          </div>
          <div className="text-buttons">
            <span className="buttons-header">Шрифт</span>
            {buttonList}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    header: state.pictureBuilder.text.header,
    signature: state.pictureBuilder.text.signature,
    date: state.pictureBuilder.text.date,
    font: state.pictureBuilder.font,
    purchasedCheck: state.pictureBuilder.successButton
  };
};

const mapDispatchToPrps = dispatch => {
  return {
    onButtonClick: font => dispatch(actions.changeFont(font)),
    onUpdateHeading: text => dispatch(actions.updateHeadingText(text)),
    onUpdateSignature: text => dispatch(actions.updateSignatureText(text)),
    onUpdateDate: text => dispatch(actions.updateDateText(text)),
    onEraceData: () => dispatch(actions.eraceAppData())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToPrps
)(TextInput);
