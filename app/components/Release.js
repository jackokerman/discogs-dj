import React from 'react';
import { Grid, Row, Col, Image } from 'react-bootstrap';

import ReleaseTitle from './ReleaseTitle';
import ReleaseHeader from './ReleaseHeader';
import TrackList from './TrackList.js';

export default class Release extends React.Component {

  render() {
    const { release } = this.props;
    if (release === null) {
      return null;
    }

    return (
      <Grid>
        <Row>
          <Col md={2}>
            <Image src={release.imageUrl} responsive />
          </Col>
          <Col md={9}>
            <ReleaseTitle
              artist={release.artist}
              title={release.title}
              url={release.url}
            />
            <ReleaseHeader
              label={release.label}
              releaseDate={release.releaseDate}
              styles={release.styles}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <TrackList
              tracklist={release.tracklist}
              showTrackModal={this.props.showTrackModal}
              removeTrack={this.props.removeTrack}
            />
          </Col>
        </Row>
      </Grid>
    );
  }

}

Release.propTypes = {
  release: React.PropTypes.object,
  showTrackModal: React.PropTypes.func,
  removeTrack: React.PropTypes.func,
};
