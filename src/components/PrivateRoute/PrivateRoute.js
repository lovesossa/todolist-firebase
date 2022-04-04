import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from 'context/auth';

const PrivateRoute = (prop) => {
	const { currentUser } = useContext(AuthContext);

	const { children, adminRoute } = prop;

	if (!currentUser) return <Navigate to="/sign-in" />;

	if (adminRoute) {
		if (currentUser.role !== 'admin') {
			return <Navigate to="/" />;
		}
	}

	return children;
};

export default PrivateRoute;
