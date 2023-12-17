
import { Modal, Button } from 'react-bootstrap';
import s from "./popup.module.css"
type PopupPropsType = {
  popupStatus?: string;
  popupImage?: string;
  title?: string;
  onHide: () => void;
  onConfirm: () => void;
  showPopup: boolean;
};

export const Popup = (props: PopupPropsType) => {

  return (
    <div>
      <Modal
        show={props.showPopup}
        onHide={props.onHide}
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body className={s.modalWrapper}>
          {props.popupStatus !== undefined ? (
            <div>
              {" "}
              <img
                src={props.popupImage}
                className={s.image}
                alt='Popup Image'
              ></img>
              {props.popupStatus ? (
                <div className={s.statusTextTrue}>free</div>
              ) : (
                <div className={s.statusTextFalse}>on repair</div>
              )}
            </div>
          ) : (
            ""
          )}

          {props.title}
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

