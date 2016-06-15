import React from 'react';

const Container = props => (
  <div>
    {props.children}
  </div>
);

Container.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default Container;
