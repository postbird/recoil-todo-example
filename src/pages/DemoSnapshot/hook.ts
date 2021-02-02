import { useRecoilState } from 'recoil';
import { boxState } from './atom';

export const useBox = () => {
	return useRecoilState(boxState);
};
