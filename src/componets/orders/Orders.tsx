
import { useSelector } from "react-redux";


import s from "./orders.module.css"
import { OrderType, StoreType } from "../../store";

const OrderTable= () => {
  const orders = useSelector((state: StoreType) => state.orders);

console.log(orders);
  const handleDeleteOrder = (orderId: number) => {

  };

  return (
    <table className={s.table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Date</th>
          <th>Description</th>
          <th>Products</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order: OrderType) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.title}</td>
            <td>{order.date}</td>
            <td>{order.description}</td>
            <td></td>
            <td>
              <button
                className={s.button}
                onClick={() => handleDeleteOrder(order.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
