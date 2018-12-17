import * as actionTypes from "../actions/actionTypes";

const initialState = {
  frame: null,
  picture: null,
  text: {
    header: "",
    signature: "",
    date: ""
  },
  fingerprints: [],
  font: "Ariston",
  totalPrice: 0,
  phoneNumber: "",
  purchasable: false,
  loading: false,
  successButton: false,
  error: null
};

function priceCalc(state, action, keyName) {
  if (!state[keyName]) {
    return state.totalPrice + action.data.price;
  }
  if (state[keyName].name !== action.data.name) {
    return state.totalPrice - state[keyName].price + action.data.price;
  }
  if (state[keyName]) {
    return state.totalPrice;
  }
}

function fingerprintPriceCalc(state, id) {
  let updatedTotalPrice = state.totalPrice;
  if (state.fingerprints.length < 2) {
    return updatedTotalPrice;
  } else if (state.fingerprints.length === 2) {
    if (state.fingerprints.indexOf(id) === -1) {
      updatedTotalPrice = updatedTotalPrice + 10;
    }
  } else if (state.fingerprints.length > 2) {
    if (state.fingerprints.indexOf(id) !== -1) {
      updatedTotalPrice = updatedTotalPrice - 10;
    }
    if (state.fingerprints.indexOf(id) === -1) {
      updatedTotalPrice = updatedTotalPrice + 10;
    }
  }
  return updatedTotalPrice;
}

function fingerprintHolderLogic(oldFingerprints, id) {
  let updatedFingerprints = [];
  if (oldFingerprints.indexOf(id) === -1) {
    updatedFingerprints = oldFingerprints.slice();
    updatedFingerprints.push(id);
    return updatedFingerprints;
  } else {
    updatedFingerprints = oldFingerprints.filter(item => item !== id);
    return updatedFingerprints;
  }
}

const pictureBuilder = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PICTURE_SELECTED:
      return {
        ...state,
        picture: action.data,
        totalPrice: priceCalc(state, action, "picture")
      };
    case actionTypes.FRAME_SELECTED:
      return {
        ...state,
        frame: action.data,
        totalPrice: priceCalc(state, action, "frame")
      };
    case actionTypes.TEXT_HEADING_UPDATED: {
      return {
        ...state,
        text: {
          ...state.text,
          header: action.text
        }
      };
    }
    case actionTypes.TEXT_SIGNATURE_UPDATED: {
      return {
        ...state,
        text: {
          ...state.text,
          signature: action.text
        }
      };
    }
    case actionTypes.TEXT_DATE_UPDATED: {
      return {
        ...state,
        text: {
          ...state.text,
          date: action.text
        }
      };
    }
    case actionTypes.FONT_CHANGED: {
      return {
        ...state,
        font: action.text
      };
    }
    case actionTypes.FINGERPRINT_SELECTED:
      return {
        ...state,
        fingerprints: fingerprintHolderLogic(state.fingerprints, action.id),
        totalPrice: fingerprintPriceCalc(state, action.id)
      };
    case actionTypes.ENABLE_PURCHASE:
      return {
        ...state,
        purchasable: true
      };
    case actionTypes.DISABLE_PURCHASE:
      return {
        ...state,
        purchasable: false
      };
    case actionTypes.PHONE_NUMBER_UPDATED: {
      return {
        ...state,
        phoneNumber: action.text
      };
    }
    case actionTypes.SUBMIT_ORDER_START: {
      return {
        ...state,
        loading: true
      };
    }
    case actionTypes.SUBMIT_ORDER_SUCCESS: {
      return {
        ...state,
        loading: false,
        purchasable: false,
        phoneNumber: "",
        successButton: true
      };
    }
    case actionTypes.SUBMIT_ORDER_FAILED: {
      return {
        ...state,
        error: action.error.message,
        loading: false
      };
    }
    case actionTypes.ERACE_APP_DATA: {
      return initialState;
    }
    case actionTypes.FIX_ERROR_TRYHARD_XD: {
      return {
        ...state,
        loading: false,
        successButton: false,
        error: null
      };
    }
    default:
      return state;
  }
};

export default pictureBuilder;
