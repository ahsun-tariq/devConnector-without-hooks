import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

class Register extends Component {
  static propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async formSubmit(e, state, props) {
    const { name, email, password, password2 } = state;
    e.preventDefault();
    if (password !== password2) {
      console.log("passwords do not match");
      props.setAlert("Passwords do not match", "danger");
    } else {
      props.register({ name, email, password });
    }
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/dashboard"></Redirect>;
    }
    return (
      <Fragment>
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Create Your Account
        </p>
        <form
          className="form"
          onSubmit={(e) => this.formSubmit(e, this.state, this.props)}
        >
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              required
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              onChange={this.handleChange}
            />
            <small className="form-text">
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              minLength="6"
              onChange={this.handleChange}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register })(Register);
