import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from 'context/auth';

const AdminRoute = ({ children }) => {
	const { currentUser } = useContext(AuthContext);

	return currentUser ? children : <Navigate to="/sign-in" />;
};

export default AdminRoute;
