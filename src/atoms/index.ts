import { atom, atomFamily, selectorFamily, RecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

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

// export const todoAtomFamily = atomFamily((id: string, title: string) => {});

// export const todoWithId = (id: string) =>
// 	atom({
// 		key: `todoItem${id}`,
// 		default: null,
//   });
