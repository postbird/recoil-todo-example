import {
	atom,
	atomFamily,
	selectorFamily,
	RecoilState,
	selector,
	ReadOnlySelectorOptions,
} from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { TODO_FILTER } from '../../../constants';

export interface ITodo {
	id: string;
	title: string;
	completed: boolean;
	deleted: boolean;
	created: number;
}

type ITodoList = ITodo[];

export const generateTodo = (title: string): ITodo => ({
	id: uuidv4(),
	title,
	completed: false,
	deleted: false,
	created: +new Date(),
});

export const todoListAtom: RecoilState<ITodoList> = atom({
	key: 'todoList',
	default: [
		generateTodo('xx'),
		generateTodo('xx'),
		generateTodo('xx'),
		generateTodo('xx'),
	] as ITodoList,
});

export const todoItemSelectorWithId = selectorFamily({
	key: 'todoItemSelectorWithId',
	get: (id: string) => ({ get }) => get(todoListAtom).filter(item => item.id === id)[0],
});

export const todoAtomWithId = atomFamily({
	key: `todoItemFamily`,
	default: (id: string) => todoItemSelectorWithId(id),
});

export const todoFilterAtom = atom({
	key: 'todoFilterAtom',
	default: TODO_FILTER.ALL,
});

export const todoListFilterSelector = selector({
	key: 'todoListFilterSelector',
	get: ({ get }) => {
		const filter = get(todoFilterAtom);
		const todoList = get(todoListAtom);
		console.log(todoList);

		return todoList.filter(todo => {
			switch (filter) {
				case TODO_FILTER.ACTIVE:
					return !todo.completed;
				case TODO_FILTER.COMPLETED:
					return todo.completed;
				default:
					return true;
			}
		});
	},
});
