import React from 'react';
import { useDrop } from 'react-dnd';
import styles from './index.module.css';
import { ItemTypes } from '../../ItemTypes';

const DemoCanvas: React.FC = () => {
	const [{ canDrop, isOver }, drop] = useDrop({
		accept: ItemTypes.BOX,
		drop: () => ({ name: 'Dustbin' }),
		collect: monitor => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	});

	const isActive = canDrop && isOver;
	let backgroundColor = '#fff';
	if (isActive) {
		backgroundColor = '#ddd';
	} else if (canDrop) {
		backgroundColor = '#eee';
	}

	return <div className={styles.canvasWrap} style={{ backgroundColor }} ref={drop}></div>;
};

export default DemoCanvas;
