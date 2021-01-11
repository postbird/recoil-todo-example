import React, { ChangeEvent } from 'react';
import { List, Checkbox, Input } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import styles from './index.module.css';
import { useTodo } from '../../hooks/todo';

const TodoItem: React.FC<{ id: string }> = ({ id }) => {
	const { todo, setTitle, toggleCompleted } = useTodo(id);

	const handleCheckboxChange = (ev: CheckboxChangeEvent) => {
		toggleCompleted(ev.target.checked);
	};
	const handleInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
		setTitle(ev.target.value);
	};

	if (!todo) {
		return null;
	}

	return (
		<List.Item className={styles.listItem}>
			<Input
				value={todo.title}
				onChange={handleInputChange}
				className={todo.completed ? styles.input : ''}
			/>
			<Checkbox
				checked={todo.completed}
				onChange={handleCheckboxChange}
				className={styles.checkbox}
			/>
		</List.Item>
	);
};

export default TodoItem;
