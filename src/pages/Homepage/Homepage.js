import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from 'context/auth';

import { Sidebar } from 'components/Sidebar';
import { Todo } from 'components/Todo';
import { USERS_API } from 'api';

import { firebaseDB } from 'utils/firebase';
import { FIREBASE_COLLECTIONS_NAME } from 'utils/constant';

import {
	doc,
	updateDoc,
} from 'firebase/firestore';

const Homepage = () => {
	const [currentFilter, setCurrentFilter] = useState(0);
	const [userData, setUserData] = useState(null);
	const { currentUser } = useContext(AuthContext);

	const fetchData = async () => {
		const res = await USERS_API.getUser(currentUser.uid);

		setUserData(res);

		return res;
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="wrapper">
			<Sidebar
				filtersData={userData ? userData.todo : null}
				setCurrentFilter={setCurrentFilter}
				currentFilter={currentFilter}
				fetchData={fetchData}
			/>
			<Todo
				todoData={userData ? userData.todo : null}
				currentFilter={currentFilter}
				fetchData={fetchData}
			/>
		</div>
	);
};

export default Homepage;
