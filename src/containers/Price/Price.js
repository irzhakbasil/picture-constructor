import React, { Component } from "react";
import "./Price.css";
import { connect } from "react-redux";

class Price extends Component {
  render() {
    return (
      <div className="price">
        <span className="total_text"> Стоимость:</span>
        <span className="sum green">
          {this.props.price === 0 ? "..." : this.props.price}
        </span>
        <span className="total__currency green">грн.</span>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    price: state.pictureBuilder.totalPrice
  };
};

export default connect(mapStateToProps)(Price);
