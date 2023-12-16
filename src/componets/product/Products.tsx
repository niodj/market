import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductType, StoreType } from "../../store";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Trash } from 'react-bootstrap-icons';
import s from "./Products.module.css";

import Button from "react-bootstrap/Button";
import { Popup } from "../universalPopup/Popup";

export const Products = (props: any) => {
  const dispatch = useDispatch();
  const products = useSelector((state: StoreType) => state.product);
  const serviceState = useSelector((state: StoreType) => state.serviceState);

  const [filterType, setFilterType] = useState<string>();
  const [filterSpecification, setFilterSpecification] = useState<string>();
  const orders = useSelector((state: StoreType) => state.orders);

  const handleModalDeleteProduct = (productId: number) => {
    dispatch({
      type: "SET_POPUP_ACTION_TYPE",
      popupActionType: "DELETE_PRODUCT",
    });

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
      type: "SET_POPUP_STATUS",
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

  return (
    <div className={s.wrapperProducts}>
      <Popup
        popupStatus={serviceState.popupStatus}
        popupImage={serviceState.popupImage}
        title={serviceState.popupTitle}
        showPopup={serviceState.popupShow}
        onHide={() => onModalReject()}
        onConfirm={() => modalConfirmed()}
      />
      <div className={s.titleAndfilters}>
        <span className={s.productTableTitle}>
          Products / {products.length}
        </span>
        <span className={s.filterSection}>
          <label className={s.filterLabel}>Type:</label>
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
          <label className={s.filterLabel}>Specification:</label>
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
        <div className={s.productsTable}>
          {filteredProducts.map((product) => (
            <div className={s.propductRow} key={product.id}>
              <div className={s.cellMArkStatus}>
                {product.status ? (
                  <div className={s.markTrueStatus} />
                ) : (
                  <div className={s.markFalseStatus} />
                )}
              </div>
              <div className={s.cellPhoto}>
                <img src={product.photo} className={s.photo} alt='product' />
              </div>
              <div className={s.cellProductName}>
                <div className={s.productName}>{product.title}</div>
                <div className={s.SN}>SN:{product.serialNumber}</div>
              </div>

              <div className={s.cellStatusText}>
                {product.status ? (
                  <div className={s.statusTextTrue}>Free</div>
                ) : (
                  <div className={s.statusTextFalse}>On repair</div>
                )}
              </div>
              <div className={s.cellGuaranteeDate}>
                <div>
                  <div>from</div>
                  <div>to</div>
                </div>

                <div>
                  <div className={s.garantDateNumbers}>
                    {product.guarantee.start
                      .split(" ")[0]
                      .split("-")
                      .reverse()
                      .slice(0, 3)
                      .join(" / ")}
                  </div>

                  <div className={s.garantDateNumbers}>
                    {product.guarantee.end
                      .split(" ")[0]
                      .split("-")
                      .reverse()
                      .slice(0, 3)
                      .join(" / ")}
                  </div>
                </div>
              </div>
              <div className={s.cellIsNew}>
                {product.isNew === 1 ? <div>New</div> : <div>Used</div>}
              </div>

              <div className={s.cellPrice}>
                {product.price.map((price, index) => (
                  <div
                    key={index}
                    className={price.isDefault ? s.defaultPrice : ""}
                  >
                    {price.symbol === "USD"
                      ? price.value.toLocaleString()
                      : price.value.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                    {price.symbol === "USD" ? (
                      <span> $</span>
                    ) : (
                      <span>
                        <span> </span>
                        {price.symbol}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className={s.cellSpecification}>
                <div>
                  <div>Order #{product.order}</div>
                </div>
                {product.specification}
              </div>
              <div className={s.cellManager}>
                <div>
                  {orders.find((order) => order.id === product.order)
                    ?.manager ? (
                    <div>
                      {
                        orders.find((order) => order.id === product.order)
                          ?.manager
                      }
                    </div>
                  ) : (
                    <div>-</div>
                  )}
                </div>
              </div>
              <div className={s.cellOrderTitle}>
                {
                  orders.find((order) => order.id === product.order)
                    ?.description
                }
              </div>
              <div className={s.cellOrderDate}>
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
                    product.date.split(" ")[0].split("-").reverse().join(" / ")}
                </div>
              </div>

              <div className={s.cellDeleteIcon}>
                <Trash  onClick={() => handleModalDeleteProduct(product.id)}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
