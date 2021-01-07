import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect, shallowEqual } from "react-redux";
import { getPosts, fetchUpdatedPosts } from "../../actions/post";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
class Posts extends Component {
  static propTypes = {
    getPosts: PropTypes.func.isRequired,
    fetchUpdatedPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      posts: null,
      loading: true,
    };
  }

  componentWillMount() {
    this.props.getPosts();
  }

  componentDidUpdate() {
    if (!this.props.post.loading && this.state.loading) {
      this.setState({
        posts: this.props.posts,
        loading: false,
      });
    }
  }

  render() {
    return (
      <Fragment>
        {this.props.post.loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <h1 className="large text-primary">Posts</h1>
            <p className="lead">
              <i className="fa fa-user"></i> Welcome to the community
            </p>
            <PostForm />
            <div className="posts">
              {this.props.posts.length < 1 ? (
                <p>No posts found</p>
              ) : (
                this.props.posts.map((post) => (
                  <PostItem key={post._id} post={post} />
                ))
              )}
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  post: state.post,
  posts: state.post.posts,
});

export default connect(mapStateToProps, { getPosts, fetchUpdatedPosts })(Posts);
