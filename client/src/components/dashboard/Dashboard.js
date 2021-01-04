import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";

class Dashboard extends Component {
  static propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
    this.props.getCurrentProfile();
  }

  render() {
    const { profile, loading } = this.props.profile;
    const { isAuthenticated } = this.props.auth;

    if (loading || !isAuthenticated || !this.props.auth.user) {
      return <Spinner />;
    } else {
      const { user } = this.props.auth.user;
      return (
        <Fragment>
          <h1 className="large text-primary">Dashboard</h1>
          <p className="lead">
            <i className="fa fa-user" />
            Welcome {user.name}
          </p>
          {profile !== null ? (
            <Fragment>
              <DashboardActions />
            </Fragment>
          ) : (
            <Fragment>
              <p>You have not set up a profile, please add some info</p>
              <Link to="/create-profile" className="btn btn-primary my-1">
                Create Profile
              </Link>
            </Fragment>
          )}
        </Fragment>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);