import React from 'react';
import { useDrop, DropTargetMonitor, XYCoord } from 'react-dnd';
import styles from './index.module.css';
import { ItemTypes } from '../../ItemTypes';
import { useMaterialList } from '../../hooks';
import Material from '../Mateiral';

const DemoCanvas: React.FC = () => {
	const [list] = useMaterialList();

	const handleDroped = (item: any, monitor: DropTargetMonitor) => {
		const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
		console.log('delta', delta);
		const x = Math.round(item.x + delta.x);
		const y = Math.round(item.y + delta.y);
		console.log('handleDroped', {
			id: item.id,
			x,
			y,
		});
		// moveBox(item.id, left, top);
		return {
			id: item.id,
			x,
			y,
		};
	};

	const [{ canDrop, isOver }, drop] = useDrop({
		accept: ItemTypes.BOX,
		drop: handleDroped,
		collect: monitor => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	});

	return (
		<div className={styles.canvasWrap} ref={drop}>
			{list.map(id => (
				<Material key={id} id={id} />
			))}
		</div>
	);
};

export default DemoCanvas;
