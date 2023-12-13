import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import s from "./orders.module.css";
import { OrderType, StoreType } from "../../store";
import { Popup } from "../universalPopup/popup";


export const Orders = () => {
  const orders = useSelector((state: StoreType) => state.orders);
  const propducts = useSelector((state: StoreType) => state.product);
  const dispatch = useDispatch();

  const [showPopup, setShowPopup] = useState(false);
  const [orderId, setOrderId] = useState<number>();
  const [showProduct, setShowProduct] = useState<number>()

  const handleModal = (orderId:number) => {
    setOrderId(orderId);
    setShowPopup(true);
  };

  const handlerProductShow = (order:number) => {
    setShowProduct(order);

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
        {/* <button onClick={() => dispatch({ type: "ADD_Order" })}>
          Add order
        </button> */}
      </div>
      <div className={s.ordersAndProducts}>
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
                  <button onClick={() => handlerProductShow(order.id)}>
                    Show/Hide
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          {propducts
            .filter((product) => product.order === showProduct)
            .map((product) => (
              <tr key={product.id}>
                <td>
                  {product.status ? (
                    <div className={s.statusMarkTrue} />
                  ) : (
                    <div className={s.statusMarkFalse} />
                  )}
                </td>
                <td>
                  <img src={product.photo} className={s.photo}></img>
                </td>
                <td>{product.title}</td>
                <td>
                  {product.status ? (
                    <div className={s.statusTextTrue}>Free</div>
                  ) : (
                    <div className={s.statusTextFalse}>On repear</div>
                  )}
                </td>
                <td>{product.type}</td>
                <td>
                  {product.isNew === 1 ? <div>New</div> : <div>Used</div>}
                </td>
                <td>
                  <div>from {product.guarantee.start.split(" ")[0]}</div>
                  <div> to {product.guarantee.end.split(" ")[0]}</div>
                </td>
                <td>{product.specification} </td>

                <td>
                  {product.price.map((price, index) => (
                    <div
                      key={index}
                      className={price.isDefault ? s.defaultPrice : ""}
                    >
                      {price.value} {price.symbol}
                    </div>
                  ))}
                </td>
                <td>{product.order}</td>
                <td>{product.date.split(" ")[0]}</td>
                <td>
                  <button onClick={() => handleModal(product.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </div>
      </div>
    </div>
  );
};
