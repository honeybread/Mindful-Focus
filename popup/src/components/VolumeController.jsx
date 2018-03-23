import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';


// component to control volume slider
// connects to volumeReducers in the Redux Store
class VolumeController extends React.Component{

    constructor({props}) {
        super(props);
        this.state = {volume_icon: './volume_unmute.png'}
        this.onVolumeChange = this.onVolumeChange.bind(this);
        this.onMuteUnmute = this.onMuteUnmute.bind(this);
    };

    onVolumeChange(e) {
        e.preventDefault();
        if (parseFloat(e.target.value) === 0.0){
            this.setState({volume_icon: './volume_mute.png'});
        } else {
            this.setState({volume_icon: './volume_unmute.png'});
        }
        this.props.dispatch({type: 'CHANGE_VOLUME', payload: e.target.value});
    }

    onMuteUnmute(e) {
        e.preventDefault();
        this.props.dispatch({type: 'MUTE_TOGGLE'});
        if (this.state.volume_icon == './volume_unmute.png'){
            this.setState({volume_icon: './volume_mute.png'})
        } else {
            this.setState({volume_icon: './volume_unmute.png'})
        }
            
    }

    render() {
        if (this.props.current_state){
            var defaultVolume = this.props.current_state.current_volume;
        } else {
            var defaultVolume = 0.2;
        }
        console.log(defaultVolume);
        
        return(
            <div>
                <img src={this.state.volume_icon} onClick={this.onMuteUnmute}/> <input type="range" value={defaultVolume} min="0" max="1" step="any"
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
