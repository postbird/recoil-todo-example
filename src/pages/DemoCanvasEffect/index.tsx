import React from 'react';
import { Row, Col } from 'antd';
import Canvas from './mods/Canvas';
import Comps from './mods/Comps';
import SideInfo from './mods/SideInfo';
import styles from './index.module.css';

const DemoCanvas: React.FC = () => {
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
			<Col span={14}>
				<Canvas />
			</Col>
			<Col span={5}></Col>
			<Col span={1} />
		</Row>
	);
};

export default DemoCanvas;
