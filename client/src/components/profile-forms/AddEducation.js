import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { addEducation } from "../../actions/profile";

class AddEducation extends Component {
  static propTypes = {
    addEducation: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleCheck = this.handleCheck.bind(this);
    this.toggleDisable = this.toggleDisable.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      formData: {
        school: "",
        degree: "",
        fieldOfStudy: "",
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

    this.props.addEducation(state.formData, history);
  }

  render() {
    return (
      <Fragment>
        <section className="container">
          <h1 className="large text-primary">Add Your Education</h1>
          <p className="lead">
            <i className="fas fa-code-branch"></i> Add any school or bootcamp
            that you have attended
          </p>
          <small>* = required field</small>
          <form
            className="form"
            onSubmit={(e) => this.onSubmit(e, this.state, this.props.history)}
          >
            <div className="form-group">
              <input
                type="text"
                placeholder="* School or bootcamp"
                name="school"
                value={this.state.formData.school}
                onChange={(e) => this.onChange(e, this.state)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="* Degree or Certificate"
                name="degree"
                value={this.state.formData.degree}
                onChange={(e) => this.onChange(e, this.state)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Field of Study"
                name="fieldOfStudy"
                value={this.state.formData.fieldOfStudy}
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
                Current
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
                placeholder="Program Description"
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

export default connect(null, { addEducation })(AddEducation);
