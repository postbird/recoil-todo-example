import { useRecoilValue, useRecoilState } from 'recoil';
import { numState, numMultiSelector, numAbsSelector } from './../atoms/index';

const useCounter = () => {
	const [num, setNum] = useRecoilState(numState);
	const numAbs = useRecoilValue(numAbsSelector);
	const numX2 = useRecoilValue(numMultiSelector(2));
	const numX4 = useRecoilValue(numMultiSelector(4));

	const increment = () => setNum(num => num + 1);
	const decrement = () => setNum(num => num - 1);

	return {
		num,
		setNum,
		increment,
		decrement,
		numX2,
		numX4,
		numAbs,
	};
};

export default useCounter;
