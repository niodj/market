import { OrderType, ProductType, orders, products } from "./store";



export type RootAction =
  | DeleteProductAction
  | DeleteOrderAction
  | AddOrderAction
  | AddProductAction
  | DeleteOrderProductsAction;

export type DeleteProductAction = {
  type: "DELETE_PRODUCT";
  productId: number;
};
export type DeleteOrderProductsAction = {
  type: "DELETE_ORDER_PRODUCTS";
  orderId: number;
};

export type AddProductAction = {
  type: "ADD_PRODUCT";
  orderId: number;
};

export const productReducer = (state: ProductType[] = products, action: RootAction): ProductType[] => {
  switch (action.type) {
    case "DELETE_PRODUCT":
      return state.filter((product) => product.id !== action.productId);

    case "DELETE_ORDER_PRODUCTS": console.log(action);
      return state.filter((product) => product.order !== action.orderId);
    case "ADD_PRODUCT":
      return [
        {
          ...state[0],
          order: action.orderId,
          title: "new product (copy first row propduct table)",
          id: (state[state.length - 1].id += 1),
        },
        ...state,
      ];

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
    case "ADD_ORDER":
      return [
        { ...state[0], id: state[state.length-1].id += 101, description: "New order" },
        ...state,
      ];


    default:
      return state;
  }
}



