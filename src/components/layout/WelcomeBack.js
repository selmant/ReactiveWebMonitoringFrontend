import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class WelcomeBack extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  onProceedClick = (e) =>{
    e.preventDefault();
    window.location.href = "./queries"
  }

  render() {
    const { user } = this.props.auth;
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
            <p className="flow-text grey-text text-darken-1">
              <b>Hey there,</b> <i>{user.username}</i>
            </p>
              <p className="flow-text grey-text text-darken-1">
                You are logged into {" "}
                <span style={{ fontFamily: "monospace" }}>Article Monitoring</span> app. If you are not <i>{user.username}</i>, please logout by pressing <b>Logout</b> button.
              </p>
              <p className="flow-text grey-text text-darken-1">If you are <i>{user.username}</i> you can proceed to app by <b>Proceed</b> button.</p>
            </h4>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                margin: "1rem",
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
                
              Logout
            </button>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                margin: "1rem",
              }}
              onClick={this.onProceedClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
                
              Proceed
            </button>
          </div>
        </div>
      </div>
    );
  }
}

WelcomeBack.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(WelcomeBack);
