import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./SongItem.css";

class SongItem extends Component {
  render() {
    console.log("SongItem", this.props)
    const { songName, tokenPath, albumPhoto, artistName, songId, release_date } = this.props;
    return (
      <div className="col-4">
        <div className="SongItem">
          <div className="card mb-3">
            <div className="row">
              <div className="col-md-5">
                <img src={albumPhoto} alt={songName} className="card-img" />
              </div>
              <div className="col-md-7">
                <div className="card-body">
                  <h2>
                    <i className="fa fa-music" />{songName}
                  </h2>
                  <h3>
                    <i className="fa fa-microphone" />{artistName}
                  </h3>
                  <p className="card-text">
                    <small className="text-muted">
                      Release Date: {release_date}
                    </small>
                  </p>
                  {/* <Link to={"player/" + songId + tokenPath} className="btn-play">
                    Play <i className="fa fa-play"/>
                  </Link> */}
                  <button onClick={this.props.openModal} type="button" className="btn btn-dark btn-play">Play <i className="fa fa-play"/></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SongItem.propTypes = {
  songId: PropTypes.string,
  tokenPath: PropTypes.string,
  albumPhoto: PropTypes.string,
  songName: PropTypes.string,
  artistName: PropTypes.string
};

export default SongItem;
