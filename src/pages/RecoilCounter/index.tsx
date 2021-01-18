import React from 'react';
import { Button, InputNumber, List, Statistic } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import useCounter from './hooks/useCounter';
import styles from './index.module.css';

const RecoilCounter = () => {
	const { num, setNum, numX2, numX4, numAbs, increment, decrement } = useCounter();

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
