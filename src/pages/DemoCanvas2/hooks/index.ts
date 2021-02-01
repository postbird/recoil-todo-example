import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { IMaterial, listState, activeMaterialIdState } from '../atoms';

const generateCanvasItem = (id: string, opts: { x?: number; y?: number }): IMaterial => {
	const { x = 0, y = 0 } = opts;
	return {
		id,
		x,
		y,
		backgroundColor: '#CCC',
		width: 100,
		height: 80,
	};
};

export const useAddCanvasItem = () => {
	const [list, setList] = useRecoilState(listState);
	return (x?: number, y?: number) => {
		const id = uuidv4();
		setList([...list, generateCanvasItem(id, { x, y })]);
	};
};

export const useMaterial = (id: string) => {
	const [list, setList] = useRecoilState(listState);
	const material = list.filter(item => item.id === id)[0];

	const setMaterial = (material: IMaterial) => {
		setList(list.map(item => (item.id === id ? material : item)));
	};

	const setWidth = (width: number) => setMaterial({ ...material, width });
	const setHeight = (height: number) => setMaterial({ ...material, height });
	const setBackgroundColor = (backgroundColor: string) =>
		setMaterial({ ...material, backgroundColor });

	const setPosition = (x: number, y: number) => setMaterial({ ...material, x, y });

	return {
		material,
		setMaterial,
		setWidth,
		setHeight,
		setBackgroundColor,
		setPosition,
	};
};

// eslint-disable-next-line react-hooks/rules-of-hooks
export const useMaterialList = () => useRecoilState(listState);

export const useSetActiveMaterial = () => {
	const set = useSetRecoilState(activeMaterialIdState);
	return (id: string) => {
		set(id);
	};
};

export const useActiveMaterial = (): [IMaterial] => {
	const id = useRecoilValue(activeMaterialIdState);
	const { material } = useMaterial(id);
	return [material];
};
