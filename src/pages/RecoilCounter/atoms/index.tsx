import { atom, selector, selectorFamily } from 'recoil';

export const numState = atom({
	key: 'num',
	default: 0,
});

export const numAbsSelector = selector({
	key: 'numAbsSelector',
	get: ({ get }) => {
		const num = get(numState);
		return Math.abs(num);
	},
});

export const numMultiSelector = selectorFamily({
	key: 'numMultiSelector',
	get: (query: number) => ({ get }) => {
		const num = get(numAbsSelector);
		return num * query;
	},
});
