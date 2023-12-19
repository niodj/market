
import { Modal, Button } from 'react-bootstrap';
import s from "./popupConfirm.module.css";
type PopupPropsType = {
  popupStatus?: string;
  popupImage?: string;
  title?: string;
  text?: string;
  onHide: () => void;
  onConfirm: () => void;
  showPopup: boolean;
};

export const PopupAddOreder = (props: PopupPropsType) => {

  return (
    <div>
      <Modal
        show={props.showPopup}
        onHide={props.onHide}
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className={s.title}> {props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={s.modalWrapper}>
          {props.popupStatus !== undefined ? (
            <div className={s.dataWrapper}>
              {props.popupStatus ? (
                <div className={s.markTrueStatus}></div>
              ) : (
                <div className={s.markFalseStatus}></div>
              )}

              <img
                src={props.popupImage}
                className={s.photo}
                alt='Popup Image'
              ></img>
              {props.text}

            </div>
          ) : (
            ""
          )}
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

