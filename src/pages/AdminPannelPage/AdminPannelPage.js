import React, { useContext } from 'react';
import { AuthContext } from 'context/auth';

const AdminPannelPage = () => {
	const { currentUser } = useContext(AuthContext);

	return (
		<section className="section admin_pannel">
			1
		</section>
	);
};

export default AdminPannelPage;
