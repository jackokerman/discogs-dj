import React from 'react';
import request from 'superagent';
import { Grid, Row, Col, Table } from 'react-bootstrap';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      releases: [],
    };
  }

  componentDidMount() {
    request
      .get('/api/collection')
      .end((err, res) => {
        this.setState({
          releases: res.body.releases,
        });
      });
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th>Artist</th>
                  <th>Title</th>
                  <th>Year</th>
                </tr>
              </thead>
              <tbody>
                {this.state.releases.map((release, i) =>
                  <tr key={i}>
                    <td>{release.basic_information.artists[0].name}</td>
                    <td>{release.basic_information.title}</td>
                    <td>{release.basic_information.year}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Grid>
    );
  }

}
