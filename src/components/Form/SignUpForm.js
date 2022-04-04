import React, { useContext, useRef, useState } from 'react';
import { PROMISE_STATES } from 'utils';
import { NavLink, useNavigate, Navigate } from 'react-router-dom';
import { firebaseAuth } from 'utils/firebase';
import USERS_API from 'api/users';
import { AuthContext } from 'context/auth';
import {
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';

import FormField from './FormField';
import { signUpFormData } from './constant';

const SignUpForm = () => {
	const [loadingStatus, setLoadingStatus] = useState(PROMISE_STATES.default);
	const navigate = useNavigate();
	const { currentUser } = useContext(AuthContext);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const {
			email,
			password,
			displayName,
		} = e.target.elements;

		const userEmail = email.value;
		const userDisplayName = displayName.value;
		const userPassword = password.value;

		try {
			setLoadingStatus(PROMISE_STATES.pending);

			const newUser = {
				displayName: userDisplayName,
				email: userEmail,
				todo: {
					0: {
						title: 'All tasks',
						list: [
							{
								title: 'Display tasks',
								important: false,
								completed: false,
							},
						],
					},
				},
			};

			const authResult = await createUserWithEmailAndPassword(firebaseAuth, userEmail, userPassword);

			await updateProfile(authResult.user, {
				displayName: newUser.displayName,
			});

			const { uid } = authResult.user;

			await USERS_API.addNewUser(newUser, uid)
				.then(() => {
					navigate('/');
				});

			setLoadingStatus(PROMISE_STATES.fulfilled);
		} catch (error) {
			setLoadingStatus(PROMISE_STATES.rejected);
		}
	};

	return (
		!currentUser ? (
			<section className="auth_block">
				<div className="auth_block_in">
					<h1 className="auth_block_title">Sign up</h1>
					<form className="auth_block_form" onSubmit={handleSubmit}>
						<ul className="auth_block_list">
							{signUpFormData.map(({
								id,
								placeholder,
								name,
								type,
								required,
							}, index) => {
								return (
									<li className="auth_block_item" key={index}>
										<FormField
											id={id}
											placeholder={placeholder}
											type={type}
											name={name}
											required={required}
										/>
									</li>
								);
							})}
						</ul>
						<button
							className="auth_block_submit btn_primary"
							type="submit"
						>
							Submit
						</button>
					</form>
					<div className="auth_block_footer">
						Already have account?
						<NavLink to="/sign-in" className="auth_block_footer__link btn_link">
							Sign in
						</NavLink>
					</div>
				</div>
			</section>
		) : <Navigate to="/" />
	);
};

export default SignUpForm;
