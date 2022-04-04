/* eslint-disable react/button-has-type */
import React, { useEffect, useContext, useState } from 'react';
import { TodoTask } from 'components/TodoTask';
import { AuthContext } from 'context/auth';
import { USERS_API } from 'api';

const Todo = ({
	todoData,
	currentFilter,
}) => {
	const { currentUser } = useContext(AuthContext);

	const [todo, setTodo] = useState(todoData);
	const listCurrentState = 'todo_list todo_list--current_state';

	const handleSubmit = (e) => {
		e.preventDefault();
		const { addTaskInput } = e.target.elements;
		const taskName = addTaskInput.value;
		const taskIndex = Object.keys(todo[currentFilter].list).length;
		const pathToList = `todo.${currentFilter}.list.${taskIndex}`;

		addTaskInput.value = '';

		USERS_API.updateUserData(currentUser.uid, {
			[pathToList]: {
				title: taskName,
				completed: false,
				important: false,
			},
		});

		let newData = { ...todo };
		newData[currentFilter].list[taskIndex] = {
			title: taskName,
			completed: false,
			important: false,
		};

		setTodo(newData);
	};

	useEffect(() => {
		if (todoData) {
			setTodo(todoData);
		}
	}, [todoData]);

	return (
		<section className="todo">
			<div className="todo_in">
				{todo ? Object.entries(todo).map(([i, obj]) => (
					<ul
						className={Number(i) === currentFilter ? listCurrentState : 'todo_list'}
						key={i}
					>
						{Object.entries(obj.list).map(([
							j,
							{
								title,
								completed,
								important,
							},
						]) => (
							<li className="todo_item" key={`${i}_${j}`}>
								<TodoTask
									title={title}
									isCompleted={completed}
									isImportant={important}
									index={j}
									currentFilter={currentFilter}
								/>
							</li>
						))}
					</ul>
				)) : null}

				<form className="todo_create" onSubmit={handleSubmit}>
					<label className="todo_create__btn" htmlFor="addTaskInput">
						<button className="todo_create__icon" type="reset" label="clear input">
							<svg className="icon" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
								<g id="web-app" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
									<g id="plus" fill="currentColor">
										<path d="M13,13 L13,20 C13,20.5522847 12.5522847,21 12,21 C11.4477153,21 11,20.5522847 11,20 L11,13 L4,13 C3.44771525,13 3,12.5522847 3,12 C3,11.4477153 3.44771525,11 4,11 L11,11 L11,4 C11,3.44771525 11.4477153,3 12,3 C12.5522847,3 13,3.44771525 13,4 L13,11 L20,11 C20.5522847,11 21,11.4477153 21,12 C21,12.5522847 20.5522847,13 20,13 L13,13 Z" id="Shape" />
									</g>
								</g>
							</svg>
						</button>
						<input
							className="todo_create__title"
							type="text"
							name="addTaskInput"
							placeholder="Add task"
							id="addTaskInput"
						/>
					</label>
				</form>
			</div>
		</section>
	);
};

export default Todo;
