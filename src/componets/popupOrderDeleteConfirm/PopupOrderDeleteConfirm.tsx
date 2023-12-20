
import { Modal, Button } from 'react-bootstrap';
import s from "./popupOrderDeleteConfirm.module.css"
import { orderReducer } from '../../reducers';
import { useDispatch, useSelector } from 'react-redux';
import { ProductType, StoreType } from '../../store';
type PopupPropsType = {

  onHide: () => void;
  onConfirm: () => void;
    showPopup: boolean;
    currOrderId?: number;
};

export const PopupOrderDeleteConfirm = (props: PopupPropsType) => {
  const orders = useSelector((state: StoreType) => state.orders);
  const products = useSelector((state: StoreType) => state.product);
  const dispatch = useDispatch();

  return (
    <div>
      <Modal
        show={props.showPopup}
        onHide={props.onHide}
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className={s.title}>Product delete confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body className={s.modalWrapper}>
          Are you sure want to delete order number {props.currOrderId}?
        </Modal.Body>
        <Modal.Footer className={s.modalFooter}>
          <Button variant='primary' onClick={props.onConfirm}>
            Yes
          </Button>
          <Button variant='secondary' onClick={props.onHide}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

