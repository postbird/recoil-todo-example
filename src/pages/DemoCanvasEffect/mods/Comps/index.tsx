import React, { DragEventHandler } from 'react';
import { AreaChartOutlined } from '@ant-design/icons';
import styles from './index.module.css';

const Comps: React.FC = () => {
	const handleOnDragStart: DragEventHandler<HTMLElement> = ev => {
		ev.dataTransfer.setData('type', 'div');
		ev.dataTransfer.effectAllowed = 'move';
	};

	const handleOnDragEnd: DragEventHandler<HTMLElement> = ev => {
		ev.preventDefault();
	};
	return (
		<div
			className={styles.mItem}
			draggable
			onDragStart={handleOnDragStart}
			onDragEnd={handleOnDragEnd}>
			<AreaChartOutlined style={{ fontSize: 40 }} />
		</div>
	);
};

export default Comps;
