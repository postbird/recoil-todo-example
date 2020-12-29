import { atomFamily, selector } from 'recoil';

// atom to store ids
const todoIds = atom({
	key: uuidv4(),
	default: [],
});

// atomFamily to store each todo
const todoWithId = atomFamily({
	key: uuidv4(),
	default: [],
});

// atom to store filter options
const todoFilter = atom({
	key: uuidv4(),
	default: 'ALL',
});

// a selector to filter ids
const todoIdsByFilter = selector({
	key: uuidv4(),
	get: ({ get }) => {
		const ids = get(todoIds);
		const filter = get(todoFilter);
		return ids.filter(id => {
			const todo = get(todoWithId(id));
			switch (filter) {
				case 'COMPLETED':
					return todo.completed;
				case 'ACTIVE':
					return !todo.completed;
				default:
					return true;
			}
		});
	},
});
