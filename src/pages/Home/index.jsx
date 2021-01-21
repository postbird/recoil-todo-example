import React, { useState } from 'react';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { Map as ImmutableMap } from 'immutable';

// record the Map of each selector's return
const statsList = [];

let immutableStats = ImmutableMap({ all: 0, active: 0, completed: 0 });

const todosState = atom({
	key: uuidv4(),
	default: [],
});

const todoStats = selector({
	key: uuidv4(),
	get: ({ get }) => {
		// ! avoid side-effects in selector
		statsList.push(immutableStats);
		// get but return the same immutableStats
		console.log('immutableStats', immutableStats);
		const todos = get(todosState);
		const active = todos.filter(todo => !todo.completed).length;
		if (active === immutableStats.get('active')) {
			return immutableStats;
		}
		immutableStats = immutableStats.set('all', todos.length);
		immutableStats = immutableStats.set('active', active);
		immutableStats = immutableStats.set('completed', todos.length - active);
		return immutableStats;
	},
});

const List = () => {
	const [inputValue, setInputValue] = useState('');
	const [todos, setTodos] = useRecoilState(todosState);

	const handleChange = index => type => ev => {
		const newTodos =
			type === 'content'
				? {
						...todos[index],
						content: ev.target.value,
				  }
				: {
						...todos[index],
						completed: ev.target.checked,
				  };
		setTodos([...todos.slice(0, index), newTodos, ...todos.slice(index + 1)]);
	};

	return (
		<div className="App" style={{ textAlign: 'center' }}>
			<input value={inputValue} onChange={ev => setInputValue(ev.target.value)} />
			<button onClick={() => setTodos([...todos, { content: inputValue, completed: false }])}>
				Add
			</button>
			<ul>
				{todos.map((todo, index) => (
					<li key={index}>
						<input
							value={todo.content}
							style={todo.completed ? { textDecoration: 'line-through' } : {}}
							onChange={handleChange(index)('content')}
						/>
						<input
							type="checkbox"
							checked={todo.completed}
							onChange={handleChange(index)('completed')}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

const StatsAll = () => {
	const stats = useRecoilValue(todoStats);
	return <li>ALL: {stats.get('all')}</li>;
};

const StatsActive = () => {
	const stats = useRecoilValue(todoStats);
	return <li>ACTIVE: {stats.get('active')}</li>;
};

const Stats = () => {
	return (
		<ul style={{ textAlign: 'center', marginTop: '50px', marginBottom: '50px', width: '100px' }}>
			<StatsAll />
			<StatsActive />
		</ul>
	);
};

const App = () => {
	return (
		<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
			<Stats />
			<List />
		</div>
	);
};

export default App;
