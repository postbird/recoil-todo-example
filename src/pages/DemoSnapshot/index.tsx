import React, {
	useMemo,
	DragEventHandler,
	MutableRefObject,
	useRef,
	useCallback,
	useState,
} from 'react';
import styles from './index.module.css';
import { boxState } from './atom';
import {
	Snapshot,
	useRecoilSnapshot,
	useRecoilState,
	useRecoilTransactionObserver_UNSTABLE,
	useGotoRecoilSnapshot,
} from 'recoil';
import { Button, List, Badge } from 'antd';
import { UndoOutlined, RedoOutlined } from '@ant-design/icons';

const DemoSnapshot: React.FC = () => {
	const [box, setBox] = useRecoilState(boxState);
	const [snapshotList, setSnapshotList] = useState<Snapshot[]>([]);
	const snapshot = useRecoilSnapshot();
	const gotoSnapshot = useGotoRecoilSnapshot();

	console.log(snapshot.getID());

	useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
		setSnapshotList(list => [...list, snapshot]);
	});

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
		setBox({ x, y });
	};

	const handleSnapshotGotoClick = (snapshot: Snapshot) => () => {
		gotoSnapshot(snapshot);
	};

	const handleUndoClick = () => {
		const id = snapshot.getID();
		const previousId = ((id as unknown) as number) - 1;
		const previewSnapshot = snapshotList.filter(
			item => ((item.getID() as unknown) as number) === previousId
		)[0];
		if (previewSnapshot) {
			gotoSnapshot(previewSnapshot);
		}
	};

	const handleRedoClick = () => {
		const id = snapshot.getID();
		const previousId = ((id as unknown) as number) + 1;
		const nextSnapshot = snapshotList.filter(
			item => ((item.getID() as unknown) as number) === previousId
		)[0];
		if (nextSnapshot) {
			gotoSnapshot(nextSnapshot);
		}
	};

	const style = useMemo(
		() => ({
			left: box.x + 'px',
			top: box.y + 'px',
		}),
		[box]
	);

	const renderHeader = () => {
		return (
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<span>Snapshots: {JSON.stringify(box)}</span>
				<div>
					<Button onClick={handleUndoClick}>
						<UndoOutlined />
					</Button>
					<Button onClick={handleRedoClick}>
						<RedoOutlined />
					</Button>
				</div>
			</div>
		);
	};

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
			<List
				className={styles.setter}
				size="small"
				bordered
				style={{ backgroundColor: '#FFF', width: '400px' }}
				header={renderHeader()}>
				{snapshotList.reverse().map((snapshot, index) => (
					<List.Item key={index} className={styles.setterItem}>
						<span>
							<Badge
								count={snapshot.getID()}
								style={{ backgroundColor: '#52c41a', width: '50px', marginRight: '10px' }}
							/>
							{JSON.stringify(snapshot.getLoadable(boxState).contents)}
						</span>
						<Button onClick={handleSnapshotGotoClick(snapshot)}>Go To</Button>
					</List.Item>
				))}
			</List>
		</div>
	);
};

export default DemoSnapshot;
