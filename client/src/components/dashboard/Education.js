import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profile";

class Education extends Component {
  static propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
  }
  render() {
    const edu = this.props.education.map((ed) => (
      <tr key={ed._id} className="bg-primary">
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
          <button
            className="btn btn-danger"
            onClick={(e) => this.props.deleteEducation(ed._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <Fragment>
        <h2 className="my-2">Education Credentials</h2>
        <table className="table table-striped table-light">
          <thead className="thead-light">
            <tr className="bg-primary">
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

export default connect(null, { deleteEducation })(Education);
