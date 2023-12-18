import { OrderType, ProductType, orders, products, serviceState, serviceStateType } from "./store";

export type RootAction =
  | DeleteProductAction
  | DeleteOrderAction
  | AddOrderAction
  | AddProductAction
  | DeleteOrderProductsAction
  | SetModalDefault
  | LoadingAction
  | IsDarkAction
  | SetSearchTerm;




//////////PRODUCT
export type AddProductAction = {
  type: "ADD_PRODUCT";
  orderId: number;
};
export type DeleteProductAction = {
  type: "DELETE_PRODUCT";
  productId: number;
};
export type DeleteOrderProductsAction = {
  type: "DELETE_ORDER_PRODUCTS";
  orderId: number;
};

export const productReducer = (state: ProductType[] = products, action: RootAction): ProductType[] => {
  switch (action.type) {
    case "DELETE_PRODUCT":console.log(action.productId);
      return state.filter((product) => product.id !== action.productId);

    case "DELETE_ORDER_PRODUCTS":
      return state.filter((product) => product.order !== action.orderId);
    default:
      return state;
  }

}

//////////////////////Order reducer
export type DeleteOrderAction = {

  type: "DELETE_ORDER";
  orderId: number;
};
export type AddOrderAction = {
  type: "ADD_ORDER";
  productId: number;
};


export const orderReducer = (state: OrderType[] = orders, action: RootAction): OrderType[] => {
  switch (action.type) {
    case "DELETE_ORDER":
      return  state.filter((order) => order.id !== action.orderId);
    default:
      return state;
  }
}

/////serviceStateReducer

export type SetModalDefault = {
  type: "SET_MODAL";
  popupShow: boolean;
   popupActionType: "";
  popupTitle: "";
  popupText: "";
  popupImage: "";
  popupStatus: undefined;
  popupConfirmId: undefined;
};

export type LoadingAction = {
  type: "LOADING"
};
export type IsDarkAction = {
  type: "CHANGE_THEME";
};
export type SetSearchTerm = {
  type: "SEARCH_TERM";
  searchTerm: string | undefined;
};

export const serviceStateReducer = (state: serviceStateType = serviceState, action: RootAction): serviceStateType=> {
  switch (action.type) {


    case "SET_MODAL":
      return {
        ...state,
        popupShow: action.popupShow,
        popupConfirmId: action.popupConfirmId,
        popupActionType: action.popupActionType,
        popupTitle: action.popupTitle,
        popupText: action.popupText,
        popupImage: action.popupImage,
        popupStatus: action.popupStatus,
      };
    case "LOADING":
      return { ...state, isLoading: true };
    case "CHANGE_THEME":
      return { ...state, dark: !state.dark };
    case "SEARCH_TERM":
      return { ...state, searchTerm: action.searchTerm };

    default:
      return state;
  }

}


