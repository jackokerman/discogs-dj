import React from 'react';
import { Modal, ProgressBar } from 'react-bootstrap';

const LoadingModal = props => (
  <Modal
    show={props.show}
    animation={false}
    bsSize="small"
    backdrop={false}
  >
    <Modal.Header>
      <Modal.Title>Loading...</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <ProgressBar now={100} active />
    </Modal.Body>
  </Modal>
);

LoadingModal.propTypes = {
  show: React.PropTypes.bool.isRequired,
};

export default LoadingModal;
