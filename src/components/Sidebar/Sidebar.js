import React from 'react';
import { AccountInfo } from 'components/AccountInfo';
import { Search } from 'components/Search';
import { Filters } from 'components/Filters';

const Sidebar = ({
	setCurrentFilter,
	currentFilter,
	userData,
	setUserData,
}) => {
	return (
		<aside className="sidebar">
			<AccountInfo />
			<Search />
			<Filters setCurrentFilter={setCurrentFilter} currentFilter={currentFilter} userData={userData} setUserData={setUserData} />
		</aside>
	);
};

export default Sidebar;
