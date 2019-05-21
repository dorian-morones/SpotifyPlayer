const initialState = {
    songs: [],
    search: '',
    player: [],
    err: null, 
}

export default function player(state = initialState, action) {
    switch (action.type) {
        case "COMPLETE_FETCH":
            return {...state, songs: action.payload}
        case "ERROR_FETCH":
            return {...state, err}
        case "COMPLETE_SONG":
            return {...state, player: action.payload}
        case "IS_FETCHING":
            return {...state}
        default:
            return state;
    }
}