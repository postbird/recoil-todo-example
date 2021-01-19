import { atom, atomFamily, RecoilState, selector } from 'recoil';

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
	key: 'todoIdsState',
	default: [] as TodoIds,
});

export const todoIdState = atomFamily({
	key: `todoItemFamily`,
	default: (null as unknown) as RecoilState<ITodo>,
});

export const todoListStatsSelector = selector({
	key: 'todoListStatsSelector',
	get: ({ get }) => {
		const ids = get(todoIdsState);
		const all = ids.length;
		const active = ids.filter(id => !get(todoIdState(id)).completed).length;
		const completed = ids.filter(id => get(todoIdState(id)).completed).length;
		return {
			all,
			active,
			completed,
			percent: all === 0 ? 0 : `${Math.floor((completed / all) * 100)}%`,
		};
	},
});
