import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";
import Spinner from "../layout/Spinner";

class PostItem extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
  };

  render() {
    const {
      _id,
      text,
      name,
      avatar,
      user,
      likes,
      comments,
      date,
    } = this.props.post;
    return (
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user}`}>
            <img className="round-img" src={avatar} alt="" />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{text}</p>
          <p className="post-date">
            Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
          </p>
          <button
            onClick={(e) => {
              this.props.addLike(_id);
            }}
            type="button"
            className="btn btn-light"
          >
            <i className="fa fa-thumbs-up"> </i>
            {likes.length > 0 && <span>{likes.length}</span>}
          </button>
          <button
            onClick={(e) => {
              this.props.removeLike(_id);
            }}
            type="button"
            className="btn btn-light"
          >
            <i className="fa fa-thumbs-down"></i>
          </button>
          <Link to={`/post/${_id}`} className="btn btn-primary">
            Discussion
            {comments.length > 0 && (
              <span className="comment-count">{comments.length}</span>
            )}
          </Link>
          {this.props.auth.isAuthenticated &&
            this.props.auth.user.user._id === user && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={(e) => this.props.deletePost(_id)}
              >
                <i className="fa fa-times"></i>
              </button>
            )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
