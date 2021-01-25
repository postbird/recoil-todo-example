import { useRecoilCallback, useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { IMaterial, idListState, materialState, activeMaterialIdState } from '../atoms';

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
	const [ids, setIds] = useRecoilState(idListState);

	return useRecoilCallback(
		({ set }) => {
			const id = uuidv4();
			return (x?: number, y?: number) => {
				set(materialState(id), generateCanvasItem(id, { x, y }));
				setIds(ids => [...ids, id]);
			};
		},
		[ids]
	);
};

export const useMaterial = (id: string) => {
	const [material, setMaterial] = useRecoilState(materialState(id));

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
export const useMaterialList = () => useRecoilState(idListState);

export const useSetActiveMaterial = () => {
	const set = useSetRecoilState(activeMaterialIdState);
	return (id: string) => {
		set(id);
	};
};

export const useActiveMaterial = () => {
	const id = useRecoilValue(activeMaterialIdState);
	return useMaterial(id).material;
};
