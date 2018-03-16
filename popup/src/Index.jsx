 
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import {Store} from 'react-chrome-redux';
import {Provider} from 'react-redux'

const proxyStore = new Store({
    state: {},
    portName: 'FS'
});

document.body.style.opacity = 0;
document.body.style.transition = 'opacity ease-out .4s';
requestAnimationFrame(function() {
  document.body.style.opacity = 1;
});

ReactDOM.render(<Provider store= {proxyStore}>  
                    <App/> 
                </Provider>, document.getElementById("app"));
