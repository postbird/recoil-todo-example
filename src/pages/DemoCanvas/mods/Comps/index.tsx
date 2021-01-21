import React from 'react';
import { AreaChartOutlined } from '@ant-design/icons';
import {
	useDrag,
	DragSourceMonitor,
	DragElementWrapper,
	DragSourceOptions,
	DragPreviewOptions,
} from 'react-dnd';
import styles from './index.module.css';
import { ItemTypes } from '../../ItemTypes';

type TypeUseDragReturn = [
	{ isDragging: boolean },
	DragElementWrapper<DragSourceOptions>,
	DragElementWrapper<DragPreviewOptions>
];

const Comps: React.FC = () => {
	const [{ isDragging }, drag]: TypeUseDragReturn = useDrag({
		item: { type: ItemTypes.BOX },
		end: (item, monitor: DragSourceMonitor) => {
			const dropResult = monitor.getDropResult();
			if (item && dropResult) {
			}
		},
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const opacity = isDragging ? 0.4 : 1;

	return (
		<div className={styles.side}>
			<div className={styles.topSide}>
				<div className={styles.mItem} ref={drag}>
					<AreaChartOutlined style={{ fontSize: 40 }} />
				</div>
			</div>
		</div>
	);
};

export default Comps;
