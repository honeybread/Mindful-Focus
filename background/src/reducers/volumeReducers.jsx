import {Howler} from 'howler';
const initialState = {
    current_volume: 0.2,
    previous_volume: 0.0,
    current_volume_icon: './volume_low.png'
};

var volume  = function(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_VOLUME':
            console.log("volume changed to " + action.payload);

            if (parseFloat(action.payload) === 0.0) {
                var currentVolumeIcon = './volume_mute.png'
            } else if (parseFloat(action.payload) <= 0.5) {
                var currentVolumeIcon ='./volume_low.png'
            } else {
                var currentVolumeIcon ='./volume_high.png'
            }
            
            Howler.volume(parseFloat(action.payload));
            
            return Object.assign({}, state, {current_volume: parseFloat(action.payload), previous_volume: 0.0, current_volume_icon: currentVolumeIcon});

        //mute unmute toggle reducer
        case 'MUTE_TOGGLE': 
            var previousVolume = state.previous_volume;
            var currentVolume = state.current_volume;

            if (previousVolume === 0.0) {
                var currentVolumeIcon = './volume_mute.png'
            } else if (previousVolume <= 0.5) {
                var currentVolumeIcon ='./volume_low.png'
            } else {
                var currentVolumeIcon ='./volume_high.png'
            }

            Howler.volume(state.previous_volume);
            
            return Object.assign({}, state, {current_volume: previousVolume, previous_volume: currentVolume, current_volume_icon: currentVolumeIcon});

        case 'SWITCH_OFF_VOLUME':
            Howler.volume(0.0);
            return state;

        default:
            return state;
    }
}

export default volume;