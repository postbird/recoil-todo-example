import React, { useState, ChangeEvent } from 'react';
import { Input, Button, List } from 'antd';
import styles from './index.module.css';
import { todoListAtom, generateTodo, todoAtomFamily } from '../../atoms/index';
import { useRecoilState } from 'recoil';

const TodoRecoil = () => {
	const [input, setInput] = useState('');
	const [todoList, setTodoList] = useRecoilState(todoListAtom);

	console.log(todoList);

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

	return (
		<div className={styles.wrap}>
			<div className={styles.inputWrap}>
				<Input value={input} onChange={handleInputChange} />
				<Button type="primary" onClick={handleAddClick}>
					Add
				</Button>
			</div>
			<div className={styles.listWrap}>
				<List
					size="large"
					header={<div>Header</div>}
					footer={<div>Footer</div>}
					bordered
					dataSource={todoList}
					renderItem={item => <TodoItem key={item.id} id={item.id} />}
				/>
			</div>
			<div></div>
		</div>
	);
};

const TodoItem: React.FC<{ id: number }> = ({ id }) => {
	const [todo, setTodo] = useRecoilState(todoAtomFamily(id));

	const handleItemClick = () => {
		setTodo({
			...todo,
			// completed: !todo.completed,
		});
	};

	return <List.Item onClick={handleItemClick}>{todo.title}</List.Item>;
};

export default TodoRecoil;
