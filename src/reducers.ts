import {
  OrderType,
  ProductType,
  orders,
  products,
  serviceState,
  serviceStateType,
} from "./store";

export type RootAction =
  | DeleteProductAction
  | DeleteOrderAction
  | AddOrderAction
  | AddProductAction
  | DeleteOrderProductsAction

  | LoadingAction
  | IsDarkAction
  | SetSearchTerm;

//////////PRODUCT
export type AddProductAction = {
  type: "ADD_PRODUCT";
  serialNumber: number;
  isNew: number;
  photo: string;
  title: string;
  category: string;
  status: boolean;
  specification: string;
  guarStart: string;
  guarEnd: string;
  priceValue: number;
  symbol: string;
  isDefault: number;
  price2Value: number;
  symbol2: string;
  isDefault2: number;
  order: number;
  date: string;
};

export type DeleteProductAction = {
  type: "DELETE_PRODUCT";
  productId: number;
};
export type DeleteOrderProductsAction = {
  type: "DELETE_ORDER_PRODUCTS";
  orderId: number;
};

export const productReducer = (
  state: ProductType[] = products,
  action: RootAction
): ProductType[] => {
  switch (action.type) {
    case "DELETE_PRODUCT":
      return state.filter((product) => product.id !== action.productId);
    case "DELETE_ORDER_PRODUCTS":
      return state.filter((product) => product.order !== action.orderId);
    case "ADD_PRODUCT":console.log(state)
      return state.length > 0
        ? [
            ...state,
            {
              id: state[state.length - 1].id + 1,
              serialNumber: action.serialNumber,
              isNew: action.isNew,
              photo: action.photo,
              title: action.title,
              category: action.category,
              status: action.status,
              specification: action.specification,
              guarantee: {
                start: action.guarStart,
                end: action.guarEnd,
              },
              price: [
                {
                  value: action.priceValue,
                  symbol: action.symbol,
                  isDefault: action.isDefault,
                },
                {
                  value: action.price2Value,
                  symbol: action.symbol2,
                  isDefault: action.isDefault2,
                },
              ],
              order: action.order,
              date: action.date,
            },
          ]
        : [

            {
              id:1,
              serialNumber: action.serialNumber,
              isNew: action.isNew,
              photo: action.photo,
              title: action.title,
              category: action.category,
              status: action.status,
              specification: action.specification,
              guarantee: {
                start: action.guarStart,
                end: action.guarEnd,
              },
              price: [
                {
                  value: action.priceValue,
                  symbol: action.symbol,
                  isDefault: action.isDefault,
                },
                {
                  value: action.price2Value,
                  symbol: action.symbol2,
                  isDefault: action.isDefault2,
                },
              ],
              order: action.order,
              date: action.date,
            },
          ];;
    default:
      return state;
  }
};

//////////////////////Order reducer
export type DeleteOrderAction = {
  type: "DELETE_ORDER";
  orderId: number;
};
export type AddOrderAction = {
  type: "ADD_ORDER";
  orderTitle: string;
  orderDescription: string;
  selectedManager: string;
  date: string;
};

export const orderReducer = (
  state: OrderType[] = orders,
  action: RootAction
): OrderType[] => {
  switch (action.type) {
    case "DELETE_ORDER":
      return state.filter((order) => order.id !== action.orderId);

    case "ADD_ORDER":console.log(state);
      return state.length > 0
        ? [
            ...state,
            {
              id: state[state.length - 1].id + 1,
              title: action.orderTitle,
              manager: action.selectedManager,
              description: action.orderDescription,
              date: action.date,
              products,
            },
          ]
        : [
            {
              id:1,
              title: action.orderTitle,
              manager: action.selectedManager,
              description: action.orderDescription,
              date: action.date,
              products,
            },
          ];
    default:
      return state;
  }
};

/////serviceStateReducer

export type LoadingAction = {
  type: "LOADING";
};
export type IsDarkAction = {
  type: "CHANGE_THEME";
};
export type SetSearchTerm = {
  type: "SEARCH_TERM";
  searchTerm: string | undefined;
};

export const serviceStateReducer = (
  state: serviceStateType = serviceState,
  action: RootAction
): serviceStateType => {
  switch (action.type) {
        case "LOADING":
      return { ...state, isLoading: true };
    case "CHANGE_THEME":
      return { ...state, dark: !state.dark };
    case "SEARCH_TERM":
      return { ...state, searchTerm: action.searchTerm };

    default:
      return state;
  }
};
