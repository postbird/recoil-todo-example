import { v4 as uuidv4 } from 'uuid';
import { useRecoilState, useRecoilCallback } from 'recoil';
import { todoIdsState, todoIdState, generateTodo, TodoId } from '../atoms';

export const useAddTodo = () => {
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

export const useTodo = (id: TodoId) => {
	const [todo, setTodo] = useRecoilState(todoIdState(id));

	return {
		todo,
		setTodo,
		setTitle: (title: string) => setTodo({ ...todo, title }),
		toggleCompleted: (completed: boolean) => {
			setTodo({ ...todo, completed });
		},
	};
};

export const useTodos = () => {};

export const useFilterTodoIds = () => {
	// const
};
