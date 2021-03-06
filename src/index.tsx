/* eslint-disable import/no-unresolved */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// eslint-disable-next-line import/extensions
import { AuthState } from 'context/auth';
import App from './App';
// import './utils/i18n';
// eslint-disable-next-line import/extensions
import reportWebVitals from './reportWebVitals';
import './styles/main_global.scss';

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<AuthState>
				<App />
			</AuthState>
		</Router>
	</React.StrictMode>,
	document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
