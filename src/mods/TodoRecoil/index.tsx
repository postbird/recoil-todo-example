import React, { useState, ChangeEvent, useMemo } from 'react';
import { Input, Button, List, Typography } from 'antd';
import styles from './index.module.css';
import { todoListAtom, generateTodo, todoAtomWithId } from '../../atoms/index';
import { atom, useRecoilState } from 'recoil';

const TodoInputAtom = atom({
	key: 'TodoInputAtom',
	default: '',
});

const TodoRecoil = () => {
	const [input, setInput] = useRecoilState(TodoInputAtom);
	const [todoList, setTodoList] = useRecoilState(todoListAtom);

	const handleInputChange = (ev: ChangeEvent) => {
		const target = ev.target as HTMLInputElement;
		setInput(target.value);
	};

	const handleAddClick = () => {
		if (input?.length > 0) {
			const todo = generateTodo(input);
			setTodoList(todoList.concat(todo));
		}
	};

	const renderList = useMemo(
		() => (
			<List
				size="large"
				header={<div>Header</div>}
				footer={<div>Footer</div>}
				bordered
				dataSource={todoList}
				renderItem={item => <TodoItem key={item.id} id={item.id} />}
			/>
		),
		[todoList]
	);

	return (
		<div className={styles.wrap}>
			<div className={styles.inputWrap}>
				<Input value={input} onChange={handleInputChange} />
				<Button type="primary" onClick={handleAddClick}>
					Add
				</Button>
			</div>
			<div className={styles.listWrap}></div>
			<div>{renderList}</div>
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
