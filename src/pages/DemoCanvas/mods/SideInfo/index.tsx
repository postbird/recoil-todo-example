import React from 'react';
import { List } from 'antd';
import { useActiveMaterial } from '../../hooks';

const Material: React.FC<{}> = () => {
	const material = useActiveMaterial();

	if (!material) {
		return null;
	}

	const renderData = Object.keys(material)
		.filter(key => key !== 'id')
		.map((key: string) => ({ key, value: material[key] }));

	return (
		<List
			style={{ backgroundColor: '#FFF' }}
			size="small"
			header={
				<div>
					<p>Active Material</p>
					<p>{material.id}</p>
				</div>
			}
			bordered
			dataSource={renderData}
			renderItem={item => (
				<List.Item>
					<span>{item.key}: </span>
					<span>{item.value}</span>
				</List.Item>
			)}
		/>
	);
};

export default Material;
