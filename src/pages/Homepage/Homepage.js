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
	const [currentTodo, setCurrentTodo] = useState(null);
	const { currentUser } = useContext(AuthContext);

	const fetchData = async () => {
		const res = await USERS_API.getUser(currentUser.uid);

		setUserData(res);
		setCurrentTodo(res.todo[currentFilter].list);
	};

	const syncData = async () => {
		const userRef = doc(firebaseDB, FIREBASE_COLLECTIONS_NAME.users, currentUser.uid);

		if (userData !== null) {
			await updateDoc(userRef, userData);
		}
	};

	useEffect(() => {
		syncData();
	}, [userData]);

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (userData) {
			setCurrentTodo(userData.todo[currentFilter].list);
		}
	}, [currentFilter]);

	return (
		<div className="wrapper">
			<Sidebar setCurrentFilter={setCurrentFilter} currentFilter={currentFilter} userData={userData} setUserData={setUserData} />
			<Todo list={currentTodo} currentFilter={currentFilter} userData={userData} setUserData={setUserData} />
		</div>
	);
};

export default Homepage;
