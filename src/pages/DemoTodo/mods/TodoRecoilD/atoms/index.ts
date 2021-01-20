import { atom, atomFamily, RecoilState, selector, selectorFamily } from 'recoil';
import { Map as IMutableMap } from 'immutable';
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
});

export const todoIdState = atomFamily({
	key: `todoItemFamily`,
	default: (null as unknown) as RecoilState<ITodo>,
});

export const todoListActiveSelector = selectorFamily({
	key: uuidv4(),
	get: type => ({ get }) => {
		const ids = get(todoIdsState);
		if (type === 'all') {
			return ids.length;
		}
		return ids.filter(id => !get(todoIdState(id)).completed).length;
	},
});
const arr: IMutableMap<string, number>[] = [];
const immutableStats = IMutableMap({ all: 0, active: 0, completed: 0 });

export const todoListStatsSelector = selector({
	key: uuidv4(),
	get: ({ get }) => {
		const ids = get(todoIdsState);
		const all = ids.length;
		const active = ids.filter(id => !get(todoIdState(id)).completed).length;
		arr.push(immutableStats);
		console.log(
			'immutableStats',
			arr.map(item => item === immutableStats)
		);
		if (all === immutableStats.get('all') || active === immutableStats.get('active')) {
			return immutableStats;
		}
		immutableStats.set('all', all);
		immutableStats.set('active', active);
		immutableStats.set('completed', all - active);
		return immutableStats;
	},
});
