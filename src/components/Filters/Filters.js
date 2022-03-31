import React, { useState, useEffect, useContext } from 'react';
import { USERS_API } from 'api';
import { AuthContext } from 'context/auth';
import { Filter } from 'components/Filter';
import { firebaseDB } from 'utils/firebase';
import { FIREBASE_COLLECTIONS_NAME } from 'utils/constant';

import {
	doc,
	updateDoc,
} from 'firebase/firestore';

const Filters = ({
	setCurrentFilter,
	currentFilter,
	userData,
	setUserData,
}) => {
	const [filters, setFilters] = useState(null);
	const { currentUser } = useContext(AuthContext);

	const todoStructure = (filterName) => {
		return {
			...userData,
			todo: [
				...userData.todo,
				{
					title: filterName,
					list: [],
				},
			],
		};
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const { filterNameInput } = e.target.elements;
		const filterName = filterNameInput.value;

		filterNameInput.value = '';

		setUserData(todoStructure(filterName));
		setCurrentFilter(filters.length);
	};

	useEffect(() => {
		if (userData) {
			setFilters(userData.todo);
		}
	}, [userData]);

	return (
		<div className="filters">
			{filters ? (
				<ul className="filters_list">
					{filters.map(({
						title,
					}, index) => (
						<li
							className="filters_item"
							key={index}
						>
							<Filter
								title={title}
								index={index}
								setCurrentFilter={setCurrentFilter}
								currentFilter={currentFilter}
							/>
						</li>
					))}
				</ul>
			) : null}
			<form className="filters_create" onSubmit={handleSubmit}>
				<label
					className="filters_create__btn"
					type="label"
				>
					<div className="filters_create__icon">Icon</div>
					<input
						className="filters_create__title"
						type="text"
						name="filterNameInput"
						placeholder="New list"
					/>
				</label>
			</form>
		</div>

	);
};

export default Filters;
