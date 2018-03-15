import React from 'react';
import PropTypes from 'prop-types';
import './modal.css';

const Modal = props =>
  <div className="modal">
    <div className="modal-container">
      <h3>{props.modal.heading}</h3>
      <p>{props.modal.body}</p>
      <button className="dismiss" onClick={props.dismissModal}>Dismiss</button>
    </div>
  </div>

Modal.propTypes = {
  modal: PropTypes.object.isRequired,
  dismissModal: PropTypes.func.isRequire
}

export default Modal;
