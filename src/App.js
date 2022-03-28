import React, { useEffect } from 'react';
import {
	Routes,
	Route,
	useLocation,
} from 'react-router-dom';

import { collection, addDoc, getDocs } from 'firebase/firestore';
import { firebaseDB } from 'utils/firebase';

import { PrivateRoute } from 'components/PrivateRoute';
import * as PAGES from './pages';

const App = () => {
	const location = useLocation();

	// const addData = async () => {
	// 	try {
	// 		const docRef = await addDoc(collection(firebaseDB, 'users'), {
	// 			first: 'Ada',
	// 			middle: 'Mathison',
	// 			last: 'Lovelace',
	// 			born: 1815,
	// 		});
	// 		console.log('Document written with ID: ', docRef.id);
	// 	} catch (e) {
	// 		console.error('Error adding document: ', e);
	// 	}
	// };

	const getData = async () => {
		const querySnapshot = await getDocs(collection(firebaseDB, 'users'));
		querySnapshot.forEach((doc) => {
			console.log(doc.data());
		});
	};

	useEffect(() => {
		// addData();
		getData();
	}, []);

	return (
		<div className="base">
			<Routes location={location}>
				<Route element={<PAGES.SignIn />} path="/sign-in" />
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
