import { applyMiddleware, combineReducers, createStore } from "redux";
import { productReducer } from "./reducer";

//import thunk, { ThunkDispatch } from "redux-thunk";

export type ProductType = {
  id: number;
  serialNumber: number;
  isNew: number;
  photo: string;
  title: string;
  type: string;
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
    photo: "pathToFile.jpg",
    title: "Product 1",
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
    isNew: 1,
    photo: "pathToFile.jpg",
    title: "Product 1",
    type: "Printer",
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

const orders: OrderType[] = [
  {
    id: 1,
    title: "Order 1",
    date: "2017-06-29 12:09:33",
    description: "desc",
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


export const rootReducer = combineReducers({
  product: productReducer,
});

export type StoreType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer); //, applyMiddleware(thunk)

//если надо что то запускать при изменениии стора
store.subscribe(() => {
  const prevState = store.getState()
});

//export type thunkType = ThunkDispatch<StoreType, any, RootAction>;

export default store;
