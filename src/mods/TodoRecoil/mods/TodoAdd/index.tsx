import React, { ChangeEvent, useState } from 'react';
import { Input, Button } from 'antd';
import styles from './index.module.css';
import { useInsertAtom } from '../../atoms';

const TodoAdd = () => {
	const [input, setInput] = useState('');
	const addTodo = useInsertAtom();

	const handleInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
		setInput(ev.target.value);
	};

	const handleAddClick = () => {
		if (input?.length > 0) {
			addTodo(input);
			setInput('');
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
