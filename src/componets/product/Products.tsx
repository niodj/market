import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductType, StoreType, orders, products } from "../../store";
import "bootstrap/dist/css/bootstrap.min.css";
import { Trash } from "react-bootstrap-icons";
import s from "./Products.module.scss";
import { PopupProductDeleteConfirm } from "../popupProductDeleteConfirm/PopupProductDeleteConfirm";


export const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: StoreType) => state.product);
 const serviceState = useSelector((state: StoreType) => state.serviceState);
  //////////////FILTERS STATE///////////////////
  const [filterType, setFilterType] = useState<string>();
  const [filterSpecification, setFilterSpecification] = useState<string>();


  ////////////////////confirm DELEPE PRODUCT  Popup/////////////
  const [showDelProductPopup, setDelProductPopup] = useState(false);
  const [currProduct, setCurrProduct] = useState<ProductType | undefined>();
  ///////////////////////

  const modalConfirmed = () => {
      dispatch({
        type: "DELETE_PRODUCT",
        productId: currProduct?.id,
      });
    setDelProductPopup(false);
    }
  ///////FILTER////////////////
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
////////////////////////////////////////
  return (
    <div className={`${s.wrapperProducts} ${serviceState.dark ? s.dark : ""}`}>
      <PopupProductDeleteConfirm
        showPopup={showDelProductPopup}
        currProduct={currProduct}
        onHide={() => setDelProductPopup(false)}
        onConfirm={() => modalConfirmed()}
      />
      <div className={s.titleAndfilters}>
        <span className={s.productTableTitle}>
          Products / {products.length}
        </span>

        <span>
          <label className={s.filterLabel}>Type:</label>
          <select
            className={s.filterSection}
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
        <div>
          <label className={s.filterLabel}>Specification:</label>
          <select
            className={s.filterSection}
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
        {filteredProducts.map((product) => (
          <div
            className={`${s.propductRow} ${serviceState.dark ? s.dark : ""}`}
            key={product.id}
          >
            <div className={s.cellMArkStatus}>
              {product.status ? (
                <div className={s.markTrueStatus} />
              ) : (
                <div className={s.markFalseStatus} />
              )}
            </div>
            <div className={s.cellPhoto}>
              <img src={product.photo} className={s.photo} />
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
              <div> {product.specification}</div>
            </div>
            <div className={s.cellManager}>
              <div>Order #{product.order}</div>
              <div>
                {orders.find((order) => order.id === product.order)?.manager ? (
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
              {orders.find((order) => order.id === product.order)?.description}
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
              <Trash
                onClick={() => {
                  setCurrProduct(product);
                  setDelProductPopup(true);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


