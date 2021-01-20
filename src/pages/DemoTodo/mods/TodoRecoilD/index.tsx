import React, { useMemo } from 'react';
import { List, Badge } from 'antd';
import styles from './index.module.css';
import { useTodoStats, useTodoIds } from './hooks/todo';
import TodoAdd from './mods/TodoAdd';
import TodoItem from './mods/TodoItem';

const TodoRecoil = () => {
	const todoList = useTodoIds();
	return (
		<div className={styles.wrap}>
			<TodoAdd />
			<ListStats />
			<List
				size="large"
				bordered
				dataSource={todoList}
				renderItem={id => <TodoItem key={id} id={id} />}
			/>
		</div>
	);
};

const ListStats: React.FC = () => {
	const stats = useTodoStats();

	const renderNum = (label: string, num: number | string) => (
		<span className={styles.statsItem}>
			{label}
			{<Badge count={num} showZero style={{ backgroundColor: '#52c41a', marginLeft: 10 }} />}
		</span>
	);

	return (
		<div className={styles.statsWrap}>
			{/* {renderNum('ALL', stats.get('all') as number)} */}
			{renderNum('ACTIVE', stats.get('active') as number)}
			{/* {renderNum('COMPLETED', stats.completed)} */}
		</div>
	);
};

export default TodoRecoil;
