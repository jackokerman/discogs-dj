import React from 'react';
import request from 'superagent';
import { Grid } from 'react-bootstrap';

import LoadingModal from './LoadingModal.js';

export default class Release extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      release: {},
    };
    this.getRelease = this.getRelease.bind(this);
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

  render() {
    return (
      <Grid>
        <h1>Release</h1>
        <p>{this.props.params.release}</p>
        <LoadingModal show={this.state.loading} />
      </Grid>
    );
  }
}

Release.propTypes = {
  params: React.PropTypes.object,
};
