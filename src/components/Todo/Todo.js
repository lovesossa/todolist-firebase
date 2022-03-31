import React, { useEffect } from 'react';
import { TodoTask } from 'components/TodoTask';

const Todo = ({
	list,
	userData,
	setUserData,
	currentFilter,
}) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		const { addTaskInput } = e.target.elements;
		const taskName = addTaskInput.value;

		addTaskInput.value = '';

		const newData = { ...userData };
		newData.todo[currentFilter].list.push({
			title: taskName,
			completed: false,
			important: false,
		});

		setUserData(newData);
	};

	return (
		<section className="todo">
			<div className="todo_in">
				{list && list.length ? (
					<ul className="todo_list">
						{list.map(({
							title,
							completed,
							important,
						}, index) => (
							<li className="todo_item" key={index}>
								<TodoTask
									title={title}
									completed={completed}
									important={important}
								/>
							</li>
						))}
					</ul>
				) : null}

				<form className="todo_create" onSubmit={handleSubmit}>
					<label
						className="todo_create__btn"
						type="label"
					>
						<div className="todo_create__icon">
							<svg className="icon" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
								<g id="web-app" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
									<g id="plus" fill="currentColor">
										<path d="M13,13 L13,20 C13,20.5522847 12.5522847,21 12,21 C11.4477153,21 11,20.5522847 11,20 L11,13 L4,13 C3.44771525,13 3,12.5522847 3,12 C3,11.4477153 3.44771525,11 4,11 L11,11 L11,4 C11,3.44771525 11.4477153,3 12,3 C12.5522847,3 13,3.44771525 13,4 L13,11 L20,11 C20.5522847,11 21,11.4477153 21,12 C21,12.5522847 20.5522847,13 20,13 L13,13 Z" id="Shape" />
									</g>
								</g>
							</svg>
						</div>
						<input
							className="todo_create__title"
							type="text"
							name="addTaskInput"
							placeholder="Add task"
						/>
					</label>
				</form>
			</div>
		</section>
	);
};

export default Todo;
