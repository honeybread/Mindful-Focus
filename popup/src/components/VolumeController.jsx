import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';


// component to control volume slider
// connects to volumeReducers in the Redux Store
class VolumeController extends React.Component{

    constructor(props) {
        super(props);
        this.onVolumeChange = this.onVolumeChange.bind(this);
    };

    onVolumeChange(e) {
        e.preventDefault();
        this.props.dispatch({type: 'CHANGE_VOLUME', payload: e.target.value});
    }

    render() {
        return(
            <div>
            Volume <input type="range" min="0" max="1" step="any" 
                onChange={this.onVolumeChange}/>
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