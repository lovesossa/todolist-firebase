import React from 'react';
import {
	Routes,
	Route,
	useLocation,
} from 'react-router-dom';

import { PrivateRoute } from 'components/PrivateRoute';
import * as PAGES from './pages';

const App = () => {
	const location = useLocation();

	return (
		<div className="base">
			<Routes location={location}>
				<Route element={<PAGES.SignInPage />} path="/sign-in" />
				<Route element={<PAGES.SignUpPage />} path="/sign-up" />
				<Route
					element={(
						<PrivateRoute>
							<PAGES.Homepage />
						</PrivateRoute>
					)}
					path="/"
					exact
				/>
			</Routes>
		</div>
	);
};

export default App;
