import {Howler} from 'howler';
const initialState = {
    current_volume: 0.2,
    previous_volume: 0.0
};

var volume  = function(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_VOLUME':
            console.log("volume changed to " + action.payload);
            Howler.volume(parseFloat(action.payload));
            return Object.assign({}, state, {current_volume: parseFloat(action.payload), previous_volume: 0.0});

        //mute unmute toggle reducer
        case 'MUTE_TOGGLE': 
            var previousVolume = state.previous_volume;
            var currentVolume = state.current_volume;
            Howler.volume(state.previous_volume);
            return Object.assign({}, state, {current_volume: previousVolume, previous_volume: currentVolume});

        default:
            return state;
    }
}

export default volume;