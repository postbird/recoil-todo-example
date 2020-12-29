import React, { ChangeEvent, useMemo, useState, KeyboardEvent } from 'react';
import { List, Checkbox, Input, Select } from 'antd';
import classnames from 'classnames';
import { useRecoilState, useRecoilValue } from 'recoil';
import styles from './index.module.css';
import {
	todoListFilterSelector,
	todoAtomWithId,
	todoFilterAtom,
	todoListAtom,
} from './atoms/index';
import TodoAdd from './mods/TodoAdd';
import { TODO_FILTER } from '../../constants';
import { SelectValue } from 'antd/lib/select';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

const TodoRecoil = () => {
	const todoList = useRecoilValue(todoListFilterSelector);

	return (
		<div className={styles.wrap}>
			<TodoAdd />
			<List
				size="large"
				header={<ListHeader />}
				footer={<div>Footer</div>}
				bordered
				dataSource={todoList}
				renderItem={item => <TodoItem key={item.id} id={item.id} />}
			/>
		</div>
	);
};

const TodoItem: React.FC<{ id: string }> = ({ id }) => {
	const [todo, setTodo] = useRecoilState(todoAtomWithId(id));
	const [editable, setEditable] = useState(false);
	const todoList = useRecoilValue(todoListAtom);
	console.log('todoList', todoList);
	console.log('todo', todo);

	const handleCheckboxChange = (ev: CheckboxChangeEvent) => {
		setTodo({ ...todo, completed: ev.target.checked });
	};

	const handleTitleClick = () => {
		setEditable(!editable);
	};

	const handleInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
		setTodo({ ...todo, title: ev.target.value });
	};

	const handleInputBlur = () => {
		setEditable(false);
	};

	const handleInputOnKeyDown = (ev: KeyboardEvent<HTMLInputElement>) => {
		if (ev.key === 'Enter') {
			setEditable(false);
		}
	};

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

const ListHeader: React.FC = () => {
	const [todoFilter, setTodoFilter] = useRecoilState(todoFilterAtom);

	const handleChange = (value: string) => {
		setTodoFilter(value);
	};

	return (
		<div className={styles.header}>
			<Select value={todoFilter} onChange={handleChange}>
				<Select.Option value={TODO_FILTER.ALL}>{TODO_FILTER.ALL}</Select.Option>
				<Select.Option value={TODO_FILTER.COMPLETED}>{TODO_FILTER.COMPLETED}</Select.Option>
				<Select.Option value={TODO_FILTER.ACTIVE}>{TODO_FILTER.ACTIVE}</Select.Option>
			</Select>
		</div>
	);
};

export default TodoRecoil;
