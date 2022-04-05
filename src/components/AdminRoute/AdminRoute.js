import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from 'context/auth';
import { USER_ROLES } from 'utils';

const AdminRoute = ({ children }) => {
	const { currentUserRole } = useContext(AuthContext);

	return currentUserRole === USER_ROLES.admin ? children : null;
};

export default AdminRoute;
