import React from 'react';
import { Row, Col } from 'antd';
import Canvas from './mods/Canvas';
import Comps from './mods/Comps';
import SideInfo from './mods/SideInfo';
import { useMaterialList } from './hooks/index';
import styles from './index.module.css';

const DemoCanvas: React.FC = () => {
	const [list] = useMaterialList();

	console.log('list', list);

	return (
		<Row>
			<Col span={4}>
				<div className={styles.side}>
					<div className={styles.topSide}>
						<Comps />
					</div>
					<div className={styles.topSide}>
						<SideInfo />
					</div>
				</div>
			</Col>
			<Col span={16}>
				<Canvas />
			</Col>
			<Col span={4}></Col>
		</Row>
	);
};

export default DemoCanvas;
