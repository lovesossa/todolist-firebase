import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from 'context/auth';
import { FIREBASE_COLLECTIONS_NAME } from 'utils/constant';

import {
	collection,
	getDocs,
	deleteDoc,
	doc,
} from 'firebase/firestore';
import { firebaseDB, firebaseAuth } from 'utils/firebase';
import { getAuth } from 'firebase/auth';

const AdminPannelPage = () => {
	const { currentUser } = useContext(AuthContext);
	const [usersData, setUsersData] = useState([]);

	const fetchData = async () => {
		// const snap = await getDoc(doc(firebaseDB, FIREBASE_COLLECTIONS_NAME.users));
		const snap = await getDocs(collection(firebaseDB, FIREBASE_COLLECTIONS_NAME.users));
		const users = [];

		snap.forEach((user) => {
			users.push(user.data());
		});
		setUsersData(users);
		return snap;
	};

	const deleteUser = async (id) => {

	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<section className="section admin_pannel">
			<div className="admin_pannel_navigation">
				<nav className="navigation">
					<ul className="navigation_list">
						<li className="navigation_item">
							<NavLink to="/" className="navigation_link">Homepage</NavLink>
						</li>
					</ul>
				</nav>
			</div>
			<div className="admin_pannel_title">Users:</div>
			<ul className="admin_pannel_table">
				{usersData ? usersData.map(({
					displayName,
					email,
					avatar,
					todo,
					id,
				}, index) => (
					<li className="admin_pannel_table__item" key={index}>
						<div className="user_details">
							<div className="user_details_avatar">{avatar}</div>
							<div className="user_details_name">{displayName}</div>
							<div className="user_details_email">{email}</div>
							<div className="user_details_controls">
								<div className="user_details_controls__label">Settings</div>
								<ul className="user_details_controls__dropdown">
									<li className="user_details_controls__item">
										<button
											type="button"
											className="user_details_controls__button"
											onClick={() => deleteUser(id)}
										>
											Delete
										</button>
									</li>
									<li className="user_details_controls__item">
										<button
											type="button"
											className="user_details_controls__button"
										>
											Block
										</button>
									</li>
								</ul>
							</div>
						</div>
					</li>
				)) : null}
			</ul>
		</section>
	);
};

export default AdminPannelPage;
