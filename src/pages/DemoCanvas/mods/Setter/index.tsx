import React, { ChangeEventHandler, useEffect } from 'react';
import { List, Form, Input } from 'antd';
import { useActiveMaterial } from '../../hooks';
import '@simonwep/pickr/dist/themes/nano.min.css';
import Pickr from '@simonwep/pickr';

const Material: React.FC<{}> = () => {
	const [material, setMateiral] = useActiveMaterial();

	useEffect(() => {
		const pickr = Pickr.create({
			el: '#picker',
			theme: 'nano', // or 'monolith', or 'nano'

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
				// Main components
				preview: true,
				opacity: true,
				hue: true,

				// Input / output Options
				interaction: {
					hex: true,
					rgba: true,
					hsla: true,
					hsva: true,
					cmyk: true,
					input: true,
					clear: true,
					save: true,
				},
			},
		});
	}, []);

	if (!material) {
		return null;
	}

	const handleChange = (type: string): ChangeEventHandler => ev => {};

	const handleColorChange = (color: string) => {
		setMateiral({ ...material, backgroundColor: color });
	};

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
			<Form layout="inline">
				<List.Item>
					<Form.Item label="Background Color">
						<div id="container">
							<input id="picker" />
						</div>
					</Form.Item>
				</List.Item>
				<List.Item>
					<Form.Item label="Position x">
						<Input onChange={handleChange('x')} type="number" />
					</Form.Item>
				</List.Item>
				<List.Item>
					<Form.Item label="Position y">
						<Input onChange={handleChange('y')} type="number" />
					</Form.Item>
				</List.Item>
				<List.Item>
					<Form.Item label="Width">
						<Input onChange={handleChange('width')} type="number" min={50} />
					</Form.Item>
				</List.Item>
				<List.Item>
					<Form.Item label="Height">
						<Input onChange={handleChange('height')} type="number" min={50} />
					</Form.Item>
				</List.Item>
			</Form>
		</List>
	);
};

export default Material;
