import React from 'react';
import request from 'superagent';
import LoadingModal from './LoadingModal.js';
import ShowPerPage from './ShowPerPage.js';
import { Link } from 'react-router';
import orderBy from 'lodash/orderBy';
import { Table, sort } from 'reactabular';
import { Grid, Row, Col, Pagination } from 'react-bootstrap';

export default class RecordBagContainer extends React.Component {

  constructor(props) {
    super(props);

    const getSortingColumns = () => this.state.sortingColumns || {};
    const sortable = sort.sort({
      getSortingColumns,
      onSort: selectedColumn => {
        this.setState({
          sortingColumns: sort.byColumn({
            sortingColumns: this.state.sortingColumns,
            sortingOrder: {
              FIRST: 'asc',
              asc: 'desc',
              desc: 'asc',
            },
            selectedColumn,
          }),
          pagination: Object.assign({}, this.state.pagination, { page: 1 }),
        });
      },
    });
    const sortableHeader = (label, { columnIndex }) => {
      const sortingColumns = getSortingColumns();
      const sortClass = sortingColumns[columnIndex] ?
        `sort-${sortingColumns[columnIndex].direction}` :
        'sort';
      return (
        <span>{label} <i className={`fa fa-${sortClass}`}></i></span>
      );
    };

    this.state = {
      loading: true,
      tracks: [],
      sortingColumns: {
        3: {
          direction: 'asc',
          position: 0,
        },
      },
      columns: [
        {
          property: 'artist',
          header: {
            label: 'Artist',
            transforms: [sortable],
            format: sortableHeader,
          },
        },
        {
          property: 'title',
          header: {
            label: 'Title',
            transforms: [sortable],
            format: sortableHeader,
          },
        },
        {
          property: 'releaseName',
          header: {
            label: 'Release',
            transforms: [sortable],
            format: sortableHeader,
          },
          cell: {
            format: (value, { rowData }) => (
              <Link to={`/collection/${rowData.releaseId}`}>
                {rowData.releaseName}
              </Link>
            ),
          },
        },
        {
          property: 'bpm',
          header: {
            label: 'BPM',
            transforms: [sortable],
            format: sortableHeader,
          },
        },
      ],
      pagination: {
        page: 1,
        perPage: 25,
      },
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePerPageChange = this.handlePerPageChange.bind(this);
  }

  componentDidMount() {
    request
      .get('/api/bag')
      .end((err, res) => {
        this.setState({
          loading: false,
          tracks: res.body,
        });
      });
  }

  handlePageChange(page) {
    this.setState({
      pagination: Object.assign({}, this.state.pagination, { page }),
    });
  }

  handlePerPageChange(event) {
    this.setState({
      pagination: {
        page: 1,
        perPage: Number(event.target.value),
      },
    });
  }

  render() {
    const { tracks, columns, sortingColumns, pagination } = this.state;
    const sortedTracks = sort.sorter({
      columns,
      sortingColumns,
      sort: orderBy,
    })(tracks);
    const numPages = Math.ceil(tracks.length / pagination.perPage);
    const start = (pagination.page - 1) * pagination.perPage;
    const end = start + pagination.perPage;
    const rows = sortedTracks.slice(start, end);
    return (
      <div>
        <Grid>
          <Row>
            <Col md={12}>
              <h3>Record Bag</h3>
              <Table.Provider className="table table-bordered table-striped" columns={columns}>
                <Table.Header />
                <Table.Body rows={rows} rowKey="_id" />
              </Table.Provider>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className="pull-left">
                <ShowPerPage
                  items={tracks.length}
                  page={pagination.page}
                  perPage={pagination.perPage}
                  perPageOpts={[10, 25, 50, 100]}
                  onPerPageChange={this.handlePerPageChange}
                />
              </div>
              <div className="pull-right">
                <Pagination
                  prev
                  next
                  boundaryLinks
                  items={numPages}
                  maxButtons={4}
                  activePage={pagination.page}
                  onSelect={this.handlePageChange}
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
