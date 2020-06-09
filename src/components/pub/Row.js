import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setJsonResponse } from "../../actions/pubActions";
import api from "../../utils/api.js";
class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    var id = this.props.id;
    var data;
    for (var i = 0; i < this.props.pub.jsons.length; i++) {
      if (this.props.pub.jsons[i].id == id) {
        data = this.props.pub.jsons[i].data;
        this.setState({ data: data });
        break;
      }
    }
    if (data == null) {
      require("axios-debug-log");
      api
        .get(
          "https://www.ncbi.nlm.nih.gov/research/bionlp/RESTful/pubmed.cgi/BioC_json/" +
            id +
            "/ascii",
          { timeout: 10000 }
        )
        .then((res) => {
          this.props.setJsonResponse({ id: id, data: res });
          this.setState({ data: res });
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  dateFromNumber(number){

  }
  //var authors = obj.id.authors.map((author) => author.name);
  render() {
    console.log(this.state.data);
    if (this.state.data) {
      console.log(this.props.pub.jsons);
      return (
        <tr>
          <td>{this.props.index}</td>
          <td>{this.props.id}</td>
          <td>{this.state.data.data.documents[0].passages[0].text}</td>
          <td>{this.state.data.data.date}</td>
          <td>
            <a href={"https://pubmed.ncbi.nlm.nih.gov/" + this.props.id + 1}>
              Click
            </a>
          </td>
        </tr>
      );
    } else
      return (
        <tr>
          <td>{this.props.index + 1}</td>
          <td>{this.props.id}</td>
          <td>Loading..</td>
          <td>Loading..</td>
          <td>Loading..</td>
        </tr>
      );
  }
}
Row.propTypes = {
  pub: PropTypes.object.isRequired,
  setJsonResponse: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  pub: state.pub,
});
export default connect(mapStateToProps, { setJsonResponse })(Row);
