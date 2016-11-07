import React from 'react';
import { Button } from 'react-bootstrap';

const TrackButton = (props) => {
  const remove = props.trackId;
  const text = remove ? 'Remove' : 'Add';
  const bsStyle = remove ? 'danger' : 'success';
  const faClass = remove ? 'fa fa-times' : 'fa fa-plus';
  const onClick = remove ? props.removeTrack : props.addTrack;
  return (
    <Button
      bsStyle={bsStyle}
      bsSize={'xs'}
      onClick={() => onClick(props.track)}
    >
      <i className={faClass}></i> {text}
    </Button>
  );
};

TrackButton.propTypes = {
  addTrack: React.PropTypes.func.isRequired,
  removeTrack: React.PropTypes.func.isRequired,
  track: React.PropTypes.number,
  trackId: React.PropTypes.string,
};

export default TrackButton;
