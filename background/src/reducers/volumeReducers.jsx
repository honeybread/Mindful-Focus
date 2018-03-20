const initialState = {
    current_volume: undefined,
}

var volume  = function(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_VOLUME':
            return Object.assign({}, state, {current_volume: action.payload});

        default:
            return state;
    }
}

export default volume;