import React from 'react';
import { Row, Col } from 'antd';
import TodoA from './mods/TodoRecoilA';
import TodoB from './mods/TodoRecoilB';

const DemoTodo = () => {
	return (
		<Row>
			<Col span={8}>
				<TodoA />
			</Col>
			<Col span={2} />
			<Col span={8}>
				<TodoB />
			</Col>
		</Row>
	);
};

export default DemoTodo;
