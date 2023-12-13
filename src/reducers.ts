import { OrderType, ProductType, orders, products } from "./store";


export type DeleteProductAction = {
  type: "DELETE_PRODUCT";
  payload: number;
}



export type RootAction = DeleteProductAction ;

export const productReducer = (state: ProductType[] = products, action: RootAction): ProductType[] => {
  switch (action.type) {
    case "DELETE_PRODUCT":
      return state.filter((product) => product.id !== action.payload);

    default:
      return state;
  }
};

///////////

export const orderReducer = (state: OrderType[] = orders): OrderType[] => {

      return state
  }



