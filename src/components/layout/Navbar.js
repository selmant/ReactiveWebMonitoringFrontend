import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
class Navbar extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return (
      <nav>
        <div class="nav-wrapper blue">
          <Link
            to="/"
            style={{
              fontFamily: "monospace",
            }}
            className="col s5 brand-logo center black-text"
          >
            <i className="material-icons">book</i>
            Article Monitoring
          </Link>
          <NavElements element={this}auth={this.props.auth}></NavElements>
        </div>
      </nav>
    );
  }
}
const NavElements = (props) => {
  if(!props.auth.isAuthenticated)
  return (
    <ul id="nav-mobile" class="right hide-on-med-and-down">    
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>
  );
  else
  return(
    <ul id="nav-mobile" class="right hide-on-med-and-down">    
      <li><Link onClick={props.element.onLogoutClick}>{props.auth.user.username} Logut</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>
  )
};

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {logoutUser})(Navbar);
