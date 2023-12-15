import { OrderType, ProductType, orders, products, serviceState, serviceStateType } from "./store";

export type RootAction =
  | DeleteProductAction
  | DeleteOrderAction
  | AddOrderAction
  | AddProductAction
  | DeleteOrderProductsAction
  | SetPopupShow
  | SetPopupConfirmId
  | SetPopupActionType
  | SetPopupTitle
  | SetPopupImage
  | SetPopupProductStatus
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
    // case "ADD_PRODUCT": return [
    //     {
    //       ...state[0],
    //       order: action.orderId,
    //       title: "new product (copy first row propduct table)",
    //       id: (state[state.length - 1].id += 1),
    //     },
    //     ...state,
    //   ];

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
    // case "ADD_ORDER": return [...state,{        ...state[state.length - 1],
    //     id: state[state.length - 1].id + 1,
    //     description: "New order",
    //   },
    // ];

    default:
      return state;
  }
}

/////serviceStateReducer

export type SetPopupShow = {
  type: "SET_POPUP_SHOW";
  popupShow: boolean;
};
export type SetPopupConfirmId = {
  type: "SET_POPUP_CONFIRM_ID";
  popupConfirmId: number | undefined;
};

export type SetPopupActionType = {
  type: "SET_POPUP_ACTION_TYPE";
  popupActionType: string | undefined;
}
export type SetPopupTitle = {
  type: "SET_POPUP_TITLE";
  popupTitle: string | undefined;
}
export type SetPopupImage = {
  type: "SET_POPUP_IMAGE";
  popupImage: string | undefined;
};
export type SetPopupProductStatus = {
  type: "SET_POPUP_STATUS";
  popupStatus: string | undefined;
};
export type LoadingAction = {
  type: "LOADING"
};
export type IsDarkAction = {
  type: "CHANGE_THEME"
};
export type SetSearchTerm = {
  type: "SEARCH_TERM";
  searchTerm: string | undefined;
};

export const serviceStateReducer = (state: serviceStateType = serviceState, action: RootAction): serviceStateType=> {
  switch (action.type) {
    case "SET_POPUP_SHOW":
      return { ...state, popupShow: action.popupShow };
    case "SET_POPUP_CONFIRM_ID":
      return { ...state, popupConfirmId: action.popupConfirmId };
    case "SET_POPUP_ACTION_TYPE":
      return { ...state, popupActionType: action.popupActionType };
    case "SET_POPUP_TITLE":
      return { ...state, popupTitle: action.popupTitle };
    case "SET_POPUP_IMAGE":
      return { ...state, popupImage: action.popupImage };
    case "SET_POPUP_STATUS":
      return { ...state, popupStatus: action.popupStatus };
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


