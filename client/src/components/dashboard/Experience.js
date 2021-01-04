import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";

export default class Experience extends Component {
  static propTypes = {
    experience: PropTypes.array.isRequired,
  };
  constructor(props) {
    super(props);
  }
  render() {
    const experiences = this.props.experience.map((exp) => (
      <tr key={exp._id}>
        {exp.company}
        <td className="hide-sm">{exp.title}</td>
        <td>
          <Moment format="YYYY/MMDD">{exp.from}</Moment>-
          {exp.to === null ? (
            "Present"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </td>
        <td>
          <button className="btn btn-danger">Delete</button>
        </td>
      </tr>
    ));
    return (
      <Fragment>
        <h2 className="my-2">Experience Credentials</h2>
        <table className="table table-striped table-dark">
          <thead className="thead-dark">
            <tr>
              <th>Company</th>
              <th className="hide-sm">Title</th>
              <th className="hide-sm">Years</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{experiences}</tbody>
        </table>
      </Fragment>
    );
  }
}
