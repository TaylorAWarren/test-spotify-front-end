import React, { Component } from "react";
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();
class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '', timestamp: '' }
    }
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }
  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        if(response.nowPlaying){this.setState({
          nowPlaying: {
            name: response.item.name,
            albumArt: response.item.album.images[0].url,
            timestamp: response.progress_ms
          }
        });}
      })
  }

  render() {

    return (
      <div className="App">
        <a href='http://localhost:8888'> Login to Spotify </a>
        <div>
          Now Playing: {this.state.nowPlaying.name}
        </div>
        <div>
          Timestamp: {this.state.nowPlaying.timestamp}
        </div>
        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }} />
        </div>
        {this.state.loggedIn &&
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
        </button>
        }
      </div>
    );
  }
}

export default App;