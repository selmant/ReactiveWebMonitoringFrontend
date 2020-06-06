import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Observers.css";

class Observers extends Component {
  state = {
    JsonResponses: [],
  };

  urlFromArgs = (args) => {
    return (
      "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmax=999999999&api_key=f3ddb4c1de06900a117c889d4cfbf0666808&term=" +
      args
    );
  };

  getJsonESummary = (id) => {
    var instance = axios.create();
    instance.defaults.headers.common = {};
    var obj;
    for (var i = 0; i < this.state.JsonResponses.length; i++) {
      if (this.state.JsonResponses[i].id == id) {
        obj = this.state.JsonResponses[i];
        break;
      }
    }
    if (obj != null) return obj;
    else {
      require("axios-debug-log");
      instance
        .get(
          "https://www.ncbi.nlm.nih.gov/research/bionlp/RESTful/pubmed.cgi/BioC_json/"+id+"/ascii",{timeout:1000}
        )
        .then((res) => {
          this.setState([...this.state.JsonResponses, { id: id, data: res }]);
          return JSON.parse(res.data);
        })
        .catch((err) => {
          console.log(err);
          return null;
        });
    }
  };
  componentWillUpdate()
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.pub.current == null) return false;
    if (nextProps.pub.current != this.props.pub.current) return true;
    console.log("shouldComponentUpdate " + nextProps.pub.current);
    var nextChanges, currentChanges;
    for (var change in nextProps.pub.changes.changes) {
      if (
        nextProps.pub.changes.changes[change].url ==
        this.urlFromArgs(this.props.pub.current)
      )
        nextChanges = nextProps.pub.changes.changes[change];
    }
    currentChanges = this.state.JsonResponses;
    console.log("shouldComponentUpdate " + nextChanges);
    console.log("shouldComponentUpdate " + currentChanges);
    if (nextChanges != null && currentChanges == null) return true;
    if (
      nextChanges != null &&
      currentChanges != null &&
      nextChanges.length != currentChanges.length
    )
      return true;

    return false;
  }

  changesForCurrent() {
    for (var change in this.props.pub.changes.changes) {
      if (
        this.props.pub.changes.changes[change].url ==
        this.urlFromArgs(this.props.pub.current)
      )
        return this.props.pub.changes.changes[change];
    }
  }

  render() {
    return (
      <div class="responsive-table table-status-sheet">
        <table class="bordered striped responsive-table">
          <thead>
            <tr>
              <th class="center">ID</th>
              <th class="center">Title</th>
              <th class="center">Publish Date</th>
              <th class="center">Link</th>
            </tr>
          </thead>
          {this.props.pub.current != null && this.changesForCurrent() && (
            <Changes
              getJsonESummary={this.getJsonESummary}
              changes={this.changesForCurrent()}
            />
          )}
        </table>
      </div>
    );
  }
}
const Changes = (props) => {
  const changes = props.changes.changes.map((ID, index) => {
    return (
      <Row getJsonESummary={props.getJsonESummary} ID={ID} index={index} />
    );
  });
  return <tbody>{changes}</tbody>;
};

const Row = (props) => {
  var id = props.ID;
  var obj = props.getJsonESummary(id);
  //var authors = obj.id.authors.map((author) => author.name);
  return (
    <tr>
      <td>{id}</td>
      <td>{obj.documents.passages[0].text}</td>
      <td>{obj.date}</td>
      <td>
        <a href={"https://pubmed.ncbi.nlm.nih.gov/" + id}>Click</a>
      </td>
    </tr>
  );
  /*(
    <tr>
      <td>{id}</td>
      <td>{obj.id.title}</td>
      <td>{authors.join(", ")}</td>
      <td>{obj.id.pubdate}</td>
      <td>
        <Link to={"https://pubmed.ncbi.nlm.nih.gov/" + id}>Click</Link>
      </td>
    </tr>
  );*/
};
Observers.propTypes = {
  pub: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  pub: state.pub,
});
export default connect(mapStateToProps, {})(Observers);
