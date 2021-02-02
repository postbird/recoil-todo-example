import React from 'react';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
// import styles from './App.module.css';
import Home from './pages/Home';
import DemoCounter from './pages/DemoCounter/';
import DemoTodo from './pages/DemoTodo/';
import DemoCanvas from './pages/DemoCanvas/';
import DemoCanvas2 from './pages/DemoCanvas2/';
import DemoCanvasEffect from './pages/DemoCanvasEffect/';
import DemoSnapshot from './pages/DemoSnapshot';
import { RecoilRoot } from 'recoil';

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
							<Menu.Item key="canvas">
								<Link to="/canvas">Demo Canvas</Link>
							</Menu.Item>
							<Menu.Item key="canvas2">
								<Link to="/canvas2">Demo Canvas2</Link>
							</Menu.Item>
							<Menu.Item key="canvaseffect">
								<Link to="/canvaseffect">Demo Canvas atomEffect</Link>
							</Menu.Item>
							<Menu.Item key="snapshot">
								<Link to="/snapshot">Demo Snapshot</Link>
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
							<Route path="/canvaseffect" exact>
								<DemoCanvasEffect />
							</Route>
							<Route path="/canvas2" exact>
								<DemoCanvas2 />
							</Route>
							<Route path="/canvas" exact>
								<DemoCanvas />
							</Route>
							<Route path="/snapshot" exact>
								<DemoSnapshot />
							</Route>
							<Route path="/" exact>
								<Home />
							</Route>
						</Switch>
					</Layout.Content>
				</Layout>
			</RecoilRoot>
		</Router>
	);
};

export default App;
