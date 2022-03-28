import React from 'react';

const TodoTask = () => {
	return (
		<button className="todo_task" type="button">
			<div className="todo_task_status" />
			<div className="todo_task_title">Test task</div>
		</button>
	);
};

export default TodoTask;
