import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

export interface IMaterial {
	id: string;
	width: number;
	height: number;
	x: number;
	y: number;
	backgroundColor: string;
	[key: string]: any;
}

export type MaterialIdList = string[];

export const listState = atom({
	key: uuidv4(),
	default: [] as IMaterial[],
});

export const activeMaterialIdState = atom({
	key: uuidv4(),
	default: (null as unknown) as string,
});
