import React from 'react';
import { List } from 'antd';
import { useActiveMaterial } from '../../hooks';

const Material: React.FC<{}> = () => {
	const [material] = useActiveMaterial();

	if (!material) {
		return null;
	}

	return (
		<List
			style={{ backgroundColor: '#FFF', width: '100%' }}
			size="small"
			header={
				<div>
					<span>Active Material</span>
				</div>
			}
			bordered>
			<List.Item>
				<span>x:</span>
				<span>{material.x}</span>
			</List.Item>
			<List.Item>
				<span>y:</span>
				<span>{material.y}</span>
			</List.Item>
			<List.Item>
				<span>width:</span>
				<span>{material.width}</span>
			</List.Item>
			<List.Item>
				<span>height:</span>
				<span>{material.height}</span>
			</List.Item>
			<List.Item>
				<div style={{ backgroundColor: material.backgroundColor, width: '100%', height: '30px' }} />
			</List.Item>
		</List>
	);
};

export default Material;
