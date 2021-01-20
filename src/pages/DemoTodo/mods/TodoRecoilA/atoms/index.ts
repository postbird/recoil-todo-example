import { atom, selector } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

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
	key: uuidv4(),
	default: [] as TodoList,
});

export const todoListStatsSelector = selector({
	key: uuidv4(),
	get: ({ get }) => {
		const todos = get(todosState);
		const all = todos.length;
		const active = todos.filter((todo: ITodo) => !todo.completed).length;
		const completed = todos.filter((todo: ITodo) => todo.completed).length;
		return {
			all,
			active,
			completed,
		};
	},
});
