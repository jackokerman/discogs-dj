import React from 'react';
import { Modal, Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

export default class AddTrackModal extends React.Component {

  render() {
    if (this.props.track === null) {
      return null;
    }

    const { artist, title } = this.props.track;

    return (
      <Modal show={this.props.show} keyboard onHide={this.props.hide} bsSize="sm">
        <Modal.Header closeButton>
          <Modal.Title>Add Track to Bag</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup>
              <ControlLabel>Artist</ControlLabel>
              <FormControl.Static>{artist}</FormControl.Static>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Title</ControlLabel>
              <FormControl.Static>{title}</FormControl.Static>
            </FormGroup>
            <FormGroup>
              <ControlLabel>BPM</ControlLabel>
              <FormControl
                type="text"
                value={this.props.track.bpm}
                onChange={this.props.handleBpmChange}
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            bsStyle="primary"
            onClick={this.props.addTrackToBag}
          >Add</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

AddTrackModal.propTypes = {
  show: React.PropTypes.bool.isRequired,
  hide: React.PropTypes.func.isRequired,
  track: React.PropTypes.object,
  handleBpmChange: React.PropTypes.func.isRequired,
  addTrackToBag: React.PropTypes.func.isRequired,
};
