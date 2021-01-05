import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import { getProfileByID } from "../../actions/profile";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";
class Profile extends Component {
  static propTypes = {
    getProfileByID: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      profile: null,
    };
  }
  componentWillMount() {
    this.props.getProfileByID(this.props.match.params.id);
    console.log(this.props.match.params.id);
  }

  componentDidUpdate() {
    if (!this.props.profile.loading && this.state.loading) {
      this.setState({
        loading: false,
        profile: this.props.profile.profile,
      });
    }
  }

  render() {
    const { loading } = this.state;
    const { profile } = this.state;
    const { isAuthenticated } = this.props.auth;

    return (
      <Fragment>
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <Link to="/profiles" className="btn btn-light">
              Back To Profiles
            </Link>
            {isAuthenticated &&
            this.props.auth.user.user._id === profile.user._id ? (
              <Link to="/edit-profile">Edit Profile</Link>
            ) : null}
            <div className="profile-grid-my-1">
              <ProfileTop profile={profile} />
              <ProfileAbout profile={profile} />
              <div className="profile-exp bg-white p-2">
                <h2 className="text-primary">Experience</h2>
                {profile.experience.length > 0 ? (
                  <Fragment>
                    {profile.experience.map((exp) => (
                      <ProfileExperience key={exp._id} experience={exp} />
                    ))}
                  </Fragment>
                ) : (
                  <h4>No experience credentials</h4>
                )}
              </div>
              <div className="profile-edu bg-white p-2">
                <h2 className="text-primary">Education</h2>
                {profile.education.length > 0 ? (
                  <Fragment>
                    {profile.education.map((edu) => (
                      <ProfileEducation key={edu._id} education={edu} />
                    ))}
                  </Fragment>
                ) : (
                  <h4>No education credentials</h4>
                )}
              </div>
              {profile.githubUsername && (
                <ProfileGithub username={profile.githubUsername} />
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
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileByID })(Profile);
