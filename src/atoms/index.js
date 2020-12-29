import { atom, atomFamily, useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

export const todoIdsState = atom({
	key: 'idsAtom',
	default: [],
});

export const todoItemState = atomFamily({
	key: 'todoAtom',
	default: null,
});

export const useInsertItem = () => {
	const [ids, setIds] = useRecoilState(todoIdsState);

	return useRecoilCallback(
		({ set }) => {
			return (title) => {
				const newId = uuidv4();
				setIds((ids) => [...ids, newId]);
				console.log(todoItemState(newId));
				set(todoItemState(newId), {
					id: newId,
					title,
					isComplete: false,
				});
			};
		},
		[ids]
	);
};

export const useAllTodos = () => {
	const ids = useRecoilValue(todoIdsState);

	return useRecoilCallback(
		({ snapshot }) => {
			return () => {
				console.log('snapshot', snapshot);
				return snapshot;
			};
		},
		[ids]
	);
};
