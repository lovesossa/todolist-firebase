import React from 'react';

const Filter = ({
	title,
	index,
	setCurrentFilter,
	currentFilter,
}) => {
	const isCurrentFilter = currentFilter === index;
	const currentFilterState = 'filter--current_mod';
	let filterClass = 'filter';

	if (isCurrentFilter) {
		filterClass += ` ${currentFilterState}`;
	}

	return (
		<button
			className={filterClass}
			type="button"
			onClick={() => setCurrentFilter(index)}
		>
			<div className="filter_icon">Icon</div>
			<div className="filter_title">{title}</div>
		</button>
	);
};

export default Filter;
