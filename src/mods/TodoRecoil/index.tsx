import React, { useState, useEffect } from 'react';
import { List, Select, Row, Col, Button } from 'antd';
import { useRecoilSnapshot, useRecoilState, Snapshot, useGotoRecoilSnapshot } from 'recoil';
import styles from './index.module.css';
import { todoFilterState } from './atoms/index';
import { useFilterTodos, useTodoStats } from './hooks/todo';
import { TODO_FILTER } from '../../constants';
import TodoAdd from './mods/TodoAdd';
import TodoItem from './mods/TodoItem';

const TodoRecoil = () => {
	const todoList = useFilterTodos();
	const snapshot = useRecoilSnapshot();
	console.log('snapshot', snapshot);
	const loadable = snapshot.getLoadable(todoFilterState);
	console.log('loadable', loadable);
	console.log(snapshot.map(item => console.log('item', item)));
	return (
		<Row>
			<Col span={10}>
				<TimeTravelObserver />
			</Col>
			<Col span={14}>
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
			</Col>
		</Row>
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

function TimeTravelObserver() {
	const [snapshots, setSnapshots] = useState([] as Snapshot[]);

	const snapshot = useRecoilSnapshot();

	useEffect(() => {
		if (snapshots.every((s: Snapshot) => s.getID() !== snapshot.getID())) {
			setSnapshots([...snapshots, snapshot]);
		}
	}, [snapshot]);

	const gotoSnapshot = useGotoRecoilSnapshot();

	return (
		<ol>
			{snapshots.map((snapshot, i) => (
				<li key={i}>
					Snapshot {i}
					<Button onClick={() => gotoSnapshot(snapshot)} style={{ marginLeft: 10 }}>
						Restore
					</Button>
				</li>
			))}
		</ol>
	);
}
