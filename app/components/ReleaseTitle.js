import React from 'react';

const ReleaseTitle = (props) => {
  const { artist, title, url } = props;
  const header = `${artist} - ${title}`;
  return (
    <h3>
      <a href={url}>{header}</a>
    </h3>
  );
};

ReleaseTitle.propTypes = {
  artist: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
};

export default ReleaseTitle;
