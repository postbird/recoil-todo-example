import {
	atom,
	atomFamily,
	RecoilState,
	useRecoilCallback,
	useRecoilState,
	selector,
	useRecoilValue,
} from 'recoil';
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

export const todoIdsState: RecoilState<TodoIds> = atom({
	key: 'todoIdsState',
	default: [] as TodoIds,
});

export const todoIdState = atomFamily({
	key: `todoItemFamily`,
	default: (null as unknown) as RecoilState<ITodo>,
});

export const todoFilterAtom = atom({
	key: 'todoFilterAtom',
	default: TODO_FILTER.ALL,
});

export const todoListFilterSelector = selector({
	key: 'todoListFilterSelector',
	get: ({ get }) => {
		const filter = get(todoFilterAtom);
		const todoIds = get(todoIdsState);
		return todoIds.filter(id => {
			const todo = get(todoIdState(id));
			console.log('todo', todo);
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

//***  hooks ****/
export const useInsertAtom = () => {
	const [ids, setIds] = useRecoilState(todoIdsState);
	return useRecoilCallback(
		({ set }) => (title: string) => {
			const id = uuidv4();
			setIds(ids => [...ids, id]);
			set(todoIdState(id), generateTodo(title, id));
		},
		[ids]
	);
};
