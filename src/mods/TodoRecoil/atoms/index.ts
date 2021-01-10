import { atom, atomFamily, RecoilState, selector } from 'recoil';
import { TODO_FILTER } from '../../../constants';

export type TodoId = string;

export interface ITodo {
	id: TodoId;
	title: string;
	completed: boolean;
	deleted: boolean;
	created: number;
}

export type TodoIds = TodoId[];

export const generateTodo = (title: string, id: TodoId): ITodo => ({
	id,
	title,
	completed: false,
	deleted: false,
	created: +new Date(),
});

export const todoIdsState: RecoilState<TodoIds> = atom({
	key: 'todoIdsState',
	default: [] as TodoIds,
});

export const todoIdState = atomFamily({
	key: `todoItemFamily`,
	default: (null as unknown) as RecoilState<ITodo>,
});

export const todoFilterState = atom({
	key: 'todoFilterState',
	default: TODO_FILTER.ALL,
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
			percent: all === 0 ? 0 : `${Math.floor(completed / all)}%`,
		};
	},
});

export const todoIdsFilterSelector = selector({
	key: 'todoListFilterSelector',
	get: ({ get }) => {
		const filter = get(todoFilterState);
		const todoIds = get(todoIdsState);
		switch (filter) {
			case TODO_FILTER.COMPLETED:
				return todoIds.filter(todoId => get(todoIdState(todoId)).completed);
			case TODO_FILTER.ACTIVE:
				return todoIds.filter(todoId => !get(todoIdState(todoId)).completed);
			default:
				return todoIds;
		}
	},
});
