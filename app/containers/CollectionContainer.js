import React from 'react';
import request from 'superagent';
import {
  Grid,
  Row,
  Col,
  Table,
  Pagination,
} from 'react-bootstrap';

import CollectionHeader from '../components/CollectionHeader.js';
import CollectionItem from '../components/CollectionItem.js';
import ShowPerPage from '../components/ShowPerPage.js';
import LoadingModal from '../components/LoadingModal.js';

export default class CollectionContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      releases: [],
      activePage: 1,
      pages: undefined,
      items: undefined,
      perPage: 25,
      perPageOpts: [10, 25, 50, 100],
      sort: {
        column: 'added',
        order: 'desc',
      },
      loading: true,
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.getCollection = this.getCollection.bind(this);
    this.handlePerPageChange = this.handlePerPageChange.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  componentDidMount() {
    this.getCollection();
  }

  getCollection() {
    this.setState({ loading: true }, () => {
      request
        .get('/api/collection')
        .query({
          page: this.state.activePage,
          per_page: this.state.perPage,
          sort: this.state.sort.column,
          sort_order: this.state.sort.order,
        })
        .end((err, res) => {
          const pagination = res.body.pagination;
          this.setState({
            releases: res.body.releases,
            activePage: pagination.page,
            pages: pagination.pages,
            items: pagination.items,
            perPage: pagination.per_page,
            loading: false,
          });
        });
    });
  }

  handleSelect(activePage) {
    this.setState({ activePage }, this.getCollection);
  }

  handlePerPageChange(event) {
    this.setState({
      activePage: 1,
      perPage: Number(event.target.value),
    }, this.getCollection);
  }

  handleSort(column, order) {
    this.setState({
      activePage: 1,
      sort: { column, order },
    }, this.getCollection);
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col md={12}>
              <h3>Collection</h3>
              <Table bordered striped>
                <thead>
                  <CollectionHeader
                    sortColumn={this.state.sort.column}
                    sortOrder={this.state.sort.order}
                    handleSort={this.handleSort}
                  />
                </thead>
                <tbody>
                  {this.state.releases.map((release, i) =>
                    <CollectionItem key={i} release={release} />
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className="pull-left">
                <ShowPerPage
                  items={this.state.items}
                  page={this.state.activePage}
                  perPage={this.state.perPage}
                  perPageOpts={[10, 25, 50, 100]}
                  onPerPageChange={this.handlePerPageChange}
                />
              </div>
              <div className="pull-right">
                <Pagination
                  prev
                  next
                  boundaryLinks
                  items={this.state.pages}
                  maxButtons={4}
                  activePage={this.state.activePage}
                  onSelect={this.handleSelect}
                  style={{ marginTop: '0' }}
                />
              </div>
            </Col>
          </Row>
        </Grid>
        <LoadingModal show={this.state.loading} />
      </div>
    );
  }

}
