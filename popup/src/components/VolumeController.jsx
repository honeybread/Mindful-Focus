import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';


// component to control volume slider
// connects to volumeReducers in the Redux Store
class VolumeController extends React.Component{

    constructor({props}) {
        super(props);
        this.onVolumeChange = this.onVolumeChange.bind(this);
        this.onMuteUnmute = this.onMuteUnmute.bind(this);
    };

    onVolumeChange(e) {
        e.preventDefault();
        this.props.dispatch({type: 'CHANGE_VOLUME', payload: e.target.value});
    }

    onMuteUnmute(e) {
        e.preventDefault();
        this.props.dispatch({type: 'MUTE_TOGGLE'});     
    }

    render() {
        if (this.props.current_state){
            var defaultVolume = this.props.current_state.current_volume;
            var defaultVolumeIcon = this.props.current_state.current_volume_icon;
            
        } else {
            var defaultVolume = 0.2;
            var defaultVolumeIcon = './volume_low.png'
        }

        
        return(
            <div>
                <img src={defaultVolumeIcon} onClick={this.onMuteUnmute}/> <input type="range" value={defaultVolume} min="0" max="1" step="any"
                onChange={this.onVolumeChange} />
            </div>
        );
        
    };
}

const mapStateToProps = (state) => {
    return {
     current_state: state.volume
    };
 };

 export default connect(mapStateToProps)(VolumeController);
