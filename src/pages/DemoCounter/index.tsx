import React from 'react';
import { Row, Col } from 'antd';
import Counter from './mods/Counter';
import RecoilCounter from './mods/RecoilCounter';
import CounterModify from './mods/CounterModify';

const DemoCounter = () => {
	return (
		<Row>
			<Col span={8}>
				<Counter />
			</Col>
			<Col span={8}>
				<RecoilCounter />
			</Col>
			<Col span={8}>
				<CounterModify />
			</Col>
		</Row>
	);
};

export default DemoCounter;
