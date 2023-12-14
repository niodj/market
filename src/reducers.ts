import { OrderType, ProductType, orders, products } from "./store";


export type RootAction = DeleteProductAction | DeleteOrderAction | AddOrderAction;

export type DeleteProductAction = {
  type: "DELETE_PRODUCT";
  productId: number;
};

export const productReducer = (state: ProductType[] = products, action: RootAction): ProductType[] => {
  switch (action.type) {
    case "DELETE_PRODUCT":
      return state.filter((product) => product.id !== action.productId);

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
  productId: number;
};


export const orderReducer = (state: OrderType[] = orders, action: RootAction): OrderType[] => {
  switch (action.type) {
    case "DELETE_ORDER":
      //// this is instead server request)
      for (let i = products.length - 1; i >= 0; i--) {
        if (products[i].order === action.orderId) {
          products.splice(i, 1);
        }
      }
      ////
      const filtered = state.filter((order) => order.id !== action.orderId);

      return filtered;

    case "ADD_ORDER":

      return [state[0],...state ];

    default:
      return state;
  }
}



