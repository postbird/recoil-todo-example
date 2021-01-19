import React from 'react';
import { List, Badge } from 'antd';
import styles from './index.module.css';
import { useTodoStats, useTodos } from './hooks/todo';
import TodoAdd from './mods/TodoAdd';
import TodoItem from './mods/TodoItem';

const TodoRecoil = () => {
	const [todoList] = useTodos();
	return (
		<div className={styles.wrap}>
			<TodoAdd />
			<List
				size="large"
				header={<ListStats />}
				dataSource={todoList}
				renderItem={todo => <TodoItem key={todo.id} id={todo.id} />}
			/>
		</div>
	);
};

const ListStats: React.FC = () => {
	const { all, active, completed, percent } = useTodoStats();

	const renderNum = (label: string, num: number | string) => (
		<span className={styles.statsItem}>
			{label}
			{<Badge count={num} showZero style={{ backgroundColor: '#52c41a', marginLeft: 10 }} />}
		</span>
	);

	return (
		<div className={styles.statsWrap}>
			{renderNum('ALL', all)}
			{renderNum('ACTIVE', active)}
			{renderNum('COMPLETED', completed)}
			{renderNum('PERCENT', percent)}
		</div>
	);
};

export default TodoRecoil;
