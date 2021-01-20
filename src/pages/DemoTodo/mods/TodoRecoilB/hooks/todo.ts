import { v4 as uuidv4 } from 'uuid';
import { useRecoilState, useRecoilCallback, useRecoilValue } from 'recoil';
import { todoIdsState, todoIdState, TodoId, todoListStatsSelector, ITodo } from '../atoms';

const generateTodo = (title: string, id: TodoId): ITodo => ({
	id,
	title,
	completed: false,
	deleted: false,
	created: +new Date(),
});

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

export const useTodoIds = () => {
	return useRecoilValue(todoIdsState);
};

export const useTodoStats = () => {
	return useRecoilValue(todoListStatsSelector);
};

// export const useTodoStats = () => {
// 	const all = useRecoilValue(todoListActiveSelector('all'));
// 	const active = useRecoilValue(todoListActiveSelector('active'));
// 	console.log('allactive', all, active);
// 	const getStats = useRecoilCallback(
// 		({ snapshot }) => {
// 			const stats = snapshot.getLoadable(todoListStatsSelector).getValue();
// 			return () => stats;
// 		},
// 		[]
// 	);
// 	return getStats();
// };
