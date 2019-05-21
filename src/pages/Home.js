import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SongItem from "../components/SongItem";
import Spinner from "react-spinkit";
import { checkSignIn, search } from "../actions";
import Song from "../components/Song"
import Player from "../components/Player.js";
import "./Home.css";

class Home extends Component {
    constructor() {
        super();
        this.handleOpenModal = this.handleOpenModal.bind(this);

        this.state = {
            song: "",
            openModal: false,
            songId: "",
            Token: ""
        };
    }
    componentWillMount() {
        this.props.checkSignIn();
    }
    getTokenPath() {
        let path = window.location.href;
        return path.substring(path.indexOf("#"), path.length);
    }
    handleOpenModal(e, data, tokenPath) {
        e.preventDefault();
        this.setState({ openModal: true })
        this.setState({ songId: data.songId })
        this.setState({ Token: tokenPath })
        console.log(" state=", this.state)
    }

    render() {
        const { song, songId, Token } = this.state;
        const { songs } = this.props;
        if (songs.type === "IS_FETCHING") {
            return <Spinner name="double-bounce" />;
        }
        return (
            <div className="container-fluid">
                <div className="row justify-content-center Home">
                    <div className="col-6 align-self-center">
                        <div className="card">
                            <div className="card-body">
                                <div className="Home__searchBox">
                                    <input
                                        type="text"
                                        className="Home__searchBox_input a"
                                        placeholder="Song"
                                        onChange={e => {
                                            this.setState({ song: e.target.value });
                                        }}
                                        value={song}
                                    />
                                    <a
                                        className="btn Home__SearchBox_btn"
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
                    songs.length > 0 ? <Song data={this.props} tokenPath={this.getTokenPath()} openModal={this.handleOpenModal} /> : null
                }
                {
                    this.state.openModal === true ? <Player song={songId} token={Token} /> : null
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        routes: state.routes,
        songs: state.player,
        openModal: state.openModal
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
)(Home);
