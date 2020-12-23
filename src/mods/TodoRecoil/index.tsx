import React, { useMemo } from 'react';
import { List, Typography } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import styles from './index.module.css';
import { todoListAtom, todoAtomWithId } from './atoms/index';
import TodoAdd from './mods/TodoAdd';

const TodoRecoil = () => {
	const todoList = useRecoilValue(todoListAtom);

	return (
		<div className={styles.wrap}>
			<TodoAdd />
			<div className={styles.listWrap}></div>
			<div>
				{' '}
				<List
					size="large"
					header={<div>Header</div>}
					footer={<div>Footer</div>}
					bordered
					dataSource={todoList}
					renderItem={item => <TodoItem key={item.id} id={item.id} />}
				/>
			</div>
		</div>
	);
};

const TodoItem: React.FC<{ id: string }> = ({ id }) => {
	const [todo, setTodo] = useRecoilState(todoAtomWithId(id));

	const handleItemClick = () => {
		setTodo({ ...todo, completed: !todo.completed });
	};

	return (
		<List.Item onClick={handleItemClick}>
			{/* <Input value={todo.title} /> */}
			{todo.completed ? <Typography.Text mark>[COMPLETED]</Typography.Text> : null}
			<span>{todo.title}</span>
		</List.Item>
	);
};

export default TodoRecoil;
