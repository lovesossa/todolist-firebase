import React, { useContext, useRef, useState } from 'react';
// import { ButtonSubmit } from 'components/Buttons';
import { NavLink, useNavigate, Navigate } from 'react-router-dom';
// import NotificationHandler from 'utils/NotificationHandler';
import { PROMISE_STATES } from 'utils';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from 'utils/firebase';
import { AuthContext } from 'context/auth';
import { signInFormData } from './constant';
import FormField from './FormField';

const SignInForm = () => {
	const [loadingStatus, setLoadingStatus] = useState(PROMISE_STATES.default);
	// const notificationHandler = useRef(new NotificationHandler());
	const navigate = useNavigate();
	const { currentUser } = useContext(AuthContext);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { email, password } = e.target.elements;

		const emailValue = email.value;
		const passwordValue = password.value;

		if (emailValue.length > 0 && passwordValue.length > 0) {
			try {
				setLoadingStatus(PROMISE_STATES.pending);
				// notificationHandler.current.pending('loggingInProgress');

				await signInWithEmailAndPassword(firebaseAuth, emailValue, passwordValue);

				setLoadingStatus(PROMISE_STATES.fulfilled);

				// notificationHandler.current.success('successfullyLoggedIn');
				navigate('/');
			} catch (error) {
				const { message } = error;

				setLoadingStatus(PROMISE_STATES.rejected);
				// notificationHandler.current.rejected(message);
			}
		}
	};

	return (
		!currentUser ? (
			<section className="auth_block">
				<div className="auth_block_in">
					<h1 className="auth_block_title">Sign in</h1>
					<form className="auth_block_form" onSubmit={handleSubmit}>
						<ul className="auth_block_list">
							{signInFormData.map(({
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
						Don&apos;t have an account?
						<NavLink to="/sign-up" className="auth_block_footer__link btn_link">
							Sign up here
						</NavLink>
					</div>
				</div>
			</section>
		) : <Navigate to="/" />
	);
};

export default SignInForm;
