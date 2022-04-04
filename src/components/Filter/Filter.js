import React from 'react';

const Filter = ({
	title,
	index,
	setCurrentFilter,
	currentFilter,
}) => {
	const isCurrentFilter = currentFilter === index;
	const currentFilterState = 'filter--current_mod';
	let filterMod = '';

	if (isCurrentFilter) {
		filterMod += ` ${currentFilterState}`;
	}

	return (
		<button
			className={`filter ${filterMod}`}
			type="button"
			onClick={() => setCurrentFilter(index)}
		>
			<div className="filter_icon">
				<div className="filter_icon__in" />
			</div>
			<div className="filter_title">{title}</div>
		</button>
	);
};

export default Filter;
