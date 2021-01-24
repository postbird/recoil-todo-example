import React from 'react';
import { Row, Col } from 'antd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Canvas from './mods/Canvas';
import Comps from './mods/Comps';
import { useMaterialList } from './hooks/index';
// import styles from './index.module.css';

const DemoCanvas: React.FC = () => {
	const [list] = useMaterialList();

	console.log('list', list);

	return (
		<DndProvider backend={HTML5Backend}>
			<Row>
				<Col span={4}>
					<Comps />
				</Col>
				<Col span={16}>
					<Canvas />
				</Col>
				<Col span={4}></Col>
			</Row>
		</DndProvider>
	);
};

export default DemoCanvas;
