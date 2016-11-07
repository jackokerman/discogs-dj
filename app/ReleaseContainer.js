import React from 'react';
import request from 'superagent';
import LoadingModal from './LoadingModal.js';
import Release from './Release.js';
import AddTrackModal from './AddTrackModal.js';

export default class ReleaseContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      release: null,
      trackToAdd: null,
      bpm: null,
    };
    this.getRelease = this.getRelease.bind(this);
    this.getTrack = this.getTrack.bind(this);
    this.addTrackToBag = this.addTrackToBag.bind(this);
    this.showTrackModal = this.showTrackModal.bind(this);
    this.hideTrackModal = this.hideTrackModal.bind(this);
    this.handleBpmChange = this.handleBpmChange.bind(this);
    this.removeTrackFromBag = this.removeTrackFromBag.bind(this);
  }

  componentDidMount() {
    this.getRelease();
  }

  getRelease() {
    this.setState({ loading: true }, () => {
      request
      .get(`/api/release/${this.props.params.release}`)
      .end((err, res) => {
        this.setState({
          loading: false,
          release: res.body,
        });
      });
    });
  }

  getTrack() {
    if (this.state.trackToAdd === null) {
      return null;
    }
    const track = this.state.release.tracklist[this.state.trackToAdd];
    return Object.assign({}, track, { bpm: this.state.bpm });
  }

  addTrackToBag() {
    this.setState({ loading: true }, () => {
      request
        .post('/api/bag')
        .send(this.getTrack())
        .end((err, res) => {
          if (err) {
            this.setState({ loading: false });
          } else {
            const trackId = res.body._id;
            const { trackToAdd } = this.state;
            const tracklist = this.state.release.tracklist
              .slice(0, trackToAdd)
              .concat(Object.assign({}, this.state.release.tracklist[trackToAdd], { trackId }))
              .concat(this.state.release.tracklist.slice(trackToAdd + 1));
            this.setState({
              loading: false,
              trackToAdd: null,
              release: Object.assign({}, this.state.release, { tracklist }),
            });
          }
        });
    });
  }

  showTrackModal(trackToAdd) {
    this.setState({ trackToAdd, bpm: null });
  }

  hideTrackModal() {
    this.setState({ trackToAdd: null });
  }

  handleBpmChange(event) {
    const bpm = event.target.value;
    this.setState({ bpm });
  }

  removeTrackFromBag(toRemove) {
    const { trackId } = this.state.release.tracklist[toRemove];
    this.setState({ loading: true }, () => {
      request
        .delete(`/api/bag/${trackId}`)
        .end((err) => {
          if (err) {
            this.setState({ loading: false });
          } else {
            const newTrack = Object.assign({}, this.state.release.tracklist[toRemove]);
            delete newTrack.trackId;
            const tracklist = this.state.release.tracklist
              .slice(0, toRemove)
              .concat(newTrack)
              .concat(this.state.release.tracklist.slice(toRemove + 1));
            this.setState({
              loading: false,
              release: Object.assign({}, this.state.release, { tracklist }),
            });
          }
        });
    });
  }

  render() {
    return (
      <div>
        <Release
          release={this.state.release}
          showTrackModal={this.showTrackModal}
          removeTrack={this.removeTrackFromBag}
        />
        <LoadingModal show={this.state.loading} />
        <AddTrackModal
          show={this.state.trackToAdd !== null}
          hide={this.hideTrackModal}
          track={this.getTrack()}
          handleBpmChange={this.handleBpmChange}
          addTrackToBag={this.addTrackToBag}
        />
      </div>
    );
  }
}

ReleaseContainer.propTypes = {
  params: React.PropTypes.object,
};
