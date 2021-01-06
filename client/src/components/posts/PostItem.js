import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";

class PostItem extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
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
          <a href="profile.html">
            <img className="round-img" src={avatar} alt="" />
            <h4>{name}</h4>
          </a>
        </div>
        <div>
          <p className="my-1">{text}</p>
          <p className="post-date">
            Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
          </p>
          <button type="button" className="btn btn-light">
            <i className="fa fa-thumbs-up"> </i>
            {likes.length > 0 && <span>{likes.length}</span>}
          </button>
          <button type="button" className="btn btn-light">
            <i className="fa fa-thumbs-down"></i>
            {likes.length > 0 && <span>{likes.length}</span>}
          </button>
          <Link to={`/post/${_id}`} className="btn btn-primary">
            Discussion
            {comments.length > 0 && (
              <span className="comment-count">{comments.length}</span>
            )}
          </Link>
          {!this.props.auth.loading && this.props.auth.user._id === user && (
            <button type="button" className="btn btn-danger">
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

export default connect(mapStateToProps, {})(PostItem);
