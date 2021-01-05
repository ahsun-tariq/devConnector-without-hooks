import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Alert extends Component {
  static propTypes = {
    alerts: PropTypes.array.isRequired,
  };

  // constructor(props) {
  //   super(props);
  // }

  render() {
    const alerts = this.props.alerts;
    if (alerts !== null && alerts.length > 0) {
      return alerts.map((alert) => (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
          {alert.msg}
        </div>
      ));
    }
    return <div></div>;
  }
}

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
