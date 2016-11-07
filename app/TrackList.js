import React from 'react';
import { Table } from 'react-bootstrap';
import TrackButton from './TrackButton.js';

const TrackList = (props) => (
  <div>
    <h4>Tracklist</h4>
    <Table>
      <thead>
        <tr>
          <th>Position</th>
          <th>Artist</th>
          <th>Title</th>
          <th>Manage Bag</th>
        </tr>
      </thead>
      <tbody>
        {props.tracklist.map((track, i) => {
          const { position, title, artist } = track;
          return (
            <tr key={i}>
              <td>{position}</td>
              <td>{artist}</td>
              <td>{title}</td>
              <td>
                <TrackButton
                  addTrack={props.showTrackModal}
                  removeTrack={props.removeTrack}
                  track={i}
                  trackId={track.trackId}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  </div>
);

TrackList.propTypes = {
  tracklist: React.PropTypes.array.isRequired,
  showTrackModal: React.PropTypes.func,
  removeTrack: React.PropTypes.func,
};

export default TrackList;
