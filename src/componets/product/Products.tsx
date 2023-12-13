// Products.tsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductType, StoreType } from "../../store";
import s from "./Products.module.css"


export const Products = (props:any) => {
  const dispatch = useDispatch();
  const products = useSelector((state: StoreType) => state.product);

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
      !props.searchTerm ||product.title.toLowerCase().includes(props.searchTerm.toLowerCase());
    return typeMatch && specificationMatch && searchMatch;
  });

  const handleDelete = (id: number) => {
    dispatch({ type: "DELETE_PRODUCT", orderId:id });
  };

  return (
    <div className={s.productsContainer}>
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
                  <button onClick={() => handleDelete(product.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


