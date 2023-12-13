import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import s from "./orders.module.css";
import { OrderType, StoreType } from "../../store";
import { Popup } from "../universalPopup/popup";


export const Orders = () => {
  const orders = useSelector((state: StoreType) => state.orders);
  const dispatch = useDispatch();

  const [showPopup, setShowPopup] = useState(false);
  const [orderId, setOrderId] = useState<number>();

  const handleModal = (orderId:number) => {
    setOrderId(orderId);
    setShowPopup(true);
  };

  const deleteOrder = () => {
    dispatch({ type: "DELETE_ORDER", orderId });
    setShowPopup(false)
  };

  return (
    <div>
      <Popup
        title={`Are you sure you want delete Order №${orderId}`}
        showPopup={showPopup}
        onHide={() => setShowPopup(false)}
        onConfirm={() => deleteOrder()}
      />

      <h2>Orders / {orders.length}</h2>
      <div>
        <button onClick={() => dispatch({ type: "ADD_Order" })}>
          Add order
        </button>
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
                  onClick={() => handleModal(order.id)}
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
