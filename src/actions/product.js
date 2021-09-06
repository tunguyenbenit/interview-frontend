//action-types
import { ActionTypes } from "../constants/ProductType";
import * as services from "../services/product";

export const getProducts = () => {
  services.saveDataLocalStorage();
  return {
    type: ActionTypes.GET_PRODUCTS,
    payload: services.fetchProducts(),
  };
};

export const cancelProduct = () => ({
  type: ActionTypes.CANCEL_PRODUCT,
});

//Booking
export const setOpenBookProduct = () => ({
  type: ActionTypes.OPEN_BOOK_PRODUCT,
});

export const setOpenBookPrice = (data) => ({
  type: ActionTypes.OPEN_BOOK_PRICE,
  payload: data,
});

export const setConfirmBookPrice = (data) => {
  return {
    type: ActionTypes.CONFIRM_BOOK_PRICE,
    payload: services.setBookingPrice(data),
  };
};

export const setCancelBookPrice = () => ({
  type: ActionTypes.CANCEL_BOOK_PRICE,
});

//Returning
export const setOpenReturnProduct = (data) => {
  return {
    type: ActionTypes.OPEN_RETURN_PRODUCT,
    payload: data,
  };
};

export const setOpenReturnPrice = (data) => {
  return {
    type: ActionTypes.OPEN_RETURN_PRICE,
    payload: data,
  };
};

export const setConfirmReturnPrice = (data) => {
  return {
    type: ActionTypes.CONFIRM_RETURN_PRICE,
    payload: services.setReturningPrice(data),
  };
};
