import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfiles } from "../../actions/profile";
import ProfileItem from "./ProfileItem";
import { JsonWebTokenError } from "jsonwebtoken";
class Profiles extends Component {
  static propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      profiles: null,
    };
  }
  componentWillMount() {
    this.props.getProfiles();
  }

  componentDidUpdate() {
    if (!this.props.profile.loading && this.state.loading) {
      this.setState({
        profiles: this.props.profile.profiles,
        loading: false,
      });
    }
  }

  render() {
    const { loading } = this.state;
    const { profiles } = this.state;
    console.log(this.state);
    return (
      <Fragment>
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <h1 className="large text-primary">Developers</h1>
            <p className="lead">
              <i className="fa fa-connectdevelop" />
              Browse and connect with developers
            </p>
            <div className="profiles">
              {profiles.length > 0 ? (
                profiles.map((profile) => (
                  <ProfileItem
                    key={profile._id}
                    profile={profile}
                  ></ProfileItem>
                ))
              ) : (
                <h4>No profiles found</h4>
              )}
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getProfiles })(Profiles);
