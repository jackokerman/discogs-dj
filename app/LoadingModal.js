import React from 'react';
import { Modal } from 'react-bootstrap';

const LoadingModal = props => (
  <Modal
    show={props.show}
    animation={false}
    bsSize="small"
    backdrop={false}
  >
    <Modal.Body>
      <div className="text-center">
        <i className="fa fa-spinner fa-spin fa-lg"></i>&nbsp;&nbsp;<span>Processing...</span>
      </div>
    </Modal.Body>
  </Modal>
);

LoadingModal.propTypes = {
  show: React.PropTypes.bool.isRequired,
};

export default LoadingModal;
