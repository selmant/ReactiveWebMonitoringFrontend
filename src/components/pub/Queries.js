import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setQueries, setChanges } from "../../actions/pubActions";
import { loginUser } from "../../actions/authActions";
import Observators from "./Observators";

class Queries extends Component {
  state = {
  };

  handleSubmit = (query) => {
    this.props.setQueries([...this.props.pub.queries, query]);
  };

  handleDelete = (index) => {
    const newArr = [...this.props.pub.queries];
    newArr.splice(index);
    this.props.setQueries(newArr);
  };

  componentDidMount() {
    var data = {
      username: localStorage.username,
      password: localStorage.password,
    };

    require("axios-debug-log");
    axios.get(`/api/pub/querylist`).then((res) => {
      const queries = res.data.map((query) => {
        var n = query.indexOf("&term");
        console.log(this.props.auth.user);
        return query.substring(n + 6);
      });
      this.props.setQueries(queries);
    });

    setInterval(() => {
      require("axios-debug-log");
      axios
        .get(`/api/pub/check`)
        .then((res) => {
          if (res.data["changes"].length > 0) this.props.setChanges(res.data);
        })
        .catch((err) => {
          console.log(err);
          this.props.loginUser(data);
        });
    }, 10000);
  }

  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <QueryList
              queries={this.props.pub.queries}
              onDelete={this.handleDelete}
            />
            <SubmitForm onFormSubmit={this.handleSubmit} />
          </div>
        </div>
      </div>
    );
  }
}

class SubmitForm extends React.Component {
  state = { term: "" };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.term === "") return;
    this.props.onFormSubmit(this.state.term);
    this.setState({ term: "" });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          className="input"
          placeholder="Enter Query"
          value={this.state.term}
          onChange={(e) => this.setState({ term: e.target.value })}
        />
        <button className="button">Submit</button>
      </form>
    );
  }
}

const Header = (props) => {
  return (
    <li class="collection-header">
      <h5>Queries</h5>
    </li>
  );
};

const QueryList = (props) => {
  const queries = props.queries.map((query, index) => {
    return (
      <Query content={query} key={index} id={index} onDelete={props.onDelete} />
    );
  });
  return (
    <ul class="collection with-header">
      <Header/>
      {queries}
    </ul>
  );
};

const Query = (props) => {
  return (
    <li class="collection-item">
      <div className>
        {props.content}
        <i
          onClick={() => {
            props.onDelete(props.id);
          }}
          class="material-icons"
        >
          delete
        </i>
      </div>
    </li>
  );
};

Queries.propTypes = {
  loginUser: PropTypes.func.isRequired,
  setQueries: PropTypes.object.isRequired,
  setChanges: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  queries: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  pub: state.pub,
});
export default connect(mapStateToProps, { setQueries, setChanges, loginUser })(
  Queries
);
