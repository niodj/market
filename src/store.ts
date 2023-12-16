import { applyMiddleware, combineReducers, createStore } from "redux";
import { orderReducer, productReducer, serviceStateReducer } from "./reducers";

import { Middleware } from "redux";

//import thunk, { ThunkDispatch } from "redux-thunk";

export type ProductType = {

  id: number;
  serialNumber: number;
  isNew: number;
  photo: string;
  title: string;
  type: string;
  status: boolean;
  specification: string;
  guarantee: {
    start: string;
    end: string;
  };
  price: {
    value: number;
    symbol: string;
    isDefault: number;
  }[];
  order: number;
  date: string;
};

export const products: ProductType[] = [
  {
    id: 1,
    serialNumber: 1234,
    isNew: 1,
    status: true,
    photo: "https://m.media-amazon.com/images/I/51eWw4k9MTL._AC_US40_.jpg",
    title: "Samsung monitor 22",
    type: "Monitors",
    specification: "Specification 1",
    guarantee: {
      start: "2017-06-29 12:09:33",
      end: "2017-06-29 12:09:33",
    },
    price: [
      { value: 100, symbol: "USD", isDefault: 0 },
      { value: 2600, symbol: "UAH", isDefault: 1 },
    ],
    order: 1,
    date: "2017-06-29 12:09:33",
  },
  {
    id: 2,
    serialNumber: 1234,
    isNew: 0,
    photo: "https://lan-star.ru/uploads/posts/2018-03/1521466468_printer.png",
    title: "HP 3110",
    type: "Printer",
    status: false,
    specification: "Specification 2",
    guarantee: {
      start: "2017-06-29 12:09:33",
      end: "2017-06-29 12:09:33",
    },
    price: [
      { value: 100, symbol: "USD", isDefault: 0 },
      { value: 2600, symbol: "UAH", isDefault: 1 },
    ],
    order: 2,
    date: "2017-06-29 12:09:33",
  },

  {
    id: 3,
    serialNumber: 1234,
    isNew: 0,
    photo: "https://lan-star.ru/uploads/posts/2018-03/1521466468_printer.png",
    title: "Canon MF4410",
    type: "Printer",
    status: false,
    specification: "Specification 1",
    guarantee: {
      start: "2017-06-29 12:09:33",
      end: "2017-06-29 12:09:33",
    },
    price: [
      { value: 100, symbol: "USD", isDefault: 0 },
      { value: 2600, symbol: "UAH", isDefault: 1 },
    ],
    order: 2,
    date: "2017-06-29 12:09:33",
  },
  {
    id: 4,
    serialNumber: 1234,
    isNew: 0,
    photo: "https://lan-star.ru/uploads/posts/2018-03/1521466468_printer.png",
    title: "Acer 24",
    type: "Monitors",
    status: false,
    specification: "Specification 2",
    guarantee: {
      start: "2017-06-29 12:09:33",
      end: "2017-06-29 12:09:33",
    },
    price: [
      { value: 100, symbol: "USD", isDefault: 0 },
      { value: 2600, symbol: "UAH", isDefault: 1 },
    ],
    order: 2,
    date: "2017-06-29 12:09:33",
  },
];




export type OrderType = {
  id: number;
  title: string;
  date: string;
  description: string;
  products: ProductType[];
};

export const orders = [
  {
    id: 1,
    title: "Order 1",
    date: "2017-06-29 12:09:33",
    description: "A long long long long very log super long description",
    get products() {
      return products;
    },
  },
  {
    id: 2,
    title: "Order 2",
    date: "2017-06-29 12:09:33",
    description: "desc",
    get products() {
      return products;
    },
  },
  {
    id: 3,
    title: "Order 3",
    date: "2017-06-29 12:09:33",
    description: "desc",
    get products() {
      return products;
    },
  },
];

export type serviceStateType = {
  popupShow: boolean;
  popupConfirmId: number | undefined;
  popupActionType: string | undefined;
  popupTitle: string | undefined;
  popupImage: string | undefined;
  popupStatus: string | undefined;
  searchTerm: string | undefined;
  dark: boolean;
  isLoading: boolean;

};
export const serviceState: serviceStateType = {
  popupShow: false,
  popupConfirmId: undefined,
  popupActionType: "",
  popupTitle: "",
  popupImage: "",
  popupStatus: undefined,
  searchTerm: "",
  dark: true,
  isLoading: false

};

    // Сохраняем состояние в localStorage
export const localStorageMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);
    localStorage.setItem("reduxState", JSON.stringify(store.getState()));
    return result;
  };
const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState") || "{}")
  : {};
//////////////////////////////////////////////////////////

export const rootReducer = combineReducers({
  product: productReducer,
  orders: orderReducer,
  serviceState: serviceStateReducer
});

export type StoreType = ReturnType<typeof rootReducer>;


export const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(localStorageMiddleware)
);


//если надо что то запускать при изменениии стора
store.subscribe(() => {
  const prevState = store.getState()
});

//export type thunkType = ThunkDispatch<StoreType, any, RootAction>;

export default store;
