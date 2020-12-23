import React, { ChangeEvent, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Input, Button } from 'antd';
import styles from './index.module.css';
import { todoListAtom, generateTodo } from '../../atoms';

const TodoAdd = () => {
	const [input, setInput] = useState('');
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
	return (
		<div className={styles.inputWrap}>
			<Input value={input} onChange={handleInputChange} />
			<Button type="primary" onClick={handleAddClick}>
				Add
			</Button>
		</div>
	);
};

export default TodoAdd;
