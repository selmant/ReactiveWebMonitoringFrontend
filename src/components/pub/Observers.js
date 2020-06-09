import React, { Component} from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Row from "./Row"
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

  getJsonESummary = async (id) => {
    var instance = axios.create();
    instance.defaults.headers.common = {};

    try {
    const res = await instance
      .get("https://www.ncbi.nlm.nih.gov/research/bionlp/RESTful/pubmed.cgi/BioC_json/" + id +
        "/ascii", { timeout: 10000 });
    this.setState([...this.state.JsonResponses, { id: id, data: res }]);
    return res;
    }
    catch (err) {
      console.log(err);
    }
    
  };
  shouldComponentUpdate(nextProps, nextState) {
    return true;
    if (nextState.JsonResponses.length != this.state.JsonResponses.length)
      return true;
    if (nextProps.pub.current != this.props.pub.current) return true;
    console.log("shouldComponentUpdate " + nextProps.pub.current);
    var nextChanges, currentChanges;
    for (var change in nextProps.pub.changes) {
      if (
        nextProps.pub.changes[change].url ==
        this.urlFromArgs(this.props.pub.current)
      )
        nextChanges = nextProps.pub.changes[change];
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
    var changes = []
    for (var change in this.props.pub.changes) {
      if (this.props.pub.changes[change].url == this.urlFromArgs(this.props.pub.current)){
        console.log(this.props.pub.changes[change]);
        changes = changes.concat(this.props.pub.changes[change].changes);
      }
        
    }
    return changes;
  }

  render() {
    return (
      <div class="responsive-table table-status-sheet">
        <table class="bordered striped responsive-table">
          <thead>
            <tr>
              <th class="center">Index</th>
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
              jsons={this.state.JsonResponses}
            />
          )}
        </table>
      </div>
    );
  }
}
const Changes = (props) => {
  console.log(props);
  const changes = props.changes.map((ID, index) => {
    return (
      <Row getJsonESummary={props.getJsonESummary} jsons={props.jsons} id={ID} index={index} />
    );
  });
  return <tbody>{changes}</tbody>;
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
