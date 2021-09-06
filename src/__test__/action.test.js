import * as actions from "../actions/product";
import { ActionTypes } from "../constants/ProductType";
import { initialState, ProductReducer as reducer } from "../reducers/product";
import { products } from "../mocks/ProductData";

// test return (price + status availability)

describe('componentsActions', () => {

  it("getProducts GET_PRODUCTS action", () => {
    const expectedState = {
      products: products,
    };
    const actualState = reducer(initialState, actions.getProducts());
    expect(JSON.stringify(expectedState.products)).toEqual(
      actualState.products
    );
  });

  it('setOpenBookPrice OPEN_BOOK_PRICE action', () => {
    const data = { price: 36000, code: 'm3', dateNumber: 18 }
    expect(
      actions.setOpenBookPrice(data),
    ).toEqual({
      type: ActionTypes.OPEN_BOOK_PRICE,
      payload: data,
    });
  });

  it('setOpenReturnPrice OPEN_RETURN_PRICE action', () => {
    const data = { price: 36000, code: 'm3', dateNumber: 18 }
    expect(
      actions.setOpenReturnPrice(data),
    ).toEqual({
      type: ActionTypes.OPEN_RETURN_PRICE,
      payload: data,
    });
  });

});