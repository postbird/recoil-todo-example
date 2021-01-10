import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import { List, Checkbox, Input } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import classnames from 'classnames';
import styles from './index.module.css';
import { useTodo } from '../../hooks/todo';

const TodoItem: React.FC<{ id: string }> = ({ id }) => {
	const { todo, setTodo, setTitle, toggleCompleted } = useTodo(id);
	const [editable, setEditable] = useState(false);

	const handleCheckboxChange = (ev: CheckboxChangeEvent) => {
		toggleCompleted(ev.target.checked);
	};

	const handleTitleClick = () => {
		setEditable(!editable);
	};

	const handleInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
		setTitle(ev.target.value);
	};

	const handleInputBlur = () => {
		setEditable(false);
	};

	const handleInputOnKeyDown = (ev: KeyboardEvent<HTMLInputElement>) => {
		if (ev.key === 'Enter') {
			setEditable(false);
		}
	};

	if (!todo) {
		return null;
	}

	return (
		<List.Item className={styles.listItem}>
			{editable ? (
				<Input
					value={todo.title}
					onChange={handleInputChange}
					onBlur={handleInputBlur}
					onKeyDown={handleInputOnKeyDown}
				/>
			) : (
				<span
					className={classnames({ [styles.listItemCompleted]: todo.completed })}
					onClick={handleTitleClick}>
					{todo.title}
				</span>
			)}
			<Checkbox checked={todo.completed} onChange={handleCheckboxChange} />
		</List.Item>
	);
};

export default TodoItem;
