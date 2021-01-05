import React from "react";
import PropTypes from "prop-types";

function ProfileTop(props) {
  const { status, company, location, website, social } = props.profile;
  const { name, avatar } = props.profile.user;
  return (
    <div className="profile-top bg-primary p-2">
      <img className="round-img my-1" src={avatar} alt="" />
      <h1 className="large">{name}</h1>
      <p className="lead">
        {status} {company && <span> at {company}</span>}
      </p>
      <p>{location && <span>{location}</span>}</p>

      <div className="icons my-1">
        {website && (
          <a href={website} target="_blank" rel="noopener noreferrer">
            <i className="fa fa-globe"></i>
          </a>
        )}

        {social && social.twitter && (
          <a href={social.twitter} target="_blank" rel="noopener noreferrer">
            <i className="fa fa-twitter"></i>
          </a>
        )}

        {social && social.facebook && (
          <a href={social.facebook} target="_blank" rel="noopener noreferrer">
            <i className="fa fa-facebook"></i>
          </a>
        )}

        {social && social.youtube && (
          <a href={social.youtube} target="_blank" rel="noopener noreferrer">
            <i className="fa fa-youtube"></i>
          </a>
        )}

        {social && social.linkedIn && (
          <a href={social.linkedIn} target="_blank" rel="noopener noreferrer">
            <i className="fa fa-linkedin"></i>
          </a>
        )}

        {social && social.instagram && (
          <a href={social.instagram} target="_blank" rel="noopener noreferrer">
            <i className="fa fa-instagram"></i>
          </a>
        )}
      </div>
    </div>
  );
}

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
