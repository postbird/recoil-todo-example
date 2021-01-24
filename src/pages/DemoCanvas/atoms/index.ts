import { atom, atomFamily } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

export interface IMaterial {
	id: string;
	width: number;
	height: number;
	x: number;
	y: number;
	backgroundColor: string;
}

export type MaterialIdList = string[];

export const idListState = atom({
	key: uuidv4(),
	default: [] as string[],
});

export const materialState = atomFamily({
	key: uuidv4(),
	default: (null as unknown) as IMaterial,
});
