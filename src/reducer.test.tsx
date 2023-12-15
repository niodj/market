import { RootAction, orderReducer, productReducer, serviceStateReducer } from "./reducers";
import { orders, products, serviceState } from "./store";

describe("Action Creators", () => {


  test("DELETE_PRODUCT action should remove the specified product from the state", () => {
    const action: RootAction = { type: "DELETE_PRODUCT", productId: 1 };
    const newState = productReducer(products, action);
    expect(newState).toHaveLength(products.length - 1);
    expect(newState.some((product) => product.id === 1)).toBe(false);
  });

  test("DELETE_ORDER_PRODUCTS removes products with specified order ID", () => {
    const action: RootAction = {
      type: "DELETE_ORDER_PRODUCTS",
      orderId: 1,
    };
    const newState = productReducer(products, action);
    expect(newState.every((product) => product.order !== 1)).toBe(true);
  });
  test("Reducer returns current state for unknown action types", () => {
    const action:any = { type: "UNKNOWN_ACTION" };
    const newState = productReducer(products, action);
    expect(newState).toEqual(products);
  });
    test("DELETE_ORDER removes orders with specified order ID", () => {
      const action: RootAction = { type: "DELETE_ORDER", orderId: 1 };
      const newState = orderReducer(orders, action);
      expect(newState.every((order) => order.id !== 1)).toBe(true);
    });
test("SET_POPUP_SHOW action updates popupShow", () => {
  const action: RootAction = { type: "SET_POPUP_SHOW", popupShow: true };
  const newState = serviceStateReducer(serviceState, action);
  expect(newState).toEqual({ ...serviceState, popupShow: true });
});

test("SET_POPUP_CONFIRM_ID action updates popupConfirmId", () => {
  const action: RootAction = {
    type: "SET_POPUP_CONFIRM_ID",
    popupConfirmId: 1,
  };
  const newState = serviceStateReducer(serviceState, action);
  expect(newState).toEqual({ ...serviceState, popupConfirmId: 1 });
});

test("SET_POPUP_ACTION_TYPE action updates popupActionType", () => {
  const action: RootAction = {
    type: "SET_POPUP_ACTION_TYPE",
    popupActionType: "edit",
  };
  const newState = serviceStateReducer(serviceState, action);
  expect(newState).toEqual({ ...serviceState, popupActionType: "edit" });
});

test("SET_POPUP_TITLE action updates popupTitle", () => {
  const action: RootAction = {
    type: "SET_POPUP_TITLE",
    popupTitle: "Sample Title",
  };
  const newState = serviceStateReducer(serviceState, action);
  expect(newState).toEqual({ ...serviceState, popupTitle: "Sample Title" });
});

test("SET_POPUP_IMAGE action updates popupImage", () => {
  const action: RootAction = {
    type: "SET_POPUP_IMAGE",
    popupImage: "path/to/image.jpg",
  };
  const newState = serviceStateReducer(serviceState, action);
  expect(newState).toEqual({
    ...serviceState,
    popupImage: "path/to/image.jpg",
  });
});

test("SET_POPUP_STATUS action updates popupStatus", () => {
  const action: RootAction = {
    type: "SET_POPUP_STATUS",
    popupStatus: "success",
  };
  const newState = serviceStateReducer(serviceState, action);
  expect(newState).toEqual({ ...serviceState, popupStatus: "success" });
});

test("LOADING action updates isLoading", () => {
  const action: RootAction = { type: "LOADING" };
  const newState = serviceStateReducer(serviceState, action);
  expect(newState).toEqual({ ...serviceState, isLoading: true });
});

test("CHANGE_THEME action toggles dark mode", () => {
  const action: RootAction = { type: "CHANGE_THEME" };
  const newState = serviceStateReducer(serviceState, action);
  expect(newState).toEqual({ ...serviceState, dark: !serviceState.dark });
});

test("SEARCH_TERM action updates searchTerm", () => {
  const action: RootAction = { type: "SEARCH_TERM", searchTerm: "example" };
  const newState = serviceStateReducer(serviceState, action);
  expect(newState).toEqual({ ...serviceState, searchTerm: "example" });
});






});
