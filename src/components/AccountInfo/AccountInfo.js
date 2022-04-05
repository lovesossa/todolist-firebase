import React, { useContext, useEffect } from 'react';
import { AuthContext } from 'context/auth';
import { firebaseAuth } from 'utils/firebase';
import { NavLink } from 'react-router-dom';
import { USER_ROLES } from 'utils';

const AccountInfo = () => {
	const { currentUser, currentUserRole } = useContext(AuthContext);

	const {
		displayName,
		avatar,
		email,
	} = currentUser;

	const handleLogout = () => {
		try {
			firebaseAuth.signOut();
		}	catch {
			// console.log(); //!
		}
	};

	const getInitials = () => {
		if (displayName) {
			return (
				displayName.split(' ').map((name) => {
					return name.split('')[0];
				})
			);
		}

		return null;
	};

	return (
		<div className="account_info">
			<div className="account_info__logo">
				{avatar ? (
					<img className="account_info__logo_img" src={avatar} alt="Avatar" />
				) : getInitials()}
			</div>
			<div className="account_info__content">
				{displayName ? (
					<div className="account_info__name">{displayName}</div>
				) : null}
				<div className="account_info__email">{email}</div>
			</div>
			<button className="account_info__link" type="button" onClick={handleLogout}>
				Logout
			</button>
			{currentUserRole === USER_ROLES.admin ? (
				<NavLink to="/admin" className="account_info__link">
					Admin pannel
				</NavLink>
			) : null }
		</div>
	);
};

export default AccountInfo;
