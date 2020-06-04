import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Observators extends Component {
  state = {};

  handleSubmit = (query) => {
    this.setState({ queries: [...this.state.queries, query] });
  };

  componentDidMount() {}

  render() {
    return (
      <div className="col s12 center-align">
        <div></div>
      </div>
    );
  }
}
