import React from 'react';
const moment = require('moment');

const CollectionItem = props => {
  const { release } = props;
  return (
    <tr>
      <td>{release.basic_information.artists[0].name}</td>
      <td>{release.basic_information.title}</td>
      <td>{release.basic_information.year}</td>
      <td>{moment(release.date_added).format('MMM D, YYYY')}</td>
    </tr>
  );
};

CollectionItem.propTypes = { release: React.PropTypes.object.isRequired };

export default CollectionItem;
