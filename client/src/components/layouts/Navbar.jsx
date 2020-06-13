import React, { Component, Fragment } from "react";
import RegisterModal from "../auth/RegisterModal";
import Logout from "../auth/Logout";
import LoginModal from "../auth/LoginModal";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from "reactstrap";

export class MyNavbar extends Component {
  state = {
    isOpen: true,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen, //if closed then open & if opened then close
    });
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3" color="white">
            <strong>{user ? `Welcome ${user.name}` : ""}</strong>
          </span>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );
    return (
      <div>
        <Navbar color="dark" expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">Shopping List</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(MyNavbar);
