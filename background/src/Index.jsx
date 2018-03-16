import {createStore} from 'redux';
import reducers from './reducers/combineReducers.jsx';
import {wrapStore} from 'react-chrome-redux';
const updateTimerInterval = 1000;

const store =  createStore(reducers);
const indianBellUrl = 'https://drive.google.com/uc?export=download&id=1mQwcPRN7bpxe1c2poeXCKmmte9Vzqagy';


wrapStore(store, {
    portName: 'FS'
});

var startTimer = () => {
    updateBadge();
    var timerId = window.setTimeout(startTimer, updateTimerInterval);
}

var pad = (d) => {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

var playIndianBell = () => {
    var audio = new Audio(indianBellUrl);
    audio.play();
}

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
        chrome.browserAction.setBadgeBackgroundColor({color: [94, 94, 248, 1]});
    }
    
}

startTimer();

export default startTimer;