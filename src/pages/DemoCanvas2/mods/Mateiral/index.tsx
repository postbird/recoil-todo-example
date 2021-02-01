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
	const { material, setPosition, setMaterial } = useMaterial(id);
	const setActiveMaterial = useSetActiveMaterial();
	const refMaterial = useRef(null as unknown) as MutableRefObject<HTMLDivElement>;
	const refMouseDown = useRef(false);
	const refMaterialDrag = useRef(null as unknown) as MutableRefObject<HTMLDivElement>;

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

	const handleDragMouseDown: MouseEventHandler = ev => {
		ev.stopPropagation();
		let disX = 0; //鼠标按下时光标的X值
		let disY = 0; //鼠标按下时光标的Y值
		let disW = 0; //拖拽前div的宽
		let disH = 0; // 拖拽前div的高
		disX = ev.clientX; // 获取鼠标按下时光标x的值
		disY = ev.clientY; // 获取鼠标按下时光标Y的值
		disW = refMaterial.current.offsetWidth; // 获取拖拽前div的宽
		disH = refMaterial.current.offsetHeight; // 获取拖拽前div的高
		document.onmousemove = ev => {
			//拖拽时为了对宽和高 限制一下范围，定义两个变量
			let W = ev.clientX - disX + disW;
			let H = ev.clientY - disY + disH;
			if (W < 100) {
				W = 100;
			}
			if (W > 800) {
				W = 800;
			}
			if (H < 100) {
				H = 100;
			}
			if (H > 500) {
				H = 500;
			}
			setMaterial({ ...material, width: W, height: H });
		};
		document.onmouseup = function () {
			document.onmousemove = null;
			document.onmouseup = null;
		};
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
			onMouseUp={handleMouseUp}>
			<div
				ref={refMaterialDrag}
				className={styles.materialDrag}
				onMouseDown={handleDragMouseDown}
			/>
		</div>
	);
};

export default Material;
