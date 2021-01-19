import { atom, selector } from 'recoil';

export type TodoId = string;

export interface ITodo {
	id: TodoId;
	title: string;
	completed: boolean;
	deleted: boolean;
	created: number;
}

export type TodoList = ITodo[];

export const todosState = atom({
	key: 'todos',
	default: [] as TodoList,
});

export const todoListStatsSelector = selector({
	key: 'todoListStatsSelector',
	get: ({ get }) => {
		const todos = get(todosState);
		const all = todos.length;
		const active = todos.filter((todo: ITodo) => !todo.completed).length;
		const completed = todos.filter((todo: ITodo) => todo.completed).length;
		return {
			all,
			active,
			completed,
			percent: all === 0 ? 0 : `${Math.floor((completed / all) * 100)}%`,
		};
	},
});