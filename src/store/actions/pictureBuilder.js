import * as actionTypes from "./actionTypes";
import axios from "axios";

export const selectPicture = data => {
  return {
    type: actionTypes.PICTURE_SELECTED,
    data: data
  };
};

export const selectFrame = data => {
  return {
    type: actionTypes.FRAME_SELECTED,
    data: data
  };
};

export const updateHeadingText = text => {
  return {
    type: actionTypes.TEXT_HEADING_UPDATED,
    text: text
  };
};
export const updateSignatureText = text => {
  return {
    type: actionTypes.TEXT_SIGNATURE_UPDATED,
    text: text
  };
};
export const updateDateText = text => {
  return {
    type: actionTypes.TEXT_DATE_UPDATED,
    text: text
  };
};

export const changeFont = text => {
  return {
    type: actionTypes.FONT_CHANGED,
    text: text
  };
};

export const selectFingerprint = id => {
  return {
    type: actionTypes.FINGERPRINT_SELECTED,
    id: id
  };
};

export const purchaseEnabled = () => {
  return {
    type: actionTypes.ENABLE_PURCHASE
  };
};
export const purchaseDisbled = () => {
  return {
    type: actionTypes.DISABLE_PURCHASE
  };
};

export const updatePhoneNumber = text => {
  return {
    type: actionTypes.PHONE_NUMBER_UPDATED,
    text: text
  };
};

export const submitOrderStart = () => {
  return {
    type: actionTypes.SUBMIT_ORDER_START
  };
};

export const submitOrderSuccess = () => {
  return {
    type: actionTypes.SUBMIT_ORDER_SUCCESS
  };
};
export const submitOrderError = error => {
  return {
    type: actionTypes.SUBMIT_ORDER_FAILED,
    error: error
  };
};

export const submitOrder = data => {
  return dispatch => {
    dispatch(submitOrderStart()); //using study project database
    axios
      .post(
        "https://react-my-burger-marvin.firebaseio.com/pictureOrders.json/",
        JSON.stringify(data)
      )
      .then(response => {
        dispatch(submitOrderSuccess());
      })
      .catch(error => {
        console.log(error.message);
        dispatch(submitOrderError(error));
      });
  };
};

export const eraceAppData = () => {
  return {
    type: actionTypes.ERACE_APP_DATA
  };
};

export const fixErrorTry = () => {
  return {
    type: actionTypes.FIX_ERROR_TRYHARD_XD
  };
};
