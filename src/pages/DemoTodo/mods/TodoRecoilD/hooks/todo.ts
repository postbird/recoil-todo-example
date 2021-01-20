import { v4 as uuidv4 } from 'uuid';
import {
	useRecoilState,
	useRecoilCallback,
	useRecoilValue,
	useRecoilTransactionObserver_UNSTABLE,
	useSetRecoilState,
} from 'recoil';
import { todoIdsState, todoIdState, TodoId, todoStatsState, ITodo } from '../atoms';

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

export const useStatsObserver = () => {
	const [stats, setStats] = useRecoilState(todoStatsState);
	useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
		const ids = snapshot.getLoadable(todoIdsState).getValue();
		const todos = ids.map(id => snapshot.getLoadable(todoIdState(id)).getValue());
		const active = todos.filter(todo => !todo.completed).length;
		const all = ids.length;
		if (stats.all !== all || stats.active !== active) {
			setStats({
				all,
				active,
				completed: all - active,
			});
		}
		return null;
	});
};

export const useTodoStats = () => {
	useStatsObserver(); // ! observer in useTodoStats hook
	return useRecoilValue(todoStatsState);
};
