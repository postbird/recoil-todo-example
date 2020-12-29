import React from 'react';
import './App.css';
import TodoRecoil from './TodoRecoil';
import { RecoilRoot } from 'recoil';

const App = () => {
	return (
		<RecoilRoot>
			<div className="app">
				<TodoRecoil />
			</div>
		</RecoilRoot>
	);
};

export default App;
