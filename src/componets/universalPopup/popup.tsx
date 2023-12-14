import React from 'react';
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

export const Popup =(props:PopupPropsType) => {
  return (
    <Modal show={props.showPopup} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm delete {props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>status:</div>
        {props.popupStatus === undefined ? (
          props.popupStatus
        ) : props.popupStatus === "free" ? (
          <div className={s.statusTextTrue}>free</div>
        ) : (
          <div className={s.statusTextFalse}>on repair</div>
        )}
        {<img src={props.popupImage} className={s.image}></img>}
        {props.title}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={props.onConfirm}>
          Yes
        </Button>
        <Button variant='secondary' onClick={props.onHide}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

