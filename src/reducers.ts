import { OrderType, ProductType, orders, products } from "./store";


export type RootAction = DeleteProductAction|DeleteOrderAction;

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

///////////

export type DeleteOrderAction = {

  type: "DELETE_ORDER";
  orderId: number;
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
console.log(action.orderId);
      const filtered = state.filter((order) => order.id !== action.orderId);
      return filtered;

    default:
      return state;
  }
}



