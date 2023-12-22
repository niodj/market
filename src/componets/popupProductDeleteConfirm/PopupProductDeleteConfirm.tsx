
import { Modal, Button } from 'react-bootstrap';
import s from "./popupProductDeleteConfirm.module.scss"
import { ProductType } from '../../store';

type PopupPropsType = {
  onHide: () => void;
  onConfirm: () => void;

    showPopup: boolean;
    currProduct?: ProductType;

};

export const PopupProductDeleteConfirm = (props: PopupPropsType) => {
  return (
    <div>
      <Modal
        show={props.showPopup}
        onHide={props.onHide}
        aria-labelledby='contained-modal-title-vcenter'
        centered
        className={s.wrapper}
      >
        <Modal.Header closeButton>
          <Modal.Title >
            {props.currProduct ? (
              <div className={s.title}>
                Are you sure you want to delete product #{props.currProduct.id}{" "}
                from order number #{props.currProduct.order}?
              </div>
            ) : null}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {props.currProduct ? (
            <div className={s.dataWrapper}>
              
              {props.currProduct.status ? (
                <div className={s.markTrueStatus}></div>
              ) : (
                <div className={s.markFalseStatus}></div>
              )}

              <img
                src={props.currProduct.photo}
                className={s.photo}
                alt='Popup Image'
              ></img>
              <div>
                <div className={s.productName}>{props.currProduct.title}</div>
                <div className={s.SN}>SN:{props.currProduct.serialNumber}</div>
              </div>
            </div>
          ) : null}
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

