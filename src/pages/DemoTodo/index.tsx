import React from 'react';
import { Row, Col } from 'antd';
import TodoA from './mods/TodoRecoilA';
import TodoB from './mods/TodoRecoilB';
import TodoC from './mods/TodoRecoilC';

const DemoTodo = () => {
	return (
		<Row>
			<Col span={7}>
				<TodoA />
			</Col>
			<Col span={1} />
			<Col span={7}>
				<TodoB />
			</Col>
			<Col span={1} />
			<Col span={7}>
				<TodoC />
			</Col>
		</Row>
	);
};

export default DemoTodo;
