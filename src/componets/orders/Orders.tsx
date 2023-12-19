import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import s from "./orders.module.css";
import { OrderType, StoreType } from "../../store";
import { Popup } from "../popupuniversalConfirm/PopupConfirm";
import Button from "react-bootstrap/Button";
import { IoIosAddCircle } from "react-icons/io";
import { FiList } from "react-icons/fi";
import { Trash } from "react-bootstrap-icons";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { IoCloseCircleOutline } from "react-icons/io5";

export const Orders = (props: any) => {
  const orders = useSelector((state: StoreType) => state.orders);
  const products = useSelector((state: StoreType) => state.product);
  const serviceState = useSelector((state: StoreType) => state.serviceState);
  const dispatch = useDispatch();

  const [showProduct, setShowProduct] = useState<number>();

  const handleModalDeleteOrder = (orderId: number) => {
    dispatch({
      type: "SET_MODAL",
      popupActionType: "DELETE_ORDER",
      popupTitle: `Are you sure you want to delete order?`,
      popupText: `Delete order #${orderId}?`,
      popupShow: true,
      popupConfirmId: orderId,
    });
  };

  const handleModalDeleteProduct = (productId: number) => {
    dispatch({
      type: "SET_MODAL",
      popupActionType: "DELETE_PRODUCT",
      popupTitle: `Are you sure you want to delete product?`,
      popupText: `Delete product ${
        products.find((product) => product.id === productId)?.title
      }  sn: ${
        products.find((product) => product.id === productId)?.serialNumber
      } ?`,
      popupImage: products.find((product) => product.id === productId)?.photo,
      popupStatus: products.find((product) => product.id === productId)?.status,
      popupConfirmId: productId,
      popupShow: true,
    });
  };

  const modalConfirmed = () => {
    if (serviceState.popupActionType === "DELETE_ORDER") {
      dispatch({ type: "DELETE_ORDER", orderId: serviceState.popupConfirmId });
      dispatch({
        type: "DELETE_ORDER_PRODUCTS",
        orderId: serviceState.popupConfirmId,
      });
    }

    if (serviceState.popupActionType === "DELETE_PRODUCT") {
      dispatch({
        type: "DELETE_PRODUCT",
        productId: serviceState.popupConfirmId,
      });
    }
    dispatch({
      type: "SET_MODAL",
      popupShow: false,
      popupActionType: "",
      popupTitle: "",
      popupText: "",
      popupImage: "",
      popupStatus: undefined,
      popupConfirmId: undefined,
    });
  };

  const onModalReject = () => {
    dispatch({
      type: "SET_MODAL",
      popupShow: false,
      popupActionType: "",
      popupTitle: "",
      popupText: "",
      popupImage: "",
      popupStatus: undefined,
      popupConfirmId: undefined,
    });
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
      !serviceState.searchTerm ||
      product.title
        .toLowerCase()
        .includes(serviceState.searchTerm.toLowerCase());
    return typeMatch && specificationMatch && searchMatch;
  });

  return (
    <div className={s.wrapper}>
      <Popup
        popupStatus={serviceState.popupStatus}
        popupImage={serviceState.popupImage}
        title={serviceState.popupTitle}
        text={serviceState.popupText}
        showPopup={serviceState.popupShow}
        onHide={() => onModalReject()}
        onConfirm={() => modalConfirmed()}
      />
      
      <div className={s.addBtnAndOrderTitle}>
        {" "}
        <IoIosAddCircle
          className={s.addOrderBtn}
          onClick={() => dispatch({ type: "ADD_ORDER" })}
        ></IoIosAddCircle>
        {/* ///////Add S to order word////////// */}
        <div className={s.orderTitle}>
          Order{orders.length > 1 ? "s" : ""} / {orders.length}
        </div>
        {/* ///////Add S to order word////////// */}
      </div>

      <div className={s.ordersTableWrapper}>
        {/* ///////choise type table ////////// */}

        {/* ///////Add S to order word////////// */}
        <table
          className={`${showProduct ? s.halfWidthTable : s.fullWidthTable}`}
        >
          <tbody>
            {orders.map((order: OrderType) => (
              <tr className={s.cellhalfWidthOrderRow} key={order.id}>
                {showProduct ? (
                  ""
                ) : (
                  <td className={s.halfWidthOrderDescripton}>
                    {order.description}
                  </td>
                )}

                <td className={s.cellShowBtnAndProdutc}>
                  <div>
                    <FiList
                      className={s.showProductBtn}
                      onClick={() => handlerProductShow(order.id)}
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
                {showProduct ? (
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
                {showProduct ? (
                  <td
                    className={`${
                      order.id === showProduct ? s.arrowWrapper : ""
                    }`}
                  >
                    <div
                      className={s.arrowBtn}
                      onClick={() => handlerProductShow(order.id)}
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
                      onClick={() => handleModalDeleteOrder(order.id)}
                    ></Trash>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {showProduct ? (
          <div className={s.childComponentWraper}>
            <div className={s.childOrderDescriptionAndCloseBtn}>
              {" "}
              <div className={s.closeProductBtn}>
                <IoCloseCircleOutline
                  onClick={() => setShowProduct(undefined)}
                />
              </div>
            </div>
            <div className={s.fullWidthOrderDescripton}>
              {orders.find((order) => order.id === showProduct)?.description}
            </div>{" "}
            <div className={s.addProdutnAndTitle}>
              <IoIosAddCircle
                className={s.addProductBtn}
                onClick={addProduct}
              ></IoIosAddCircle>
              Add propduct
            </div>
            <table className={s.productsTable}>
              <tbody>
                {filteredProducts
                  .filter((product) => product.order === showProduct)
                  .map((product) => (
                    <tr key={product.id} className={s.childTableRow}>
                      <td className={s.cellMArkStatus}>
                        {product.status ? (
                          <div className={s.markTrueStatus} />
                        ) : (
                          <div className={s.markFalseStatus} />
                        )}
                      </td>
                      <td>
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
                          onClick={() => handleModalDeleteProduct(product.id)}
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
