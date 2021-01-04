import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { addExperience } from "../../actions/profile";

class AddExperience extends Component {
  static propTypes = {
    addExperience: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleCheck = this.handleCheck.bind(this);
    this.toggleDisable = this.toggleDisable.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      formData: {
        company: "",
        title: "",
        location: "",
        from: "",
        to: "",
        current: false,
        description: "",
      },
      toDateDisabled: false,
    };
  }

  toggleDisable(e, state) {
    this.setState((state) => ({ toDateDisabled: !state.toDateDisabled }));
  }

  onChange(e, state) {
    this.setState((state) => {
      return {
        formData: { ...state.formData, [e.target.name]: e.target.value },
      };
    });
  }

  handleCheck(e, state) {
    this.setState((state) => {
      return {
        formData: { ...state.formData, current: !state.formData.current },
      };
    });
  }

  onSubmit(e, state, history) {
    e.preventDefault();

    this.props.addExperience(state.formData, history);
  }

  render() {
    return (
      <Fragment>
        <section className="container">
          <h1 className="large text-primary">Add An Experience</h1>
          <p className="lead">
            <i className="fas fa-code-branch"></i> Add any developer/programming
            positions that you have had in the past
          </p>
          <small>* = required field</small>
          <form
            className="form"
            onSubmit={(e) => this.onSubmit(e, this.state, this.props.history)}
          >
            <div className="form-group">
              <input
                type="text"
                placeholder="* Job Title"
                name="title"
                value={this.state.formData.title}
                onChange={(e) => this.onChange(e, this.state)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="* Company"
                name="company"
                value={this.state.formData.company}
                onChange={(e) => this.onChange(e, this.state)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Location"
                name="location"
                value={this.state.formData.location}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <h4>From Date</h4>
              <input
                type="date"
                name="from"
                value={this.state.formData.from}
                onChange={(e) => this.onChange(e, this.state)}
              />
            </div>
            <div className="form-group">
              <p>
                <input
                  type="checkbox"
                  name="current"
                  value={this.state.formData.current}
                  checked={this.state.formData.current}
                  onChange={(e) => {
                    this.handleCheck(e, this.state);
                    this.toggleDisable(e, this.state);
                  }}
                />{" "}
                Current Job
              </p>
            </div>
            <div className="form-group">
              <h4>To Date</h4>
              <input
                type="date"
                name="to"
                value={this.state.formData.to}
                onChange={(e) => this.onChange(e, this.state)}
                disabled={this.state.toDateDisabled ? "disabled" : ""}
              />
            </div>
            <div className="form-group">
              <textarea
                name="description"
                cols="30"
                rows="5"
                placeholder="Job Description"
                value={this.state.formData.description}
                onChange={(e) => this.onChange(e, this.state)}
              ></textarea>
            </div>
            <input type="submit" className="btn btn-primary my-1" />
            <Link className="btn btn-light my-1" to="/dashboard">
              Go Back
            </Link>
          </form>
        </section>
      </Fragment>
    );
  }
}

export default connect(null, { addExperience })(AddExperience);
