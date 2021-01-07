import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteComment } from "../../actions/post";
import Moment from "react-moment";
class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };

  render() {
    const { _id, text, name, avatar, user, date } = this.props.comment;

    return (
      <div class="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user}`}>
            <img class="round-img" src={avatar} alt="" />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p class="my-1">{text}</p>
          <p class="post-date">
            Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
          </p>
          {this.props.auth.isAuthenticated &&
            this.props.auth.user.user._id === user && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={(e) =>
                  this.props.deleteComment(this.props.postID, _id)
                }
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
export default connect(mapStateToProps, { deleteComment })(Comment);
