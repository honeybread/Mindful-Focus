import {combineReducers} from 'redux';
import reminder from './reminderReducer.jsx';
import volume from './volumeReducers.jsx';

const reducers = combineReducers({
   reminder,
   volume
})

export default reducers;

