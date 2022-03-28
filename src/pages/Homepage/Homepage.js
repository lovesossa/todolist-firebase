import React from 'react';
import { Sidebar } from 'components/Sidebar';
import { Todo } from 'components/Todo';

const Homepage = () => {
	return (
		<div className="wrapper">
			<Sidebar />
			<Todo />
		</div>
	);
};

export default Homepage;
