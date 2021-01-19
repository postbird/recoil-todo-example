import React, { useMemo, useState } from 'react';
import { Button, InputNumber, List, Statistic } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './index.module.css';

const RecoilCounter = () => {
	const [num, setNum] = useState(0);

	const numQueryFactory = (x: number) => x * num;

	const numX2 = useMemo(() => numQueryFactory(2), [num]);
	const numX4 = useMemo(() => numQueryFactory(4), [num]);
	const numAbs = useMemo(() => Math.abs(num), [num]);
	const increment = () => setNum(num => num + 1);
	const decrement = () => setNum(num => num - 1);

	const handleOnChange = (n: string | number | undefined) => setNum(n as number);

	return (
		<div className={styles.wrap}>
			<div className={styles.input}>
				<Button onClick={increment}>
					<PlusOutlined />
				</Button>
				<InputNumber value={num} onChange={handleOnChange} />
				<Button onClick={decrement}>
					<MinusOutlined />
				</Button>
			</div>

			<div className={styles.display}>
				<Statistic title="num" value={num} />
				<Statistic title="numX2" value={numX2} />
				<Statistic title="numX4" value={numX4} />
				<Statistic title="numAbs" value={numAbs} />
			</div>
		</div>
	);
};

export default RecoilCounter;
