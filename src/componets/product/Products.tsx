import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductType, StoreType, orders, products } from "../../store";
import "bootstrap/dist/css/bootstrap.min.css";
import { Trash } from "react-bootstrap-icons";
import s from "./Products.module.css";
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
    <div className={s.wrapperProducts}>
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
        <table className={s.productsTable}>
          <tbody>
            {filteredProducts.map((product) => (
              <tr
                className={`${s.propductRow} ${serviceState.dark ? s.dark : ""}`}
                key={product.id}
              >
                <td className={s.cellMArkStatus}>
                  {product.status ? (
                    <div className={s.markTrueStatus} />
                  ) : (
                    <div className={s.markFalseStatus} />
                  )}
                </td>
                <td className={s.cellPhoto}>
                  <img src={product.photo} className={s.photo} />
                </td>
                <td className={s.cellProductName}>
                  <div className={s.productName}>{product.title}</div>
                  <div className={s.SN}>SN:{product.serialNumber}</div>
                </td>

                <td className={s.cellStatusText}>
                  {product.status ? (
                    <div className={s.statusTextTrue}>Free</div>
                  ) : (
                    <div className={s.statusTextFalse}>On repair</div>
                  )}
                </td>
                <td className={s.cellGuaranteeDate}>
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
                </td>
                <td className={s.cellIsNew}>
                  {product.isNew === 1 ? <div>New</div> : <div>Used</div>}
                </td>

                <td className={s.cellPrice}>
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
                </td>

                <td className={s.cellSpecification}>
                  <div> {product.specification}</div>
                </td>
                <td className={s.cellManager}>
                  <div>Order #{product.order}</div>
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
                </td>
                <td className={s.cellOrderTitle}>
                  {
                    orders.find((order) => order.id === product.order)
                      ?.description
                  }
                </td>
                <td className={s.cellOrderDate}>
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

                <td className={s.cellDeleteIcon}>
                  <Trash
                    onClick={() => {
                      setCurrProduct(product);
                      setDelProductPopup(true);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
function dispatch(arg0: { type: string; popupActionType: string; popupTitle: string; popupText: string; popupImage: string; popupStatus: undefined; popupConfirmId: undefined; }) {
  throw new Error("Function not implemented.");
}

