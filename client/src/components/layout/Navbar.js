import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

class Navbar extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };

  render() {
    const { isAuthenticated, loading } = this.props.auth;

    const authLinks = (
      <ul>
        <li>
          <Link to="/profiles">Developers</Link>
        </li>
        <li>
          <Link to="/dashboard">
            <i className="fa fa-user" /> Dashboard
          </Link>
        </li>
        <li>
          <a onClick={this.props.logout} href="!#">
            <i className="fa fa-sign-out" />{" "}
            <span className="hide-sm">Logout</span>
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul>
        <li>
          <Link to="/profiles">Developers</Link>
        </li>

        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    );
    return (
      <div>
        <nav className="navbar bg-dark">
          <h1>
            <Link to="/">
              <i className="fas fa-code"></i> DevConnector
            </Link>
          </h1>
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
        </nav>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
