import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const Container = props => (
  <div>
    <Navbar inverse>
      <Navbar.Header>
        <Navbar.Brand>Discogs DJ</Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <LinkContainer to={'/bag'}>
          <NavItem>Bag</NavItem>
        </LinkContainer>
        <LinkContainer to={'/collection'}>
          <NavItem>Collection</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar>
    {props.children}
  </div>
);

Container.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default Container;
