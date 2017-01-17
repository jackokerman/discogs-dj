import React from 'react';
import HeaderColumn from './HeaderColumn.js';

const columns = [
  { column: 'artist', display: 'Artist' },
  { column: 'title', display: 'Title' },
  { column: 'year', display: 'Year' },
  { column: 'added', display: 'Added' },
];

const CollectionHeader = props => (
  <tr>
    {columns.map((column, i) => {
      if (props.sortColumn === column.column) {
        return (
          <HeaderColumn
            key={i}
            handleSort={props.handleSort}
            column={column.column}
            sort={props.sortOrder}
          >
            {column.display}
          </HeaderColumn>
        );
      }
      return (
        <HeaderColumn
          key={i}
          handleSort={props.handleSort}
          column={column.column}
        >
          {column.display}
        </HeaderColumn>
      );
    })}
  </tr>
);

CollectionHeader.propTypes = {
  sortColumn: React.PropTypes.string.isRequired,
  sortOrder: React.PropTypes.string.isRequired,
  handleSort: React.PropTypes.func.isRequired,
};

export default CollectionHeader;
