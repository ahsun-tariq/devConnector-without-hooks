import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function ProfileItem(props) {
  const { _id, name, avatar } = props.profile.user;
  const { status, company, location, skills } = props.profile;
  return (
    <div className="profile bg-light">
      <img src={avatar} alt="" className="round-img" />
      <div>
        <h2>{name}</h2>
        {status} {company && <span>at {company}</span>}
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          {" "}
          View Profile
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fa fa-check-circle" />
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
