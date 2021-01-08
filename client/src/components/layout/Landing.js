import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
class Landing extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    };
  }

  componentWillReceiveProps(props) {
    if (!props.auth.loading && props.auth.isAuthenticated) {
      this.setState({
        isAuthenticated: true,
      });
    }
  }

  render() {
    if (this.state.isAuthenticated) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div>
        <section className="landing">
          <div className="dark-overlay">
            <div className="landing-inner">
              <h1 className="x-large">Developer Connector</h1>
              <p className="lead">
                Create a developer profile/portfolio, share posts and get help
                from other developers
              </p>
              <div className="buttons">
                <Link to="/register" className="btn btn-primary">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
