import { atom, atomFamily, RecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

export type TodoId = string;

export interface ITodo {
	id: TodoId;
	title: string;
	completed: boolean;
	deleted: boolean;
	created: number;
}

export type TodoIds = TodoId[];

export const todoIdsState: RecoilState<TodoIds> = atom({
	key: uuidv4(),
	default: [] as TodoIds,
	effects_UNSTABLE: [
		({ onSet }) => {
			onSet(newValue => {
				console.log('Current user ID:', newValue);
			});
			return () => null;
		},
	],
});

export const todoIdState = atomFamily({
	key: uuidv4(),
	default: (null as unknown) as RecoilState<ITodo>,
});

export const todoStatsState = atom({
	key: uuidv4(),
	default: {
		all: 0,
		active: 0,
		completed: 0,
		percent: '0%',
	},
});
