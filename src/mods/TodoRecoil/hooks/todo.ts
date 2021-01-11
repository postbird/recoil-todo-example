import { v4 as uuidv4 } from 'uuid';
import { useRecoilState, useRecoilCallback, useRecoilValue } from 'recoil';
import { todoIdsState, todoIdState, generateTodo, TodoId, todoListStatsSelector } from '../atoms';

export const useAddTodo = () => {
	const [ids, setIds] = useRecoilState(todoIdsState);
	return useRecoilCallback(
		({ set }) => (title: string) => {
			const id = uuidv4();
			set(todoIdState(id), generateTodo(title, id));
			setIds(ids => [...ids, id]);
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

export const useTodos = () => {
	return useRecoilValue(todoIdsState);
};

export const useTodoStats = () => {
	return useRecoilValue(todoListStatsSelector);
};
