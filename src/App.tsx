import React from 'react';
import { RecoilRoot } from 'recoil';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import styles from './App.module.css';
import DemoCounter from './pages/DemoCounter/';
import DemoTodo from './pages/DemoTodo/';

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
								<Link to="/recoilCounter">Demo Counter</Link>
							</Menu.Item>
							<Menu.Item key="recoilTodo">
								<Link to="/recoilTodo">Demo Todo</Link>
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
								<DemoCounter />
							</Route>
							<Route path="/recoilTodo" exact>
								<DemoTodo />
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
