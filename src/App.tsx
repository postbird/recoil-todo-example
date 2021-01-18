import React from 'react';
import { RecoilRoot } from 'recoil';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import styles from './App.module.css';
import RecoilCounter from './pages/RecoilCounter';
import RecoilTodoA from './pages/TodoRecoilA';
import RecoilTodoB from './pages/TodoRecoilB';

const App = () => {
	return (
		<Router>
			<RecoilRoot>
				<Layout>
					<Layout.Sider
						style={{
							overflow: 'auto',
							height: '100vh',
						}}>
						<Menu theme="dark" mode="inline">
							<Menu.Item key="home">
								<Link to="/">Home</Link>
							</Menu.Item>
							<Menu.Item key="recoilCounter">
								<Link to="/recoilCounter">RecoilCounter</Link>
							</Menu.Item>
							<Menu.Item key="recoilTodo">
								<Link to="/recoilTodo">RecoilCounter</Link>
							</Menu.Item>
						</Menu>
					</Layout.Sider>
					<Layout.Content
						style={{
							overflow: 'auto',
							height: '100vh',
						}}>
						<Switch>
							<Route path="/recoilCounter" exact>
								<RecoilCounter />
							</Route>
							<Route path="/recoilTodo" exact>
								<div className={styles.gridWrap}>
									<RecoilTodoA />
									<RecoilTodoB />
								</div>
							</Route>
							<Route path="/" exact></Route>
						</Switch>
					</Layout.Content>
				</Layout>
			</RecoilRoot>
		</Router>
	);
};

export default App;
