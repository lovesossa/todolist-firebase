import React from 'react';
import { TodoTask } from 'components/TodoTask';

const Todo = () => {
	return (
		<section className="todo">
			<ul className="todo_list">
				<li className="todo_item">
					<TodoTask />
				</li>
			</ul>
		</section>
	);
};

export default Todo;
