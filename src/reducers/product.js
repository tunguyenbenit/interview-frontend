import { ActionTypes } from "../constants/ProductType";

const initialState = {
  loading: false,
  products: [],
  //BOOKING
  openBookProduct: false,
  openBookPrice: false,
  //RETURNING
  openReturnProduct: false,
  openReturnPrice: false,
  bookProductData: null,
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_PRODUCTS: {
      return {
        ...state,
        products: action.payload,
      };
    }
    case ActionTypes.CANCEL_PRODUCT: {
      return {
        ...state,
        openBookProduct: false,
        openBookPrice: false,
        openReturnProduct: false,
        openReturnPrice: false,
      };
    }
    //BOOKING
    case ActionTypes.OPEN_BOOK_PRODUCT: {
      return {
        ...state,
        openBookProduct: !state.openBookProduct,
      };
    }
    case ActionTypes.OPEN_BOOK_PRICE: {
      return {
        ...state,
        openBookPrice: !state.openBookPrice,
        openBookProduct: false,
        bookProductData: action.payload,
      };
    }
    case ActionTypes.CONFIRM_BOOK_PRICE: {
      return {
        ...state,
        openBookProduct: false,
        openBookPrice: false,
        products: action.payload,
      };
    }
    case ActionTypes.CANCEL_BOOK_PRICE: {
      return {
        ...state,
        openBookPrice: false,
        openBookProduct: true,
      };
    }

    //RETURNING
    case ActionTypes.OPEN_RETURN_PRODUCT: {
      return {
        ...state,
        openReturnProduct: !state.openReturnProduct,
      };
    }
    case ActionTypes.OPEN_RETURN_PRICE: {
      return {
        ...state,
        openReturnPrice: !state.openReturnPrice,
        openReturnProduct: false,
        bookProductData: action.payload,
      };
    }
    case ActionTypes.CONFIRM_RETURN_PRICE: {
      return {
        ...state,
        openReturnPrice: false,
        openReturnProduct: false,
        products: action.payload,
      };
    }
    default:
      return state;
  }
};

export { initialState, ProductReducer };
