import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

export const boxState = atom({
	key: uuidv4(),
	default: {
		x: 100,
		y: 200,
	},
});
