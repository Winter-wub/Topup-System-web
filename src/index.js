import React, { setGlobal } from 'reactn';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'pretty-checkbox/src/pretty-checkbox.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

setGlobal({
	isLogin: false,
	role: 1,
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
