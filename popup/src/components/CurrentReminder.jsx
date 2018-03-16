import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

const CurrentReminder = (props) => {
    return(
        <div>
            {props.reminderTime? (<div>
                                    Current Reminder Frequency: {props.reminderTime} min(s)
                                  </div>
                                  ):
                                  (<div>
                                      No Reminder Set Yet
                                   </div>)}

        </div>
    )
};

export default CurrentReminder;