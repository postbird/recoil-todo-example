import React from 'react';
import { RecoilRoot } from 'recoil';
import styles from './App.module.css';
import TodoRecoil from './mods/TodoRecoil';

function App() {
	return (
		<div className={styles.App}>
			<div className={styles.appContainer}>
				<RecoilRoot>
					<TodoRecoil />
				</RecoilRoot>
			</div>
			<div></div>
			<div></div>
		</div>
	);
}

export default App;
