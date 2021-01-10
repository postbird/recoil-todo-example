import React from 'react';
import { List, Select } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import styles from './index.module.css';
import { todoFilterAtom, todoIdsState } from './atoms/index';
import { TODO_FILTER } from '../../constants';
import TodoAdd from './mods/TodoAdd';
import TodoItem from './mods/TodoItem';

const TodoRecoil = () => {
	const todoList = useRecoilValue(todoIdsState);

	return (
		<div className={styles.wrap}>
			<TodoAdd />
			<List
				size="large"
				header={<ListHeader />}
				footer={<div>Footer</div>}
				bordered
				dataSource={todoList}
				renderItem={id => <TodoItem key={id} id={id} />}
			/>
		</div>
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
