import React, { Component } from "react";
import { connect } from "react-redux";
import "./OrderPreviewPage.css";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";

// can make a reusable component with css modules.

class PicturePreview extends Component {
  state = {
    showModal: false,
    validationText: false,
    validationClassName: false
  };

  isNumeric(value) {
    return /^-{0,1}\d+$/.test(value);
  }

  componentDidMount() {
    let isPhoneNumber = this.phoneNumberValidation(this.props.phoneNumber);
    this.checkValidity(
      isPhoneNumber,
      this.props.frame,
      this.props.picture,
      this.props.text.header
    );
  }

  submitOrder = () => {
    let fingerprints =
      this.props.selectedFingerprints.length === 0
        ? "не выбраны"
        : this.props.selectedFingerprints;
    const data = {
      picture: this.props.picture.picture,
      frame: this.props.frame.border,
      text: this.props.text,
      phoneNumber: this.props.phoneNumber.replace(/\s/g, ""),
      fingerprints: fingerprints,
      usrData: navigator.userAgent
    };
    this.props.onOrderSubmit(data);
  };

  toggleModal = () => {
    if (!this.props.frame) return;
    this.setState({
      showModal: !this.state.showModal
    });
  };

  checkValidity = (phone, frame, picture, header) => {
    if (phone && frame && picture && header.length > 0) {
      this.props.onEnablePurchase();
      this.setState({
        validationText: false
      });
    } else if (frame && picture && header.length > 0) {
      this.setState({
        validationText: "Осталось ввести номер телефона!",
        validationClassName: true
      });
    } else
      this.setState({
        validationText: "Не все елементы выбраны!"
      });
  };

  phoneNumberValidation(phoneNumber) {
    let check = this.props.phoneNumber.replace(/\s/g, "");
    return check.length === 10 && this.isNumeric(check);
  }

  onPhoneInputChange = e => {
    this.props.onUpdatePhoneNumber(e.target.value);
    setTimeout(() => {
      let check = this.phoneNumberValidation();
      if (check) {
        this.checkValidity(
          true,
          this.props.frame,
          this.props.picture,
          this.props.text.header
        );
      } else this.props.onDisablePurchase();
    }, 100);
  };

  eraceAppData = () => {
    this.props.onDataErace();
    this.props.history.push("/picture");
  };

  render() {
    let framePreviewForModal = null;
    if (this.props.frame)
      framePreviewForModal = require("../../assets/img/borders/" +
        this.props.frame.preview);

    let picturePlaceholder = (
      <div className="picture-placeholder">
        <h2>Выберите элементы картины</h2>
      </div>
    );
    if (this.props.picture) picturePlaceholder = null;

    const inlineFontStyle = {
      fontFamily: this.props.font
    };

    const validationYellow = {};
    if (this.state.validationClassName) validationYellow.color = "#eeb20c";

    let previewButton = (
      <button
        onClick={this.submitOrder}
        className="checkout-button"
        disabled={!this.props.purchasable}
      >
        ЗАКАЗАТЬ
      </button>
    );

    if (this.props.loading) previewButton = <Spinner />;
    if (this.props.successButton)
      previewButton = (
        <div className="submit-message">
          <p>Ваш заказ успешно обработан, наш менеджер скоро с вами свжется.</p>
          <button className="message-btn" onClick={this.eraceAppData}>
            Новый заказ
          </button>
        </div>
      );
    if (this.props.error) {
      previewButton = (
        <div className="submit-message">
          <p style={{ color: "#f87474" }}>
            {this.props.error + ": Устраните проблему и нажмите 'OK'"}
          </p>
          <button
            onClick={() => this.props.onTryFixError()}
            className="message-btn"
            style={{
              color: "#fff",
              paddingLeft: "25px",
              paddingRight: "25px",
              backgroundColor: "#f87474"
            }}
          >
            ok
          </button>
        </div>
      );
    }

    return (
      <>
        <div className="checkout-wrapper">
          <div className="image-summary-block">
            <div className="img-holder">
              {this.props.picture ? (
                <img
                  alt=""
                  src={require("../../assets/img/pics/" +
                    this.props.picture.picture)}
                />
              ) : null}
            </div>
            <div className="img-holder" onClick={this.toggleModal}>
              {this.props.frame ? (
                <img
                  alt=""
                  src={require("../../assets/img/borders/" +
                    this.props.frame.border)}
                />
              ) : (
                picturePlaceholder
              )}
            </div>
            <p
              className="user-text-holder user-text-holder_header"
              style={inlineFontStyle}
            >
              {this.props.text.header}
            </p>
            <p
              className="user-text-holder user-text-signature"
              style={inlineFontStyle}
            >
              {this.props.text.signature}
            </p>
            <p
              className="user-text-holder user-text-holder_date"
              style={inlineFontStyle}
            >
              {this.props.text.date}
            </p>
          </div>
          <div className="checkout-summary">
            <p>
              Для того, чтобы сделать заказ, вам обязательно нужно выбрать
              изображение, рамку и заголовок.
            </p>
            <p>
              Если вы не выбрали цвета отпечатков, то 2 цвета выберутся
              автоматически.
            </p>
            <p>Для продолжения оставьте свой номер телефона:</p>
            <input
              onChange={this.onPhoneInputChange}
              className="phone-input"
              type="text"
              placeholder="Введите номер телефона"
              value={this.props.phoneNumber}
            />
            <div className="validation-text-holder">
              {this.state.validationText ? (
                <p className="validation-text" style={validationYellow}>
                  {this.state.validationText}
                </p>
              ) : null}
            </div>
            {previewButton}
          </div>
        </div>
        <Modal
          show={this.state.showModal || this.props.border}
          modalClosed={this.toggleModal}
        >
          <img className="modal-img" src={framePreviewForModal} alt="" />
        </Modal>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    picture: state.pictureBuilder.picture,
    frame: state.pictureBuilder.frame,
    text: state.pictureBuilder.text,
    font: state.pictureBuilder.font,
    selectedFingerprints: state.pictureBuilder.fingerprints,
    purchasable: state.pictureBuilder.purchasable,
    phoneNumber: state.pictureBuilder.phoneNumber,
    successButton: state.pictureBuilder.successButton,
    loading: state.pictureBuilder.loading,
    error: state.pictureBuilder.error
  };
};

const MapDispatchToProps = dispatch => {
  return {
    onEnablePurchase: () => dispatch(actions.purchaseEnabled()),
    onDisablePurchase: () => dispatch(actions.purchaseDisbled()),
    onUpdatePhoneNumber: text => dispatch(actions.updatePhoneNumber(text)),
    onOrderSubmit: data => dispatch(actions.submitOrder(data)),
    onDataErace: () => dispatch(actions.eraceAppData()),
    onTryFixError: () => dispatch(actions.fixErrorTry())
  };
};

export default connect(
  mapStateToProps,
  MapDispatchToProps
)(PicturePreview);
