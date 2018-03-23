import {createStore} from 'redux';
import reducers from './reducers/combineReducers.jsx';
import {wrapStore} from 'react-chrome-redux';
import {Howl, Howler} from 'howler';

const updateTimerInterval = 1000;

const store =  createStore(reducers);
const indianBellUrl = 'https://drive.google.com/uc?export=download&id=1mQwcPRN7bpxe1c2poeXCKmmte9Vzqagy';


wrapStore(store, {
    portName: 'FS'
});

// invokes updateBadge function every second
var startTimer = () => {
    updateBadge();
    var timerId = window.setTimeout(startTimer, updateTimerInterval);
}

// zero pads single digit minutes
var pad = (d) => {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

// plays indian bells when invoked
var playIndianBell = () => {
    var bell = new Howl({
        src: ['./indianBell.mp3']
    });
    // audio.volume = storeState.volume.current_volume
    bell.play();
}

// updates timer on badge when invoked and rings the selected bell when time is up
var updateBadge = () => {
    var storeState = store.getState();
    store.dispatch({type:'UPDATE_TIMER'});
    
  
    if (storeState.reminder.time_until_alert) {
        var badgeMinutes = storeState.reminder.time_until_alert.getMinutes();
        var badgeSeconds = storeState.reminder.time_until_alert.getSeconds();

        if ((badgeMinutes === 0) && (badgeSeconds === 0)) {
            store.dispatch({type: 'RESET_TIMER'});
            playIndianBell();
        }

        var badgeText = badgeMinutes +  ":" + pad(badgeSeconds);
        chrome.browserAction.setBadgeText({text: badgeText});
    }  else {
        chrome.browserAction.setBadgeText({text: ""});
        chrome.browserAction.setBadgeBackgroundColor({color: [100, 59, 248, 1] }); /*[100, 59, 248, 0.966] --interesting 0.966 transparency is not working hence set to 1*/ 
    }
    
}

startTimer();

export default startTimer;