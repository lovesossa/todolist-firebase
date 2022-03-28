import React from 'react';
import { AccountInfo } from 'components/AccountInfo';
import { Search } from 'components/Search';
import { Filters } from 'components/Filters';

const Sidebar = () => {
	return (
		<aside className="sidebar">
			<AccountInfo />
			<Search />
			<Filters />
		</aside>
	);
};

export default Sidebar;
