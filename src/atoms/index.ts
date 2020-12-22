import { atom, atomFamily, GetRecoilValue, RecoilState } from 'recoil';

export interface ITodo {
	id: number;
	title: string;
	completed: boolean;
	deleted: boolean;
	created: number;
}

type ITodoList = ITodo[];

export const todoListAtom: RecoilState<ITodoList> = atom({
	key: 'todoList',
	default: <ITodoList>[],
});

// export const todoAtomFamily = atomFamily((id: number, title: string) => {});

// export const todoWithId = (id: number) =>
// 	atom({
// 		key: `todoItem${id}`,
// 		default: null,
//   });

export const todoAtomFamily = atomFamily({
	key: `todoItemFamily`,
	default: (id: number) => ({ get }: { get: GetRecoilValue }) =>
		get(todoListAtom).filter((item: ITodo) => item.id === id)[0],
});

export const generateTodo = (title: string): ITodo => ({
	id: +new Date(),
	title,
	completed: false,
	deleted: false,
	created: +new Date(),
});
