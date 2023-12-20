import { Modal, Button, FormControl } from "react-bootstrap";
import s from "./popupAddOrder.module.css";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../../store";
import { useState } from "react";

type PopupPropsType = {
  onHide: () => void;
  showPopup: boolean;
  onConfirm: () => void;
};

export const PopupAddOrder = (props: PopupPropsType) => {
  const orders = useSelector((state: StoreType) => state.orders);
  const dispatch = useDispatch();

  const uniqueManagers = Array.from(
    new Set(orders.map((order) => order.manager))
  );
  const [selectedManager, setSelectedManager] = useState("");
  const [orderTitle, setOrderTitle] = useState("");
  const [orderDescription, setOrderDescription] = useState("");
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorDescr, setErrorDescr] = useState(false);
  const [errorManager, setErrorManager] = useState(false);

  const onHide = () => {

      // Reset form state after submitting
      setOrderTitle("");
      setOrderDescription("");
      setSelectedManager("");
      setErrorTitle(false);
      setErrorDescr(false);
      props.onHide();
  };

  const addOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderTitle.trim()) {
      setErrorTitle(true);
      return;
    }


    if (!selectedManager.trim()) {
      setErrorManager(true);
      return;
    }


    if (!orderDescription.trim()) {
      setErrorDescr(true);
      return;
    }

    dispatch({
      type: "ADD_ORDER",
      orderTitle,
      orderDescription,
      selectedManager,
      date: new Date().toISOString().slice(0, 19).replace("T", " "),

    });
 onHide();

  }

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
            New Order# {orders.length?orders[orders.length - 1].id + 1:""}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className={s.modalWrapper}>
          <form onSubmit={addOrder} className={s.form}>
            <div>
              <label htmlFor='title'>Title:</label>
              <FormControl
                type='text'
                className={`form-control ${errorTitle ? "is-invalid" : ""}`}
                id='title'
                name='title'
                value={orderTitle}
                onChange={(e) => {
                  setOrderTitle(e.currentTarget.value);
                  setErrorTitle(false);
                }}
                placeholder='Enter order title'
              />
              {errorTitle && (
                <div className='invalid-feedback'>Title cannot be empty</div>
              )}
            </div>

            <div className={errorManager ? s.errorFrame : ""}>
              <label htmlFor='manager'>Manager:</label>
              <select
                id='manager'
                name='manager'
                value={selectedManager}
                onChange={(e) => {
                  setSelectedManager(e.target.value);
                  setErrorManager(false);
                }}
                className='form-control'
              >
                <option value=''>Select Manager</option>
                {uniqueManagers.map((manager, index) => (
                  <option key={index} value={manager}>
                    {manager}
                  </option>
                ))}
              </select>
            </div>

            <div className='form-group'>
              <label htmlFor='description'>Description:</label>
              <textarea
                className={`form-control ${errorDescr ? "is-invalid" : ""}`}
                id='description'
                name='description'
                value={orderDescription}
                onChange={(e) => {
                  setOrderDescription(e.currentTarget.value);
                  setErrorDescr(false);
                }}
                placeholder='Enter description'
              ></textarea>
              {errorDescr && (
                <div className='invalid-feedback'>
                  Description cannot be empty
                </div>
              )}
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
