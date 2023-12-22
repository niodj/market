import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import s from "./orders.module.scss";
import { OrderType, ProductType, StoreType } from "../../store";

import { IoIosAddCircle } from "react-icons/io";
import { FiList } from "react-icons/fi";
import { Trash } from "react-bootstrap-icons";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { IoCloseCircleOutline } from "react-icons/io5";
import { PopupAddProduct } from "../popupAddProduct/PopupAddProduct";
import { PopupAddOrder } from "../popupAddOrder/popupAddOrder";
import { PopupOrderDeleteConfirm } from "../popupOrderDeleteConfirm/PopupOrderDeleteConfirm";
import { PopupProductDeleteConfirm } from "../popupProductDeleteConfirm/PopupProductDeleteConfirm";

export const Orders = () => {
  const orders = useSelector((state: StoreType) => state.orders);
  const products = useSelector((state: StoreType) => state.product);
  const serviceState = useSelector((state: StoreType) => state.serviceState);
  const dispatch = useDispatch();

  ///////////POPUP STATE/////
  const [showDelOrderPopup, setSDelOrederPopup] = useState(false);
  const [showDelProductPopup, setDelProductPopup] = useState(false);
  const [currOrderId, setCurrOrderId] = useState<number | undefined>();
  const [currProduct, setCurrProduct] = useState<ProductType | undefined>();
  ///////////POPUP STATE/////

  //////////ORDER DELETING
  const orderDeleteConfirmed = () => {
    dispatch({ type: "DELETE_ORDER", orderId: currOrderId });
    dispatch({
      type: "DELETE_ORDER_PRODUCTS",
      orderId: currOrderId,
    });
    setSDelOrederPopup(false);
  };

  const onConfirDelOrderReject = () => {
    setSDelOrederPopup(false);
  };

  //////////PRODUCT DELETING
  const productDeleteConfirmed = () => {
    dispatch({
      type: "DELETE_PRODUCT",
      productId: currProduct?.id,
    });
    setDelProductPopup(false);
  };
  const onConfirDelProductReject = () => {
    setDelProductPopup(false);
  };

  //////////add Order Popup/////////////

  const [addOrderPopapShow, setAddOrderPopupShow] = useState(false);
  const [addProductPopapShow, setAddProductPopupShow] = useState(false);

  const addProduct = () => {
    dispatch({ type: "ADD_PRODUCT", orderId: currOrderId });
  };

  ////////////////////////Filter

  const [filterType, setFilterType] = useState<string>();
  const [filterSpecification, setFilterSpecification] = useState<string>();
  const types = Array.from(
    new Set(products.map((product) => product.category))
  );
  const specifications = Array.from(
    new Set(products.map((product) => product.specification))
  );

  const filteredProducts = products.filter((product) => {
    const typeMatch = !filterType || product.category === filterType;
    const specificationMatch =
      !filterSpecification || product.specification === filterSpecification;
    const searchMatch =
      !serviceState.searchTerm ||
      product.title
        .toLowerCase()
        .includes(serviceState.searchTerm.toLowerCase());
    return typeMatch && specificationMatch && searchMatch;
  });

  return (
    <div className={`${s.oredrsWrapper} ${serviceState.dark ? s.dark : ""}`}>
      <PopupOrderDeleteConfirm
        showPopup={showDelOrderPopup}
        currOrderId={currOrderId}
        onHide={() => onConfirDelOrderReject()}
        onConfirm={() => orderDeleteConfirmed()}
      />
      <PopupProductDeleteConfirm
        currProduct={currProduct}
        showPopup={showDelProductPopup}
        onHide={() => onConfirDelProductReject()}
        onConfirm={() => orderDeleteConfirmed()}
      />
      <PopupAddOrder
        showPopup={addOrderPopapShow}
        onHide={() => setAddOrderPopupShow(false)}
        onConfirm={() => setAddOrderPopupShow(false)}
      />
      <PopupAddProduct
        showPopup={addProductPopapShow}
        onHide={() => setAddProductPopupShow(false)}
        onConfirm={() => productDeleteConfirmed}
        orderId={currOrderId}
      />
      <div className={s.addBtnAndOrderTitle}>
        {" "}
        <IoIosAddCircle
          className={s.addOrderBtn}
          onClick={() => setAddOrderPopupShow(true)}
        ></IoIosAddCircle>
        {/* ///////Add S to order word////////// */}
        <div className={s.orderTitle}>
          Order{orders.length > 1 ? "s" : ""} / {orders.length}
        </div>
        {/* ///////Add S to order word////////// */}
      </div>

      <div className={s.tablesWrapper}>
        <div className={s.ordersTable}>
          {orders
            .map((order: OrderType) => (
              <div
                className={`${currOrderId ? s.halfRows : s.fullRows} ${
                  serviceState.dark ? s.darkR : ""
                }`}
                key={order.id}
              >
                {currOrderId ? (
                  ""
                ) : (
                  <div className={s.orderDescripton}>{order.title}</div>
                )}

                <div className={s.cellShowBtnAndProdutc}>
                  <div>
                    <FiList
                      className={s.showProductBtn}
                      onClick={() => setCurrOrderId(order.id)}
                    />
                  </div>
                  <div className={s.amountAndProductWrapper}>
                    <div className={s.amountProductTitle}>
                      {
                        products.filter((product) => product.order === order.id)
                          .length
                      }
                    </div>

                    <div className={s.titProduct}>products</div>
                  </div>
                </div>

                <div className={s.cellFDate}>
                  <div className={s.smallDate}>
                    {order.date &&
                      order.date
                        .split(" ")[0]
                        .split("-")
                        .reverse()
                        .slice(0, 2)
                        .join(" / ")}
                  </div>

                  <div className={s.bigDate}>
                    {order.date &&
                      new Date(order.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                  </div>
                </div>
                {currOrderId ? (
                  ""
                ) : (
                  <div className={s.cellPrice}>
                    <div className={s.price}>
                      {products
                        .filter((product) => product.order === order.id)
                        .reduce(
                          (acc, product) => (acc += product.price[0].value),
                          0
                        )}{" "}
                      $
                    </div>

                    <div className={s.defaultPrice}>
                      {products
                        .filter((product) => product.order === order.id)
                        .reduce(
                          (acc, product) => (acc += product.price[1].value),
                          0
                        )}{" "}
                      UAH
                    </div>
                  </div>
                )}
                {currOrderId ? (
                  <div
                    className={`${
                      order.id === currOrderId ? s.arrowWrapper : ""
                    }`}
                  >
                    <div onClick={() => setCurrOrderId(order.id)}>
                      <MdOutlineArrowForwardIos
                        className={s.arrowBtn}
                      ></MdOutlineArrowForwardIos>
                    </div>
                  </div>
                ) : (
                  <div className={s.cellDeleteIcon}>
                    <Trash
                      className={s.delBtn}
                      onClick={() => {
                        setSDelOrederPopup(true);
                        setCurrOrderId(order.id);
                      }}
                      ////////////////////////////
                    ></Trash>
                  </div>
                )}
              </div>
            ))
            .reverse()}
        </div>

        <div className={s.productContainer}>
          {currOrderId ? (
            <div
              className={`${s.productWrapper} ${
                serviceState.dark ? s.dark : ""
              }`}
            >
              <div className={s.descriptionAndCloseBtn}>
                {" "}
                <div className={s.closeProductBtn}>
                  <IoCloseCircleOutline
                    onClick={() => setCurrOrderId(undefined)}
                  />
                </div>
              </div>
              <div className={s.prOrderDescripton}>
                <div>
                  {orders.find((order) => order.id === currOrderId)?.title}
                </div>
                {orders.find((order) => order.id === currOrderId)?.description}
              </div>{" "}
              <div className={s.addProdutnAndTitle}>
                <IoIosAddCircle
                  className={s.addProductBtn}
                  onClick={() => setAddProductPopupShow(true)}
                ></IoIosAddCircle>
                Add propduct
              </div>
              <div className={s.productsTable}>
                {filteredProducts
                  .filter((product) => product.order === currOrderId)
                  .map((product) => (
                    <div
                      key={product.id}
                      className={`${s.childTableRow} ${
                        serviceState.dark ? s.dark : ""
                      }`}
                    >
                      <div className={s.cellMArkStatus}>
                        {product.status ? (
                          <div className={s.markTrueStatus} />
                        ) : (
                          <div className={s.markFalseStatus} />
                        )}
                      </div>
                      <div className={s.cellPhoto}>
                        <img src={product.photo} className={s.photo}></img>
                      </div>
                      <div className={s.cellProductName}>
                        <div className={s.productName}>{product.title}</div>
                        <div className={s.SN}>s/n:{product.serialNumber}</div>
                      </div>
                      <div className={s.cellStatusText}>
                        {product.status ? (
                          <div className={s.statusTextTrue}>Free</div>
                        ) : (
                          <div className={s.statusTextFalse}>On repear</div>
                        )}
                      </div>
                      <div className={s.cellDeleteProduct}>
                        <Trash
                          className={s.delBtn}
                          onClick={() => {
                            setDelProductPopup(true);
                            setCurrProduct(product);
                          }}
                        ></Trash>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
