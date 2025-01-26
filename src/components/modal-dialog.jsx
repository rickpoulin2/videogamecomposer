import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'

const ModalDialog = ({ id, heading, children, footer, showModal = false, onClose = () => { } }) => {
  const [show, setShow] = useState(showModal);

  React.useEffect(() => { setShow(showModal); }, [showModal]);

  const handleClose = () => {
    setShow(false);
    showModal = false;
    typeof onClose === 'function' && onClose();
  };


  const headerContent = heading ? <Modal.Title>{heading}</Modal.Title> : null
  const footerContent = footer ? <Modal.Footer>{footer}</Modal.Footer> : null

  return (
    <Modal id={id} show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        {headerContent}
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {footerContent}
    </Modal>
  )
}

export default ModalDialog