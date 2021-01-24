import React, { useMemo } from 'react';
import { useMaterial } from '../../hooks';
import {
	useDrag,
	DragSourceMonitor,
	DragElementWrapper,
	DragSourceOptions,
	DragPreviewOptions,
} from 'react-dnd';
import { ItemTypes } from '../../ItemTypes';
import styles from './index.module.css';

type TypeUseDragReturn = [
	{ isDragging: boolean },
	DragElementWrapper<DragSourceOptions>,
	DragElementWrapper<DragPreviewOptions>
];

const Material: React.FC<{ id: string }> = ({ id }) => {
	const { material, setPosition } = useMaterial(id);

	const [{ isDragging }, drag]: TypeUseDragReturn = useDrag({
		item: { type: ItemTypes.BOX, ...material },
		end: (item, monitor: DragSourceMonitor) => {
			const dropResult = monitor.getDropResult();
			if (item && dropResult) {
				console.log('Material item', dropResult);
				setPosition(dropResult.x, dropResult.y);
			}
		},
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const style = useMemo(() => {
		const { width, height, backgroundColor, x, y } = material;
		return {
			width: `${width}px`,
			height: `${height}px`,
			backgroundColor,
			top: `${y}px`,
			left: `${x}px`,
		};
	}, [material]);

	return <div className={styles.material} style={style} ref={drag} />;
};

export default Material;
