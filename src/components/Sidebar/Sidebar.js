import React from 'react';
import { AccountInfo } from 'components/AccountInfo';
import { Search } from 'components/Search';
import { Filters } from 'components/Filters';

const Sidebar = ({
	setCurrentFilter,
	currentFilter,
	filtersData,
	fetchData,
}) => {
	return (
		<aside className="sidebar">
			<AccountInfo />
			<Search />
			<Filters
				filtersData={filtersData}
				setCurrentFilter={setCurrentFilter}
				currentFilter={currentFilter}
				fetchData={fetchData}
			/>
		</aside>
	);
};

export default Sidebar;
