import { USERS_API } from 'api';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { USER_ROLES } from 'utils';
import { firebaseAuth } from 'utils/firebase';

import AuthContext from './authContext';

const AuthState = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [currentUserAdditionalData, setCurrentUserAdditionalData] = useState(null);
	const [isUserLoading, setUserLoading] = useState(false);
	const [guestUser, setGuestUser] = useState(null);
	const [currentUserRole, setCurrentUserRole] = useState(USER_ROLES.user);

	const getUserAdditionalData = async uid => {
		try {
			const res = await USERS_API.getUser(uid);

			if (res) {
				setCurrentUserAdditionalData(res);

				if (res.role === USER_ROLES.admin) {
					setCurrentUserRole(USER_ROLES.admin);
				}
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		onAuthStateChanged(firebaseAuth, async (user) => {
			if (user) {
				user.getIdTokenResult().then(idTokenResult => {
					setCurrentUser(user);
					getUserAdditionalData(user.uid);
				});
			} else {
				setCurrentUser(null);
				setCurrentUserAdditionalData(null);
				setGuestUser(null);
				setCurrentUserRole(USER_ROLES.user);
			}
		});
	}, []);

	return (
		<AuthContext.Provider
			// eslint-disable-next-line react/jsx-no-constructed-context-values
			value={{
				currentUser,
				setCurrentUser,
				currentUserAdditionalData,
				guestUser,
				setGuestUser,
				isUserLoading,
				setUserLoading,
				currentUserRole,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthState;
