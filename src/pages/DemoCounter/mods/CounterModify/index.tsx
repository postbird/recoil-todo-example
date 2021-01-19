import React from 'react';
import { InputNumber } from 'antd';
import useCounter from '../../hooks/useCounter';
import { InputNumberProps } from 'antd/lib/input-number';

const CounterModify = () => {
	const { num, setNum } = useCounter();

	const handleChange: InputNumberProps['onChange'] = val => setNum(val as number);

	return <InputNumber value={num} onChange={handleChange} style={{ marginTop: '2%' }} />;
};

export default CounterModify;
