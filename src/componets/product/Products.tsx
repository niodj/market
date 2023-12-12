// Products.tsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductType, StoreType } from "../../store";
import s from "./Products.module.css"
import { type } from "os";

export const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector<StoreType, ProductType[]>(
    (state) => state.product
  );

  const [filterType, setFilterType] = useState<string>("");
  const [filterSpecification, setFilterSpecification] = useState<string>("");

  const types = Array.from(new Set(products.map((product) => product.type)));
  const specifications = Array.from(
    new Set(products.map((product) => product.specification))
  );

  const filteredProducts = products.filter((product) => {
    const typeMatch = !filterType || product.type === filterType;
    const specificationMatch =
      !filterSpecification || product.specification === filterSpecification;

    return typeMatch && specificationMatch;
  });

const handleDelete = (id: number) => {
  dispatch({ type: "DELETE_PRODUCT", payload: id });
};


  return (
    <div className={s.productsContainer}>
      <h1>Products</h1>
      <div className={s.filterSection}>
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
      </div>
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
      <div className={s.productsTableWrapper}>
        <table className={s.productsTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Serial Number</th>
              <th>Is New</th>
              <th>Photo</th>
              <th>Title</th>
              <th>Type</th>
              <th>Specification</th>
              <th>Guarantee Start</th>
              <th>Guarantee End</th>
              <th>Price</th>
              <th>Order</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.serialNumber}</td>
                <td>{product.isNew}</td>
                <td>{product.photo}</td>
                <td>{product.title}</td>
                <td>{product.type}</td>
                <td>{product.specification}</td>
                <td>{product.guarantee.start}</td>
                <td>{product.guarantee.end}</td>
                <td>
                  {product.price.map((price, index) => (
                    <div key={index}>
                      {price.value} {price.symbol}{" "}
                      {price.isDefault ? "(Default)" : ""}
                    </div>
                  ))}
                </td>
                <td>{product.order}</td>
                <td>{product.date}</td>
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


