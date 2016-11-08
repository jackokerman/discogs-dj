import React from 'react';
import { Form, FormGroup, FormControl } from 'react-bootstrap';

const ShowPerPage = (props) => {
  const { items, page, perPage, perPageOpts } = props;
  const numPages = Math.ceil(items / perPage);
  const first = items === 0 ? 0 : (page - 1) * perPage + 1;
  let last = 0;
  if (items > 0) {
    last = page === numPages ? items : first + perPage - 1;
  }
  const showing = `Showing ${first} to ${last} of ${items}`;
  return (
    <Form inline>
      <FormGroup>
        <FormControl.Static>{showing}&nbsp;</FormControl.Static>
        <FormControl
          componentClass="select"
          value={perPage}
          onChange={props.onPerPageChange}
        >
          {perPageOpts.map((opt, i) =>
            <option key={i} value={opt}>
              {opt}
            </option>
          )}
        </FormControl>
        <FormControl.Static>&nbsp;per page</FormControl.Static>
      </FormGroup>
    </Form>
  );
};

ShowPerPage.propTypes = {
  items: React.PropTypes.number.isRequired,
  page: React.PropTypes.number.isRequired,
  perPage: React.PropTypes.number.isRequired,
  perPageOpts: React.PropTypes.array.isRequired,
  onPerPageChange: React.PropTypes.func.isRequired,
};

export default ShowPerPage;
