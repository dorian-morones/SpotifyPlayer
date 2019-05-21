import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SongItem from "../components/SongItem";

function Song(props) {
  let songs = props.data.songs;
  return (
    <div className="row Songs">
      {songs.map((currrentValue, index) => {
        //console.log("Song", currrentValue)
        return (
          <SongItem
            key={index}
            songId={currrentValue.id}
            tokenPath={props.tokenPath}
            albumPhoto={currrentValue.album.images[0].url}
            albumName={currrentValue.album.name}
            songName={currrentValue.name}
            release_date={currrentValue._album.release_date}
            artistName={currrentValue.artists[0].name}
            openModal={props.openModal}
          />
        );
      })}
    </div>
  );
}

export default Song;
