import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import s from "./orders.module.css";
import { OrderType, StoreType } from "../../store";
import { Popup } from "../universalPopup/popup";
import Button from "react-bootstrap/Button";

export const Orders = (props: any) => {
  const orders = useSelector((state: StoreType) => state.orders);
  const products = useSelector((state: StoreType) => state.product);
  const dispatch = useDispatch();
  const [showProduct, setShowProduct] = useState<number>();
  //////////popup/////
  const [showPopup, setShowPopup] = useState(false);
  const [confirmId, setconfirmId] = useState<number>();
  const [actionType, setActionType] = useState("");
  const [popupTitle, setPopupTitle] = useState("");

  const handleModalDeleteOrder = (orderId: number) => {
    setActionType('DELETE_ORDER')
    setPopupTitle(`Delete order #${orderId}?`)
    setconfirmId(orderId);
    setShowPopup(true);
  };
  const handleModalDeleteProduct = (productId: number) => {
    setActionType("DELETE_PRODUCT");
    setPopupTitle(`Delete product #${productId}?`);
    setconfirmId(productId);
    setShowPopup(true);
  };

  const modalConfirmed = ()=> {
    if (actionType === "DELETE_ORDER") {
      dispatch({ type: "DELETE_ORDER", orderId: confirmId })
      dispatch({ type: "DELETE_ORDER_PRODUCTS", orderId: confirmId });
    }


    if(actionType==="DELETE_PRODUCT")dispatch({ type: "DELETE_PRODUCT", productId: confirmId });
      setShowPopup(false);
    setActionType("");
    setPopupTitle('');
    setconfirmId(undefined);
  };


  /////End modal

  const handlerProductShow = (order: number) => {
    showProduct === order ? setShowProduct(undefined) : setShowProduct(order);
  };
  const addProduct = () => {
    dispatch({ type: "ADD_PRODUCT", orderId: showProduct });
  };

  ////////////////////////Filter

  const [filterType, setFilterType] = useState<string>();
  const [filterSpecification, setFilterSpecification] = useState<string>();
  const types = Array.from(new Set(products.map((product) => product.type)));
  const specifications = Array.from(
    new Set(products.map((product) => product.specification))
  );

  const filteredProducts = products.filter((product) => {
    const typeMatch = !filterType || product.type === filterType;
    const specificationMatch =
      !filterSpecification || product.specification === filterSpecification;
    const searchMatch =
      !props.searchTerm ||
      product.title.toLowerCase().includes(props.searchTerm.toLowerCase());
    return typeMatch && specificationMatch && searchMatch;
  });

  return (
    <div className={s.wrapper}>
      <Popup
        title={popupTitle}
        showPopup={showPopup}
        onHide={() => setShowPopup(false)}
        onConfirm={() => modalConfirmed()}
      />

      <h2>Orders / {orders.length}</h2>
      <div>
        <Button onClick={() => dispatch({ type: "ADD_ORDER" })}>
          Add order
        </Button>
      </div>
      <div className={s.ordersAndProducts}>
        <div className={`${showProduct ? s.halfWidth : s.fullWidth}`}>
          <table className={s.table}>
            <tbody>
              {orders.map((order: OrderType) => (
                <tr key={order.id}>
                  <td className={s.titleAndshowbnt}>
                    {order.description}
                    <div className={s.ordersAmountInDescription}>
                      (
                      {
                        products.filter((product) => product.order === order.id)
                          .length
                      }{" "}
                      products )
                    </div>
                    <div>
                      <Button onClick={() => handlerProductShow(order.id)}>
                        show/hide
                      </Button>
                    </div>
                  </td>
                  <td>{order.date.split(" ")[0]}</td>
                  <td>
                    <div className={s.defaultPrice}>
                      {products
                        .filter((product) => product.order === order.id)
                        .reduce(
                          (acc, product) => (acc += product.price[1].value),
                          0
                        )}{" "}
                      UAH
                    </div>
                    <div>
                      {products
                        .filter((product) => product.order === order.id)
                        .reduce(
                          (acc, product) => (acc += product.price[0].value),
                          0
                        )}{" "}
                      $
                    </div>
                  </td>
                  <td>
                    <Button
                      variant='danger'
                      className={s.delBtn}
                      onClick={() => handleModalDeleteOrder(order.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showProduct ? (
          <div className={s.productsTableWrapper}>
            <h3>
              {orders.find((order) => order.id === showProduct)?.description}
            </h3>

            <div className={s.addProductBtnInOrder}>
              <Button onClick={addProduct}>Add product</Button>
            </div>

            <table className={s.productsTable}>
              {filteredProducts
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
                    <td>
                      <div>{product.title}</div>
                      <div className={s.sn}>s/n:{product.serialNumber}</div>
                    </td>
                    <td>
                      {product.status ? (
                        <div className={s.statusTextTrue}>Free</div>
                      ) : (
                        <div className={s.statusTextFalse}>On repear</div>
                      )}
                    </td>

                    <td>
                      {" "}
                      <Button
                        variant='danger'
                        onClick={() => handleModalDeleteProduct(product.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
            </table>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
