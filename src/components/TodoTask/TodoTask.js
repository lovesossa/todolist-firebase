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
	index,
	fetchData,
}) => {
	const [completed, setCompleted] = useState(isCompleted);
	const [important, setImportant] = useState(isImportant);

	const { currentUser } = useContext(AuthContext);
	const $taskRef = useRef();

	const importantClass = 'todo_task--important_mod';
	const completedClass = 'todo_task--completed_mod';
	const pathToCompleted = `todo.${currentFilter}.list.${index}.completed`;
	const pathToImportant = `todo.${currentFilter}.list.${index}.important`;

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

	useEffect(() => {
		if (isCompleted) {
			$taskRef.current.classList.add(completedClass);
		}
	}, [isCompleted]);

	return (
		<button
			className="todo_task"
			type="button"
			onClick={handleToggleCompleted}
			ref={$taskRef}
		>
			<div className="todo_task_status" />
			<div className="todo_task_title">{title}</div>
		</button>
	);
};

export default TodoTask;
