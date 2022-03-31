import React from 'react';

const TodoTask = ({
	title,
}) => {
	return (
		<button className="todo_task" type="button">
			<div className="todo_task_status" />
			<div className="todo_task_title">{title}</div>
		</button>
	);
};

export default TodoTask;
