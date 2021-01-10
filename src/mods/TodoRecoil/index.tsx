import React from 'react';
import { List, Select, Row, Col } from 'antd';
import { useRecoilState } from 'recoil';
import styles from './index.module.css';
import { todoFilterState } from './atoms/index';
import { useFilterTodos, useTodoStats } from './hooks/todo';
import { TODO_FILTER } from '../../constants';
import TodoAdd from './mods/TodoAdd';
import TodoItem from './mods/TodoItem';

const TodoRecoil = () => {
	const todoList = useFilterTodos();

	return (
		<div className={styles.wrap}>
			<TodoAdd />
			<ListStats />
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

const ListStats: React.FC = () => {
	const { all, active, completed, percent } = useTodoStats();

	return (
		<Row>
			<Col span={6}>all: {all}</Col>
			<Col span={6}>active: {active}</Col>
			<Col span={6}>completed: {completed}</Col>
			<Col span={6}>percent: {percent}</Col>
		</Row>
	);
};

const ListHeader: React.FC = () => {
	const [todoFilter, setTodoFilter] = useRecoilState(todoFilterState);

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
