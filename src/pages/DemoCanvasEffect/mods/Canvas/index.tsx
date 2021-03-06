import React, { DragEventHandler, MutableRefObject, useCallback, useRef } from 'react';
import styles from './index.module.css';
import { useMaterialList, useAddCanvasItem } from '../../hooks';
import Material from '../Mateiral';

const DemoCanvas: React.FC<{ isPreview: boolean }> = ({ isPreview }) => {
	const addTodo = useAddCanvasItem();
	const [list] = useMaterialList();
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

	const handleOnDrop: DragEventHandler = ev => {
		if (isPreview) return null;
		ev.preventDefault();
		ev.dataTransfer.dropEffect = 'move';
		const canvas = getCanvasXY();
		const x = ev.pageX - canvas.x;
		const y = ev.pageY - canvas.y;
		addTodo(x, y);
	};

	const handleOnDragOver: DragEventHandler<HTMLElement> = ev => {
		if (isPreview) return null;
		ev.preventDefault();
	};

	return (
		<div
			ref={refCanvas}
			className={styles.canvasWrap}
			onDrop={handleOnDrop}
			onDragOver={handleOnDragOver}>
			{list.map(id => (
				<Material key={id} id={id} getCanvasXY={getCanvasXY} isPreview={isPreview} />
			))}
		</div>
	);
};

export default DemoCanvas;
