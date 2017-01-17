import React from 'react';
import { Table } from 'react-bootstrap';

const ReleaseHeader = (props) => {
  const { label, releaseDate, styles } = props;
  return (
    <Table condensed>
      <tbody>
        <tr>
          <td>Label</td>
          <td>{label}</td>
        </tr>
        <tr>
          <td>Released</td>
          <td>{releaseDate}</td>
        </tr>
        <tr>
          <td>Styles</td>
          <td>{styles}</td>
        </tr>
      </tbody>
    </Table>
  );
};

ReleaseHeader.propTypes = {
  label: React.PropTypes.string.isRequired,
  releaseDate: React.PropTypes.string.isRequired,
  styles: React.PropTypes.string.isRequired,
};

export default ReleaseHeader;
