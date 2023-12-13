
import { useSelector, useDispatch } from "react-redux";


import s from "./orders.module.css"
import { OrderType, StoreType } from "../../store";

export const Orders = () => {
  const orders = useSelector((state: StoreType) => state.orders);
  const dispatch = useDispatch();


  const handleDeleteOrder = (orderId: number) => {
    dispatch({ type: 'DELETE_ORDER', orderId })

  };

  return (
    <div>
      <h2>Orders / { orders.length}</h2>
      <div>
        <button onClick={()=>dispatch({type:'ADD_Order'})}>Add order</button>
      </div>

      <table className={s.table}>
        <tbody>
          {orders.map((order: OrderType) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.title}</td>
              <td>{order.date}</td>
              <td>{order.description}</td>
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
    </div>
  );
};