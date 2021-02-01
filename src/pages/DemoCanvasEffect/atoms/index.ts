/* eslint-disable no-empty-pattern */
import { atom, atomFamily, selector } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

export const STORE_KEY = '__DemoCanvasEffect';

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

const promiseResolveIdList = () => {
	const store = localStorage.getItem(`${STORE_KEY}_list`);
	return Promise.resolve(store ? JSON.parse(store) : ([] as string[]));
};

const promiseResolveMaterial = (id: string) => {
	const store = localStorage.getItem(`${STORE_KEY}_material_${id}`);
	return Promise.resolve(store ? JSON.parse(store) : null);
};

export const idListState = atom({
	key: uuidv4(),
	default: [] as string[],
	effects_UNSTABLE: [
		({ setSelf, trigger }) => {
			if (trigger === 'get') {
				promiseResolveIdList().then(list => setSelf(list));
			}
		},
		({ onSet }) => {
			console.log(
				(JSON.parse(localStorage.getItem(`${STORE_KEY}_list`) || '[]') as unknown) as string[]
			);
			onSet((newValue, oldValue) => {
				console.log(`[info]: idListState newValue`, newValue);
				console.log(`[info]: idListState oldValue`, oldValue);
				console.log(`[info]: —————————————————————————————————`);
			});
		},
		({ onSet }) => {
			onSet(newValue => {
				localStorage.setItem(`${STORE_KEY}_list`, JSON.stringify(newValue));
			});
		},
	],
});

export const materialState = atomFamily({
	key: uuidv4(),
	default: (null as unknown) as IMaterial,
	effects_UNSTABLE: (id: string) => [
		({ setSelf, trigger }) => {
			if (trigger === 'get') {
				promiseResolveMaterial(id).then(data => setSelf(data));
			}
		},
		({ onSet }) => {
			onSet((newValue, oldValue) => {
				console.log(`[info]: material state newValue`, newValue);
				console.log(`[info]: material state oldValue`, oldValue);
				console.log(`[info]: —————————————————————————————————`);
			});
		},
		({ onSet }) => {
			onSet(newValue => {
				if (id) {
					localStorage.setItem(`${STORE_KEY}_material_${id}`, JSON.stringify(newValue));
				}
			});
		},
	],
});

export const activeMaterialIdState = atom({
	key: uuidv4(),
	default: (null as unknown) as string,
});
