import { useRecoilState, useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { todosState, todoListStatsSelector, ITodo, TodoId } from '../atoms';

const generateTodo = (title: string): ITodo => ({
	id: uuidv4(),
	title,
	completed: false,
	deleted: false,
	created: +new Date(),
});

export const useTodos = () => useRecoilState(todosState);

export const useAddTodo = () => {
	const [todos, setTodos] = useRecoilState(todosState);
	return (title: string) => {
		const newTodo = generateTodo(title);
		return setTodos([...todos, newTodo]);
	};
};

export const useTodo = (id: TodoId) => {
	const [todos, setTodos] = useRecoilState(todosState);

	const todo = todos.filter(todo => todo.id === id)[0];

	const setTodo = (newTodo: ITodo) => {
		if (!newTodo.id) {
			throw new Error('todo id not existed');
		}
		const newTodos = todos.map((todo: ITodo) =>
			todo.id === newTodo.id ? { ...todo, ...newTodo } : todo
		);
		setTodos(newTodos);
	};

	return {
		todo,
		setTodo,
		setTitle: (title: string) => setTodo({ ...todo, title }),
		toggleCompleted: (completed: boolean) => {
			setTodo({ ...todo, completed });
		},
	};
};

export const useTodoStats = () => {
	return useRecoilValue(todoListStatsSelector);
};
