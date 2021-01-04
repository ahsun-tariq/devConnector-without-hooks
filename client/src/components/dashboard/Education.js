import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";

export default class Education extends Component {
  static propTypes = {
    education: PropTypes.array.isRequired,
  };
  constructor(props) {
    super(props);
  }
  render() {
    const edu = this.props.education.map((ed) => (
      <tr key={ed._id}>
        {ed.school}
        <td className="hide-sm">{ed.degree}</td>
        <td>
          <Moment format="YYYY/MMDD">{ed.from}</Moment>-
          {ed.to === null ? (
            "Present"
          ) : (
            <Moment format="YYYY/MM/DD">{ed.to}</Moment>
          )}
        </td>
        <td>
          <button className="btn btn-danger">Delete</button>
        </td>
      </tr>
    ));
    return (
      <Fragment>
        <h2 className="my-2">Education Credentials</h2>
        <table className="table table-striped table-dark">
          <thead className="thead-dark">
            <tr>
              <th>School</th>
              <th className="hide-sm">Degree</th>
              <th className="hide-sm">Years</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{edu}</tbody>
        </table>
      </Fragment>
    );
  }
}
