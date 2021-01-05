import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGithubRepos } from "../../actions/profile";
import Spinner from "../layout/Spinner";

class ProfileGithub extends Component {
  static propTypes = {
    getGithubRepos: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      username: null,
      repos: null,
    };
  }

  componentWillMount() {
    this.props.getGithubRepos(this.props.username);
  }

  componentDidUpdate() {
    if (!this.props.profile.loading && this.state.loading) {
      this.setState({
        username: this.props.username,
        repos: this.props.repos,
        loading: false,
      });
    }
  }

  render() {
    const { loading } = this.state;
    const { repos } = this.state;
    if (repos) console.log(repos.length);
    return (
      <Fragment>
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            {repos === null ? (
              <p>No repos found</p>
            ) : (
              <Fragment>
                <ul>
                  {repos.map((repo, index) => (
                    <li key={index}>{JSON.stringify(repo)}</li>
                  ))}
                </ul>
              </Fragment>
            )}
          </Fragment>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
