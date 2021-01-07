import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

class PostForm extends Component {
  static propTypes = {
    addPost: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      formData: {
        text: "",
      },
    };
  }

  render() {
    return (
      <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form
          className="form my-1"
          onSubmit={(e) => {
            e.preventDefault();
            this.props.addPost(this.state.formData);
            this.setState({
              formData: { text: "" },
            });
          }}
        >
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            required
            value={this.state.text}
            onChange={(e) => {
              this.setState({
                formData: { text: e.target.value },
              });
            }}
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    );
  }
}

export default connect(null, { addPost })(PostForm);