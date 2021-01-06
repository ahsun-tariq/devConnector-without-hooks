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
      <div className="profile-github">
        <h2 className="text-primary my-1">Github Repos</h2>
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            {repos === null ? (
              <p>No repos found</p>
            ) : (
              <Fragment>
                {repos.map((repo, index) => (
                  <div key={index} className="repo bg-white p-1 my-1">
                    <h4>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {repo.name}
                      </a>
                    </h4>
                    <p>{repo.description}</p>
                    <div>
                      <ul>
                        <li className="badge badge-primary">
                          Stars:{repo.stargazers_count}
                        </li>
                        <li className="badge badge-dark">
                          Watchers:{repo.watchers_count}
                        </li>
                        <li className="badge badge-light">
                          Stars:{repo.forks_count}
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
