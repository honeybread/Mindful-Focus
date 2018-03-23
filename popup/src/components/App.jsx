import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import CurrentReminder from './CurrentReminder.jsx'
import VolumeController from './VolumeController.jsx'

class App extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        var reminder_time = undefined;

        if (this.props.current_state.reminder) {
            var reminder_time = this.props.current_state.reminder.current_reminder
        }
        return (<div>
                    <h1>  Mindful Bells </h1>

                    <div className="float-card">
                        <CurrentReminder reminderTime={reminder_time}/>
                    </div>
                        
                    <div className="float-card">
                        <VolumeController volume={this.props.current_state.volume}/>
                    </div>

                    <form name="setReminderForm" className="float-card" onSubmit={(e) => {e.preventDefault();
                                                                    this.props.dispatch({type: 'SET_REMINDER'});
                                                                    document.setReminderForm.reset();
                                                                    }}>
                        <label> Enter Reminder Frequency In Minutes: </label>
                        <input className="float-input" type="number" min="1" max="60" required onChange={(e) => {this.props.dispatch({type: 'CHANGE_REMINDER_INPUT', payload: e.target.value})}}/>
                        <input className="float-button" type="submit" value="Submit"/>
                    </form>
                    <button className="float-button" onClick={(e) => {e.preventDefault();
                                                                      this.props.dispatch({type: 'SWITCH_OFF_TIMER'});
                                                                      this.props.dispatch({type: 'SWITCH_OFF_VOLUME'});
                                                                      window.close();
                                                                      }}> Switch Off Bells</button>
                </div>);
    }
}

const mapStateToProps = (state) => {
   return {
    current_state: state
   };
};
export default connect(mapStateToProps)(App);