import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import s from "./orders.module.css";
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
    <div className={s.wrapper}>
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

      <div className={s.ordersTableWrapper}>
        <table
          className={`${currOrderId ? s.halfWidthTable : s.fullWidthTable}`}
        >
          <tbody>
            {orders
              .map((order: OrderType) => (
                <tr className={s.cellhalfWidthOrderRow} key={order.id}>
                  {currOrderId ? (
                    ""
                  ) : (
                    <td className={s.halfWidthOrderDescripton}>
                      {order.title}
                    </td>
                  )}

                  <td className={s.cellShowBtnAndProdutc}>
                    <div>
                      <FiList
                        className={s.showProductBtn}
                        onClick={() => setCurrOrderId(order.id)}
                      />
                    </div>
                    <div className={s.amountAndProductWrapper}>
                      <div className={s.amountProductTitle}>
                        {
                          products.filter(
                            (product) => product.order === order.id
                          ).length
                        }
                      </div>

                      <div className={s.titProduct}>products</div>
                    </div>
                  </td>

                  <td className={s.cellHalfDate}>
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
                  </td>
                  {currOrderId ? (
                    ""
                  ) : (
                    <>
                      <td className={s.cellPrice}>
                        <div>
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
                      </td>
                    </>
                  )}
                  {currOrderId ? (
                    <td
                      className={`${
                        order.id === currOrderId ? s.arrowWrapper : ""
                      }`}
                    >
                      <div
                        className={s.arrowBtn}
                        onClick={() => setCurrOrderId(order.id)}
                      >
                        <MdOutlineArrowForwardIos
                          className={s.arrowBtn}
                        ></MdOutlineArrowForwardIos>
                      </div>
                    </td>
                  ) : (
                    <td className={s.cellDeleteIcon}>
                      <Trash
                        className={s.delBtn}
                        onClick={() => {
                          setSDelOrederPopup(true);
                          setCurrOrderId(order.id);
                        }}
                        ////////////////////////////
                      ></Trash>
                    </td>
                  )}
                </tr>
              ))
              .reverse()}
          </tbody>
        </table>

        {currOrderId ? (
          <div className={s.childComponentWraper}>
            <div className={s.childOrderDescriptionAndCloseBtn}>
              {" "}
              <div className={s.closeProductBtn}>
                <IoCloseCircleOutline
                  onClick={() => setCurrOrderId(undefined)}
                />
              </div>
            </div>
            <div className={s.fullWidthOrderDescripton}>
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
            <table className={s.productsTable}>
              <tbody>
                {filteredProducts
                  .filter((product) => product.order === currOrderId)
                  .map((product) => (
                    <tr key={product.id} className={s.childTableRow}>
                      <td className={s.cellMArkStatus}>
                        {product.status ? (
                          <div className={s.markTrueStatus} />
                        ) : (
                          <div className={s.markFalseStatus} />
                        )}
                      </td>
                      <td className={s.cellPhoto}>
                        <img src={product.photo} className={s.photo}></img>
                      </td>
                      <td className={s.cellProductName}>
                        <div className={s.productName}>{product.title}</div>
                        <div className={s.SN}>s/n:{product.serialNumber}</div>
                      </td>
                      <td className={s.cellStatusText}>
                        {product.status ? (
                          <div className={s.statusTextTrue}>Free</div>
                        ) : (
                          <div className={s.statusTextFalse}>On repear</div>
                        )}
                      </td>
                      <td className={s.cellDeleteIcon}>
                        <Trash
                          className={s.delBtn}
                          onClick={() => {
                            setDelProductPopup(true);
                            setCurrProduct(product);
                          }}
                        ></Trash>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
