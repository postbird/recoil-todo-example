import React, { useMemo } from 'react';
import { Row, Col, Button } from 'antd';
import Canvas from './mods/Canvas';
import Comps from './mods/Comps';
import SideInfo from './mods/SideInfo';
import styles from './index.module.css';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useResetList } from './hooks';

const DemoCanvas: React.FC = () => {
	const location = useLocation();
	const reset = useResetList();
	console.log(location);

	const isPreview = useMemo(() => {
		const query = queryString.parse(location.search);
		if (!query || !query.preview || query.preview === 'false') {
			return false;
		}
		return true;
	}, [location]);

	const handleReset = () => {
		reset();
	};

	console.log(location);
	return (
		<Row>
			<Col span={4}>
				<div className={styles.side}>
					<div className={styles.topSide}>
						<div className={styles.topSide}>{isPreview ? null : <Comps />}</div>
					</div>
					<div className={styles.topSide}>{isPreview ? null : <SideInfo />}</div>
				</div>
			</Col>
			<Col span={14}>
				<Canvas isPreview={isPreview} />
			</Col>
			<Col span={5}>
				{isPreview ? null : (
					<div
						style={{
							margin: '20px',
							display: 'flex',
							flexDirection: 'column',
						}}>
						<a href={`${window.location.href}?preview=true`} target="_blank" rel="noreferrer">
							<Button type="primary" size="large" block>
								Preview
							</Button>
						</a>
						<Button
							type="primary"
							size="large"
							block
							style={{ marginTop: '20px' }}
							onClick={handleReset}>
							Reset
						</Button>
					</div>
				)}
			</Col>
			<Col span={1} />
		</Row>
	);
};

export default DemoCanvas;
