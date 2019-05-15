import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SongItem from "./SongItem";
import Spinner from "react-spinkit";
import { checkSignIn, search } from "../../actions";
import "../styles/style.css";

class Index extends Component {
  constructor() {
    super();
    this.state = {
      song: ""
    };
    this.getResultsCard = this.getResultsCard.bind(this);
  }
  componentWillMount() {
    this.props.checkSignIn();
  }
  getTokenPath() {
    let path = window.location.href;
    return path.substring(path.indexOf("#"), path.length);
  }
  getResultsCard() {
    const { songs } = this.props;
    if (songs.length > 0) {
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              {songs.map((currrentValue, index) => {
                return (
                  <SongItem
                    key={index}
                    songId={currrentValue.id}
                    tokenPath={this.getTokenPath()}
                    albumPhoto={currrentValue.album.images[0].url}
                    albumName={currrentValue.album.name}
                    songName={currrentValue.name}
                    artistName={currrentValue.artists[0].name}
                  />
                );
              })}
            </div>
          </div>
        </div>
      );
    }
  }
  render() {
    const { song } = this.state;
    const { songs } = this.props;

    if (songs.type === "IS_FETCHING") {
      return <Spinner name="double-bounce" />;
    }
    return (
      <div className="container-fluid Index">
        <div className="row">
          <div className="col-12">
            <h2 className="Index__Title">Search your Song</h2>
            <div class="card">
              <div class="card-body">
                <div className="Index__searchBox">
                  <input
                    type="text"
                    className="Index__searchBox-input"
                    placeholder="Cancion"
                    onChange={e => {
                      this.setState({ song: e.target.value });
                    }}
                    value={song}
                  />
                  <a
                    className="btn Index__SearchBox-input"
                    onClick={e => this.props.search(song)}
                  >
                    <i className="fa fa-search" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
          {this.getResultsCard()}
          </div>
        </div>
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
