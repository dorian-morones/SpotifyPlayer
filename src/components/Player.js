import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { playTrack, checkSignIn } from "../actions";
import "./Player.css";

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songId: this.props.match.params.songId
        };
    }
    componentWillMount() {
        this.props.checkSignIn();
        this.props.playTrack(this.state.songId);
    }
    render() {
        const { player } = this.props;

        if (player.type === "COMPLETE_SONG") {
            return (
                <div className="Player">
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-5">
                                <img src={player.payload.album.images[0].url} />
                                <div className="data">
                                    <p>
                                        <i className="fa fa-music" /> {player.payload.name}
                                    </p>
                                    <p>
                                        <i className="fa fa-microphone" />
                                        {player.payload.artists[0].name}
                                    </p>
                                    <audio controls>
                                        <source src={player.payload.preview_url} />
                                    </audio>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return <div />;
    }
}

function mapStateToProps(state) {
    return {
        routes: state.routes,
        player: state.player
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            checkSignIn,
            playTrack
        },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Player);
