import { useCallback } from 'react';
import {
	atom,
	atomFamily,
	selectorFamily,
	RecoilState,
	selector,
	ReadOnlySelectorOptions,
	useRecoilCallback,
	useRecoilState,
} from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { TODO_FILTER } from '../../../constants';

export type TodoId = string | number;

export interface ITodo {
	id: TodoId;
	title: string;
	completed: boolean;
	deleted: boolean;
	created: number;
}

export type TodoIds = TodoId[];

export const generateTodo = (title: string) => ({
	title,
	completed: false,
	deleted: false,
	created: +new Date(),
});

export const todoIDsAtom: RecoilState<TodoIds> = atom({
	key: 'todoIDsAtom',
	default: [] as TodoIds,
});

export const todoWithIdAtom = atomFamily({
	key: `todoItemFamily`,
	default: null,
});

export const useInsertAtom = useRecoilCallback(({ set }) => (title: string) => {
	const id = uuidv4();
	set(todoWithIdAtom(id), generateTodo(title));
});

export const todoFilterAtom = atom({
	key: 'todoFilterAtom',
	default: TODO_FILTER.ALL,
});

// export const todoListFilterSelector = selector({
// 	key: 'todoListFilterSelector',
// 	get: ({ get }) => {
// 		const filter = get(todoFilterAtom);
// 		const todoList = get(todoListAtom);
// 		console.log(todoList);

// 		return todoList.filter(todo => {
// 			switch (filter) {
// 				case TODO_FILTER.ACTIVE:
// 					return !todo.completed;
// 				case TODO_FILTER.COMPLETED:
// 					return todo.completed;
// 				default:
// 					return true;
// 			}
// 		});
// 	},
// });
