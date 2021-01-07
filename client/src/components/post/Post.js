import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPostByID } from "../../actions/post";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "../posts/CommentForm";
import Comment from "../posts/Comment";
import post from "../../reducers/post";

class Post extends Component {
  static propTypes = {
    getPostByID: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      post: null,
      loading: true,
    };
  }

  componentWillMount() {
    this.props.getPostByID(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.post.loading) {
      this.setState({
        post: nextProps.post.post,
        loading: false,
      });
    }
  }

  render() {
    return this.state.loading ? (
      <Spinner />
    ) : (
      <Fragment>
        <Link to="/posts" className="btn btn-dark">
          Back to posts
        </Link>
        <PostItem showActions={false} post={this.state.post} />
        <CommentForm postID={this.state.post._id} />
        <div className="comments">
          {this.state.post.comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              postID={this.state.post._id}
            ></Comment>
          ))}
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, { getPostByID })(Post);
