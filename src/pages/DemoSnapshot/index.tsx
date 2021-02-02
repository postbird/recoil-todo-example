import React, { useMemo, DragEventHandler, MutableRefObject, useRef, useCallback } from 'react';
import styles from './index.module.css';
import { useBox } from './hook';

const DemoSnapshot: React.FC = () => {
	const [box, setBox] = useBox();
	const refCanvas: MutableRefObject<HTMLDivElement> = useRef(
		null as unknown
	) as MutableRefObject<HTMLDivElement>;

	const getCanvasXY = useCallback(() => {
		if (refCanvas.current) {
			return {
				x: refCanvas.current.getBoundingClientRect().x,
				y: refCanvas.current.getBoundingClientRect().y,
			};
		}
		return {
			x: 0,
			y: 0,
		};
	}, []);

	const handleDragStart: DragEventHandler<HTMLElement> = ev => {
		ev.dataTransfer.setData('type', 'div');
	};

	const handleDragEnd: DragEventHandler<HTMLElement> = ev => {
		ev.preventDefault();
	};

	const handleDropEnd: DragEventHandler = ev => {
		ev.preventDefault();
		const canvas = getCanvasXY();
		const x = ev.pageX - canvas.x;
		const y = ev.pageY - canvas.y;
		console.log(x, y);
		setBox({ x, y });
	};

	const style = useMemo(
		() => ({
			left: box.x + 'px',
			top: box.y + 'px',
		}),
		[box]
	);

	return (
		<div className={styles.wrap}>
			<div className={styles.canvas} onDragEnd={handleDropEnd} ref={refCanvas}>
				<div
					className={styles.box}
					style={style}
					draggable={true}
					onDragStart={handleDragStart}
					onDragEnd={handleDragEnd}
				/>
			</div>
			<div className={styles.setter}></div>
		</div>
	);
};

export default DemoSnapshot;
