import React, { ChangeEventHandler, MutableRefObject, useEffect, useRef } from 'react';
import { List, Form, Input } from 'antd';
import { useActiveMaterial } from '../../hooks';
import Pickr from '@simonwep/pickr';
import '@simonwep/pickr/dist/themes/classic.min.css';
import styles from './index.module.css';

const Material: React.FC<{}> = () => {
	const [material, setMateiral] = useActiveMaterial();
	const refElement = useRef(null as unknown) as MutableRefObject<HTMLInputElement>;
	const refPicker = useRef(null as unknown) as MutableRefObject<Pickr>;
	useEffect(() => {
		const inputElement = refElement.current;

		if (!inputElement) {
			return;
		}

		refPicker.current = new Pickr({
			el: inputElement,
			useAsButton: true,
			default: '#42445A',
			theme: 'classic',

			swatches: [
				'rgba(244, 67, 54, 1)',
				'rgba(233, 30, 99, 0.95)',
				'rgba(156, 39, 176, 0.9)',
				'rgba(103, 58, 183, 0.85)',
				'rgba(63, 81, 181, 0.8)',
				'rgba(33, 150, 243, 0.75)',
				'rgba(3, 169, 244, 0.7)',
				'rgba(0, 188, 212, 0.7)',
				'rgba(0, 150, 136, 0.75)',
				'rgba(76, 175, 80, 0.8)',
				'rgba(139, 195, 74, 0.85)',
				'rgba(205, 220, 57, 0.9)',
				'rgba(255, 235, 59, 0.95)',
				'rgba(255, 193, 7, 1)',
			],

			components: {
				preview: true,
				opacity: true,
				hue: true,

				interaction: {
					hex: true,
					rgba: true,
					hsva: true,
					input: true,
					save: true,
				},
			},
		})
			.on('change', (color: any) => {
				const backgroundColor = color.toRGBA().toString(0);
				inputElement.value = backgroundColor;
				setMateiral(material => ({ ...material, backgroundColor }));
			})
			.on('save', () => {
				refPicker.current.hide();
			});
	}, [material, setMateiral]);

	if (!material) {
		return null;
	}

	return (
		<List
			style={{ backgroundColor: '#FFF' }}
			size="small"
			header={
				<div>
					<p>Material Setter</p>
					<p>{material.id}</p>
				</div>
			}
			bordered>
			<Form layout="vertical">
				<List.Item>
					<Form.Item label="Background Color">
						<input
							ref={refElement}
							className={styles.colorBtn}
							style={{ backgroundColor: material.backgroundColor }}
							defaultValue={material.backgroundColor}
						/>
					</Form.Item>
				</List.Item>
			</Form>
		</List>
	);
};

export default Material;
