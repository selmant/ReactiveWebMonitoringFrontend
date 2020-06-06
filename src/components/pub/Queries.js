import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  setQueries,
  setChanges,
  setCurrentQuery,
} from "../../actions/pubActions";
import { loginUser } from "../../actions/authActions";
import Observers from "./Observers";
import "./Queries.css";

class Queries extends Component {
  state = {};

  urlFromArgs = (args) => {
    
    return "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmax=999999999&api_key=f3ddb4c1de06900a117c889d4cfbf0666808&term="+args;
  };

  argsFromUrl = (url) => {
    var n = url.indexOf("&term");
    return url.substring(n + 6);
  };
  handleSubmit = (query) => {
    axios.post(`/api/pub/subscribe`, query).then((res) => {
      this.props.setQueries([...this.props.pub.queries, query]);
    });
  };

  handleDelete = (index) => {
    const newArr = [...this.props.pub.queries];
    const deletedItem = newArr[index];

    axios.post(`/api/pub/unsubscribe`, deletedItem).then((res) => {
      newArr.splice(index, 1);
      this.props.setQueries(newArr);
    });
  };

  handleChangeQuery = (url) => {
    this.props.setCurrentQuery(url);
    console.log(this.props.pub);
  };
  getChangeCount =(query) =>{
    var url = this.urlFromArgs(query);
    for (let i = 0; i < this.props.pub.changes.length; i++) {
      const element = this.props.pub.changes[i];
      if(element.url == url) return element.changes.length;
    }
    return 0;
  }
  componentDidMount() {
    var data = {
      username: localStorage.username,
      password: localStorage.password,
    };

    require("axios-debug-log");
    axios.get(`/api/pub/querylist`).then((res) => {
      const queries = res.data.map((url) => this.argsFromUrl(url));
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
        });
    }, 10000);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s6 offset-s3 center-align">
            <QueryList
              queries={this.props.pub.queries}
              onDelete={this.handleDelete}
              onQueryChange={this.handleChangeQuery}
              getChangeCount={this.getChangeCount}
            />
            <SubmitForm onFormSubmit={this.handleSubmit} />
          </div>
          <div className="col s12 center-align">
            <Observers />
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
      <Query
        content={query}
        key={index}
        id={index}
        onDelete={props.onDelete}
        onQueryChange={props.onQueryChange}
        count={props.getChangeCount(query)}
      />
    );
  });
  return (
    <ul class="collection with-header">
      <Header />
      {queries}
    </ul>
  );
};

const Query = (props) => {
  return (
    <a class="collection-item">
      <div onClick={() => props.onQueryChange(props.content)}>
        {props.content}
        <a class="secondary-content">
          {" "}
          <div class="changesBox">{props.count}</div>
        </a>
        <a onClick={() => props.onDelete(props.id)} class="secondary-content">
          {" "}
          <i class="material-icons">delete</i>
        </a>
      </div>
    </a>
  );
};

Queries.propTypes = {
  loginUser: PropTypes.func.isRequired,
  setQueries: PropTypes.object.isRequired,
  setChanges: PropTypes.object.isRequired,
  setCurrentQuery: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  pub: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  pub: state.pub,
});
export default connect(mapStateToProps, {
  setQueries,
  setChanges,
  loginUser,
  setCurrentQuery,
})(Queries);
