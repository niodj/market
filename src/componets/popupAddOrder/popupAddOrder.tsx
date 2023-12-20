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



  const [orderTitle, setOrderTitle] = useState("");
  const [orderDescription, setOrderDescription] = useState("");
  const [errorTitle, setErrorTitle] = useState(false);
   const [selectedManager, setSelectedManager] = useState("");
  const [errorManager, setErrorManager] = useState(false);
  const [newManager, setNewManager] = useState('')
  const [uniqueManagers, setUniqueManagers] = useState(
    Array.from(new Set(orders.map((order) => order.manager)))
  );




  const onHide = () => {

      // Reset form state after submitting
      setOrderTitle("");
      setOrderDescription("");
      setSelectedManager("");
      setErrorTitle(false);

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
            New Order# {orders.length ? orders[orders.length - 1].id + 1 : ""}
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
                  setOrderTitle(e.target.value);
                  setErrorTitle(false);
                }}
                placeholder='Enter order title'
              />
              {errorTitle && (
                <div className='invalid-feedback'>Title cannot be empty</div>
              )}
            </div>

            <div>
              <label htmlFor='manager'>Manager:</label>
              <div className='form-control'>
                <input
                  type='text'
                  value={newManager}
                  onChange={(e) => setNewManager(e.target.value)}
                  placeholder='new manager'
                  className={`form-control`}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (
                      !uniqueManagers.includes(newManager) &&
                      newManager.trim() !== ""
                    ) {
                      setUniqueManagers((prevManagers) => [
                        ...prevManagers,
                        newManager,
                      ]);
                      setNewManager("");
                    }
                  }}
                >
                  Add new manager
                </button>
              </div>
              <select
                id='manager'
                name='manager'
                value={selectedManager}
                onChange={(e) => {
                  setSelectedManager(e.target.value);
                  setErrorManager(false);
                }}
                className={`form-control ${errorManager ? "is-invalid" : ""}`}
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
                className='form-control'
                id='description'
                name='description'
                value={orderDescription}
                onChange={(e) => {
                  setOrderDescription(e.currentTarget.value);
                }}
                placeholder='Enter description'
              ></textarea>
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
