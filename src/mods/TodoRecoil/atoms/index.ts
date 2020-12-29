import { atom, atomFamily, RecoilState, useRecoilCallback, useRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
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

export const todoIdsAtom: RecoilState<TodoIds> = atom({
	key: 'todoIdsAtom',
	default: [] as TodoIds,
});

export const todoWithIdAtom = atomFamily({
	key: `todoItemFamily`,
	default: (null as unknown) as RecoilState<ITodo>,
});

export const useInsertAtom = () => {
	const [ids, setIds] = useRecoilState(todoIdsAtom);
	return useRecoilCallback(
		({ set }) => (title: string) => {
			const id = uuidv4();
			setIds([...ids, id]);
			console.log(todoWithIdAtom(id));
			set(todoWithIdAtom(id), generateTodo(title, id));
		},
		[ids]
	);
};

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
