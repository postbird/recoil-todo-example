import React from 'react';
import { RecoilRoot } from 'recoil';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
// import styles from './App.module.css';
import RecoilCounter from './pages/RecoilCounter';
import TodoRecoil from './pages/TodoRecoil';

const App = () => {
	return (
		<Router>
			<RecoilRoot>
				<Layout>
					<Layout.Sider
						style={{
							overflow: 'auto',
							height: '100vh',
							position: 'fixed',
							left: 0,
						}}>
						<Menu theme="dark" mode="inline">
							<Menu.Item key="home">
								<Link to="/">Home</Link>
							</Menu.Item>
							<Menu.Item key="recoilCounter">
								<Link to="/recoilCounter">RecoilCounter</Link>
							</Menu.Item>
						</Menu>
					</Layout.Sider>
					<Layout.Content>
						<Switch>
							<Route path="/"></Route>
							<Route path="/recoilCounter">
								<RecoilCounter />
							</Route>
							<Route path="/recoilCounter">
								<RecoilCounter />
							</Route>
						</Switch>
					</Layout.Content>
				</Layout>
			</RecoilRoot>
		</Router>
	);
};

export default App;
