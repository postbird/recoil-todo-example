import React, { useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import classnames from 'classnames';
import { todoItemState, useInsertItem, useAllTodos, todoFilterSelector } from '../atoms';
import { todoIdsState } from '../atoms/index';
import styles from './index.module.css';

const TodoRecoil = () => {
	// const snapshot = useAllTodos()();
	// console.log('--->snapshot', snapshot._store.getState());
	// snapshot.map((item) => {
	// 	console.log('item', item);
	// });

	const value = useRecoilValue(todoFilterSelector);
	console.log(value);

	return (
		<>
			<TodoAdd />
			<TodoList />
		</>
	);
};

const TodoAdd = () => {
	const [val, setVal] = useState('');
	const insetItem = useInsertItem();

	const handleChange = (ev) => {
		setVal(ev.target.value);
	};

	const handleClick = () => {
		if (!val) {
			return;
		}
		insetItem(val);
		setVal('');
	};

	return (
		<>
			<input type="text" onChange={handleChange} value={val} />
			<button onClick={handleClick}>add</button>
		</>
	);
};

const TodoList = () => {
	const list = useRecoilValue(todoIdsState);
	return (
		<ul>
			{list.map((id) => (
				<TodoItem key={id} id={id} />
			))}
		</ul>
	);
};

const TodoItem = ({ id }) => {
	const [todo, setTodo] = useRecoilState(todoItemState(id));
	const [editable, setEditable] = useState(false);

	const handleClick = () => {
		setEditable(true);
	};

	const handleCheckboxChange = (ev) => {
		setTodo({ ...todo, isComplete: ev.target.checked });
	};

	const handleEnter = (ev) => {
		if (ev.key === 'Enter') {
			handleBlur();
		}
	};

	const handleBlur = () => {
		setEditable(false);
	};

	const handleInputChange = (ev) => {
		setTodo({ ...todo, title: ev.target.value });
	};

	return (
		<li className={classnames(styles.todoItem)}>
			<input type="checkbox" checked={todo.isComplete} onChange={handleCheckboxChange} />
			{editable ? (
				<input
					type="text"
					value={todo.title}
					onKeyDown={handleEnter}
					onBlur={handleBlur}
					onChange={handleInputChange}
					className={classnames(styles.todoItemInput)}
				/>
			) : (
				<span className={classnames({ [styles.todoItemCompleted]: todo.isComplete })} onClick={handleClick}>
					{todo.title}
				</span>
			)}
		</li>
	);
};

export default TodoRecoil;
