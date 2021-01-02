import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Dashboard extends Component {
  static propTypes = {
    prop: PropTypes,
  };

  render() {
    return <div>Dashboard</div>;
  }
}

export default connect(null, {})(Dashboard);
