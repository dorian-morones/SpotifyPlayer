import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SongItem from "./SongItem";
import Spinner from "react-spinkit";
import { checkSignIn, search } from "../../actions";
import Song from "../../components/Song"
import "../styles/style.css";

class Index extends Component {
  constructor() {
    super();
    this.state = {
      song: ""
    };
  }
  componentWillMount() {
    this.props.checkSignIn();
  }
  getTokenPath() {
    let path = window.location.href;
    return path.substring(path.indexOf("#"), path.length);
  }

  render() {
    const { song } = this.state;
    const { songs } = this.props;
    if (songs.type === "IS_FETCHING") {
      return <Spinner name="double-bounce" />;
    }
    return (
      <div className="container-fluid">
        <div className="row justify-content-center Index">
          <div className="col-6 align-self-center">
            <div class="card">
              <div class="card-body">
                <div className="Index__searchBox">
                  <input
                    type="text"
                    className="Index__searchBox_input a"
                    placeholder="Song"
                    onChange={e => {
                      this.setState({ song: e.target.value });
                    }}
                    value={song}
                  />
                  <a
                    className="btn Index__SearchBox_btn"
                    onClick={e => this.props.search(song)}
                  >
                    <i className="fa fa-search" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          songs.length > 0 ? <Song data={this.props} tokenPath={this.getTokenPath()}/> : null
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    routes: state.routes,
    songs: state.player
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      checkSignIn,
      search
    },
    dispatch
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
