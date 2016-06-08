import React from 'react';

class HeaderColumn extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    let order = 'asc';
    if (this.props.sort) {
      order = this.props.sort === 'asc' ? 'desc' : 'asc';
    }
    this.props.handleSort(this.props.column, order);
  }

  render() {
    const { sort } = this.props;
    let sortIcon;
    if (sort) {
      const sortClass = `fa fa-sort-${sort}`;
      sortIcon = <i className={sortClass}></i>;
    }
    return (
      <th onClick={this.handleClick}>
        {this.props.children} {sortIcon}
      </th>
    );
  }
}

HeaderColumn.propTypes = {
  children: React.PropTypes.string.isRequired,
  sort: React.PropTypes.string,
  column: React.PropTypes.string.isRequired,
  handleSort: React.PropTypes.func.isRequired,
};

export default HeaderColumn;
