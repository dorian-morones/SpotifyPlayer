import axios from 'axios'
import { TrackHandler, Client } from 'spotify-sdk'

let client = Client.instance;
client.settings = {
  clientId: '5d2e145b33ac4c2087ef39a5e140c574',
  secretId: '4c70c6769737421288342c69c66ddd61',
  scopes: ['user-follow-modify user-follow-read user-library-read user-top-read'],
  redirect_uri: 'http://localhost:3000/'
}

export const checkSignIn = () => {
  return (dispatch, getState) => {
    if (sessionStorage.token) {
      client.token = sessionStorage.token;
    } else if (window.location.hash.split('&')[0].split('=')[1]) {
      sessionStorage.token = window.location.hash.split('&')[0].split('=')[1];
      client.token = sessionStorage.token;
    } else {
      client.login()
        .then(url => {
          window.location.href = url;
        });
    }
  }
}

const startFetch = () => { return { type: "IS_FETCHING", isFetching: true } };
const errorFetch = (err) => { return { type: 'ERROR_FETCH', isFetching: false, err } };
const completeFetch = (data) => { return { type: 'COMPLETE_FETCH', isFetching: false, payload: songs } };

export const search = (trackName) => {
  return (dispatch, getState) => {
    dispatch(startFetch());
    let track = new TrackHandler();
    track.search(trackName, { limit: 6 })
      .then(trackCollection => {
        dispatch(completeFetch(trackCollection));
      })
      .catch(err => {
        dispatch(errorFetch(err));
      });
  }
}


const completeSong = (data) => { return { type: "COMPLETE_SONG", success: true, isFetching: false, payload: data } };

export const playTrack = (songId) => {
  console.log(songId)
  return ( dispatch, getState ) => {
    dispatch(startFetch());
    axios.get('https://api.spotify.com/v1/tracks/'.concat( songId ),{ headers: {"Authorization" : 'Bearer ' + client.token }} )
    .then( response => {
      console.log(response.data)
        // dispatch(completeSong(response.data));
    })
    .catch( err => {
        console.log(err);
    });
  }}