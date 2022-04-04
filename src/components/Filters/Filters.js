/* eslint-disable react/button-has-type */
import React, { useState, useEffect, useContext } from 'react';
import { USERS_API } from 'api';
import { AuthContext } from 'context/auth';
import { Filter } from 'components/Filter';

const Filters = ({
	setCurrentFilter,
	currentFilter,
	filtersData,
	fetchData,
}) => {
	const [filters, setFilters] = useState({});
	const { currentUser } = useContext(AuthContext);

	const filtersLength = Object.keys(filters).length;

	const handleSubmit = (e) => {
		const pathToTodo = `todo.${filtersLength}`;

		e.preventDefault();
		const { filterNameInput } = e.target.elements;
		const filterName = filterNameInput.value;

		filterNameInput.value = '';

		USERS_API.updateUserData(currentUser.uid, {
			[pathToTodo]: {
				title: filterName,
				list: {},
			},
		}).then(() => {
			fetchData();
		});

		setFilters({
			...filters,
			[filtersLength]: {
				title: filterName,
				list: {},
			},
		});

		setCurrentFilter(filtersLength);
	};

	useEffect(() => {
		if (filtersData) {
			setFilters(filtersData);
		}
	}, [filtersData]);

	return (
		<div className="filters">
			{filters ? (
				<ul className="filters_list">
					{Object.values(filters).map(({
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
				<label className="filters_create__btn" htmlFor="filterNameInput">
					<button type="reset" className="filters_create__icon" label="clear input" />
					<input
						className="filters_create__title"
						type="text"
						name="filterNameInput"
						placeholder="New list"
						id="filterNameInput"
					/>
				</label>
			</form>
		</div>

	);
};

export default Filters;
