import React from 'react';
import { Row, Col } from 'antd';
import TodoA from './mods/TodoRecoilA';
import TodoB from './mods/TodoRecoilB';
import TodoC from './mods/TodoRecoilC';
import TodoD from './mods/TodoRecoilD';

const DemoTodo = () => {
	return (
		<Row>
			<Col span={6}>
				<TodoA />
			</Col>
			<Col span={6}>
				<TodoB />
			</Col>
			<Col span={6}>
				<TodoC />
			</Col>
			<Col span={6}>
				<TodoD />
			</Col>
		</Row>
	);
};

export default DemoTodo;
