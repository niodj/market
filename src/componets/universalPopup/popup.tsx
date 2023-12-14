import React from 'react';
import { Modal, Button } from 'react-bootstrap';

type PopupPropsType = {
  showPopup: boolean;
  onHide: () => void;
  onConfirm: () => void;
  title: string;

}

export const Popup =(props:PopupPropsType) => {
  return (
    <Modal show={props.showPopup} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm delete {props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body> {props.title} </Modal.Body>
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

