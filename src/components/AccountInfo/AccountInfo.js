import React, { useContext } from 'react';
import { AuthContext } from 'context/auth';
import { firebaseAuth } from 'utils/firebase';

const AccountInfo = () => {
	const { currentUser } = useContext(AuthContext);

	const handleLogout = async () => {
		try {
			await firebaseAuth.signOut();
		}	catch {
			// console.log(); //!
		}
	};

	return (
		<div className="account_info">
			<div className="account_info__logo">
				<img className="account_info__logo_img" src="#" alt="" />
			</div>
			<div className="account_info__content">
				{currentUser.displayName ? (
					<div className="account_info__name">{currentUser.displayName}</div>
				) : null}
				<div className="account_info__email">{currentUser.email}</div>
			</div>
			<button className="account_info__logout" type="button" onClick={handleLogout}>
				Logout
			</button>
		</div>
	);
};

export default AccountInfo;
