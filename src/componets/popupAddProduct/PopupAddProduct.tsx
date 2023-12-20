import { Modal, Button, FormControl } from "react-bootstrap";
import s from "./popupAddProduct.module.css";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../../store";
import {  ChangeEvent, useState } from "react";

type PopupPropsType = {
  onHide: () => void;
  showPopup: boolean;
  onConfirm: () => void;
  orderId?: number;
};

export const PopupAddProduct = (props: PopupPropsType) => {
  const products = useSelector((state: StoreType) => state.product);
  const orders = useSelector((state: StoreType) => state.orders);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [SN, setSN] = useState("");
  const [isNew, setIsNew] = useState(1);
  const [photoLink, setPhotoLink] = useState("");
  const [photoLinkError, setPhotoLinkError] = useState(false);
  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState(false);
  const [status, setStatus] = useState(true);
  const [specification, setSpecification] = useState("");
  const [guarStart, setGuarStart] = useState("");
  const [guarFinish, setGuarFinish] = useState("");
  const [priceValue, setPriceValue] = useState('');
  const [priceValueError, setPriceValueError] = useState(false);
  const [symbol, setSymbol] = useState('');

  const [defaultPrice, setDefaultPrice] = useState(1);

  const uniqueCategory = Array.from(
    new Set(products.map((propduct) => propduct.category))
  );

 const uniqueCurrency = Array.from(
   new Set(
     products.flatMap((product) =>
       product.price.map((currency) => currency.symbol)
     )
   )
 );





const handlePriceInput = (e: ChangeEvent<HTMLInputElement>) => {
  const inputValue = e.target.value;
  const dotCount = (inputValue.match(/\./g) || []).length;

  if (dotCount <= 1) {
    const cleanedValue = inputValue
      .replace(/[^\d.]/g, "") // Удаляем все символы, кроме цифр и точек
      .replace(/^00/, "0") // Заменяем два нуля в начале строки на один
      .replace(/^0(\d)/, "$1") // Удаляем 0 в начале строки перед цифрой
      .replace(/^\.+/g, "") // Удаляем точки в начале строки
      .replace(/(\.\d{2})\d*$/, "$1"); // Удостоверяемся, что после точки не больше двух цифр

    setPriceValue(cleanedValue);
  }
};

 const onHide = () => {
    // Reset form state after submitting
    setTitle("");
    setSN("");
    setIsNew(1);
    setPhotoLink("");
    setCategory("");
    setStatus(true);
    setPhotoLink("");
    setSpecification("");
    setPriceValue('0');

    props.onHide();
  };

  const addProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setTitleError(true);
      return;
    }
    if (!category.trim()) {
      setCategoryError(true);
      return;
    }

    if (+priceValue < 0.01) {

      setPriceValueError(true)

      return;
    }


    dispatch({
      type: "ADD_PRODUCT",
      serialNumber: SN,
      isNew: isNew,
      photo: photoLink,
      title: title,
      category: category,
      status: status,
      specification: specification,
      guarStart: guarStart,
      guarEnd:guarFinish,
      priceValue: priceValue,
      symbol: symbol,
      isDefault: 1,

      order: props.orderId,
      date: new Date().toISOString().slice(0, 19).replace("T", " "),
    });

    onHide();
};

  return (
    <div>
      <Modal
        show={props.showPopup}
        onHide={props.onHide}
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className={s.title}>
            New product# {orders[orders.length - 1].id + 1}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className={s.modalWrapper}>
          <form onSubmit={addProduct} className={s.form}>
            <div>
              <label>Product name</label>
              <input
                type='text'
                className={`form-control ${titleError ? "is-invalid" : ""}`}
                value={title}
                onChange={(e) => {
                  setTitle(e.currentTarget.value);
                  setTitleError(false);
                }}
                placeholder='Enter product name'
              />
              {titleError && (
                <div className='invalid-feedback'>Name cannot be empty</div>
              )}
            </div>

            <div>
              <label>Serial number</label>
              <input
                type='text'
                className={`form-control`}
                value={SN}
                onChange={(e) => {
                  setSN(e.currentTarget.value);
                }}
                placeholder='Enter product name'
              />
            </div>

            <div>
              <label>Condition</label>
              <select
                value={isNew}
                onChange={(e) => {
                  setIsNew(+e.target.value);
                }}
                className='form-control'
                defaultValue={1}
              >
                <option value={1}>New</option>
                <option value={1}>New</option>
                <option value={0}>Used</option>
              </select>
            </div>

            <div>
              <label>photoLink:</label>
              <textarea
                className={`form-control ${photoLinkError ? "is-invalid" : ""}`}
                name='photoLink'
                value={photoLink}
                onChange={(e) => {
                  setPhotoLink(e.currentTarget.value);
                  setPhotoLinkError(false);
                }}
                placeholder='Enter description'
              ></textarea>
              {photoLink && <div className='invalid-feedback'>error link</div>}
            </div>

            <div className={categoryError ? s.errorFrame : ""}>
              <label>category</label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setCategoryError(false);
                }}
                className='form-control'
              >
                <option value=''>Select category</option>
                {uniqueCategory.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Condition</label>
              <select
                onChange={(e) => {
                  setStatus(e.target.value === "true");
                }}
                className='form-control'
              >
                <option value={true.toString()}>Free</option>
                <option value={false.toString()}>On Repair</option>
              </select>
            </div>

            <div>
              <label>specification:</label>
              <textarea
                className={`form-control `}
                value={specification}
                onChange={(e) => {
                  setSpecification(e.currentTarget.value);
                }}
                placeholder='Enter description'
              ></textarea>
            </div>

            <div className={s.guaranteeWrapper}>
              <div>
                <label>guarantee date start:</label>
                <input
                  lang='en'
                  type='date'
                  value={guarStart}
                  onChange={(e) => setGuarStart(e.target.value)}
                  className='form-control'
                />
              </div>

              <div>
                <label>guarantee date end:</label>
                <input
                  lang='en'
                  type='date'
                  value={guarFinish}
                  onChange={(e) => setGuarFinish(e.target.value)}
                  className='form-control'
                />
              </div>
            </div>

            <div>
              <label>Price</label>
              <input
                type='text'
                className={`form-control ${
                  priceValueError ? "is-invalid" : ""
                }`}
                value={priceValue}
                onChange={handlePriceInput}
                placeholder='Enter price'
              />
            </div>

            <div>
              <label>Currency</label>
              <select
                value={symbol}
                onChange={(e) => {
                  setSymbol(e.target.value);
                }}
                className='form-control'
                defaultValue={uniqueCurrency[0]}
              >
                {uniqueCurrency.map((curr, index) => (
                  <option key={index} value={curr}>
                    {curr}
                  </option>
                ))}
              </select>
            </div>
            <div className={"form-control"}>
              <label>default currency</label>
              <input
                type='checkbox'
                checked={defaultPrice === 1}
                onChange={() => setDefaultPrice(defaultPrice === 1 ? 0 : 1)}
              />
            </div>





            <div className={s.buttonContainer}>
              <Button type='submit' variant='primary'>
                Submit
              </Button>
              <Button variant='secondary' onClick={() => onHide()}>
                Cancel
              </Button>
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer className={s.modalFooter}></Modal.Footer>
      </Modal>
    </div>
  );
};
