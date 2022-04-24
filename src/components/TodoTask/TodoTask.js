import React, {
	useState,
	useRef,
	useEffect,
	useContext,
} from 'react';
import { AuthContext } from 'context/auth';
import { USERS_API } from 'api';

const TodoTask = ({
	title,
	isCompleted,
	isImportant,
	currentFilter,
	taskId,
	onDeleteTask,
}) => {
	const [completed, setCompleted] = useState(isCompleted);
	const [important, setImportant] = useState(isImportant);

	const { currentUser } = useContext(AuthContext);
	const $taskRef = useRef();

	const importantClass = 'todo_task--important_mod';
	const completedClass = 'todo_task--completed_mod';
	const taskTemplate = `todo.${currentFilter}.list.${taskId}`;
	const pathToCompleted = `${taskTemplate}.completed`;
	const pathToImportant = `${taskTemplate}.important`;
	const pathToTitle = `${taskTemplate}.title`;

	const handleToggleCompleted = () => {
		if (completed) {
			setCompleted(false);
			$taskRef.current.classList.remove(completedClass);
			USERS_API.updateUserData(currentUser.uid, {
				[pathToCompleted]: false,
			});
		} else {
			setCompleted(true);
			$taskRef.current.classList.add(completedClass);
			USERS_API.updateUserData(currentUser.uid, {
				[pathToCompleted]: true,
			});
		}
	};

	const handleToggleImportant = (e) => {
		if (important) {
			setImportant(false);
			$taskRef.current.classList.remove(importantClass);
			USERS_API.updateUserData(currentUser.uid, {
				[pathToImportant]: false,
			});
		} else {
			setImportant(true);
			$taskRef.current.classList.add(importantClass);
			USERS_API.updateUserData(currentUser.uid, {
				[pathToImportant]: true,
			});
		}
	};

	let debounce;

	const handleInputTaskName = (e) => {
		e.preventDefault();

		const taskName = e.target.value;

		clearTimeout(debounce);

		debounce = setTimeout(() => {
			USERS_API.updateUserData(currentUser.uid, {
				[pathToTitle]: taskName,
			});
		}, 1000);
	};

	const handleDelete = () => {
		onDeleteTask(taskId);
		USERS_API.deleteUserData(currentUser.uid, taskTemplate);
	};

	useEffect(() => {
		if (isCompleted) {
			$taskRef.current.classList.add(completedClass);
		}
		if (isImportant) {
			$taskRef.current.classList.add(importantClass);
		}
	}, [isCompleted, isImportant]);

	return (
		<label
			className="todo_task"
			ref={$taskRef}
			htmlFor={`taskNameInput_${taskId}`}
		>
			<button
				type="button"
				className="todo_task_important"
				onClick={handleToggleImportant}
				label="toggle important"
			/>
			<button
				type="button"
				className="todo_task_status"
				onClick={handleToggleCompleted}
				label="toggle сompleted"
			/>
			<input
				className="todo_task_title"
				defaultValue={title}
				name="taskName"
				type="text"
				id={`taskNameInput_${taskId}`}
				onInput={handleInputTaskName}
			/>
			<button
				type="button"
				className="todo_task_delete"
				onClick={handleDelete}
				label="delete task"
			/>
		</label>
	);
};

export default TodoTask;
