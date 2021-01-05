import PropTypes from "prop-types";
import React from "react";
import Moment from "react-moment";

function ProfileEducation(props) {
  const {
    school,
    degree,
    fieldOfStudy,
    current,
    to,
    from,
    description,
  } = props.education;
  return (
    <div>
      <h3 className="text-dark">{school}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
        {!to ? " Present" : <Moment format="YYYY/MM/DD">{to}</Moment>}
      </p>
      <p>
        <strong>Field of Study:</strong>
        {fieldOfStudy}
      </p>
      <p>
        <strong>Description: </strong>
        {description}
      </p>
    </div>
  );
}

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
};

export default ProfileEducation;
