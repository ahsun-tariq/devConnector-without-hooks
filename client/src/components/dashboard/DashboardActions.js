import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fa fa-user-circle-o"></i> Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-light">
        <i className="fa fa-briefcase" aria-hidden="true"></i> Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-light">
        <i className="fa fa-graduation-cap"></i> Add Education
      </Link>
    </div>
  );
};

export default DashboardActions;
