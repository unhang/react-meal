import { createPortal } from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}/>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("modal-hook");

const Modal = (props) => {
  return (
    <>
      {createPortal(<Backdrop onClose={props.onClose}/>, portalElement)}
      {createPortal(<ModalOverlay {...props} />, portalElement)}
    </>
  );
};

export default Modal;