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
        <div className="row Songs">
            {songs.map((currrentValue, index) => {
              return (
                <SongItem
                  key={index}
                  songId={currrentValue.id}
                  tokenPath={this.getTokenPath()}
                  albumPhoto={currrentValue.album.images[0].url}
                  albumName={currrentValue.album.name}
                  songName={currrentValue.name}
                  release_date={currrentValue._album.release_date}
                  artistName={currrentValue.artists[0].name}
                />
              );
            })}
        </div>
      );
    }
  }
  render() {
    const { song } = this.state;
    const { songs } = this.props;
    console.log(this.props)
    if (songs.type === "IS_FETCHING") {
      return <Spinner name="double-bounce" />;
    }
    return (
      <div className="container-fluid">
        <div className="row justify-content-start Index">
          <div className="col-6 align-self-center">
            <h2 className="Index__Title">Search your Song</h2>
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
        {this.getResultsCard()}
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
