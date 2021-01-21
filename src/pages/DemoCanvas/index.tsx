import React from 'react';
import { Row, Col } from 'antd';

const DemoCanvas: React.FC = () => {
	return (
		<Row>
			<Col span={6}></Col>
			<Col span={12}></Col>
			<Col span={6}></Col>
		</Row>
	);
};

export default DemoCanvas;
