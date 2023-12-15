
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductType, StoreType } from "../../store";
import s from "./Products.module.css"
import { Popup } from "../universalPopup/popup";
import Button from "react-bootstrap/Button";

export const Products = (props:any) => {
  const dispatch = useDispatch();
  const products = useSelector((state: StoreType) => state.product);
  const serviceState = useSelector((state: StoreType) => state.serviceState);

  const [filterType, setFilterType] = useState<string>();
  const [filterSpecification, setFilterSpecification] = useState<string>();
 const orders = useSelector((state: StoreType) => state.orders);

const handleModalDeleteProduct = (productId: number) => {
  dispatch({ type: "SET_POPUP_ACTION_TYPE", popupActionType: "DELETE_ORDER" });

  dispatch({
    type: "SET_POPUP_TITLE",
    popupTitle: `Delete product ${
      products.find((product) => product.id === productId)?.title
    }  sn: ${
      products.find((product) => product.id === productId)?.serialNumber
    } ?`,
  });

  dispatch({
    type: "SET_POPUP_IMAGE",
    popupImage: products.find((product) => product.id === productId)?.photo,
  });

dispatch({
  type: "SET_POPUP_STATUS",
  popupStatus: products.find((product) => product.id === productId)?.status,
});

  dispatch({ type: "SET_POPUP_CONFIRM_ID", popupConfirmId: productId });
  dispatch({ type: "SET_POPUP_SHOW", popupShow: true });
};

  const modalConfirmed = () => {
    if (serviceState.popupActionType === "DELETE_ORDER") {
      dispatch({ type: "DELETE_ORDER", orderId: serviceState.popupConfirmId });
      dispatch({
        type: "DELETE_ORDER_PRODUCTS",
        orderId: serviceState.popupConfirmId,
      });
    }

    if (serviceState.popupActionType === "DELETE_PRODUCT")
      dispatch({
        type: "DELETE_PRODUCT",
        productId: serviceState.popupConfirmId,
      });
    dispatch({ type: "SET_POPUP_SHOW", popupShow: false });
    dispatch({
      type: "SET_POPUP_ACTION_TYPE",
      popupActionType: "",
    });

    dispatch({
      type: "SET_POPUP_TITLE",
      popupTitle: "",
    });

    dispatch({
      type: "SET_POPUP_IMAGE",
      popupImage: "",
    });

    dispatch({
      type: "SET_POPUP_STATUS",
      popupStatus: undefined,
    });
    dispatch({ type: "SET_POPUP_CONFIRM_ID", popupConfirmId: undefined });
  };


  const onModalReject = () => {
  dispatch({ type: "SET_POPUP_SHOW", popupShow: false });
    dispatch({
      type: "SET_POPUP_ACTION_TYPE",
      popupActionType: "",
    });

    dispatch({
      type: "SET_POPUP_TITLE",
      popupTitle: "",
    });

    dispatch({
      type: "SET_POPUP_IMAGE",
      popupImage: "",
    });

    dispatch({
      type: "SET_POPUP_IMAGE",
      popupStatus: undefined,
    });
    dispatch({ type: "SET_POPUP_CONFIRM_ID", popupConfirmId: undefined });
  };


  ///////FILTER
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

//////////

  return (
    <div className={s.productsContainer}>
      <Popup
        popupStatus={serviceState.popupStatus}
        popupImage={serviceState.popupImage}
        title={serviceState.popupTitle}
        showPopup={serviceState.popupShow}
        onHide={() => onModalReject()}
        onConfirm={() => modalConfirmed()}
      />
      <div className={s.titleAndfilters}>
        <span>
          <h2>Products / {products.length}</h2>
        </span>
        <span className={s.filterSection}>
          <label>Type:</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value=''>All Types</option>
            {types.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </span>
        <div className={s.filterSection}>
          <label>Specification:</label>
          <select
            value={filterSpecification}
            onChange={(e) => setFilterSpecification(e.target.value)}
          >
            <option value=''>All Specifications</option>
            {specifications.map((specification, index) => (
              <option key={index} value={specification}>
                {specification}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={s.productsTableWrapper}>
        <table className={s.productsTable}>
          <tbody>
            {filteredProducts.map((product) => (
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
                <td className={s.dateCellBig}>
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
                <td className={s.dateCell}>
                  <div className={s.smallDate}>
                    {product.date &&
                      product.date
                        .split(" ")[0]
                        .split("-")
                        .reverse()
                        .slice(0, 2)
                        .join(" / ")}
                  </div>

                  <div>
                    {product.date &&
                      product.date
                        .split(" ")[0]
                        .split("-")
                        .reverse()
                        .join(" / ")}
                  </div>
                </td>
                <td>
                  {
                    orders.find((order) => order.id === product.order)
                      ?.description
                  }
                </td>

                <td>
                  <Button
                    variant='danger'
                    onClick={() => handleModalDeleteProduct(product.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


