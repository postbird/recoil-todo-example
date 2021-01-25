import React, { MouseEventHandler, useMemo, useRef, MutableRefObject } from 'react';
import { useMaterial, useSetActiveMaterial } from '../../hooks';
import styles from './index.module.css';

const Material: React.FC<{
	id: string;
	getCanvasXY: () => {
		x: number;
		y: number;
	};
}> = ({ id, getCanvasXY }) => {
	const { material, setPosition } = useMaterial(id);
	const setActiveMaterial = useSetActiveMaterial();
	const refMaterial = useRef(null as unknown) as MutableRefObject<HTMLDivElement>;
	const refMouseDown = useRef(false);

	const handleClick = () => {
		setActiveMaterial(id);
	};

	const handleMouseDown: MouseEventHandler = ev => {
		refMouseDown.current = true;
	};
	const handleMouseMove: MouseEventHandler = ev => {
		if (!refMouseDown.current) {
			return null;
		}
		const canvas = getCanvasXY();
		const x = ev.pageX - canvas.x;
		const y = ev.pageY - canvas.y;
		setPosition(x, y);
	};
	const handleMouseUp: MouseEventHandler = ev => {
		refMouseDown.current = false;
	};

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

	return (
		<div
			ref={refMaterial}
			className={styles.material}
			style={style}
			draggable={false}
			onClick={handleClick}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
		/>
	);
};

export default Material;
