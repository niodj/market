import { RootAction, orderReducer, productReducer, serviceStateReducer } from "./reducers";
import { orders, products, serviceState, serviceStateType } from "./store";

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

test("ADD_PRODUCT action should add a new product to the state", () => {
  const action: RootAction = {
    type: "ADD_PRODUCT",
    serialNumber: 789,
    isNew: 1,
    photo: "path/to/photo3.jpg",
    title: "New Product",
    category: "New Category",
    status: true,
    specification: "High-quality specifications",
    guarStart: "2023-01-01",
    guarEnd: "2025-01-01",
    priceValue: 999.99,
    symbol: "USD",
    isDefault: 1,
    price2Value: 899.99,
    symbol2: "UAH",
    isDefault2: 0,
    order: 3,
    date: "2023-12-20",
  };

  const newState = productReducer(products, action);
  expect(newState).toEqual(
    expect.arrayContaining([
      {
        category: "New Category",
        date: "2023-12-20",
        guarantee: { end: "2025-01-01", start: "2023-01-01" },
        id: expect.any(Number),
        isNew: 1,
        order: 3,
        photo: "path/to/photo3.jpg",
        price: [
          { isDefault: 1, symbol: "USD", value: 999.99 },
          { isDefault: 0, symbol: "UAH", value: 899.99 },
        ],
        serialNumber: 789,
        specification: "High-quality specifications",
        status: true,
        title: "New Product",
      },
    ])
  );
});




    test("Reducer returns current state for unknown action types", () => {
        const action: any = { type: "UNKNOWN_ACTION" };
        const newState = productReducer(products, action);
        expect(newState).toEqual(products);
    });
    test("DELETE_ORDER removes orders with specified order ID", () => {
        const action: RootAction = { type: "DELETE_ORDER", orderId: 1 };
        const newState = orderReducer(orders, action);
        expect(newState.every((order) => order.id !== 1)).toBe(true);
    });



test("should handle ADD_ORDER action", () => {
    const action: RootAction = {
      type: "ADD_ORDER",
      orderTitle: "New Order",
      selectedManager: "John Doe",
      orderDescription: "Description for the new order",
      date: "2023-01-01",
    };
    const newState = orderReducer(orders, action);
    expect.arrayContaining([

      {
        id: expect.any(Number),
        title: "New Order",
        manager: "John Doe",
        description: "Description for the new order",
        date: "2023-01-01",
        products: [],
      },
    ]);
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
})